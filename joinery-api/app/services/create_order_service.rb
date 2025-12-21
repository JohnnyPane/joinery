class CreateOrderService
  attr_reader :order_params, :user, :cart, :shipping_address_params, :billing_address_params, :payment_method

  def initialize(order_params:, user:, shipping_address_params:, billing_address_params:, payment_method:)
    @order_params = order_params
    @user = user
    @cart = Cart.find(order_params[:cart_id])
    @shipping_address_params = shipping_address_params
    @billing_address_params = billing_address_params
    @payment_method = payment_method
  end

  def call
    ActiveRecord::Base.transaction do
      @order = create_order
      cart.cart_items.each do |cart_item|
        create_order_item(cart_item)
      end

      @order.update!(total_amount_in_cents: order_total_cost_in_cents)
      create_order_addresses
      process_stripe_payment
      StripePayoutService.new(@order).create_transfers
      update_product_inventory
      clear_cart

      @order
    end
  rescue ActiveRecord::RecordInvalid => e
    raise StandardError, "Order creation failed: #{e.record.errors.full_messages.join(', ')}"
  end

  def create_order
    Order.create!(
      user: user,
      status: "pending",
      stripe_payment_intent_id: payment_method,
      customer_name: order_params[:customer_name],
      customer_email: order_params[:customer_email],
      customer_phone_number: order_params[:phone],
      billing_same_as_shipping: order_params[:billing_same_as_shipping] || true,
    )
  end

  def create_order_item(cart_item)
    product = cart_item.product
    unit_price_per_volume_in_cents = cart_item.unit_price_per_volume_in_cents

    @order.order_items.create!(
      product: product,
      store: product.store,
      shipping_option: cart_item.shipping_option,
      ordered_volume: cart_item.ordered_volume,
      unit_price_per_volume_in_cents: unit_price_per_volume_in_cents,
      pricing_unit: cart_item.pricing_unit,
      shipping_cost_in_cents: calculate_shipping_cost(cart_item),
      total_price_in_cents: (unit_price_per_volume_in_cents * cart_item.ordered_volume) + calculate_shipping_cost(cart_item),
      quote_request: cart_item.quote_request,
      status: determine_order_item_status(cart_item.shipping_option)
    )
  end

  # MAJOR TODO: Refactor shipping cost calculation - need to figure out how to handle different pricing units and shipping options
  def calculate_shipping_cost(cart_item)
    shipping_option = cart_item.shipping_option
    quote_request = cart_item.quote_request

    return 0 unless shipping_option

    if quote_request&.shipping_quote?
      quote_request.latest_quote.amount_in_cents
    elsif cart_item.pricing_unit_each?
      shipping_option.price_in_cents * cart_item.ordered_volume
    else
      shipping_option.price_in_cents
    end
  end

  def determine_order_item_status(shipping_option)
    shipping_option&.shipping_type == "pickup" ? "awaiting_pickup" : "awaiting_shipping"
  end

  def create_order_addresses
    @order.create_shipping_address(shipping_address_params)
    @order.create_billing_address(billing_address_params) unless @order.billing_same_as_shipping
  end

  def order_total_cost_in_cents
    @order.order_items.sum(:total_price_in_cents)
  end

  def process_stripe_payment
    payment_intent = StripeService.new(@order, payment_method).create_charge

    if payment_intent.status == "succeeded"
      @order.update!(
        status: "paid",
        paid: true,
        stripe_charge_id: payment_intent.latest_charge,
        stripe_payment_intent_id: payment_intent.id
      )
    else
      @order.update!(status: "pending")
      raise StandardError, "Payment processing issue"
    end
  end

  def update_product_inventory
    @order.order_items.each do |item|
      return if item.quote_request.present?

      product = item.product
      product.with_lock do
        raise StandardError, "Insufficient inventory for #{product.name}" if product.available_volume < item.ordered_volume
        product.decrement!(:available_volume, item.ordered_volume)
      end
    end
  end

  def clear_cart
    cart.cart_items.destroy_all
  end
end

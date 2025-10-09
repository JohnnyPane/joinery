class ShippingCalculator
  attr_reader :shippable
  # Shipping options is an array of hashes that have the shippable_items ids and their corresponding shipping option ids

  def initialize(shippable)
    @shippable = shippable
  end

  def calculate
    case shippable
    when Cart
      calculate_cart_shipping
    when Order
      calculate_order_shipping
    when CartItem, OrderItem
      calculate_item_shipping(shippable)
    else
      raise ArgumentError, "Unsupported resource type"
    end
  end

  private

  def calculate_cart_shipping
    shippable.cart_items.map { |item| calculate_item_shipping(item) }.sum
  end

  def calculate_order_shipping
    shippable.order_items.map { |item| calculate_item_shipping(item) }.sum
  end

  def calculate_item_shipping(item)
    item.quantity * item_shipping_rate(item)
  end

  def item_shipping_rate(item)
    item.shipping_option.price_in_cents
  end
end

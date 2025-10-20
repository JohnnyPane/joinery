class CreateCartFromQuoteService
  attr_reader :quote_request, :quote, :product, :requester

  def initialize(quote_request:, requester: nil)
    @quote_request = quote_request
    @quote = @quote_request.latest_quote
    @product = @quote_request.product
    @requester = requester
  end

  def self.create(quote_request:, requester: nil)
    new(quote_request: quote_request, requester: requester).call
  end

  def call
    validate_quote_request

    cart = Cart.find_or_create_by!(user: buyer, guest: false)
    cart.cart_items.create!(
      product: product,
      store: product.store,
      quantity: 1,
      unit_price_in_cents: cart_item_price,
      quote_request: quote_request,
      shipping_option: get_shipping_option
    )

    cart.save!
    cart
  rescue ActiveRecord::RecordInvalid => e
    raise StandardError, "Cart creation failed: #{e.record.errors.full_messages.join(', ')}"
  end

  private

  def buyer
    @buyer ||= quote_request.buyer
  end

  def validate_quote_request
    raise StandardError, "No quotes found for this request" if quote.nil?
    raise StandardError, "Quote has not been accepted" unless quote_accepted?
    raise StandardError, "Quote does not belong to requester" unless quote_belongs_to_requester?
    raise StandardError, "Quote amount must be greater than zero" unless price_valid?
  end

  def quote_accepted?
    quote_request.status == "accepted"
  end

  def quote_belongs_to_requester?
    requester == buyer
  end

  def price_valid?
    quote.amount_in_cents > 0
  end

  def cart_item_price
    if quote_request.parent_quote_request.present?
      quote_request.parent_quote_request.latest_quote.amount_in_cents
    elsif quote_request.shipping_quote?
      product.price_in_cents
    else
      quote.amount_in_cents
    end
  end

  def get_shipping_option
    if quote_request.shipping_quote?
      return quote_request.product.shipping_options.find(&:quote?)
    elsif product.has_quote_shipping_option?
      return product.shipping_options.find(&:pickup?)
    end

    nil
  end
end

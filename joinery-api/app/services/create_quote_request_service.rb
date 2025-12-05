class CreateQuoteRequestService
  include QuoteCacheManagement
  class UnauthorizedError < StandardError; end

  def initialize(current_user:, quote_request_params: {})
    @quote_request_params = quote_request_params

    @quote_type = quote_request_params[:quote_type] || "product"
    @requested_volume = quote_request_params[:requested_volume] || 1
    @message = quote_request_params.dig(:quote_attributes, :message) || ""

    @current_user = current_user
    @product = Product.find(quote_request_params[:product_id])
  end

  def self.perform(**args)
    new(**args).perform
  end

  def perform
    @quote_request = create_request
    create_initial_quote
    update_counter_cache(@quote_request)
    @quote_request
  end

  private

  def create_request
    QuoteRequest.create!(
      quote_type: @quote_type,
      product: @product,
      buyer: @current_user,
      seller: @product.store,
      status: "requested",
      requested_volume: @requested_volume,
      pricing_unit: @product.pricing_unit
    )
  end

  def create_initial_quote
    Quote.create!(
      quote_request: @quote_request,
      author: @current_user,
      action: "requested",
      role: "buyer",
      message: @message,
      amount_in_cents: 0
    )
  end
end

class QuoteActionService
  include QuoteCacheManagement
  class UnauthorizedError < StandardError; end

  attr_reader :quote_request, :current_user, :actor, :action, :message, :amount_in_cents

  def initialize(current_user:, quote_request_params: {})
    @quote_request_params = quote_request_params
    @quotes_attributes = quote_request_params[:quotes_attributes].first || {}

    @quote_request = QuoteRequest.find_by(id: quote_request_params[:id])
    @message = @quotes_attributes[:message]
    @action = @quotes_attributes[:action]
    @amount_in_cents = @quotes_attributes[:amount_in_cents]

    @current_user = current_user

    @actor = get_actor
  end

  def self.perform(**args)
    new(**args).perform
  end

  def perform
    @quote_request =
      case action
      when "offer" then create_offer
      when "respond" then respond_to_request
      when "accept" then accept_quote
      when "accept_with_shipping_quote" then accept_with_shipping_quote
      when "decline" then decline_quote
      when "cancel" then cancel_quote
      else
        raise ArgumentError, "Invalid action: #{action}"
      end

    update_counter_cache(@quote_request)

    @quote_request
  end

  private

  def create_offer
    authorize_seller!

    Quote.create!(
      quote_request: quote_request,
      author: actor,
      action: "offered",
      role: "seller",
      message: message,
      amount_in_cents: amount_in_cents
    )

    quote_request.update!(status: "offered")
    quote_request
  end

  def respond_to_request
    authorize_actor!

    Quote.create!(
      quote_request: quote_request,
      author: actor,
      action: "responded",
      role: actor_role,
      message: message,
      amount_in_cents: amount_in_cents || quote_request.latest_quote.amount_in_cents
    )

    quote_request.update!(status: "responded")
    quote_request
  end

  def accept_quote
    authorize_buyer!

    Quote.create!(
      quote_request: quote_request,
      author: actor,
      action: "accepted",
      role: actor_role,
      message: message,
      amount_in_cents: quote_request.latest_quote.amount_in_cents
    )

    quote_request.update!(status: "accepted")

    CreateCartFromQuoteService.create(quote_request: quote_request, requester: actor)
    quote_request
  end

  def accept_with_shipping_quote
    authorize_buyer!

    Quote.create!(
      quote_request: quote_request,
      author: actor,
      action: "accepted",
      role: actor_role,
      message: message,
      amount_in_cents: quote_request.latest_quote.amount_in_cents
    )

    quote_request.update!(status: "accepted")

    Quote.create!(
      quote_request: create_shipping_quote_request,
      author: actor,
      action: "requested",
      role: "buyer",
      message: "Requesting shipping quote for accepted product quote ##{quote_request.id}",
      amount_in_cents: 0
    )

    quote_request
  end

  def decline_quote
    authorize_actor!

    Quote.create!(
      quote_request: quote_request,
      author: actor,
      action: "declined",
      role: actor_role,
      message: message,
      amount_in_cents: quote_request.latest_quote.amount_in_cents
    )

    if quote_request.parent_quote_request.present?
      quote_request.parent_quote_request.update!(status: "declined")
    end

    quote_request.update!(status: "declined")
    quote_request
  end

  def cancel_quote
    authorize_actor!

    Quote.create!(
      quote_request: quote_request,
      author: actor,
      action: "cancelled",
      role: actor_role,
      message: "#{message} (Cancelled by #{actor_role})",
      amount_in_cents: quote_request.latest_quote.amount_in_cents
    )

    quote_request.update!(status: "cancelled")
    quote_request
  end

  def create_shipping_quote_request
    QuoteRequest.create!(
      buyer: quote_request.buyer,
      seller: quote_request.seller,
      product: quote_request.product,
      quote_type: "shipping",
      status: "requested",
      parent_quote_request: quote_request
    )
  end

  def actor_role
    return "seller" if actor.is_a?(Store) && quote_request.seller == actor
    return "buyer" if actor.is_a?(User) && quote_request.buyer == actor

    nil
  end

  def authorize_actor!
    unless (quote_request.buyer == actor) || (quote_request.seller == actor)
      raise "Unauthorized action: #{actor.id} cannot perform #{action} on this quote request"
    end
  end

  def authorize_seller!
    unless quote_request.seller == actor
      raise "Unauthorized action: Only the seller can perform #{action} on this quote request"
    end
  end

  def authorize_buyer!
    unless quote_request.buyer == actor
      raise "Unauthorized action: Only the buyer can perform #{action} on this quote request"
    end
  end

  def get_actor
    if quote_request.buyer == current_user
      current_user
    elsif quote_request.seller == current_user.default_store
      current_user.default_store
    else
      raise "Unauthorized action: #{current_user.id} cannot perform #{action} on this quote request"
    end
  end
end

class QuoteActionService
  class UnauthorizedError < StandardError; end

  attr_reader :quote_request, :current_user, :actor, :action, :message, :amount_in_cents, :product

  def initialize(quote_request: nil, current_user:, action:, message: "", amount_in_cents: 0, product_id: nil)
    @quote_request = quote_request
    @current_user = current_user
    @action = action
    @message = message
    @amount_in_cents = amount_in_cents
    @product = Product.find(product_id) if product_id.present?
    set_actor
  end

  def self.perform(**args)
    new(**args).perform
  end

  def perform
    case action
    when "request" then create_request
    when "offer" then create_offer
    when "respond" then respond_to_request
    when "accept" then accept_quote
    when "decline" then decline_quote
    when "cancel" then cancel_quote
    else
      raise ArgumentError, "Invalid action: #{action}"
    end
  end

  private

  def create_request
    quote_request = QuoteRequest.create!(product: product, buyer: actor, seller: product.store, status: "requested")
    Quote.create!(
      quote_request: quote_request,
      author: actor,
      action: "requested",
      role: "buyer",
      message: message,
      amount_in_cents: amount_in_cents
    )
    quote_request
  end

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

  def set_actor
    return @actor = current_user if action == "request"

    if quote_request.buyer == current_user
      @actor = current_user
    elsif quote_request.seller == current_user.default_store
      @actor = current_user.default_store
    else
      raise "Unauthorized action: #{current_user.id} cannot perform #{action} on this quote request"
    end
  end
end

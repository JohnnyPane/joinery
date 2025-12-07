class QuoteRequestSerializer < BaseSerializer
  attributes :id, :product_id, :buyer_id, :seller_id, :status, :quote_type, :requested_volume, :pricing_unit, :created_at, :updated_at

  attribute :product do |quote_request|
    ProductSerializer.shallow_serialize(quote_request.product)
  end

  attribute :quotes do |quote_request|
    QuoteSerializer.shallow_serialize_collection(quote_request.quotes)
  end

  attribute :latest_quote do |quote_request|
    QuoteSerializer.shallow_serialize(quote_request.latest_quote)
  end

  attribute :buyer do |quote_request|
    UserSerializer.shallow_serialize(quote_request.buyer)
  end

  attribute :seller do |quote_request|
    StoreSerializer.shallow_serialize(quote_request.seller)
  end

  attribute :requires_action do |quote_request|
    current_user = Current.user

    if current_user == quote_request.buyer
      quote_request.needs_buyer_response?
    elsif current_user.default_store == quote_request.seller
      quote_request.needs_seller_response?
    else
      false
    end
  end

  def self.shallow_attributes_list
    [ :id, :product_id, :buyer_id, :seller_id, :status ]
  end

  def self.shallow_associations(quote_request)
    {
      amount_in_cents: quote_request.amount_in_cents
    }
  end
end

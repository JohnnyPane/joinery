class UserSerializer < BaseSerializer
  attributes :id, :email, :name, :created_at, :admin

  attribute :current_store do |user|
    user.default_store ? StoreSerializer.shallow_serialize(user.default_store) : nil
  end

  attribute :quotes_awaiting_action_count do |user|
    QuoteRequest.needing_response_from(user: user, store: user.default_store).count
  end

  attribute :has_orders_awaiting_action do |user|
    user.default_store ? user.default_store.has_order_items_awaiting_action? : false
  end

  attribute :cart_id do |user|
    cart = Cart.find_by(user: user, guest: false)
    cart ? cart.id : nil
  end

  def self.shallow_attributes_list
    [ :id, :email, :first_name, :last_name ]
  end
end

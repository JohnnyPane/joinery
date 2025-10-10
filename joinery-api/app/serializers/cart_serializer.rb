class CartSerializer < BaseSerializer
  attributes :id, :user_id, :guest

  attribute :cart_items do |cart|
    CartItemSerializer.shallow_serialize_collection(cart.cart_items)
  end

  attribute :total_price_in_cents do |cart|
    cart.total_price_in_cents
  end

  def self.shallow_attributes_list
    [ :id, :user_id, :guest ]
  end
end

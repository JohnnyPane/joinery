class CartSerializer < BaseSerializer
  attributes :id, :user_id, :guest

  attribute :cart_items do |cart|
    cart.cart_items.map do |item|
      CartItemSerializer.new(item).serializable_hash
    end
  end

  attribute :total_price_in_cents do |cart|
    cart.total_price_in_cents
  end
end

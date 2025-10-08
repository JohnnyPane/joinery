class CartItemSerializer < BaseSerializer
  attributes :id, :cart_id, :product_id, :quantity, :unit_price_in_cents, :total_price_in_cents

  attribute :product do |cart_item|
    ProductSerializer.new(cart_item.product).serializable_hash
  end
end

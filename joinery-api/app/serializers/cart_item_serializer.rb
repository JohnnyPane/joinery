class CartItemSerializer < BaseSerializer
  attributes :id, :cart_id, :product_id, :quantity, :unit_price_in_cents, :total_price_in_cents, :shipping_option_id

  attribute :product do |cart_item|
    ProductSerializer.new(cart_item.product).serializable_hash
  end

  attribute :shipping_price_in_cents do |cart_item|
    cart_item.shipping_option&.price_in_cents || 0
  end
end

class CartItemSerializer < BaseSerializer
  attributes :id, :cart_id, :product_id, :ordered_volume, :unit_price_per_volume_in_cents, :total_price_in_cents,
             :shipping_option_id, :pricing_unit

  attribute :product do |cart_item|
    ProductSerializer.shallow_serialize(cart_item.product)
  end

  attribute :shipping_price_in_cents do |cart_item|
    cart_item.shipping_option&.price_in_cents || 0
  end

  def self.shallow_attributes_list
    [ :id, :cart_id, :ordered_volume, :unit_price_per_volume_in_cents, :total_price_in_cents, :shipping_option_id, :pricing_unit ]
  end

  def self.shallow_associations(cart_item)
    {
      product: ProductSerializer.shallow_serialize(cart_item.product),
      shipping_cost_in_cents: cart_item.shipping_cost_in_cents
    }
  end
end

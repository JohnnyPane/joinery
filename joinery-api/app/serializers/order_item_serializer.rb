class OrderItemSerializer < BaseSerializer
  attributes :id, :order_id, :product_id, :quantity, :unit_price_in_cents, :total_price_in_cents

  attribute :product do |order_item|
    ProductSerializer.new(order_item.product).serializable_hash
  end
end

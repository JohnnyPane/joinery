class OrderItemSerializer < BaseSerializer
  attributes :id, :order_id, :product_id, :quantity, :unit_price_in_cents, :total_price_in_cents

  attribute :order do |order_item|
    OrderSerializer.shallow_serialize(order_item.order)
  end

  attribute :shipping_address do |order_item|
    order_item.order.shipping_address ? order_item.order.shipping_address.full_address : nil
  end

  attribute :product do |order_item|
    ProductSerializer.shallow_serialize(order_item.product)
  end

  attribute :store do |order_item|
    StoreSerializer.shallow_serialize(order_item.store)
  end

  def self.shallow_attributes_list
    [ :id, :order_id, :product_id, :quantity, :unit_price_in_cents, :total_price_in_cents ]
  end
end

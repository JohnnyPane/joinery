class OrderSerializer < BaseSerializer
  attributes :id, :user_id, :status, :total_amount_in_cents

  attribute :order_items do |order|
    OrderItemSerializer.shallow_serialize_collection(order.order_items)
  end

  def self.shallow_attributes_list
    [ :id, :user_id, :status, :total_amount_in_cents ]
  end
end

class OrderSerializer < BaseSerializer
  attributes :id, :user_id, :status, :total_amount_in_cents

  attribute :order_items do |order|
    order.order_items.map do |item|
      OrderItemSerializer.new(item).serializable_hash
    end
  end
end

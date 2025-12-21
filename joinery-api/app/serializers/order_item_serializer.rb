class OrderItemSerializer < BaseSerializer
  attributes :id, :order_id, :product_id, :ordered_volume, :unit_price_per_volume_in_cents, :total_price_in_cents, :fulfillment_method, :status

  attribute :order do |order_item|
    OrderSerializer.shallow_serialize(order_item.order)
  end

  attribute :current_user_review, if: proc { |_, params| show_page?(params) } do |order_item|
    review = order_item.product.review_by_user(Current.user)
    ReviewSerializer.shallow_serialize(order_item.product.review_by_user(Current.user)) if review.present?
  end


  attribute :requires_action do |order_item|
    return false unless Current.user

    order_item.awaiting_action_from?(Current.user)
  end

  attribute :shipping_address do |order_item|
    order_item.order.shipping_address ? order_item.order.shipping_address.full_address : nil
  end

  attribute :shipping_option do |order_item|
    ShippingOptionSerializer.shallow_serialize(order_item.shipping_option)
  end

  attribute :product do |order_item|
    ProductSerializer.shallow_serialize(order_item.product)
  end

  attribute :quote_request do |order_item|
    if order_item.quote_request
      QuoteRequestSerializer.shallow_serialize(order_item.quote_request)
    else
      nil
    end
  end

  attribute :store do |order_item|
    StoreSerializer.shallow_serialize(order_item.store)
  end

  def self.shallow_attributes_list
    [ :id, :order_id, :product_id, :ordered_volume, :unit_price_per_volume_in_cents, :total_price_in_cents, :status ]
  end
end

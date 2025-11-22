class OrderItemSerializer < BaseSerializer
  attributes :id, :order_id, :product_id, :quantity, :unit_price_in_cents, :total_price_in_cents, :fulfillment_method

  attribute :status do |order_item|
    order_item.effective_status
  end

  attribute :order do |order_item|
    OrderSerializer.shallow_serialize(order_item.order)
  end

  attribute :current_user_review, if: proc { |_, params| show_page?(params) } do |order_item, params|
    review = order_item.product.review_by_user(params[:current_user])
    ReviewSerializer.shallow_serialize(order_item.product.review_by_user(params[:current_user])) if review.present?
  end


  attribute :requires_action do |order_item, params|
    return false unless params[:current_user]

    if order_item.awaiting_action_from_buyer? && order_item.order.user == params[:current_user]
      true
    elsif order_item.awaiting_action_from_store?
      true
    else
      false
    end
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
    [ :id, :order_id, :product_id, :quantity, :unit_price_in_cents, :total_price_in_cents ]
  end

  def self.shallow_associations(order_item)
    {
      status: order_item.effective_status
    }
  end
end

class OrderItem < ApplicationRecord
  belongs_to :order
  belongs_to :product
  belongs_to :store
  belongs_to :shipping_option
  belongs_to :quote_request, optional: true

  validates :ordered_volume, numericality: { greater_than: 0 }
  validates :unit_price_per_volume_in_cents, numericality: { greater_than_or_equal_to: 0 }
  validates :total_price_in_cents, numericality: { greater_than_or_equal_to: 0 }

  enum :status, { awaiting_fulfillment: 0, shipped: 1, delivered: 2, completed: 3, cancelled: 4 }, default: :awaiting_fulfillment
  enum :pricing_unit, { board_foot: 'BF', square_foot: 'SF', linear_foot: 'LF', cubic_foot: 'CF', each: 'EACH' }, prefix: true

  scope :by_store, ->(store_id) { where(store_id: store_id) }
  scope :by_user, ->(user_id) {
    joins(:order).where(orders: { user_id: user_id })
  }
  scope :awaiting_action_from_store, -> {
    joins(:shipping_option)
      .where(status: :awaiting_fulfillment)
      .where(shipping_options: { shipping_type: ["quote", "flat_rate"] })
  }

  FULFILLMENT_METHODS = {
    "quote"     => :shipping,
    "flat_rate" => :shipping,
    "pickup"    => :pickup
  }.freeze

  def fulfillment_method
    FULFILLMENT_METHODS.fetch(shipping_option&.shipping_type, :unknown)
  end

  def effective_status
    return :cancelled if status == "cancelled"
    return :shipped if status == "shipped"
    return :delivered if status == "delivered"
    return :completed if status == "completed"
    return :awaiting_fulfillment if fulfillment_method == :shipping && status == "awaiting_fulfillment"
    return :awaiting_pickup if fulfillment_method == :pickup && status == "awaiting_fulfillment"

    :unknown
  end

  def awaiting_action_from_store?
    effective_status == :awaiting_fulfillment
  end

  def awaiting_action_from_buyer?
    effective_status == :awaiting_pickup
  end

  def awaiting_action_from?(user)
    if awaiting_action_from_store?
      user.default_store == store
    elsif awaiting_action_from_buyer?
      order.user == user
    else
      false
    end
  end
end

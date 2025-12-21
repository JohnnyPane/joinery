class OrderItem < ApplicationRecord
  belongs_to :order
  belongs_to :product
  belongs_to :store
  belongs_to :shipping_option
  belongs_to :quote_request, optional: true

  validates :ordered_volume, numericality: { greater_than: 0 }
  validates :unit_price_per_volume_in_cents, numericality: { greater_than_or_equal_to: 0 }
  validates :total_price_in_cents, numericality: { greater_than_or_equal_to: 0 }

  enum :pricing_unit, { board_foot: 'BF', square_foot: 'SF', linear_foot: 'LF', cubic_foot: 'CF', each: 'EACH' }, prefix: true
  enum :status, {
    awaiting_shipping: "awaiting_shipping",
    awaiting_pickup: "awaiting_pickup",
    shipped: "shipped",
    delivered: "delivered",
    completed: "completed",
    cancelled: "cancelled"
  }, default: :awaiting_shipping

  scope :by_store, ->(store_id) { where(store_id: store_id) }
  scope :by_user, ->(user_id) {
    joins(:order).where(orders: { user_id: user_id })
  }
  scope :awaiting_action_from_store, -> { where(status: :awaiting_shipping) }
  scope :awaiting_action_from_buyer, -> { where(status: :awaiting_pickup) }

  FULFILLMENT_METHODS = {
    "quote"     => :shipping,
    "flat_rate" => :shipping,
    "pickup"    => :pickup
  }.freeze

  def fulfillment_method
    FULFILLMENT_METHODS.fetch(shipping_option&.shipping_type, :unknown)
  end

  def awaiting_action_from_store?
    status == "awaiting_shipping"
  end

  def awaiting_action_from_buyer?
    status == "awaiting_pickup"
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

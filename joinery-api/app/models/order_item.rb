class OrderItem < ApplicationRecord
  belongs_to :order
  belongs_to :product
  belongs_to :store
  belongs_to :shipping_option

  validates :quantity, numericality: { greater_than: 0 }
  validates :unit_price_in_cents, numericality: { greater_than_or_equal_to: 0 }
  validates :total_price_in_cents, numericality: { greater_than_or_equal_to: 0 }

  enum :status, { awaiting_fulfillment: 0, shipped: 1, delivered: 2, complete: 3, cancelled: 4 }, default: :awaiting_fulfillment

  scope :by_store, ->(store_id) { where(store_id: store_id) }

  FULFILLMENT_METHODS = {
    "quote"     => :shipping,
    "flat_rate" => :shipping,
    "pickup"    => :pickup
  }.freeze

  def fulfillment_method
    FULFILLMENT_METHODS.fetch(shipping_option&.shipping_type, :unknown)
  end
end

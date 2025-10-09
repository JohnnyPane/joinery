class OrderItem < ApplicationRecord
  belongs_to :order
  belongs_to :product
  belongs_to :store
  belongs_to :shipping_option

  validates :quantity, numericality: { greater_than: 0 }
  validates :unit_price_in_cents, numericality: { greater_than_or_equal_to: 0 }
  validates :total_price_in_cents, numericality: { greater_than_or_equal_to: 0 }


end

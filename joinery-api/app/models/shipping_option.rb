class ShippingOption < ApplicationRecord
  belongs_to :product
  has_many :cart_items
  has_many :order_items
  has_one :store, through: :product

  enum :shipping_type, { flat_rate: 0, pickup: 1, quote: 2 }
end

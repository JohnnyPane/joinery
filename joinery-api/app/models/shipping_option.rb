class ShippingOption < ApplicationRecord
  belongs_to :product
  has_many :cart_items
  has_many :order_items
  has_one :store, through: :product

  enum :shipping_type, { flat_rate: 0, pickup: 1, quote: 2 }

  def quote?; shipping_type == "quote"; end
  def flat_rate?; shipping_type == "flat_rate"; end
  def pickup?; shipping_type == "pickup"; end
end

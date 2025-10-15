class Cart < ApplicationRecord
  belongs_to :user, optional: true
  has_many :cart_items, dependent: :destroy
  has_many :products, through: :cart_items

  def total_price_in_cents
    cart_items.sum(&:total_price_in_cents)
  end

  def clear_cart
    cart_items.destroy_all
  end
end

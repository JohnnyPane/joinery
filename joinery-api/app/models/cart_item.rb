class CartItem < ApplicationRecord
  belongs_to :cart
  belongs_to :product
  belongs_to :store
  belongs_to :shipping_option, optional: true

  validates :quantity, numericality: { greater_than: 0 }

  before_save :set_total_price, :ensure_enough_stock

  def total_price_in_cents
    quantity * unit_price_in_cents + shipping_cost_in_cents
  end

  def shipping_cost_in_cents
    shipping_option ? shipping_option.price_in_cents * quantity : 0
  end

  private

  def set_total_price
    self.total_price_in_cents = total_price_in_cents
  end

  def ensure_enough_stock
    unless product.has_enough_stock?(quantity)
      self.quantity = product.quantity
      errors.add(:quantity, "exceeds available stock. Adjusted to available stock.")
    end
  end
end

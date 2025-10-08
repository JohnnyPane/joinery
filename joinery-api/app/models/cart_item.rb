class CartItem < ApplicationRecord
  belongs_to :cart
  belongs_to :product

  validates :quantity, numericality: { greater_than: 0 }

  before_save :set_total_price, :ensure_enough_stock

  def total_price_in_cents
    quantity * unit_price_in_cents
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

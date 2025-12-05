class CartItem < ApplicationRecord
  belongs_to :cart
  belongs_to :product
  belongs_to :store
  belongs_to :shipping_option, optional: true
  belongs_to :quote_request, optional: true

  enum :pricing_unit, { board_foot: 'BF', square_foot: 'SF', linear_foot: 'LF', cubic_foot: 'CF', each: 'EACH' }, prefix: true

  validates :ordered_volume, numericality: { greater_than: 0 }

  before_save :set_total_price, :ensure_enough_stock

  def shipping_cost_in_cents
    return shipping_option ? shipping_option.price_in_cents * ordered_volume : 0 if quote_request.nil?

    quote_request.shipping_quote? ? quote_request.latest_quote.amount_in_cents : 0
  end

  private

  def set_total_price
    self.total_price_in_cents = calculate_total_price_in_cents
  end

  def calculate_total_price_in_cents
    ordered_volume * unit_price_per_volume_in_cents + shipping_cost_in_cents
  end

  # TODO: Refactor stock management to be more robust - probably avoid adjusting quantities silently
  def ensure_enough_stock
    unless product.has_enough_stock?(ordered_volume) || quote_request.present?
      self.ordered_volume = product.available_volume
      errors.add(:ordered_volume, "exceeds available stock. Adjusted to available stock.")
    end
  end
end

class Quote < ApplicationRecord
  belongs_to :quote_request
  belongs_to :author, polymorphic: true

  validates :message, presence: true
  validates :amount_in_cents, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :role, presence: true, inclusion: { in: %w[seller buyer] }

  enum :action, { requested: 0, offered: 1, responded: 2, accepted: 3, declined: 4, completed: 5, cancelled: 6 }

  def from_seller?; role == "seller"; end
  def from_buyer?; role == "buyer"; end
end

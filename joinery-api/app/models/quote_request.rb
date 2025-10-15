class QuoteRequest < ApplicationRecord
  belongs_to :product
  belongs_to :buyer, class_name: "User", foreign_key: "buyer_id"
  belongs_to :seller, class_name: "Store", foreign_key: "seller_id"

  has_many :quotes, dependent: :destroy
  has_many :order_items, dependent: :nullify
  has_many :cart_items, dependent: :nullify

  scope :for_buyer, ->(buyer_id) { where(buyer_id: buyer_id) }
  scope :for_seller, ->(seller_id) { where(seller_id: seller_id) }
  def self.needs_response(last_role:, waiting_role:, scope:)
    scope
      .joins(:quotes)
      .group("quote_requests.id")
      .having("MAX(CASE WHEN quotes.role = ? THEN quotes.created_at END) >
             COALESCE(MAX(CASE WHEN quotes.role = ? THEN quotes.created_at END), '1970-01-01')", last_role, waiting_role)
      .where(status: %w[requested offered responded])
  end
  scope :needs_response_from_seller, ->(store_id) { needs_response(last_role: "buyer", waiting_role: "seller", scope: for_seller(store_id)) }
  scope :needs_response_from_buyer, ->(buyer_id) { needs_response(last_role: "seller", waiting_role: "buyer", scope: for_buyer(buyer_id)) }
  scope :needing_response_from, ->(user:, store: nil) do
    buyer_scope = needs_response_from_buyer(user.id)
    seller_scope = store.present? ? needs_response_from_seller(store.id) : none

    buyer_ids = buyer_scope.select(:id)
    seller_ids = seller_scope.select(:id)

    where(id: buyer_ids).or(where(id: seller_ids))
  end

  enum :status, { requested: 0, offered: 1, responded: 2, accepted: 3, declined: 4, completed: 5, cancelled: 6 }

  def latest_quote
    quotes.order(created_at: :desc).first
  end

  def open?
    status == "requested" || status == "offered" || status == "responded"
  end

  def needs_seller_response?
    open? && latest_quote.from_buyer?
  end

  def needs_buyer_response?
    open? && latest_quote.from_seller?
  end

  def requires_action?
    (needs_seller_response? || needs_buyer_response?)
  end

  def amount_in_cents
    latest_quote&.amount_in_cents
  end
end

class Store < ApplicationRecord
  include Imageable
  include Ownable

  has_many :order_items
  belongs_to :owner, class_name: 'User', foreign_key: 'owner_id'
  has_many :products, dependent: :destroy
  has_many :quote_requests, class_name: 'QuoteRequest', foreign_key: 'seller_id'
  has_many :quotes, as: :author
  has_many :store_users, dependent: :destroy
  has_many :users, through: :store_users
  has_one :address, as: :addressable, dependent: :destroy

  accepts_nested_attributes_for :address, allow_destroy: true

  acts_as_imageable_one :logo, processing_method: :resize_to_fill
  owned_by :owner

  validates :name, presence: true
  validates :owner, presence: true
  validates :stripe_account_id, uniqueness: true, allow_nil: true

  def has_order_items_awaiting_action?
    order_items.awaiting_action_from_store.any?
  end

  # MAJOR TODO: Move to background job
  def recalculate_combined_score
    products_with_reviews = products.where('reviews_count > 0')

    total_count = products_with_reviews.sum(:reviews_count)

    if total_count > 0
      weighted_sum = products_with_reviews.sum("reviews_count * average_rating")

      new_average = weighted_sum / total_count
    else
      total_count = 0
      new_average = 0
    end

    update(
      combined_reviews_count: total_count,
      overall_average_rating: new_average
    )
  end
end

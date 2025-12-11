class Review < ApplicationRecord
  include Ownable

  belongs_to :user
  belongs_to :reviewable, polymorphic: true, counter_cache: true

  scope :for_product, ->(product_id) { where(reviewable_id: product_id, reviewable_type: "Product") }
  scope :for_store, ->(store_id) {
    joins(
      "INNER JOIN products ON reviews.reviewable_id = products.id
       AND reviews.reviewable_type = 'Product'"
    )
      .where("products.store_id = ?", store_id)
  }

  owned_by :user

  after_save :update_reviewable_metrics
  after_destroy :update_reviewable_metrics

  def update_reviewable_metrics
    reviewable.update(average_rating: reviewable.reviews.average(:rating) || 0.0)

    reviewable.cascade_review_update
  end
end

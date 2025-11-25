class AddReviewMetricsToProducts < ActiveRecord::Migration[8.0]
  def change
    add_column :products, :reviews_count, :integer, default: 0, null: false
    add_column :products, :average_rating, :decimal, precision: 4, scale: 2, default: 0.0, null: false

    reversible do |dir|
      dir.up do
        execute <<-SQL
          UPDATE products
          SET 
            reviews_count = COALESCE((
              SELECT COUNT(reviews.id) 
              FROM reviews 
              WHERE reviews.reviewable_type = 'Product' AND reviews.reviewable_id = products.id
            ), 0), -- COALESCE handles NULL count (though COUNT is usually non-NULL)
            average_rating = COALESCE((
              SELECT AVG(reviews.rating) 
              FROM reviews 
              WHERE reviews.reviewable_type = 'Product' AND reviews.reviewable_id = products.id
            ), 0.0); -- 💡 CRITICAL: COALESCE converts AVG(NULL) result to 0.0
        SQL
      end
    end
  end
end

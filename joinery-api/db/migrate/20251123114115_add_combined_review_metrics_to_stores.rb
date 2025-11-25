class AddCombinedReviewMetricsToStores < ActiveRecord::Migration[8.0]
  def change
    add_column :stores, :combined_reviews_count, :integer, default: 0, null: false
    add_column :stores, :overall_average_rating, :decimal, precision: 4, scale: 2, default: 0.0, null: false

    reversible do |dir|
      dir.up do
        execute <<-SQL
          UPDATE stores AS s
          SET combined_reviews_count = sub.total_count,
              overall_average_rating = CASE 
                                       WHEN sub.total_count > 0 
                                       THEN sub.weighted_sum / sub.total_count 
                                       ELSE 0 
                                     END
          FROM (
              SELECT 
                  products.store_id,
                  SUM(products.reviews_count) AS total_count,
                  SUM(products.reviews_count * products.average_rating) AS weighted_sum
              FROM products
              WHERE products.reviews_count > 0
              GROUP BY products.store_id
          ) AS sub
          WHERE s.id = sub.store_id;
        SQL
      end
    end
  end
end
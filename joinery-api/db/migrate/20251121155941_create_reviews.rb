class CreateReviews < ActiveRecord::Migration[8.0]
  def change
    create_table :reviews do |t|
      t.integer :rating
      t.text :body
      t.references :user, null: false, foreign_key: true
      t.references :reviewable, polymorphic: true, null: false
      t.boolean :verified_purchase

      t.timestamps
    end
  end
end

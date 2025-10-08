class CreateCartItems < ActiveRecord::Migration[8.0]
  def change
    create_table :cart_items do |t|
      t.references :cart, null: false, foreign_key: true
      t.references :product, null: false, foreign_key: true
      t.references :store, null: false, foreign_key: true

      t.integer :quantity, null: false, default: 0
      t.integer :unit_price_in_cents, null: false
      t.integer :total_price_in_cents, null: false

      t.timestamps
    end
  end
end

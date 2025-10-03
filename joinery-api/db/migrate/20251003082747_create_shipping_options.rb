class CreateShippingOptions < ActiveRecord::Migration[8.0]
  def change
    create_table :shipping_options do |t|
      t.string :name, default: ""
      t.integer :price_in_cents, default: 0
      t.integer :shipping_type, default: 0, null: false
      t.references :product, null: false, foreign_key: true

      t.timestamps
    end
  end
end

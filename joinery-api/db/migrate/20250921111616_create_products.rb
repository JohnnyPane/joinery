class CreateProducts < ActiveRecord::Migration[8.0]
  def change
    create_table :products do |t|
      t.string :name, null: false
      t.text :description
      t.integer :price_in_cents, null: false
      t.integer :quantity, null: false, default: 0
      t.references :store, null: false, foreign_key: true
      t.boolean :is_active, null: false, default: true
      t.references :productable, polymorphic: true, null: false

      t.timestamps
    end
  end
end

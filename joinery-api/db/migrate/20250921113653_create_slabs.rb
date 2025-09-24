class CreateSlabs < ActiveRecord::Migration[8.0]
  def change
    create_table :slabs do |t|
      t.string :species, null: false
      t.integer :slab_type, null: false, default: 0
      t.decimal :width, precision: 10, scale: 2, null: false
      t.decimal :length, precision: 10, scale: 2, null: false
      t.decimal :height, precision: 10, scale: 2, null: false
      t.decimal :weight, precision: 10, scale: 2
      t.boolean :dried, default: false, null: false

      t.timestamps
    end
  end
end

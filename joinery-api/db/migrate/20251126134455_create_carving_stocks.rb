class CreateCarvingStocks < ActiveRecord::Migration[8.0]
  def change
    create_table :carving_stocks do |t|
      t.string :species, null: false
      t.decimal :thickness_in_inches, precision: 6, scale: 2
      t.decimal :width_in_inches, precision: 6, scale: 2
      t.integer :length_in_feet, null: false
      t.decimal :board_feet, precision: 8, scale: 2
      t.integer :grade, default: 0
      t.decimal :density_lb_per_cu_ft, precision: 4, scale: 2
      t.integer :grain_structure, default: 0
      t.decimal :weight_in_pounds, precision: 8, scale: 2
      t.decimal :moisture_content_percent, precision: 5, scale: 2

      t.timestamps

      t.index :species
      t.index :grade
      t.index :grain_structure
      t.index :moisture_content_percent

      t.index :thickness_in_inches
      t.index :width_in_inches
      t.index :length_in_feet

      t.index :board_feet
    end
  end
end

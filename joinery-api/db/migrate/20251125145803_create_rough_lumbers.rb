class CreateRoughLumbers < ActiveRecord::Migration[8.0]
  def change
    create_table :rough_lumbers do |t|
      t.string :species, null: false
      t.decimal :moisture_content_percent, precision: 5, scale: 2
      t.decimal :nominal_thickness_inches, precision: 6, scale: 2
      t.decimal :nominal_width_inches, precision: 6, scale: 2
      t.integer :length_in_feet
      t.decimal :board_feet, precision: 8, scale: 2
      t.string :grade
      t.boolean :can_be_straight_lined

      t.timestamps

      t.index :species
      t.index :grade
      t.index :moisture_content_percent
      t.index :nominal_thickness_inches
      t.index :nominal_width_inches
      t.index :length_in_feet
      t.index :board_feet
      t.index :can_be_straight_lined
    end
  end
end

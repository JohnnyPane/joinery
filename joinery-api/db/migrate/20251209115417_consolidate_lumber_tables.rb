class ConsolidateLumberTables < ActiveRecord::Migration[8.0]
  def change
      create_table :lumbers do |t|
        t.string :species, null: false
        t.integer :finish_type, default: 0, null: false

        t.decimal :thickness_in_inches, precision: 6, scale: 2
        t.decimal :width_in_inches, precision: 6, scale: 2
        t.integer :length_in_feet
        t.string :nominal_dimension

        t.decimal :moisture_content_percent, precision: 5, scale: 2
        t.decimal :board_feet, precision: 8, scale: 2
        t.string :grade

        t.string :profile
        t.string :treatment

        t.timestamps
      end

      add_index :lumbers, :species
      add_index :lumbers, :finish_type
      add_index :lumbers, :thickness_in_inches
      add_index :lumbers, :width_in_inches
      add_index :lumbers, :board_feet
      add_index :lumbers, :grade
      add_index :lumbers, :profile
      add_index :lumbers, :treatment
      add_index :lumbers, :nominal_dimension

      drop_table :rough_lumbers, if_exists: true
      drop_table :surfaced_lumbers, if_exists: true
  end
end

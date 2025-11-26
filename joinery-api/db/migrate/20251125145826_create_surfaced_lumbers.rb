class CreateSurfacedLumbers < ActiveRecord::Migration[8.0]
  def change
    create_table :surfaced_lumbers do |t|
      t.string :species, null: false
      t.decimal :moisture_content_percent, precision: 5, scale: 2
      t.string :nominal_dimension
      t.decimal :thickness_in_inches, precision: 6, scale: 2
      t.decimal :width_in_inches, precision: 6, scale: 2
      t.integer :length_in_feet
      t.string :profile
      t.string :treatment

      t.timestamps

      t.index :species
      t.index :nominal_dimension
      t.index :profile
      t.index :treatment
      t.index :moisture_content_percent
      t.index :length_in_feet
      t.index :thickness_in_inches
      t.index :width_in_inches
    end
  end
end

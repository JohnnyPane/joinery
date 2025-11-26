class CreateTurningBlanks < ActiveRecord::Migration[8.0]
  def change
    create_table :turning_blanks do |t|
      t.string :species, null: false
      t.decimal :thickness_in_inches, precision: 6, scale: 2
      t.decimal :width_in_inches, precision: 6, scale: 2
      t.decimal :length_in_inches, precision: 6, scale: 2
      t.decimal :cubic_inches, precision: 8, scale: 2
      t.integer :shape, default: 0
      t.string :figure_type
      t.boolean :wax_sealed, default: false
      t.decimal :moisture_content_percent, precision: 5, scale: 2

      t.timestamps

      t.index :species
      t.index :shape
      t.index :figure_type
      t.index :wax_sealed
      t.index :moisture_content_percent
      t.index :thickness_in_inches
      t.index :width_in_inches
      t.index :length_in_inches
      t.index :cubic_inches
    end
  end
end

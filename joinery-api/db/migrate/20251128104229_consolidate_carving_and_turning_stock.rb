class ConsolidateCarvingAndTurningStock < ActiveRecord::Migration[8.0]
  def change
    drop_table(:carving_stocks, if_exists: true)
    rename_table :turning_blanks, :wood_blocks

    change_table :wood_blocks do |t|
      t.boolean :is_reclaimed, default: false, null: false
      t.boolean :is_carving_suitable, default: false, null: false
      t.integer :grain_orientation
      t.string :ideal_application
      t.decimal :board_feet, precision: 8, scale: 2

      t.remove :figure_type

      t.index :grain_orientation
      t.index :is_carving_suitable
      t.index :is_reclaimed
    end
  end
end

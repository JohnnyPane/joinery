class CreateWoodBlockFigures < ActiveRecord::Migration[8.0]
  def change
    create_table :wood_block_figures do |t|
      t.references :wood_block, null: false, foreign_key: true
      t.references :figure_type, null: false, foreign_key: true

      t.timestamps
    end

    add_index :wood_block_figures, [:wood_block_id, :figure_type_id], unique: true
  end
end

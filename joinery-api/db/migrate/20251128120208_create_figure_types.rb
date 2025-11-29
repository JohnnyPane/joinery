class CreateFigureTypes < ActiveRecord::Migration[8.0]
  def change
    create_table :figure_types do |t|
      t.string :name, null: false
      t.string :label, null: false
      t.text :description

      t.timestamps
    end

    add_index :figure_types, :name, unique: true
  end
end

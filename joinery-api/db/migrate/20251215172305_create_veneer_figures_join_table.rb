class CreateVeneerFiguresJoinTable < ActiveRecord::Migration[8.0]
  def change
    create_table :veneer_figures, id: false do |t|
      t.references :veneer, null: false, foreign_key: true
      t.references :figure_type, null: false, foreign_key: true
    end

    add_index :veneer_figures, [ :veneer_id, :figure_type_id ], unique: true, name: 'index_figure_types_veneers_on_veneer_and_figure_type'
  end
end

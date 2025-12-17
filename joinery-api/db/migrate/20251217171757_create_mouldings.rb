class CreateMouldings < ActiveRecord::Migration[8.0]
  def change
    create_table :mouldings do |t|
      t.string :species, null: false
      t.string :material_grade, null: false
      t.string :substrate_material
      t.decimal :length_per_piece_feet, precision: 6, scale: 2, null: false
      t.decimal :nominal_width_inches, precision: 6, scale: 2, null: false
      t.decimal :nominal_thickness_inches, precision: 6, scale: 2, null: false
      t.decimal :actual_width_inches, precision: 6, scale: 2, null: false
      t.decimal :actual_thickness_inches, precision: 6, scale: 2, null: false
      t.string :profile_type, null: false, comment: 'baseboard, crown_moulding, casing, chair_rail, etc.'
      t.string :profile_style, comment: 'historical, modern, colonial, shaker'
      t.string :standard_id
      t.string :surfacing, null: false, comment: 'S4S, S2S, rough_sawn'
      t.boolean :finish_sanded, default: false, null: false
      t.string :edge_treatment, default: 'square_cut', comment: 'square_cut, mitered_cut, eased_edge'

      t.timestamps
    end

    add_index :mouldings, :length_per_piece_feet
    add_index :mouldings, :nominal_width_inches
    add_index :mouldings, :nominal_thickness_inches
    add_index :mouldings, :actual_width_inches
    add_index :mouldings, :actual_thickness_inches
    add_index :mouldings, :profile_type
    add_index :mouldings, :profile_style
    add_index :mouldings, :surfacing
    add_index :mouldings, :edge_treatment
  end
end

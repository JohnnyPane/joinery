class CreateSheetGoods < ActiveRecord::Migration[8.0]
  def change
    create_table :sheet_goods do |t|
      t.integer :material_type, null: false, default: 0
      t.string :face_species
      t.string :back_species
      t.string :grade_face
      t.string :grade_back
      t.integer :core_type, null: false, default: 0
      t.integer :cut_style
      t.integer :ply_count
      t.integer :glue_type
      t.string :thickness_nominal
      t.decimal :thickness_actual, precision: 5, scale: 3
      t.integer :width_in_feet
      t.integer :length_in_feet
      t.boolean :is_prefinished, default: false
      t.boolean :is_shop_grade, default: false
      t.string :matching

      t.timestamps
    end

    add_index :sheet_goods, :material_type
    add_index :sheet_goods, :core_type
    add_index :sheet_goods, :face_species
    add_index :sheet_goods, :back_species
    add_index :sheet_goods, :thickness_nominal
    add_index :sheet_goods, :width_in_feet
    add_index :sheet_goods, :length_in_feet
  end
end

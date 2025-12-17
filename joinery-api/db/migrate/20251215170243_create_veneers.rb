class CreateVeneers < ActiveRecord::Migration[8.0]
  def change
    create_table :veneers do |t|
      t.string :species, null: false
      t.string :veneer_type, null: false, default: 'raw_flitch'
      t.string :cut_style, null: false, default: 'plain_sliced'
      t.decimal :thickness_value, precision: 10, scale: 4, null: false
      t.string :thickness_unit, null: false
      t.decimal :length_in_inches, precision: 10, scale: 4
      t.decimal :width_in_inches, precision: 10, scale: 4
      t.decimal :total_square_feet, precision: 10, scale: 4
      t.string :match_type, default: 'book_match'
      t.integer :leaf_count
      t.boolean :sequenced, default: false
      t.string :flitch_identifier

      t.timestamps
    end

    add_index :veneers, :veneer_type
    add_index :veneers, :cut_style
    add_index :veneers, :thickness_unit
    add_index :veneers, :match_type
    add_index :veneers, :total_square_feet
    add_index :veneers, :leaf_count
  end
end

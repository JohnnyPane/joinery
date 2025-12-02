class AddSpeciesToProducts < ActiveRecord::Migration[8.0]
  def change
    add_column :products, :primary_material, :string
    add_column :products, :species_tags, :string, array: true, default: []
    add_column :products, :material_tags, :string, array: true, default: []

    add_index :products, :primary_material
    add_index :products, :species_tags, using: 'gin'
    add_index :products, :material_tags, using: 'gin'
  end
end

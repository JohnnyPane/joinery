class AddVolumetricPricingToProducts < ActiveRecord::Migration[8.0]
  def change
    rename_column :products, :price_in_cents, :price_per_unit_in_cents
    rename_column :products, :quantity, :available_volume

    change_column :products, :available_volume, :decimal, precision: 10, scale: 3, default: 0.0, null: false

    add_column :products, :pricing_unit, :string, null: false, default: 'EACH'
    add_column :products, :min_order_unit, :decimal, precision: 10, scale: 3, default: 1.0, null: false

    add_index :products, :pricing_unit
  end
end

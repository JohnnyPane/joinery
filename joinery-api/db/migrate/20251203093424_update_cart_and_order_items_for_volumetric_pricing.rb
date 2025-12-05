class UpdateCartAndOrderItemsForVolumetricPricing < ActiveRecord::Migration[8.0]
  def change
    tables = [:cart_items, :order_items]

    tables.each do |table_name|
      rename_column table_name, :quantity, :ordered_volume
      change_column table_name, :ordered_volume, :decimal, precision: 10, scale: 3, default: 0.0, null: false

      rename_column table_name, :unit_price_in_cents, :unit_price_per_volume_in_cents

      add_column table_name, :pricing_unit, :string, null: false, default: 'EACH'

      add_index table_name, :pricing_unit
    end
  end
end

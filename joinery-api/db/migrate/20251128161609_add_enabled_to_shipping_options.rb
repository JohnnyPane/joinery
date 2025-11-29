class AddEnabledToShippingOptions < ActiveRecord::Migration[8.0]
  def change
    add_column :shipping_options, :enabled, :boolean, default: true, null: false
  end
end

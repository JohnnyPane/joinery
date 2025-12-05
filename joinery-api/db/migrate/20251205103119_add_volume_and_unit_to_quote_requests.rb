class AddVolumeAndUnitToQuoteRequests < ActiveRecord::Migration[8.0]
  def change
    add_column :quote_requests, :requested_volume, :decimal, precision: 10, scale: 3, default: 0.0, null: false
    add_column :quote_requests, :pricing_unit, :string, null: false, default: 'EACH'

    add_index :quote_requests, :pricing_unit
  end
end

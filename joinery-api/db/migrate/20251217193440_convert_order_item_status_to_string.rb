class ConvertOrderItemStatusToString < ActiveRecord::Migration[8.0]
  def up
    change_column :order_items, :status, :string, using: 'status::text'
    change_column_default :order_items, :status, 'awaiting_shipping'
  end

  def down
    change_column :order_items, :status, :integer, using: 'status::integer'
  end
end

class AddStatusToOrderItems < ActiveRecord::Migration[8.0]
  def change
    add_column :order_items, :status, :integer, null: false, default: 0
  end
end

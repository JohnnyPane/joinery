class AddStripeTransferIdToOrderItems < ActiveRecord::Migration[8.0]
  def change
    add_column :order_items, :stripe_transfer_id, :string
  end
end

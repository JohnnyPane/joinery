class RenameStripePaymentIdToStripeChargeIdInOrders < ActiveRecord::Migration[8.0]
  def change
    rename_column :orders, :stripe_payment_id, :stripe_charge_id
  end
end

class AddStripeAccountIdToStores < ActiveRecord::Migration[8.0]
  def change
    add_column :stores, :stripe_account_id, :string
    add_column :stores, :charges_enabled, :boolean, default: false, null: false
    add_column :stores, :details_submitted, :boolean, default: false, null: false

    add_index :stores, :stripe_account_id, unique: true
  end
end

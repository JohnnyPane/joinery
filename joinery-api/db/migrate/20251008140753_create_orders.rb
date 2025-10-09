class CreateOrders < ActiveRecord::Migration[8.0]
  def change
    create_table :orders do |t|
      t.references :user, null: true, foreign_key: true
      t.integer :status, null: false, default: 0
      t.string :stripe_payment_id
      t.string :stripe_payment_intent_id
      t.string :tracking_number
      t.string :customer_email, null: false
      t.string :customer_phone_number
      t.string :customer_name
      t.integer :total_amount_in_cents, null: false, default: 0
      t.boolean :paid, null: false, default: false
      t.boolean :billing_same_as_shipping, null: false, default: true

      t.timestamps
    end

    add_index :orders, :status
    add_index :orders, :paid
    add_index :orders, :customer_email
  end
end

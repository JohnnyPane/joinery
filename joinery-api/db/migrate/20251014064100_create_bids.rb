class CreateBids < ActiveRecord::Migration[8.0]
  def change
    create_table :bids do |t|
      t.references :product, null: false, foreign_key: true
      t.references :buyer, null: false, foreign_key: { to_table: :users }
      t.references :seller, null: false, foreign_key: { to_table: :stores }
      t.integer :amount_in_cents, null: false
      t.integer :status, null: false, default: 0
      t.text :message
      t.datetime :accepted_at
      t.datetime :rejected_at

      t.timestamps
    end
  end
end

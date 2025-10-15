class CreateQuoteRequests < ActiveRecord::Migration[8.0]
  def change
    create_table :quote_requests do |t|
      t.references :product, null: false, foreign_key: true
      t.references :buyer, null: false, foreign_key: { to_table: :users }
      t.references :seller, null: false, foreign_key: { to_table: :stores }
      t.integer :status, null: false, default: 0

      t.timestamps
    end
  end
end

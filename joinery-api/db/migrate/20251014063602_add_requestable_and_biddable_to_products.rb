class AddRequestableAndBiddableToProducts < ActiveRecord::Migration[8.0]
  def change
    add_column :products, :requestable, :boolean, null: false, default: false
    add_column :products, :biddable, :boolean, null: false, default: false
    add_column :products, :min_bid_amount_in_cents, :integer

    add_index :products, :requestable
  end
end

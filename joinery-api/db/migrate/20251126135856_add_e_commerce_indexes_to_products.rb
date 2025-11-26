class AddECommerceIndexesToProducts < ActiveRecord::Migration[8.0]
  def change
    change_table :products do |t|
      t.index :price_in_cents
      t.index :quantity
      t.index :is_active
      t.index :average_rating
    end
  end
end

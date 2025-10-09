class AddShippingOptionToCartItems < ActiveRecord::Migration[8.0]
  def change
    add_reference :cart_items, :shipping_option, foreign_key: true
  end
end

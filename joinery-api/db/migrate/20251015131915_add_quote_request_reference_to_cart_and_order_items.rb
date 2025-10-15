class AddQuoteRequestReferenceToCartAndOrderItems < ActiveRecord::Migration[8.0]
  def change
    add_reference :cart_items, :quote_request, foreign_key: true, null: true
    add_reference :order_items, :quote_request, foreign_key: true, null: true
  end
end

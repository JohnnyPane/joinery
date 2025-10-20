class AddQuoteTypeAndParentToQuoteRequests < ActiveRecord::Migration[8.0]
  def change
    add_column :quote_requests, :quote_type, :integer, null: false, default: 0
    add_reference :quote_requests, :parent_quote_request, foreign_key: { to_table: :quote_requests }, null: true
  end
end

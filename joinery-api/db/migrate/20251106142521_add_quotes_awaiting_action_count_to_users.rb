class AddQuotesAwaitingActionCountToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :quotes_awaiting_action_count, :integer, default: 0, null: false
  end
end

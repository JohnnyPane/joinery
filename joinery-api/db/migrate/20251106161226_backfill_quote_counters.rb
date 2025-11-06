class BackfillQuoteCounters < ActiveRecord::Migration[8.0]
  def up
    say_with_time "Backfilling quote counter cache" do
      User.find_each do |user|
        store = user.default_store
        count = store.present? ? QuoteRequest.needing_response_from(user: user, store: store).count : 0
        user.update_columns(quotes_awaiting_action_count: count)
      end
    end
  end

  def down
  end
end

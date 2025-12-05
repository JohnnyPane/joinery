module QuoteCacheManagement
  extend ActiveSupport::Concern

  # TODO: should stores have their own quotes_awaiting_action_count cache column?
  def update_counter_cache(quote_request)
    buyer, store_owner = quote_request.buyer, quote_request.seller.owner

    buyer.update_column(:quotes_awaiting_action_count, QuoteRequest.needing_response_from(user: buyer).count)
    store_owner.update_column(:quotes_awaiting_action_count, QuoteRequest.needing_response_from(user: store_owner, store: @quote_request.seller).count)
  end
end
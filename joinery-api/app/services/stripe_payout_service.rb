class StripePayoutService
  attr_reader :order

  def initialize(order)
    @order = order
  end

  def create_transfers
    charge_id = order.stripe_charge_id

    order.order_items.includes(:store).group_by(&:store_id).each do |store_id, items|
      store = Store.find(store_id)
      next unless store.stripe_account_id

      store_amount_before_fees = items.sum(&:total_price_in_cents)
      amount_owed_to_store = FeeCalculator.vendor_net_share(order.total_amount_in_cents, store_amount_before_fees)

      transfer = Stripe::Transfer.create({
        amount: amount_owed_to_store,
        currency: 'usd',
        destination: store.stripe_account_id,
        source_transaction: charge_id,
        metadata: {
          order_id: order.id,
          store_id: store.id,
          item_count: items.size
        }
      })

      OrderItem.where(id: items.map(&:id)).update_all(stripe_transfer_id: transfer.id)
    end
  end
end
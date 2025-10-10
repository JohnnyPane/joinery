class OrderItemsController < JoineryController

  protected

  def included_index_resources
    [ :product, :shipping_option, :order, :store, order: :shipping_address ]
  end

  private

  def order_item_params
    params.require(:order_item).permit(
      :order_id, :product_id, :quantity, :unit_price_in_cents, :total_price_in_cents, :store_id, :shipping_option_id, :status
    )
  end
end

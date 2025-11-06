class OrderItemsController < JoineryController

  protected

  def included_show_resources
    [ :product, :shipping_option, :order, :store, order: :shipping_address ]
  end

  def included_index_resources
    # [ shipping_option: {}, product: { shipping_options: {}, images_attachments: { blob: :variant_records } }, order: { shipping_address: {} }, store: {}, quote_request: { quotes: {} } ]

    [
      :store,
      :shipping_option,
      product: [ :shipping_options, { images_attachments: { blob: :variant_records } } ],
      quote_request: [ :quotes ],
      order: [ :shipping_address ]
    ]
  end

  private

  def order_item_params
    params.require(:order_item).permit(
      :order_id, :product_id, :quantity, :unit_price_in_cents, :total_price_in_cents, :store_id, :shipping_option_id, :status
    )
  end
end

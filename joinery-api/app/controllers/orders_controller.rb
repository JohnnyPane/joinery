class OrdersController < JoineryController
  skip_before_action :authenticate_user!, only: [:show, :create]

  def create
    order = CreateOrderService.new(
      order_params: order_params,
      user: current_user,
      shipping_address_params: order_params[:shipping_address_attributes],
      billing_address_params: order_params[:billing_address_attributes],
      payment_method: params[:order][:payment_method]
    ).call

    render_resource(order, OrderSerializer)
  end

  protected

  def included_show_resources
    [ :order_items, :shipping_address, :billing_address, :user, { order_items: [ :product, :store ] } ]
  end

  private

  def order_params
    params.require(:order).permit(
      :status,
      :cart_id,
      :customer_name,
      :customer_email,
      :customer_phone_number,
      :billing_same_as_shipping,
      shipping_address_attributes: address_attributes,
      billing_address_attributes: address_attributes
    )
  end

  def address_attributes
    [
      :address_1,
      :address_2,
      :city,
      :state,
      :zip,
      :country
    ]
  end
end

class ShippingOptionsController < JoineryController
  before_action :authenticate_user!, except: [:index, :show]

  private

  def resource_params
    params.require(:shipping_option).permit(:name, :price_in_cents, :shipping_type, :product_id)
  end
end
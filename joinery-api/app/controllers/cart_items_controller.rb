class CartItemsController < JoineryController
  skip_before_action :authenticate_user!, only: %i[create update destroy update_many]
  before_action :set_cart, only: %i[create update destroy]
  load_and_authorize_resource :cart_item, through: :cart, shallow: true

  def create
    product = Product.find(cart_item_params[:product_id])
    store = product.store

    cart_item = @cart.cart_items.find_or_initialize_by(product_id: product.id)

    cart_item.increment!(:ordered_volume, cart_item_params[:ordered_volume] || 1)
    cart_item.unit_price_per_volume_in_cents = product.price_per_unit_in_cents
    cart_item.pricing_unit = product.pricing_unit
    cart_item.shipping_option_id = cart_item_params[:shipping_option_id] if cart_item_params[:shipping_option_id]
    cart_item.store_id = store.id

    if cart_item.save
      render json: cart_item, status: :created
    else
      render json: { errors: cart_item.errors.full_messages }, status: :unprocessable_content
    end
  end

  def update_many
    updated_items = []

    ActiveRecord::Base.transaction do
      bulk_update_params[:updates].each do |item_params|
        cart_item = CartItem.find(item_params[:id])
        if cart_item
          cart_item.update!(shipping_option_id: item_params[:shipping_option_id]) if item_params[:shipping_option_id]
          updated_items << cart_item
        end
      end
    end

    render json: updated_items, status: :ok

  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_content
  end

  protected

  def included_index_resources
    [ :product, :shipping_option ]
  end

  private

  def set_cart
    @cart = Cart.find_by(id: params[:cart_id])
    render json: { error: "Cart not found" }, status: :not_found unless @cart
  end

  def cart_item_params
    params.require(:cart_item).permit(:product_id, :ordered_volume, :shipping_option_id)
  end

  def bulk_update_params
    params.permit(updates: [ :id, :shipping_option_id ])
  end
end

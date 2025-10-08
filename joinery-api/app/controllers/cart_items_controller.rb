class CartItemsController < JoineryController
  skip_before_action :authenticate_user!, only: %i[create update destroy]
  before_action :set_cart

  def create
    product = Product.find(params[:product_id])
    store = product.store

    cart_item = @cart.cart_items.find_or_initialize_by(product_id: product.id)

    cart_item.quantity += params[:quantity] || 1
    cart_item.unit_price_in_cents = product.price_in_cents
    cart_item.store_id = store.id

    if cart_item.save
      render json: cart_item, status: :created
    else
      render json: { errors: cart_item.errors.full_messages }, status: :unprocessable_content
    end
  end

  private

  def set_cart
    @cart = Cart.find_by(id: params[:cart_id])
    render json: { error: "Cart not found" }, status: :not_found unless @cart
  end
end

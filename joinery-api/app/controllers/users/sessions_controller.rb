class Users::SessionsController < Devise::SessionsController
  before_action :authenticate_user!, only: [ :destroy ]
  after_action :merge_guest_cart, only: [ :create ]

  include Renderable

  respond_to :json

  def me
    if current_user
      user = User.includes(
        stores: [ :order_items, :store_users ],
        quote_requests: :quotes,
        carts: []
      ).find(current_user.id)

      render_resource(user, UserSerializer, { params: { current_store: current_store } })
    else
      throw(:warden, scope: :user)
    end
  end

  private

  def current_store
    return @current_store if defined?(@current_store)

    if params[:store_id] && current_user.has_access_to_store?(params[:store_id])
      @current_store = Store.find_by(id: params[:store_id])
    elsif current_user.stores.exists?
      @current_store = current_user.default_store
    else
      @current_store = nil
    end
  end

  def merge_guest_cart
    return unless params[:guest_cart_id] && current_user

    guest_cart = Cart.find_by(id: params[:guest_cart_id], guest: true)
    return unless guest_cart

    user_cart = Cart.find_or_create_by(user: current_user, guest: false)

    guest_cart.cart_items.each do |item|
      existing_item = user_cart.cart_items.find_by(product_id: item.product_id)
      if existing_item
        existing_item.update(ordered_volume: existing_item.ordered_volume + item.ordered_volume)
      else
        item.update(cart: user_cart)
      end
    end

    guest_cart.destroy
  end

  def respond_with(resource, _opts = {})
    render json: {
      status: { code: 200, message: 'Logged in successfully.' },
      data: UserSerializer.new(resource).serializable_hash[:data][:attributes]
    }, status: :ok
  end

  def respond_to_on_destroy
    if current_user
      render json: {
        status: 200,
        message: "logged out successfully"
      }, status: :ok
    else
      render json: {
        status: 401,
        message: "Couldn't find an active session."
      }, status: :unauthorized
    end
  end

  def invalid_login_attempt
    render json: {
      status: { code: 401, message: 'Invalid login attempt. Please check your email and password.' }
    }, status: :unauthorized
  end
end

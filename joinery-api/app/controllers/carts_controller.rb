class CartsController < JoineryController
  load_and_authorize_resource
  before_action :set_cart, only: %i[show update destroy]
  before_action :authenticate_user!, except: %i[create show]

  def create
    @cart = if current_user
              Cart.find_or_create_by(user: current_user, guest: false)
            else
              Cart.create!(guest: true, guest_token: SecureRandom.uuid)
            end

    render_resource(@cart, CartSerializer, status: :created)
  end

  def user_cart
    if current_user
      @cart = Cart.find_or_create_by(user: current_user, guest: false)
      render_resource(@cart, CartSerializer)
    else
      render json: { error: 'User not authenticated' }, status: :unauthorized
    end
  end

  protected

  def included_show_resources
    [ cart_items: { shipping_option: {}, product: { shipping_options: {}, images_attachments: { blob: :variant_records } } } ]
  end

  def included_index_resources
    [ cart_items: { shipping_option: {}, product: { shipping_options: {}, images_attachments: { blob: :variant_records } } } ]
  end

  private

  def set_cart
    @cart = if current_user
              Cart.find_or_create_by(user: current_user, guest: false)
            else
              Cart.find(params[:id])
            end
  end
end

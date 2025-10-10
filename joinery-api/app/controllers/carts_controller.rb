class CartsController < JoineryController
  before_action :set_cart, only: %i[show update destroy]
  skip_before_action :authenticate_user!, only: %i[create show]

  def create
    @cart = if current_user
              Cart.find_or_create_by(user: current_user, guest: false)
            else
              Cart.create!(guest: true)
            end

    render_resource(@cart, CartSerializer, status: :created)
  end

  protected

  def included_index_resources
    [ :cart_items ]
  end

  private

  def set_cart
    @cart = if current_user
              Cart.find_or_create_by(user: current_user)
            else
              Cart.find(params[:id])
            end
  end
end

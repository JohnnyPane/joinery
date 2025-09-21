class Users::SessionsController < Devise::SessionsController
  before_action :authenticate_user!, only: [:destroy]

  include Renderable

  respond_to :json

  def me
    if current_user
      render_resource(current_user, UserSerializer, { current_store: current_store })
    else
      throw(:warden, scope: :user)
    end
  end

  private

  def current_store
    @current_store ||= if params[:store_id]
      Store.find_by(id: params[:store_id]) if current_user.has_access_to_store?(params[:store_id])
    elsif current_user.stores.any?
      current_user.default_store
    end
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

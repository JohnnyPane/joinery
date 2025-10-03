class Users::RegistrationsController < Devise::RegistrationsController
  before_action :authenticate_user!, only: [:destroy]

  include Renderable

  respond_to :json

  private

  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation, :first_name, :last_name)
  end

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: {
        status: { code: 200, message: 'Signed up successfully.' },
        data: UserSerializer.new(resource).serializable_hash[:data][:attributes]
      }, status: :ok
    else
      render json: {
        status: { code: 422, message: "User couldn't be created successfully. #{resource.errors.full_messages.to_sentence}" }
      }, status: :unprocessable_content
    end
  end

  def sign_up(resource_name, resource)
    sign_in(resource_name, resource, store: false)
  end
end

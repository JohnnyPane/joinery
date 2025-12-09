class Users::PasswordResetsController < JoineryController
  skip_before_action :authenticate_user!

  respond_to :json

  def create

    user = User.find_by(request_reset_params)

    if user
      user.send_reset_password_instructions

      render json: { message: 'Password reset instructions sent to your email.' }, status: :ok
    else
      render json: { error: 'If your email is in our system, you will receive a reset link.' }, status: :ok
    end
  end

  def update
    user = User.reset_password_by_token(password_reset_params)

    if user.errors.empty?
      render json: { message: 'Password has been reset successfully.', email: user.email }, status: :ok
    else
      render json: { error: user.errors.full_messages.to_sentence }, status: :unprocessable_content
    end
  end

  private

  def password_reset_params
    params.require(:password_reset).permit(:reset_password_token, :password, :password_confirmation)
  end

  def request_reset_params
    params.permit(:email)
  end
end
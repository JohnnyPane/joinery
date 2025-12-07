class ApplicationController < ActionController::API
  # before_action :skip_session
  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_current_context

  private

  def set_current_context
    Current.user = current_user
    Current.guest_token = request.headers['Guest-Token']
  end

  # def skip_session
  #   request.session_options[:skip] = true
  # end
end

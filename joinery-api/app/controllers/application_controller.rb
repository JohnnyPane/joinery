class ApplicationController < ActionController::API
  before_action :skip_session
  before_action :authenticate_user!, except: [:index, :show]

  private

  def skip_session
    request.session_options[:skip] = true
  end
end

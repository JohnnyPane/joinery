class ApplicationController < ActionController::API
  before_action :skip_session

  private

  def skip_session
    request.session_options[:skip] = true
  end
end

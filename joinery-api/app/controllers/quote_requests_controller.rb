class QuoteRequestsController < JoineryController
  before_action :authenticate_user!

  def create
    authorize! :create, QuoteRequest
    quote_request = CreateQuoteRequestService.perform(current_user: current_user, quote_request_params: quote_request_params)
    render_resource(quote_request, QuoteRequestSerializer)
  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_content
  rescue CreateQuoteRequestService::UnauthorizedError => e
    render json: { errors: e.message }, status: :forbidden
  end

  def update
    authorize! :update, QuoteRequest
    quote_request = QuoteActionService.perform(
      current_user: current_user,
      quote_request_params: quote_request_params.merge(id: params[:id])
    )

    render_resource(quote_request, QuoteRequestSerializer)
  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_content
  rescue QuoteActionService::UnauthorizedError => e
    render json: { errors: e.message }, status: :forbidden
  end

  protected

  def included_show_resources
    { product: { shipping_options: {}, images_attachments: { blob: :variant_records } }, quotes: {}, buyer: {}, seller: {} }
  end

  def included_index_resources
    [ product: { shipping_options: {}, images_attachments: { blob: :variant_records } }, quotes: {}, buyer: {}, seller: {} ]
  end

  # def included_preload_resources
  #   [ :latest_quote ]
  # end

  private

  def quote_request_params
    params.require(:quote_request).permit(
      :product_id, :status, :quote_type, :requested_volume,
      quotes_attributes: [ :id, :amount_in_cents, :message, :action ]
    )
  end
end

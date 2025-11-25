class QuoteRequestsController < JoineryController
  before_action :authenticate_user!

  def create
    quote_attributes = quote_request_params[:quote_attributes]

    quote_request = QuoteActionService.perform(
      action: "request",
      current_user: current_user,
      product_id: quote_request_params[:product_id],
      quote_type: quote_request_params[:quote_type],
      message: quote_attributes[:message],
    )

    render_resource(quote_request, QuoteRequestSerializer)
  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_content
  rescue QuoteActionService::UnauthorizedError => e
    render json: { errors: e.message }, status: :forbidden
  end

  def update
    quote_request = QuoteRequest.find(params[:id])
    quote_attributes = quote_request_params[:quote_attributes] || {}

    quote_request = QuoteActionService.perform(
      quote_request: quote_request,
      action: quote_attributes[:action],
      current_user: current_user,
      message: quote_attributes[:message],
      amount_in_cents: quote_attributes[:amount_in_cents],
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
      :product_id, :status, :quote_type,
      quote_attributes: [ :id, :amount_in_cents, :message, :action ]
    )
  end
end

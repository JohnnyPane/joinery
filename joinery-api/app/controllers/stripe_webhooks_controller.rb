class StripeWebhooksController < ApplicationController
  skip_before_action :authenticate_user!

  def create
    payload = request.body.read
    endpoint_secret = ENV["STRIPE_WEBHOOK_SECRET"]
    sig_header = request.env["HTTP_STRIPE_SIGNATURE"]

    begin
      event = Stripe::Webhook.construct_event(
        payload, sig_header, endpoint_secret
      )
    rescue JSON::ParserError => e
      render json: { message: "Invalid payload" }, status: 400 and return
    rescue Stripe::SignatureVerificationError => e
      render json: { message: "Invalid signature" }, status: 400 and return
    end

    case event.type
    when "account.updated"
      account = event.data.object
      store = Store.find_by(stripe_account_id: account.id)
      if store.nil?
        Rails.logger.info("Store not found for Stripe account ID: #{account.id}")
        render json: { status: :ok } and return
      end

      stripe_store_attributes = { charges_enabled: account.charges_enabled, details_submitted: account.details_submitted }

      store.update_if_changed(stripe_store_attributes)

      store.update!(
        charges_enabled: account.charges_enabled,
        details_submitted: account.details_submitted
      )

      Rails.logger.info("Updated Store ID #{store.id} with Stripe account ID #{account.id}")
    else
      Rails.logger.info("Unhandled event type: #{event.type}")
    end

    render json: { status: :ok }
  end
end
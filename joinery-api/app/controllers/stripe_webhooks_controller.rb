class StripeWebhooksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    payload = request.body.read
    event = Stripe::Event.construct_from(JSON.parse(payload))

    case event.type
    when "account.updated"
      account = event.data.object
      store = Store.find_by(stripe_account_id: account.id)
      store.update!(
        charges_enabled: account.charges_enabled,
        details_submitted: account.details_submitted
      )
    else
      Rails.logger.info("Unhandled event type: #{event.type}")
    end

    render json: { status: :ok }
  end
end
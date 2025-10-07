class StripeController < ApplicationController
  before_action :authenticate_user!

  def create_account_link
    store = current_user.default_store

    return render json: { error: "User does not have a store" }, status: :unprocessable_content unless store
    return render json: { error: "Store already has a Stripe account" }, status: :unprocessable_content if store.stripe_account_id.present?

    account = Stripe::Account.create({
      type: "express",
      country: "US",
      email: current_user.email,
      business_type: "individual"
    })

    store.update!(stripe_account_id: account.id)

    link = Stripe::AccountLink.create({
      account: account.id,
      refresh_url: "#{ENV['FRONTEND_URL']}/onboarding/failed",
      return_url: "#{ENV['FRONTEND_URL']}/stores/#{store.id}",
      type: "account_onboarding"
    })

    render json: { url: link.url }
  rescue Stripe::StripeError => e
    render json: { error: e.message }, status: :unprocessable_content
  end
end

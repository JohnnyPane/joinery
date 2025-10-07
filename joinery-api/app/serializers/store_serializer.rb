class StoreSerializer < BaseSerializer
  attributes :id, :name, :location, :description, :stripe_account_id, :charges_enabled
end

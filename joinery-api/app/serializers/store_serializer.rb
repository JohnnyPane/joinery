class StoreSerializer < BaseSerializer
  attributes :id, :name, :location, :description, :stripe_account_id, :charges_enabled

  def self.shallow_attributes_list
    [ :id, :name, :location ]
  end
end

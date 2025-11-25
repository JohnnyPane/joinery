class StoreSerializer < BaseSerializer
  attributes :id, :name, :location, :description, :stripe_account_id, :charges_enabled, :overall_average_rating,
             :combined_reviews_count

  attribute :logo_url do |store|
    store.image_urls(size_key: :small).first
  end

  attribute :address do |store|
    AddressSerializer.shallow_serialize(store.address) if store.address
  end

  def self.shallow_attributes_list
    [ :id, :name, :location ]
  end
end

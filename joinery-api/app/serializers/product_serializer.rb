class ProductSerializer < BaseSerializer
  attributes :id, :name, :description, :price_per_unit_in_cents, :available_volume, :pricing_unit, :min_order_unit,
             :productable_type, :requestable, :biddable, :reviews_count, :average_rating, :created_at, :updated_at

  attribute :productable do |product|
    productable_serializer = "#{product.productable_type}Serializer".constantize
    productable_serializer&.shallow_serialize(product.productable) || {}
  rescue NameError
    raise "Serializer for #{product.productable_type} not found"
  end

  attribute :shipping_options do |product|
    ShippingOptionSerializer.shallow_serialize_collection(product.shipping_options)
  end

  attribute :images do |product, params|
    product.image_urls(size_key: params[:image_size])
  end

  attribute :store do |product|
    StoreSerializer.shallow_serialize(product.store)
  end

  attribute :recent_reviews, if: proc { |_, params| show_page?(params) } do |product|
    ReviewSerializer.shallow_serialize_collection(product.recent_reviews)
  end

  def self.shallow_attributes_list
    [ :id, :name, :price_per_unit_in_cents, :available_volume, :pricing_unit, :min_order_unit, :productable_type, :reviews_count, :average_rating ]
  end

  def self.shallow_associations(product)
    {
      images: product.image_urls(size_key: :thumbnail),
      shipping_options: ShippingOptionSerializer.shallow_serialize_collection(product.shipping_options)
    }
  end
end

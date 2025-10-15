class ProductSerializer < BaseSerializer
  attributes :id, :name, :description, :price_in_cents, :quantity, :productable_type, :requestable, :biddable,
             :created_at, :updated_at

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
    product.image_urls(params[:image_type], only_path: true)
  end

  def self.shallow_attributes_list
    [ :id, :name, :price_in_cents, :quantity, :productable_type ]
  end

  def self.shallow_associations(product)
    {
      images: product.image_urls(:thumb, only_path: true),
      shipping_options: ShippingOptionSerializer.shallow_serialize_collection(product.shipping_options)
    }
  end
end

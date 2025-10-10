class ProductSerializer < BaseSerializer
  attributes :id, :name, :description, :price_in_cents, :quantity, :productable_type, :created_at, :updated_at

  attribute :productable_attributes do |product|
    case product.productable_type
    when "Slab"
      SlabSerializer.shallow_serialize(product.productable)
    else
      {}
    end
  end

  attribute :shipping_options do |product|
    ShippingOptionSerializer.shallow_serialize_collection(product.shipping_options)
  end

  attribute :images do |product, params|
    product.image_urls(params[:image_type], only_path: true)
  end

  def self.shallow_attributes_list
    [ :id, :name, :price_in_cents, :quantity ]
  end
end

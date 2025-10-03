class ProductSerializer < BaseSerializer
  attributes :id, :name, :description, :price_in_cents, :quantity, :productable_type, :created_at, :updated_at

  attribute :productable_attributes do |product, params|
    case product.productable_type
    when "Slab"
      SlabSerializer.serialize_object(product.productable, params: params)
    else
      {}
    end
  end

  attribute :shipping_options do |product, params|
    product.shipping_options.map do |option|
      ShippingOptionSerializer.serialize_object(option, params: params)
    end
  end

  attribute :images do |product, params|
    product.image_urls(params[:image_type], only_path: true)
  end
end

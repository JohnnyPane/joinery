class ProductSerializer < BaseSerializer
  attributes :id, :name, :description, :price_in_cents, :quantity, :created_at, :updated_at

  attribute :productable_attributes do |product, params|
    case product.productable_type
    when "Slab"
      SlabSerializer.serialize_object(product.productable, params: params)
    else
      {}
    end
  end
end
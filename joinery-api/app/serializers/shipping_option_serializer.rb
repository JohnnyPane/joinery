class ShippingOptionSerializer < BaseSerializer
  attributes :id, :name, :price_in_cents, :shipping_type
end
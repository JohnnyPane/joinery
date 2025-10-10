class ShippingOptionSerializer < BaseSerializer
  attributes :id, :name, :price_in_cents, :shipping_type

  def self.shallow_attributes_list
    [ :id, :name, :price_in_cents, :shipping_type ]
  end
end
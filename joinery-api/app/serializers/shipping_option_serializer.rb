class ShippingOptionSerializer < BaseSerializer
  attributes :id, :name, :price_in_cents, :shipping_type, :enabled

  def self.shallow_attributes_list
    [ :id, :name, :price_in_cents, :shipping_type, :enabled ]
  end
end
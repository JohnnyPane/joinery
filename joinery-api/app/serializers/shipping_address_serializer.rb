class ShippingAddressSerializer < BaseSerializer
  attribute :full_address do |shipping_address|
    shipping_address.full_address
  end

  def self.shallow_attributes_list
    [ :id, :user_id, :address_line1, :address_line2, :city, :state, :postal_code, :country ]
  end
end

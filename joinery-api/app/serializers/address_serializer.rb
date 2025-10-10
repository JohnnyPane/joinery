class AddressSerializer < BaseSerializer
  attributes :id, :address_1, :address_2, :city, :state, :zip, :country, :created_at, :updated_at

  def self.shallow_attributes_list
    [ :id, :address_1, :city, :state, :zip, :country ]
  end
end

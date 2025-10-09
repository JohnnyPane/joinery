class AddressSerializer < BaseSerializer
  attributes :id, :street, :city, :state, :zip, :country, :created_at, :updated_at
end

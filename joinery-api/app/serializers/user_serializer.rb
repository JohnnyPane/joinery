class UserSerializer < BaseSerializer
  attributes :id, :email, :name, :created_at, :admin

  attribute :current_store do |user|
    user.default_store ? StoreSerializer.shallow_serialize(user.default_store) : nil
  end

  attribute :quotes_awaiting_action_count do |user|
    QuoteRequest.needing_response_from(user: user, store: user.default_store).count
  end

  attribute :created_date do |user|
    user.created_at && user.created_at.strftime('%m/%d/%Y')
  end

  def self.shallow_attributes_list
    [ :id, :email, :first_name, :last_name ]
  end
end

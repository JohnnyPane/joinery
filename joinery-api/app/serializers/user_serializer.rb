class UserSerializer < BaseSerializer
  attributes :id, :email, :name, :created_at, :admin

  attribute :current_store do |user, params|
    if params[:store].present?
      StoreSerializer.serialize_object(params[:store])
    else
      user.stores.first
    end
  end

  attribute :created_date do |user|
    user.created_at && user.created_at.strftime('%m/%d/%Y')
  end
end

class UserSerializer < BaseSerializer
  attributes :id, :email, :name, :created_at, :admin, :quotes_awaiting_action_count

  attribute :current_store do |_user, params|
    params[:current_store] ? StoreSerializer.shallow_serialize(params[:current_store]) : nil
  end

  attribute :has_orders_awaiting_action do |_user, params|
    params[:current_store] ? params[:current_store].has_order_items_awaiting_action? : false
  end

  attribute :cart_id do |user|
    cart = user.carts.select { |c| c.guest == false }.first
    cart ? cart.id : nil
  end

  def self.shallow_attributes_list
    [ :id, :email, :first_name, :last_name, :name ]
  end

  def self.shallow_associations(user)
    {
      name: user.name
    }
  end
end

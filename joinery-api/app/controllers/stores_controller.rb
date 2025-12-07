class StoresController < JoineryController
  load_and_authorize_resource
  before_action :authenticate_user!, except: [ :index, :show ]

  protected

  def included_show_resources
    [ :owner, :store_users, :products, :quote_requests, :order_items ]
  end

  def included_index_resources
    [ :quote_requests, :products, :store_users, :order_items ]
  end

  private

  def after_resource_created(store)
    StoreUser.create!(user: store.owner, store: store, role: "owner")
  end

  def store_params
    params.require(:store).permit(
      :name,
      :description,
      :location,
      :owner_id,
      address_attributes: [
        :id,
        :address_1,
        :address_2,
        :city,
        :state,
        :zip,
        :country
      ]
    )
  end
end
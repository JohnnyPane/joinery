class StoresController < JoineryController
  private

  def after_resource_created(store)
    StoreUser.create!(user: store.owner, store: store, role: "owner")
  end

  def store_params
    params.require(:store).permit(:name, :description, :location, :owner_id)
  end
end
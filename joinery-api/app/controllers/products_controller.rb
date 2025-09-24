class ProductsController < JoineryController
  before_action :authenticate_user!, except: [:index, :show]

  def create
    product = CreateProductService.call(product_params)
    if product.persisted?
      render_resource(product, resource_serializer, status: :created)
    else
      render_errors(product.errors, status: :unprocessable_entity)
    end
  end

  private

  def product_params
    params.require(:product).permit(
      :name, :description, :price_in_cents, :quantity, :productable_type, :store_id,
      productable_attributes: [ :species, :height, :length, :width, :weight, :dried, :slab_type ],
    )
  end
end
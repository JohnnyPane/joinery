class ProductsController < JoineryController
  before_action :authenticate_user!, except: [:index, :show]

  def create
    product = CreateProductService.create(product_params)
    if product.persisted?
      render_resource(product, resource_serializer, status: :created)
    else
      render_errors(product.errors, status: :unprocessable_entity)
    end
  end

  def update
    product = CreateProductService.update(product_params.merge(id: params[:id]))
    if product.errors.empty?
      render_resource(product, resource_serializer)
    else
      render_errors(product.errors, status: :unprocessable_entity)
    end
  end

  protected

  def included_index_resources
    [:productable, :shipping_options, images_attachments: :blob]
  end

  def included_show_resources
    [:productable, :shipping_options, images_attachments: :blob]
  end

  private

  def product_params
    params.require(:product).permit(
      :name, :description, :price_in_cents, :quantity, :productable_type, :store_id,
      productable_attributes: [ :species, :height, :length, :width, :weight, :dried, :slab_type ],
    )
  end
end
class ProductsController < JoineryController
  before_action :authenticate_user!, except: [:index, :show]

  def create
    product = CreateProductService.create(product_params)
    if product.persisted?
      render_resource(product, resource_serializer, status: :created)
    else
      render_errors(product.errors, status: :unprocessable_content)
    end
  end

  def update
    product = CreateProductService.update(product_params.merge(id: params[:id]))
    if product.errors.empty?
      render_resource(product, resource_serializer)
    else
      render_errors(product.errors, status: :unprocessable_content)
    end
  end

  protected

  def included_show_resources
    [ :store, :shipping_options, images_attachments: { blob: :variant_records }, recent_reviews: :user ]
  end

  def included_index_resources
    [ :store, :shipping_options, images_attachments: { blob: :variant_records } ]
  end

  def preloaded_index_resources
    [ :productable ]
  end

  private

  def product_params
    params.require(:product).permit(
      :name, :description, :price_in_cents, :quantity, :productable_type, :requestable, :biddable, :store_id,
      productable_attributes: permitted_productable_attributes
    )
  end

  def permitted_productable_attributes
    productable_type = params.dig(:product, :productable_type)
    productable_class = productable_type.safe_constantize

    if productable_class.respond_to?(:productable_permitted_attributes)
      productable_class.productable_permitted_attributes
    else
      []
    end
  end
end
class ProductsController < JoineryController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_product, only: [:update]

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
    [ productable: :figure_types ]
  end

  private

  def product_params
    params.require(:product).permit(
      :name, :description, :price_in_cents, :quantity, :productable_type, :requestable, :biddable, :store_id,
      productable_attributes: permitted_productable_attributes,
      shipping_options_attributes: [ :id, :name, :price_in_cents, :enabled, :shipping_type ]
    )
  end

  def permitted_productable_attributes
    type = determine_productable_type

    unless Product::PRODUCTABLE_TYPES.include?(type)
      raise ActionController::ParameterMissing, "Invalid or missing productable type: #{type}"
    end

    Product.permitted_attributes_for(type)
  end

  def determine_productable_type
    type = params.dig(:product, :productable_type)
    type ||= @product.productable_type if @product.present?
    type
  end

  def set_product
    @product = Product.find(params[:id])
  end
end
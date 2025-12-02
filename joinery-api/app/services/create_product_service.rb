class CreateProductService
  attr_reader :params, :product_params, :productable_params, :productable_type

  def initialize(params)
    @params = params
    @product_params = params.except(:productable_attributes)
    @productable_params = params[:productable_attributes] || {}
    @productable_type = @params[:productable_type]
  end

  def self.create(params)
    new(params).create
  end

  def self.update(params)
    new(params).update
  end

  def create
    ActiveRecord::Base.transaction do
      productable = create_productable
      product = Product.create!(product_params.merge(productable: productable))
      ProductableSynchronizer.new(productable).sync!
      product
    end
  end

  def update
    ActiveRecord::Base.transaction do
      product = Product.find(product_params[:id])
      productable = product.productable
      productable.update!(productable.class.base_attributes(productable_params)) if productable
      update_productable_associations(productable) if productable && productable.class.respond_to?(:association_attributes)
      product.update!(product_params.except(:id))
      ProductableSynchronizer.new(productable).sync!
      product
    end
  end

  private

  def create_productable
    unless Product::PRODUCTABLE_TYPES.include?(@productable_type)
      raise "Unknown productable type: #{@productable_type}. Stopping creation."
    end

    productable_class = @productable_type.constantize
    productable = productable_class.create!(productable_class.base_attributes(@productable_params))
    create_productable_associations(productable) if productable_class.respond_to?(:association_attributes)

    productable
  end

  # MAJOR TODO: This is a temporary implementation. We need a more generic way to handle associations.
  def create_productable_associations(productable)
    association_params = productable.class.association_params(@productable_params)

    if (figure_names = association_params[:figure_types]).present?
      figures = FigureType.where(name: figure_names)
      productable.figure_types = figures
    end
  end

  def update_productable_associations(productable)
    association_params = productable.class.association_params(@productable_params)

    if (figure_names = association_params[:figure_types]).present?
      figures = FigureType.where(name: figure_names)
      productable.figure_types = figures
    end
  end
end

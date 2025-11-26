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
      product
    end
  end

  def update
    ActiveRecord::Base.transaction do
      product = Product.find(product_params[:id])
      productable = product.productable
      productable.update!(productable_params) if productable
      product.update!(product_params.except(:id))
      product
    end
  end

  private

  def create_productable
    unless Product.productable_types.include?(@productable_type)
      raise "Unknown productable type: #{@productable_type}. Stopping creation."
    end

    productable_class = @productable_type.constantize
    productable_class.create!(@productable_params)
  end
end

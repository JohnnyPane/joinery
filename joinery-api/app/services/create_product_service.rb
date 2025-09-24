class CreateProductService
  attr_reader :params, :product_params, :productable_params, :productable_type

  def initialize(params)
    @params = params
    @product_params = params.except(:productable_attributes)
    @productable_params = params[:productable_attributes] || {}
    @productable_type = @params[:productable_type]
  end

  def self.call(params)
    new(params).call
  end

  def call
    ActiveRecord::Base.transaction do
      productable = create_productable
      product = Product.create!(product_params.merge(productable: productable))
      product
    end
  end

  private

  def create_productable
    case productable_type
    when 'Slab'
      Slab.create!(productable_params)
    else
      raise "Unknown productable_type: #{productable_type}"
    end
  end
end

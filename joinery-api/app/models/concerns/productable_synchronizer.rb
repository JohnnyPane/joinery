class ProductableSynchronizer
  attr_reader :productable, :product

  def initialize(productable)
    @productable = productable
    @product = productable.product
  end

  def sync!
    return unless product.present?

    primary_material_name, species_tags = get_species_tags
    material_tags = get_material_tags

    product.update!(
      primary_material: primary_material_name,
      species_tags: species_tags,
      material_tags: material_tags,
    )
  end

  private

  def get_species_tags
    source_columns = productable.class.species_columns_to_sync

    primary_material_name = 'Composite'
    tags = []

    source_columns.each do |column|
      value = productable.send(column) if productable.respond_to?(column)

      if value.present?
        primary_material_name = value
        tags << value
        break
      end
    end

    [ primary_material_name, tags.compact.uniq ]
  end

  def get_material_tags
    source_columns = productable.class.material_columns_to_sync

    tags = []

    source_columns.each do |column|
      value = productable.send(column) if productable.respond_to?(column)

      if value.present?
        tags << value
      end
    end

    tags.compact.uniq
  end
end
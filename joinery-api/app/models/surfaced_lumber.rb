class SurfacedLumber < ApplicationRecord
  has_one :product, as: :productable, dependent: :destroy

  def self.productable_permitted_attributes
    [
      :species,
      :moisture_content_percent,
      :nominal_dimension,
      :thickness_in_inches,
      :width_in_inches,
      :length_in_feet,
      :profile,
      :treatment
    ]
  end
end

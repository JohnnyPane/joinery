class SurfacedLumber < ApplicationRecord
  include ProductableDataHandler
  include ProductableSyncHelpers

  has_one :product, as: :productable, dependent: :destroy

  sync_species_from :species
  sync_materials_from :species

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

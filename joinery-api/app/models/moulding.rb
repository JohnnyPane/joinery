class Moulding < ApplicationRecord
  include ProductableDataHandler
  include ProductableSyncHelpers

  has_one :product, as: :productable, dependent: :destroy

  sync_species_from :species
  sync_materials_from [ :material_grade, :substrate_material, :species ]

  def self.productable_permitted_attributes
    [
      :species, :material_grade, :substrate_material, :length_per_piece_feet,
      :nominal_width_inches, :nominal_thickness_inches, :actual_width_inches, :actual_thickness_inches,
      :profile_type, :profile_style, :standard_id, :surfacing, :finish_sanded, :edge_treatment
    ]
  end
end

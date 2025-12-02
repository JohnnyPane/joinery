class SheetGood < ApplicationRecord
  include ProductableDataHandler
  include ProductableSyncHelpers

  has_one :product, as: :productable, dependent: :destroy

  enum :material_type, { plywood: 0, mdf: 1, particle_board: 2, melamine: 3, osb: 4, hardboard: 5 }
  enum :core_type, { veneer_core: 0, mdf_core: 1, lumber_core: 2, combi_core: 3, particle_board_core: 4 }
  enum :cut_style, { rotary: 0, plain_sliced: 1, quarter_sliced: 2, rift_cut: 3 }
  enum :glue_type, { interior: 0, exterior: 1, marine: 2, naf: 3, uf: 4 }

  sync_species_from :face_species, :back_species
  sync_materials_from :material_type, :core_type

  def self.productable_permitted_attributes
    [
      :material_type, :face_species, :back_species, :grade_face, :grade_back, :core_type, :cut_style, :ply_count, :glue_type,
      :thickness_nominal, :thickness_actual, :width_in_feet, :length_in_feet, :is_prefinished, :is_shop_grade, :matching
    ]
  end
end

class MouldingSerializer < BaseSerializer
  attributes :id,  :species, :material_grade, :substrate_material, :length_per_piece_feet,
             :nominal_width_inches, :nominal_thickness_inches, :actual_width_inches, :actual_thickness_inches,
             :profile_type, :profile_style, :standard_id, :surfacing, :finish_sanded, :edge_treatment

  def self.shallow_attributes_list
    [
      :species, :material_grade, :substrate_material, :length_per_piece_feet,
      :nominal_width_inches, :nominal_thickness_inches, :actual_width_inches, :actual_thickness_inches,
      :profile_type, :profile_style, :standard_id, :surfacing, :finish_sanded, :edge_treatment
    ]
  end
end

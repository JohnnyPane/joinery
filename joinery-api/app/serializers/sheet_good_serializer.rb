class SheetGoodSerializer < BaseSerializer
  attributes :id, :material_type, :face_species, :back_species, :grade_face, :grade_back, :core_type, :cut_style,
             :ply_count, :glue_type, :thickness_nominal, :thickness_actual, :width_in_feet, :length_in_feet, :is_prefinished,
             :is_shop_grade, :matching

  def self.shallow_attributes_list
    [
      :material_type, :face_species, :back_species, :grade_face, :grade_back, :core_type, :cut_style, :ply_count, :glue_type,
      :thickness_nominal, :thickness_actual, :width_in_feet, :length_in_feet, :is_prefinished, :is_shop_grade, :matching
    ]
  end
end
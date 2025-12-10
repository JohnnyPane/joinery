class TimberSerializer < BaseSerializer
  attributes :species, :thickness_in_inches, :width_in_inches, :length_in_feet, :nominal_dimension, :grading_standard, :heart_content_type,
             :surface_finish_type, :moisture_condition, :preservative_treatment, :end_cut_style, :board_feet

  def self.shallow_attributes_list
    [
      :species, :thickness_in_inches, :width_in_inches, :length_in_feet, :nominal_dimension, :grading_standard, :heart_content_type,
      :surface_finish_type, :moisture_condition, :preservative_treatment, :end_cut_style, :board_feet,
    ]
  end
end
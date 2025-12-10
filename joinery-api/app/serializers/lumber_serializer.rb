class LumberSerializer < BaseSerializer
  attributes :species, :finish_type, :thickness_in_inches, :width_in_inches, :length_in_feet, :nominal_dimension, :moisture_content_percent,
             :board_feet, :grade, :profile, :treatment

  def self.shallow_attributes_list
    [ :species, :finish_type, :thickness_in_inches, :width_in_inches, :length_in_feet, :nominal_dimension, :moisture_content_percent,
      :board_feet, :grade, :profile, :treatment ]
  end
end
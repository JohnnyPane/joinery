class SurfacedLumberSerializer < BaseSerializer
  attributes :id, :species, :moisture_content_percent, :nominal_dimension, :thickness_in_inches, :width_in_inches, :length_in_feet, :profile, :treatment

  def self.shallow_attributes_list
    [ :id, :species, :moisture_content_percent, :nominal_dimension, :thickness_in_inches, :width_in_inches, :length_in_feet, :profile, :treatment ]
  end
end

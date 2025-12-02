class RoughLumberSerializer < BaseSerializer
  attributes :id, :species, :moisture_content_percent, :nominal_thickness_inches, :nominal_width_inches,
             :length_in_feet, :board_feet, :grade

  def self.shallow_attributes_list
    [ :id, :species, :moisture_content_percent, :nominal_thickness_inches, :nominal_width_inches, :length_in_feet, :board_feet, :grade ]
  end
end

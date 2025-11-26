class TurningBlankSerializer < BaseSerializer
  attributes :species, :thickness_in_inches, :width_in_inches, :length_in_inches, :cubic_inches, :shape, :figure_type, :wax_sealed, :moisture_content_percent

  def self.shallow_attributes_list
    [ :species, :thickness_in_inches, :width_in_inches, :length_in_inches, :cubic_inches, :shape, :figure_type, :wax_sealed, :moisture_content_percent ]
  end
end

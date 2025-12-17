class VeneerSerializer < BaseSerializer
  attributes :id, :species, :veneer_type, :cut_style, :thickness_value, :thickness_unit, :length_in_inches, :width_in_inches,
             :match_type, :leaf_count, :sequenced, :flitch_identifier, figure_types: []

  def self.shallow_attributes_list
    [
      :species, :veneer_type, :cut_style, :thickness_value, :thickness_unit, :length_in_inches, :width_in_inches,
      :match_type, :leaf_count, :sequenced, :flitch_identifier, figure_types: []
    ]
  end

  def self.shallow_associations(veneer)
    {
      figure_types: veneer.figure_types.map(&:name)
    }
  end
end

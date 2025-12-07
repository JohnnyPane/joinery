class WoodBlockSerializer < BaseSerializer
  attributes :species, :thickness_in_inches, :width_in_inches, :length_in_inches, :cubic_inches, :shape,
             :figure_type, :wax_sealed, :moisture_content_percent, :is_reclaimed, :is_carving_suitable

  def self.shallow_attributes_list
    [
      :species,
      :thickness_in_inches,
      :width_in_inches,
      :length_in_inches,
      :cubic_inches,
      :shape,
      :figure_type,
      :wax_sealed,
      :moisture_content_percent,
      :is_reclaimed,
      :is_carving_suitable,
      :grain_orientation,
      :ideal_application,
      :board_feet,
      :is_reclaimed,
      :is_carving_suitable,
    ]
  end

  def self.shallow_associations(wood_block)
    {
      figure_types: wood_block.figure_types.map(&:name),
    }
  end
end

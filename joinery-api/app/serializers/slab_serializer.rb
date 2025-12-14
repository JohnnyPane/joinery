class SlabSerializer < BaseSerializer
  attributes :id, :species, :length_in_inches, :width_at_narrowest_in_inches, :width_at_widest_in_inches,
             :thickness_in_inches, :kiln_dried, :moisture_content_percent, :drying_status, :weight_in_pounds, :slab_type,
             :calculated_board_feet

  def self.shallow_attributes_list
    [
      :id, :species, :length_in_inches, :width_at_narrowest_in_inches, :width_at_widest_in_inches, :thickness_in_inches,
      :kiln_dried, :moisture_content_percent, :drying_status, :weight_in_pounds, :slab_type, :calculated_board_feet
    ]
  end
end

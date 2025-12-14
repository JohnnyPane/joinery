class Slab < ApplicationRecord
  include ProductableDataHandler
  include ProductableSyncHelpers
  include Dimensional

  has_one :product, as: :productable, dependent: :destroy

  enum :slab_type, { live_edge: 0, bookmatched: 1, square_edge: 2, edge_glued: 3 }
  enum :drying_status, { green: 0, air_dried: 1, kiln_dried: 2 }

  validates :species, :length_in_inches, :width_at_narrowest_in_inches, :width_at_widest_in_inches, :thickness_in_inches, presence: true

  sync_species_from :species
  sync_materials_from :species

  before_validation :set_board_feet, if: -> { length_in_inches_changed? || width_at_narrowest_in_inches_changed? || width_at_widest_in_inches_changed? || thickness_in_inches_changed? }

  def self.productable_permitted_attributes
    [
      :species, :length_in_inches, :width_at_narrowest_in_inches, :width_at_widest_in_inches, :thickness_in_inches,
      :kiln_dried, :moisture_content_percent, :drying_status, :weight_in_pounds, :slab_type, :calculated_board_feet
    ]
  end

  private

  def set_board_feet
    self.calculated_board_feet = calculate_board_feet(
      length_in_inches: length_in_inches,
      width_in_inches: (width_at_narrowest_in_inches + width_at_widest_in_inches) / 2.0,
      thickness_in_inches: thickness_in_inches
    )
  end
end

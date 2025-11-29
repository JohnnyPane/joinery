class WoodBlock < ApplicationRecord
  include Dimensional
  include ProductableDataHandler

  has_many :wood_block_figures, dependent: :destroy
  has_many :figure_types, through: :wood_block_figures
  has_one :product, as: :productable, dependent: :destroy

  enum :shape, { square_block: 0, round_dowel: 1, bowl_blank: 2, other_irregular: 6 }
  enum :grain_orientation, { plain_sawn: 0, quarter_sawn: 1, rift_sawn: 2, end_grain: 3, radial_cut: 4, chaotic: 5 }

  before_validation :set_dimensions

  def self.productable_permitted_attributes
    [
      :species,
      :thickness_in_inches,
      :width_in_inches,
      :length_in_inches,
      :cubic_inches,
      :shape,
      :wax_sealed,
      :moisture_content_percent,
      :is_reclaimed,
      :is_carving_suitable,
      :grain_orientation,
      :ideal_application,
      :board_feet,
      figure_types: []
    ]
  end

  def self.association_attributes
    [:figure_types]
  end

  private

  def set_dimensions
    return unless length_in_inches && width_in_inches && thickness_in_inches

    self.cubic_inches = calculate_cubic_feet(length_in_inches: length_in_inches, width_in_inches: width_in_inches, thickness_in_inches: thickness_in_inches)
    self.board_feet = calculate_board_feet(length_in_inches: length_in_inches, width_in_inches: width_in_inches, thickness_in_inches: thickness_in_inches)
  end
end

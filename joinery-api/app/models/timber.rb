class Timber < ApplicationRecord
  include Dimensional
  include ProductableDataHandler
  include ProductableSyncHelpers

  has_one :product, as: :productable, dependent: :destroy

  enum :heart_content_type, { boxed_heart: 0, free_of_heart: 1, free_of_heart_center: 1 }
  enum :surface_finish_type, { rough_sawn: 0, sawn_smooth: 1, hand_hewn: 2, s4s: 3, resawn: 4 }
  enum :moisture_condition, { green: 0, air_dried: 1, kiln_dried: 2 }

  sync_species_from :species
  sync_materials_from :species

  before_validation :set_actual_dimensions, if: :nominal_dimension_changed?
  before_validation :set_board_feet, if: -> { length_in_feet_changed? || width_in_inches_changed? || thickness_in_inches_changed? }

  def self.productable_permitted_attributes
    [
      :species,
      :thickness_in_inches,
      :width_in_inches,
      :length_in_feet,
      :nominal_dimension,
      :grading_standard,
      :heart_content_type,
      :surface_finish_type,
      :moisture_condition,
      :preservative_treatment,
      :end_cut_style,
      :board_feet
    ]
  end

  private

  def set_actual_dimensions
    converter = NominalDimensionConverter.new(self.nominal_dimension)

    if converter.call
      self.thickness_in_inches = converter.thickness
      self.width_in_inches = converter.width
    else
      errors.add(:nominal_dimension, "could not be parsed into valid dimensions.")
    end
  end

  def set_board_feet
    self.board_feet = calculate_board_feet(
      length_in_inches: length_in_feet * 12,
      width_in_inches: width_in_inches,
      thickness_in_inches: thickness_in_inches
    )
  end
end

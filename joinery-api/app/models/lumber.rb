class Lumber < ApplicationRecord
  include ProductableDataHandler
  include ProductableSyncHelpers

  has_one :product, as: :productable, dependent: :destroy

  enum :finish_type, { rough: 0, s2s: 1, s3s: 2, s4s: 3, resawn: 4 }

  sync_species_from :species
  sync_materials_from :species

  validates :species, presence: true
  validates :finish_type, presence: true

  before_save :calculate_board_feet
  before_validation :set_actual_dimensions, if: :nominal_dimension_changed?

  def self.productable_permitted_attributes
    [
      :species,
      :finish_type,
      :thickness_in_inches,
      :width_in_inches,
      :length_in_feet,
      :nominal_dimension,
      :moisture_content_percent,
      :board_feet,
      :grade,
      :profile,
      :treatment,
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

  def calculate_board_feet
    if thickness_in_inches.present? && width_in_inches.present? && length_in_feet.present?
      self.board_feet = (thickness_in_inches * width_in_inches * length_in_feet) / 12.0
    end
  end
end
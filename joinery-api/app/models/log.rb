class Log < ApplicationRecord
  include ProductableDataHandler
  include ProductableSyncHelpers
  include Dimensional

  has_one :product, as: :productable, dependent: :destroy

  validates :species, :length_in_feet, :diameter_at_small_end_in_inches, presence: true

  sync_species_from :species
  sync_materials_from :species

  # TODO: Add Scribner rule eventually?
  enum :log_rule, { doyle: 0, international_1_quarter: 1 }
  enum :grade, { veneer: 0, grade_1: 1, grade_2: 2, grade_3: 3, culls: 4 }

  before_validation :set_estimated_board_feet, if: -> { length_in_feet_changed? || diameter_at_small_end_in_inches_changed? || log_rule_changed? }

  def self.productable_permitted_attributes
    [ :species, :length_in_feet, :diameter_at_small_end_in_inches, :diameter_at_large_end_in_inches, :weight_in_pounds,
      :estimated_board_feet, :moisture_content_percent, :grade, :origin, :log_rule ]
  end

  private

  def set_estimated_board_feet
    self.estimated_board_feet = calculate_estimated_board_feet(self)
  end
end

class RoughLumber < ApplicationRecord
  include ProductableDataHandler

  has_one :product, as: :productable, dependent: :destroy

  before_validation :calculate_board_feet

  def self.productable_permitted_attributes
    [
      :species,
      :moisture_content_percent,
      :nominal_thickness_inches,
      :nominal_width_inches,
      :length_in_feet,
      :board_feet,
      :grade,
      :can_be_straight_lined
    ]
  end

  def calculate_board_feet
    if nominal_thickness_inches.present? && nominal_width_inches.present? && length_in_feet.present?
      self.board_feet = (nominal_thickness_inches * nominal_width_inches * length_in_feet) / 12.0
    end
  end
end

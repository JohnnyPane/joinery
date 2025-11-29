module Dimensional
  extend ActiveSupport::Concern

  def calculate_cubic_feet(length_in_inches:, width_in_inches:, thickness_in_inches:)
    (length_in_inches * width_in_inches * thickness_in_inches) / 1728.0
  end

  def calculate_board_feet(length_in_inches:, width_in_inches:, thickness_in_inches:)
    (thickness_in_inches * width_in_inches * length_in_inches) / 144.0
  end
end
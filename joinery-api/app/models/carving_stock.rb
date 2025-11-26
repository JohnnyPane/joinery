class CarvingStock < ApplicationRecord

  enum :grade, { museum_grade: 0, veneer_grade: 1, fas_clear: 2, select_clear: 3 }
  enum :grain_structure, { straight_and_even: 0, tight_closed: 1, interlocked_figure: 2, medium_open: 3 }

  before_validation :calculate_metrics

  def self.productable_permitted_attributes
    [ :species, :thickness_in_inches, :width_in_inches, :length_in_feet, :board_feet, :grade, :density_lb_per_cu_ft, :grain_structure, :weight_in_pounds, :moisture_content_percent ]
  end

  def calculate_metrics
    calculate_board_feet
    calculate_weight_in_pounds
  end

  def calculate_board_feet
    if thickness_in_inches.present? && width_in_inches.present? && length_in_feet.present?
      self.board_feet = (thickness_in_inches * width_in_inches * length_in_feet) / 12.0
    end
  end

  def calculate_weight_in_pounds
    if thickness_in_inches.present? && width_in_inches.present? && length_in_feet.present? && density_lb_per_cu_ft.present?
      total_cubic_inches = thickness_in_inches * width_in_inches * (length_in_feet * 12)
      total_cubic_feet = total_cubic_inches / 1728.0

      self.weight_in_pounds = total_cubic_feet * density_lb_per_cu_ft
    end
  end
end

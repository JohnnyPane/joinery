module Dimensional
  extend ActiveSupport::Concern
  include LogRules

  RULE_MAP = {
    "doyle" => LogRules::Doyle,
    "international_1_4_inch" => LogRules::International14Inch
  }.freeze

  def calculate_cubic_feet(length_in_inches:, width_in_inches:, thickness_in_inches:)
    (length_in_inches * width_in_inches * thickness_in_inches) / 1728.0
  end

  def calculate_board_feet(length_in_inches:, width_in_inches:, thickness_in_inches:)
    (thickness_in_inches * width_in_inches * length_in_inches) / 144.0
  end

  def calculate_estimated_board_feet(log)
    rule_class = RULE_MAP[log.log_rule.to_s]
    return 0.0 unless rule_class && log.diameter_at_small_end_in_inches && log.length_in_feet

    estimated_board_feet = rule_class.calculate(log.diameter_at_small_end_in_inches.to_f, log.length_in_feet.to_f)

    estimated_board_feet.round(2)
  end
end

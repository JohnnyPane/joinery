class LogSerializer < BaseSerializer
  attributes :id, :species, :length_in_feet, :diameter_at_small_end_in_inches, :diameter_at_large_end_in_inches, :weight_in_pounds,
             :estimated_board_feet, :moisture_content_percent, :grade, :origin

  def self.shallow_attributes_list
    [
      :id, :species, :length_in_feet, :diameter_at_small_end_in_inches, :diameter_at_large_end_in_inches, :weight_in_pounds,
      :estimated_board_feet, :moisture_content_percent, :grade, :origin
    ]
  end
end

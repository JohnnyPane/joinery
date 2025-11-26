class CarvingStockSerializer < BaseSerializer
  attributes     :species, :thickness_in_inches, :width_in_inches, :length_in_feet, :board_feet, :grade, :density_lb_per_cu_ft, :grain_structure, :weight_in_pounds, :moisture_content_percent

  def self.shallow_attributes_list
    [ :species, :thickness_in_inches, :width_in_inches, :length_in_feet, :board_feet, :grade, :density_lb_per_cu_ft, :grain_structure, :weight_in_pounds, :moisture_content_percent ]
  end
end
class TurningBlank < ApplicationRecord
  enum :shape, { square_block: 0, round_dowel: 1, bowl_blank: 2, pen_blank: 3, corkscrew_blank: 4, segmented_ring: 5, other_irregular: 6 }

  before_validation :calculate_cubic_inches

  def self.productable_permitted_attributes
    [ :species, :thickness_in_inches, :width_in_inches, :length_in_inches, :cubic_inches, :shape, :figure_type, :wax_sealed, :moisture_content_percent ]
  end

  private

  def calculate_cubic_inches
    self.cubic_inches = thickness_in_inches * width_in_inches * length_in_inches
  end
end

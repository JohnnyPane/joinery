class Log < ApplicationRecord
  has_one :product, as: :productable, dependent: :destroy

  validates :species, :length, :diameter, presence: true

  enum :moisture_content, { green: 0, air_dried: 1, kiln_dried: 2, oven_dried: 3, equilibrium: 4 }
  enum :grade, { veneer: 0, grade_1: 1, grade_2: 2, grade_3: 3, culls: 4 }

  def self.productable_permitted_attributes
    [ :species, :length, :diameter, :weight, :origin, :moisture_content, :grade ]
  end
end

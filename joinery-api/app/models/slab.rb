class Slab < ApplicationRecord
  has_one :product, as: :productable, dependent: :destroy

  validates :species, :length, :width, :height, presence: true
end

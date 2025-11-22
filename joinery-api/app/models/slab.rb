class Slab < ApplicationRecord
  has_one :product, as: :productable, dependent: :destroy

  enum :slab_type, { live_edge: 0, bookmatched: 1, square_edge: 2, edge_glued: 3 }

  validates :species, :length, :width, :height, presence: true
end

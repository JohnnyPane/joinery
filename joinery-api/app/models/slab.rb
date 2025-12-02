class Slab < ApplicationRecord
  include ProductableDataHandler
  include ProductableSyncHelpers

  has_one :product, as: :productable, dependent: :destroy

  enum :slab_type, { live_edge: 0, bookmatched: 1, square_edge: 2, edge_glued: 3 }

  validates :species, :length, :width, :height, presence: true

  sync_species_from :species
  sync_materials_from :species

  def self.productable_permitted_attributes
    [ :species, :length, :width, :height, :weight, :dried, :slab_type ]
  end
end

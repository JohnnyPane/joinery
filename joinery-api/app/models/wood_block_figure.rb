class WoodBlockFigure < ApplicationRecord
  belongs_to :wood_block
  belongs_to :figure_type

  validates :wood_block_id, presence: true
  validates :figure_type_id, presence: true
end

class FigureType < ApplicationRecord
  has_many :wood_block_figures, dependent: :destroy
  has_many :wood_blocks, through: :wood_block_figures

  validates :name, presence: true, uniqueness: true
end
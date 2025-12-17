class FigureType < ApplicationRecord
  has_many :wood_block_figures, dependent: :destroy
  has_many :wood_blocks, through: :wood_block_figures
  has_many :veneer_figures, dependent: :destroy
  has_many :veneers, through: :veneer_figures

  validates :name, presence: true, uniqueness: true
end
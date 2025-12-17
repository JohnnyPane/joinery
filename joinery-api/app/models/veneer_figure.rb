class VeneerFigure < ApplicationRecord
  belongs_to :veneer
  belongs_to :figure_type

  validates :veneer_id, presence: true
  validates :figure_type_id, presence: true
end

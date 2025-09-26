class Product < ApplicationRecord
  include Imageable

  belongs_to :store
  belongs_to :productable, polymorphic: true
  has_many_attached :images

  validates :name, :price_in_cents, presence: true
end

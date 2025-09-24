class Product < ApplicationRecord
  belongs_to :store
  belongs_to :productable, polymorphic: true

  validates :name, :price_in_cents, presence: true
end

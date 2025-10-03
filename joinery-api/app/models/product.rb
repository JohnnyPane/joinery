class Product < ApplicationRecord
  include Imageable

  belongs_to :store
  belongs_to :productable, polymorphic: true
  has_many_attached :images
  has_many :shipping_options, dependent: :destroy

  validates :name, :price_in_cents, presence: true

  scope :by_store, ->(store_id) { where(store_id: store_id) }
end

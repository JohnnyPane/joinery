class Product < ApplicationRecord
  include Imageable

  belongs_to :store
  belongs_to :productable, polymorphic: true
  has_many_attached :images
  has_many :shipping_options, dependent: :destroy
  has_many :order_items
  has_many :cart_items

  validates :name, :price_in_cents, presence: true

  scope :by_store, ->(store_id) { where(store_id: store_id) }
  scope :with_images, -> { includes(images_attachments: :blob) }

  def has_enough_stock?(requested_quantity)
    quantity >= requested_quantity
  end
end

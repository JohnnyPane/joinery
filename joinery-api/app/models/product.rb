class Product < ApplicationRecord
  include Imageable

  belongs_to :store
  belongs_to :productable, polymorphic: true
  has_many_attached :images
  has_many :shipping_options, dependent: :destroy
  has_many :order_items
  has_many :cart_items

  validates :name, :price_in_cents, presence: true

  RAW_MATERIAL_TYPES = %w[Log].freeze
  LUMBER_TYPES = %w[Slab].freeze
  FINISHED_GOOD_TYPES = %w[FinishedGood].freeze

  scope :by_store, ->(store_id) { where(store_id: store_id) }
  scope :in_stock, -> { where('quantity > 0') }
  scope :with_images, -> { includes(images_attachments: :blob) }
  scope :slabs, -> { where(productable_type: 'Slab') }
  scope :logs, -> { where(productable_type: 'Log') }
  scope :finished_goods, -> { where(productable_type: FINISHED_GOOD_TYPES) }
  scope :raw_materials, -> { where(productable_type: RAW_MATERIAL_TYPES) }
  scope :lumber, -> { where(productable_type: LUMBER_TYPES) }

  def has_enough_stock?(requested_quantity)
    quantity >= requested_quantity
  end

  def self.productable_types
    %w[Log Slab]
  end
end

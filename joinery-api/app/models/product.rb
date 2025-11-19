class Product < ApplicationRecord
  include Imageable

  belongs_to :store
  belongs_to :productable, polymorphic: true
  has_many :shipping_options, dependent: :destroy
  has_many :order_items
  has_many :cart_items
  has_many :orders, through: :order_items
  has_many :carts, through: :cart_items
  has_many :quote_requests, dependent: :destroy
  has_many :bids, dependent: :destroy

  acts_as_imageable_many :images

  validates :name, :price_in_cents, presence: true

  RAW_MATERIAL_TYPES = %w[Log].freeze
  LUMBER_TYPES = %w[Slab].freeze
  FINISHED_GOOD_TYPES = %w[FinishedGood].freeze

  scope :by_store, ->(store_id) { where(store_id: store_id) }
  scope :in_stock, -> { where('quantity > 0') }
  # scope :available_to_shop, -> {
  #   joins(:shipping_options)
  #     .where(quantity: 1.., is_active: true)
  #     .distinct
  # }
  scope :with_images, -> { includes(images_attachments: :blob) }
  scope :slabs, -> { where(productable_type: 'Slab') }
  scope :logs, -> { where(productable_type: 'Log') }
  scope :finished_goods, -> { where(productable_type: FINISHED_GOOD_TYPES) }
  scope :raw_materials, -> { where(productable_type: RAW_MATERIAL_TYPES) }
  scope :lumber, -> { where(productable_type: LUMBER_TYPES) }

  before_validation :set_defaults_for_requestable, if: :requestable?

  def has_enough_stock?(requested_quantity)
    quantity >= requested_quantity
  end

  def self.productable_types
    %w[Log Slab]
  end

  private

  def set_defaults_for_requestable
    self.quantity = 1
    self.price_in_cents = 0
  end

  def has_quote_shipping_option?
    shipping_options.any? { |option| option.quote? }
  end
end

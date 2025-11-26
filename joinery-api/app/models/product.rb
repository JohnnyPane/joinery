class Product < ApplicationRecord
  include Imageable
  include Ownable

  PRODUCTABLE_TYPES = %w[Log Slab RoughLumber SurfacedLumber TurningBlank CarvingStock]

  belongs_to :store
  belongs_to :productable, polymorphic: true, dependent: :destroy
  has_many :shipping_options, dependent: :destroy
  has_many :order_items
  has_many :cart_items
  has_many :orders, through: :order_items
  has_many :carts, through: :cart_items
  has_many :quote_requests, dependent: :destroy
  has_many :bids, dependent: :destroy
  has_many :reviews, as: :reviewable
  has_many :recent_reviews, -> { order(created_at: :desc).limit(3) }, class_name: "Review", as: :reviewable, dependent: :nullify

  acts_as_imageable_many :images

  owned_by :store

  validates :name, :price_in_cents, presence: true

  RAW_MATERIAL_TYPES = %w[Log Slab].freeze
  LUMBER_TYPES = %w[RoughLumber SurfacedLumber].freeze
  SPECIALTY_STOCK_TYPES = %w[TurningBlank CarvingStock]
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
  scope :specialty_stock, -> { where(productable_type: SPECIALTY_STOCK_TYPES) }

  searchable_by :name

  before_validation :set_defaults_for_requestable, if: :requestable?

  def has_enough_stock?(requested_quantity)
    quantity >= requested_quantity
  end

  def self.productable_types
    PRODUCTABLE_TYPES
  end

  def self.permitted_attributes_for(type)
    klass = type.safe_constantize

    if klass.respond_to?(:productable_permitted_attributes)
      klass.productable_permitted_attributes
    else
      raise NotImplementedError, "Model #{type} must define productable_permitted_attributes."
    end
  end

  def review_by_user(user)
    reviews.find_by(user: user)
  end

  def cascade_review_update
    store.recalculate_combined_score
  end

  def has_quote_shipping_option?
    shipping_options.any? { |option| option.quote? }
  end

  private

  def set_defaults_for_requestable
    self.quantity = 1
    self.price_in_cents = 0
  end
end

class Store < ApplicationRecord
  include Imageable
  include Ownable

  has_many :order_items
  belongs_to :owner, class_name: 'User', foreign_key: 'owner_id'
  has_many :products, dependent: :destroy
  has_many :quote_requests, class_name: 'QuoteRequest', foreign_key: 'seller_id'
  has_many :quotes, as: :author
  has_many :store_users, dependent: :destroy
  has_many :users, through: :store_users
  has_one :address, as: :addressable, dependent: :destroy

  accepts_nested_attributes_for :address, allow_destroy: true

  acts_as_imageable_one :logo, processing_method: :resize_to_fill
  owned_by :owner

  validates :name, presence: true
  validates :owner, presence: true
  validates :stripe_account_id, uniqueness: true, allow_nil: true

  def has_order_items_awaiting_action?
    order_items.awaiting_action_from_store.any?
  end
end

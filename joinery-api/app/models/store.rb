class Store < ApplicationRecord
  has_many :order_items
  belongs_to :owner, class_name: 'User', foreign_key: 'owner_id'
  has_many :products, dependent: :destroy
  has_many :quote_requests, class_name: 'QuoteRequest', foreign_key: 'seller_id'
  has_many :quotes, as: :author
  has_many :store_users, dependent: :destroy
  has_many :users, through: :store_users

  validates :name, presence: true
  validates :owner, presence: true
  validates :stripe_account_id, uniqueness: true, allow_nil: true
end

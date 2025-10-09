class Store < ApplicationRecord
  belongs_to :owner, class_name: 'User', foreign_key: 'owner_id'
  has_many :store_users, dependent: :destroy
  has_many :users, through: :store_users
  has_many :products, dependent: :destroy
  has_many :order_items

  validates :name, presence: true
  validates :owner, presence: true
  validates :stripe_account_id, uniqueness: true, allow_nil: true
end

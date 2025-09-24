class Store < ApplicationRecord
  belongs_to :owner, class_name: 'User', foreign_key: 'owner_id'
  has_many :store_users, dependent: :destroy
  has_many :users, through: :store_users

  validates :name, presence: true
  validates :owner, presence: true
end

class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  has_many :store_users, dependent: :destroy
  has_many :stores, through: :store_users
  has_many :owned_stores, class_name: 'Store', foreign_key: 'owner_id', dependent: :destroy

  validates :first_name, :last_name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 6 }

  has_many :stores, foreign_key: "owner_id", dependent: :destroy

  def name
    "#{first_name} #{last_name}"
  end

  def default_store
    stores.find_by(is_default: true) || stores.first
  end

  def has_access_to_store?(store_id)
    stores.exists?(id: store_id)
  end
end

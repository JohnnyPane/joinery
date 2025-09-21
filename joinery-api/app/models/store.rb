class Store < ApplicationRecord
  belongs_to :owner, class_name: 'User', foreign_key: 'owner_id'
  has_many :store_users, dependent: :destroy
  has_many :users, through: :store_users

  validates :name, presence: true
  validates :owner, presence: true

  scope :default_store, -> { where(is_default: true) }

  after_save :ensure_single_default_store, if: :is_default_changed?

  def has_access?(user)

  end

  private

  def ensure_single_default_store
    return unless is_default?

    if is_default
      owner.stores.where.not(id: id).update_all(is_default: false)
    end
  end
end

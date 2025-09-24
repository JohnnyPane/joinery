class StoreUser < ApplicationRecord
  belongs_to :user
  belongs_to :store

  enum :role, { owner: 0, admin: 1, staff: 2 }

  scope :default_store, -> { where(is_default: true) }

  after_save :ensure_single_default_store, if: :is_default

  private

  def ensure_single_default_store
    return unless is_default

    if is_default
      user.store_users.where.not(id: id).update_all(is_default: false)
    end
  end
end

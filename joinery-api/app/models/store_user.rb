class StoreUser < ApplicationRecord
  belongs_to :user
  belongs_to :store

  enum :role, { owner: 0, admin: 1, staff: 2 }
end

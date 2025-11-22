class Review < ApplicationRecord
  include Ownable

  belongs_to :user
  belongs_to :reviewable, polymorphic: true

  owned_by :user
end

class Current < ActiveSupport::CurrentAttributes
  attribute :user, :store, :guest_token
end
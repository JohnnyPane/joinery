module Ownable
  extend ActiveSupport::Concern

  included do
    class_attribute :ownership_attribute
  end

  class_methods do
    def owned_by(attribute)
      self.ownership_attribute = attribute
    end
  end

  def assign_owner(owner)
    send("#{self.class.ownership_attribute}=", owner)
  end
end

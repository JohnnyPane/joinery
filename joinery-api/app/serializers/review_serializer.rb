class ReviewSerializer < BaseSerializer
  attributes :rating, :body, :verified_purchase

  def self.shallow_attributes_list
    [ :rating, :body, :verified_purchase ]
  end
end

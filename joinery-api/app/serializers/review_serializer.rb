class ReviewSerializer < BaseSerializer
  attributes :rating, :body, :verified_purchase, :created_at

  attribute :author do |review|
    UserSerializer.shallow_serialize(review.user)
  end

  def self.shallow_attributes_list
    [ :id, :rating, :body, :verified_purchase, :created_at ]
  end

  def self.shallow_associations(review)
    {
      author: UserSerializer.shallow_serialize(review.user)
    }
  end
end

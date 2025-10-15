class QuoteSerializer < BaseSerializer
  attributes :id, :quote_request_id, :author_type, :amount_in_cents, :message, :role

  def self.shallow_attributes_list
    [ :id, :quote_request_id, :author_type, :amount_in_cents, :role, :message, :created_at, :updated_at ]
  end
end

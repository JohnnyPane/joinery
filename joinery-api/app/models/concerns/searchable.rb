module Searchable
  extend ActiveSupport::Concern

  DISALLOWED_TSQUERY_CHARACTERS_REGEX = /['?\\:''ʻʼ]/

  included do
    scope :search_column, ->(query, tsvector_column) {
      where(
        "#{tsvector_column} @@ to_tsquery('simple', ?)",
        sanitize_tsquery(query)
      )
    }
  end

  class_methods do
    def searchable_by(*attributes)
      @searchable_attributes = attributes
    end

    def searchable_attributes
      @searchable_attributes || []
    end

    def valid_search_attribute?(attribute)
      return false if attribute.nil?
      searchable_attributes.include?(attribute.to_sym)
    end

    def apply_search(search_params)
      scope = all
      return scope if search_params.blank? || search_params[:text].blank?

      query = search_params[:text]
      column = search_params[:column]&.to_sym

      unless valid_search_attribute?(column)
        raise ArgumentError, "Searching by '#{column}' is not supported. Available columns: #{searchable_attributes.join(', ')}"
      end

      tsvector_column = "#{column}_vector"
      scope.search_column(query, tsvector_column)
    end

    def sanitize_tsquery(query)
      tokens = query.to_s.split(/\s+/)
                    .map { |token| sanitize_search_token(token) }
                    .compact
                    .reject(&:empty?)

      return "*" if tokens.empty?
      tokens.join(" & ")
    end

    private

    def sanitize_search_token(token)
      cleaned = token.gsub(DISALLOWED_TSQUERY_CHARACTERS_REGEX, "").strip
      return nil if cleaned.empty?

      "#{cleaned}:*"
    end
  end
end

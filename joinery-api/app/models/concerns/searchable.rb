module Searchable
  extend ActiveSupport::Concern

  DISALLOWED_TSQUERY_CHARACTERS_REGEX = /['?\\:''ʻʼ]/

  included do
    scope :search, -> (query, column) {
      column_with_table_name = column.to_s.include?(".") ? column : "#{table_name}.#{column}"
      join_table_name = join_table(column)

      scope = join_table_name.present? ? left_joins(join_table_name) : self

      scope.where("to_tsvector('simple', #{column_with_table_name}) @@ to_tsquery('simple', ?)", sanitize_tsquery(query))
    }

    scope :search_local, -> (query, column) {
      where("to_tsvector('simple', #{table_name}.#{column}) @@ to_tsquery('simple', ?)", sanitize_tsquery(query))
    }
  end

  class_methods do
    def searchable_by(*attributes)
      @searchable_attributes = attributes
    end

    def searchable_attributes
      @searchable_attributes || []
    end

    def is_valid_search_attribute?(attribute)
      searchable_attributes.include?(attribute)
    end

    def apply_search(search_params)
      scope = all
      return scope if search_params.blank? || search_params[:text].blank? || search_params[:column].blank?

      column = search_params[:column].to_sym
      raise ArgumentError, "Searching by scope: #{search_params[:column]} is not supported" unless is_valid_search_attribute?(column)

      if search_params[:column].include?(".")
        scope.search(search_params[:text], search_params[:column])
      else
        scope.search_local(search_params[:text], search_params[:column])
      end
    end

    def join_table(column)
      return nil unless column.to_s.include?(".")
      association_name = column.to_s.split(".").first
      association_name.singularize.to_sym
    end

    def reference_table(column)
      return nil unless column.to_s.include?(".")
      association_name = column.to_s.split(".").first
      association_name.to_sym
    end

    def sanitize_tsquery(query)
      query.split(/\s+/).map { |word| sanitize_search_token(word) }.join(" & ")
    end

    def sanitize_search_token(token)
      token = token.gsub(DISALLOWED_TSQUERY_CHARACTERS_REGEX, '')
      token = Regexp.escape(token)

      return '' if token.empty?

      "#{token}:*"
    end
  end
end

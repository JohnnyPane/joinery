module Orderable
  extend ActiveSupport::Concern

  class_methods do
    def apply_ordering(ordering_params)
      scope = all
      return scope if ordering_params.blank?

      direction = ordering_params[:direction].to_s.downcase
      field = ordering_params[:field].to_s
      raise ArgumentError, "Invalid sort direction: #{direction}" unless %w[asc desc].include?(direction)

      return scope unless valid_order_field?(field) && valid_order_direction?(direction)

      scope.order(field => direction)
    end

    private

    def valid_order_field?(field)
      column_names.include?(field.to_s)
    end

    def valid_order_direction?(direction)
      %w[asc desc].include?(direction)
    end

  end
end

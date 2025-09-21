module Filterable
  extend ActiveSupport::Concern

  class_methods do
    def apply_scopes(scopes)
      results = all

      scopes.each do |scope|
        next unless respond_to?(scope[:name])

        results = results.public_send(scope[:name])
      end

      results
    end

    def apply_filters(filters_object)
      scope = all

      filters_object.each do |field, conditions|
        if conditions.present? && conditions[:operator].present? && conditions[:value].present?
          scope = apply_single_filter(scope, field, conditions[:operator], conditions[:value])
        end
      end

      scope
    end

    private

    def apply_single_filter(scope, field, operator, value)
      case operator.to_s
      when "eq"
        scope.where(field => value)
      when "not_eq"
        scope.where.not(field => value)
      when "in"
        scope.where("#{field} IN (?)", value)
      when "between"
        scope.where("#{field} BETWEEN ? AND ?", value.first, value.last)
      when "gt"
        scope.where("#{field} > ?", value)
      when "lt"
        scope.where("#{field} < ?", value)
      when "gte"
        scope.where("#{field} >= ?", value)
      when "lte"
        scope.where("#{field} <= ?", value)
      else
        scope
      end
    end
  end
end

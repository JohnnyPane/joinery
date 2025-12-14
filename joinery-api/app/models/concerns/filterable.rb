module Filterable
  extend ActiveSupport::Concern

  class_methods do
    def apply_scopes(scopes)
      results = all

      scopes.each do |scope|
        next unless respond_to?(scope[:name])

        if scope[:args].present?
          results = results.public_send(scope[:name], *scope[:args])
        else
          results = results.public_send(scope[:name])
        end
      end

      results
    end

    def apply_filters(filters_object)
      scope = all

      filters_object.each do |field, conditions|
        next unless conditions.present? && conditions[:operator].present? && conditions[:value].present?
        if field.to_s.include?(".")
          association, attribute = field.to_s.split(".")
          reflection = reflect_on_association(association.to_sym)


          if reflection&.polymorphic?
            scope = apply_polymorphic_filter(
              scope: scope,
              association: association,
              field: attribute,
              operator: conditions[:operator],
              value: conditions[:value],
              polymorphic_types: conditions[:polymorphic_types]
            )

            next
          end
        end

        scope = apply_single_filter(scope, field, conditions[:operator], conditions[:value])
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
      when "contains"
        scope.where("#{field} && ARRAY[?]::varchar[]", value)
      else
        scope
      end
    end

    def apply_polymorphic_filter(scope:, association:, field:, operator:, value:, polymorphic_types: [])
      get_resource_polymorphic_types = "#{association}_types"
      return scope unless respond_to?(get_resource_polymorphic_types)

      matching_ids = []
      types = polymorphic_types || send(get_resource_polymorphic_types)

      types.each do |type|
        table_name = type.constantize.table_name
        joined_scope = scope.joins(
          "INNER JOIN #{table_name} ON #{table_name}.id = #{self.table_name}.#{association}_id AND #{self.table_name}.#{association}_type = '#{type}'"
        )

        # MAJOR TODO: Figure out how to handle enums as values passed.
        filtered_scope = apply_single_filter(joined_scope, "#{table_name}.#{field}", operator, value)
        matching_ids += filtered_scope.pluck("#{self.table_name}.id")
      end

      scope.where(id: matching_ids.uniq)
    end
  end
end

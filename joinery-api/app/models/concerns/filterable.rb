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
        parts = field.to_s.split(".")

        if parts.size == 2
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

        if parts.size > 2
          scope = apply_joins_for_multiple_parts(scope: scope, parts: parts[0..-2])
        end

        scope = apply_single_filter(scope, field, conditions[:operator], conditions[:value])
      end

      scope
    end

    private

    def apply_joins_for_multiple_parts(scope:, parts:)
      joined_scope = scope

      parts.each_with_index do |part, index|

        if reflect_on_association(part.to_sym)&.polymorphic?
          polymorphic_join = polymorphic_join_for(polymorphic_association: part, join_table_name: parts[index + 1])
          joined_scope = joined_scope.joins(polymorphic_join)
          next
        end

        part_model = part.classify.constantize rescue nil
        next unless part_model && parts[index + 1]

        joined_scope = joined_scope.merge(part_model.joins(parts[index + 1].to_sym))
      end

      joined_scope
    end

    def apply_single_filter(scope, field, operator, value)
      filter_column = field.to_s.split(".").last
      qualified_column = field.split(".").last(2).join(".")

      model_to_filter = if field.to_s.include?(".")
                       table_name = field.to_s.split(".").first
                       table_name.classify.constantize rescue scope.klass
                     else
                       scope.klass
                     end

      query_value = value
      if model_to_filter.respond_to?(:defined_enums) && model_to_filter.defined_enums.has_key?(filter_column)
        column_enum_values = model_to_filter.defined_enums[filter_column]

        query_value = if operator.to_s == "in" && value.is_a?(Array)
                        value.map { |v| column_enum_values[v.to_s] }.compact
                      else
                        column_enum_values[value.to_s]
                      end
      end

      case operator.to_s
      when "eq"
        scope.where(qualified_column => query_value)
      when "not_eq"
        scope.where.not(qualified_column => query_value)
      when "in"
        scope.where("#{qualified_column} IN (?)", query_value)
      when "between"
        scope.where("#{qualified_column} BETWEEN ? AND ?", value.first, value.last)
      when "gt"
        scope.where("#{qualified_column} > ?", query_value)
      when "lt"
        scope.where("#{qualified_column} < ?", query_value)
      when "gte"
        scope.where("#{qualified_column} >= ?", query_value)
      when "lte"
        scope.where("#{qualified_column} <= ?", query_value)
      when "contains"
        scope.where("#{qualified_column} && ARRAY[?]::varchar[]", query_value)
      else
        scope
      end.distinct
    end

    def apply_polymorphic_filter(scope:, association:, field:, operator:, value:, polymorphic_types: [])
      applied_scope = scope

      polymorphic_types.each do |type|
        table_name = type.constantize.table_name

        applied_scope = apply_single_filter(
          scope.joins(polymorphic_join_for(polymorphic_association: association, join_table_name: table_name)),
          "#{table_name}.#{field}",
          operator,
          value
        )
      end

      applied_scope
    end

    def polymorphic_join_for(polymorphic_association:, join_table_name:)
      type = join_table_name.to_s.classify

      "INNER JOIN #{join_table_name} ON #{join_table_name}.id = #{self.table_name}.#{polymorphic_association}_id AND #{self.table_name}.#{polymorphic_association}_type = '#{type}'"
    end
  end
end

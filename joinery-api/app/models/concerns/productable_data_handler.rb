module ProductableDataHandler
  extend ActiveSupport::Concern

  module ClassMethods

    def association_attributes
      []
    end

    def base_attributes(params)
      params.except(*association_attributes)
    end

    def association_params(params)
      params.slice(*association_attributes)
    end
  end
end
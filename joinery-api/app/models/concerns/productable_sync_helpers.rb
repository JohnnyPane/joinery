module ProductableSyncHelpers
  extend ActiveSupport::Concern

  module ClassMethods
    def sync_species_from(*column_names)
      @species_columns = column_names.map(&:to_s)
    end

    def sync_materials_from(*column_names)
      @material_columns = column_names.map(&:to_s)
    end

    def species_columns_to_sync
      @species_columns || []
    end

    def material_columns_to_sync
      @material_columns || []
    end
  end
end
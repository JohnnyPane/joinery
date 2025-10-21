class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class
  include Filterable
  include Orderable
  include Searchable

  def update_if_changed(attributes)
    if slice(*attributes.keys) == attributes
      false
    else
      update(attributes)
    end
  end
end

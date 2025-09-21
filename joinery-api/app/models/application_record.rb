class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class
  include Filterable
  include Orderable
  include Searchable
end

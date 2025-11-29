class FigureTypeSerializer < BaseSerializer
  attributes :name, :description

  def self.shallow_attributes_list
    [
      :name,
      :description
    ]
  end
end
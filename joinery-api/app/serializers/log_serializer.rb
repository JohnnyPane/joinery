class LogSerializer < BaseSerializer
  attributes :id, :species, :length, :diameter, :weight, :origin, :moisture_content, :grade

  def self.shallow_attributes_list
    [ :id, :species, :length, :diameter, :weight, :origin, :moisture_content, :grade ]
  end
end

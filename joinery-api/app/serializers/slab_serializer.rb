class SlabSerializer < BaseSerializer
  attributes :id, :species, :length, :width, :height, :dried, :slab_type, :weight

  def self.shallow_attributes_list
    [ :id, :species, :length, :width, :height, :dried, :slab_type, :weight ]
  end
end
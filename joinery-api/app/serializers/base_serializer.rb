class BaseSerializer
  include JSONAPI::Serializer

  def self.inherited(subclass)
    subclass.set_type subclass.name.sub("Serializer", "").underscore.to_sym
    super
  end

  def self.current_user(params)
    params.dig(:current_user)
  end

  def self.serialize_object(object, options = {})
    new(object, options).serializable_hash[:data][:attributes]
  end

  def self.serialize_collection(collection, options = {})
    new(collection, options).serializable_hash[:data].map do |item|
      item[:attributes]
    end
  end
end

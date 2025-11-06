class BaseSerializer
  include JSONAPI::Serializer

  def self.inherited(subclass)
    subclass.set_type subclass.name.sub("Serializer", "").underscore.to_sym
    super
  end

  def self.serialize_object(object, options = {})
    new(object, options).serializable_hash[:data][:attributes]
  end

  def self.serialize_collection(collection, options = {})
    new(collection, options).serializable_hash[:data].map do |item|
      item[:attributes]
    end
  end

  def self.shallow_serialize(object)
    shallow_attributes = self.shallow_attributes_list

    object.as_json(only: shallow_attributes)
          .merge(shallow_associations(object))
  end

  def self.shallow_associations(object)
    {}
  end

  def self.shallow_serialize_collection(collection)
    collection.map { |obj| shallow_serialize(obj) }
  end

  def self.shallow_attributes_list
    raise NotImplementedError, "Subclasses must define `shallow_attributes_list`"
  end

  def current_user
    @current_user ||= params.dig(:current_user)
  end
end

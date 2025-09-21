module Renderable
  extend ActiveSupport::Concern

  def render_resource(resource, serializer, options = {})
    render json: serializer.new(
      resource,
      params: { current_user: current_user }.merge(options),
      ).serializable_hash[:data][:attributes]
  end

  def render_resource_collection(collection, serializer, options = {})
    if collection.empty?
      return render json: { data: [], meta: { page: 1, per_page: 10, total_pages: 0, total_count: 0 } }
    end

    render json: serializer.new(
      collection,
      {
        params: { current_user: current_user },
        meta: {
          page: collection.current_page,
          per_page: collection.limit_value,
          total_pages: collection.total_pages,
          total_count: collection.total_count
        }.merge(options)
      }
    )
  end
end
class JoineryController < ApplicationController
  include Renderable

  def index
    paginated_resources = resource_class
                            .page(page)
                            .per(per_page)
                            .apply_ordering(ordering)
                            .apply_scopes(scopes)
                            .apply_filters(filters)
                            .apply_search(search)

    paginated_resources = paginated_resources.includes(*included_index_resources) if included_index_resources.present?

    render_resource_collection(paginated_resources, resource_serializer, { image_type: image_size })
  end

  def show
    render_resource(resource, resource_serializer, { image_type: :main_image })
  end

  def new
    resource = resource_class.new
    render_resource(resource, resource_serializer)
  end

  def create
    resource = build_resource_with_ownership(resource_params)
    if resource.save
      after_resource_created(resource) if respond_to?(:after_resource_created, true)
      render_resource(resource, resource_serializer, status: :created)
    else
      render_errors(resource.errors, status: :unprocessable_content)
    end
  end

  def update
    if resource.update(resource_params)
      render_resource(resource, resource_serializer)
    else
      render_errors(resource.errors, status: :unprocessable_content)
    end
  end

  def destroy
    if resource.destroy
      head :no_content
    else
      render_errors(resource.errors, status: :unprocessable_content)
    end
  end

  def upload_images
    if resource.images.attach(params[:images])
      render_resource(resource, resource_serializer)
    else
      render json: { errors: resource.errors.full_messages }, status: :unprocessable_content
    end
  end

  protected

  def build_resource_with_ownership(params)
    resource = resource_class.new(params)
    assign_ownership(resource)
    resource
  end

  def assign_ownership(resource)
    if resource.respond_to?(:owner=) && current_user
      resource.owner = current_user
    end
  end

  def resource
    query = resource_class
    query = query.includes(*included_show_resources) if included_show_resources.present?
    @resource ||= query.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "#{resource_class.name} not found" }, status: :not_found
  end

  def resource_class
    controller_name.classify.constantize
  end

  def resource_params
    if respond_to?("#{resource_class.name.underscore}_params", true)
      send("#{resource_class.name.underscore}_params")
    end
  rescue ActionController::ParameterMissing => e
    render json: { error: e.message }, status: :unprocessable_content
  end

  def resource_serializer
    "#{resource_class}Serializer".constantize
  end

  def page
    (params[:page] || 1).to_i
  end

  def per_page
    (params[:per_page] || 25).to_i
  end

  def filters
    params[:filters] || {}
  end

  def scopes
    params[:scopes] || []
  end

  def sort_column
    params[:sort_column] || 'id'
  end

  def sort_direction
    direction = params[:sort_direction] || 'asc'
    raise "Invalid sort direction: #{direction}" unless %w[asc desc].include?(direction)

    direction
  end

  def ordering
    { field: sort_column, direction: sort_direction }
  end

  def search
    params[:search] || {}
  end

  def included_index_resources
    []
  end

  def included_show_resources
    []
  end

  def image_size
    params[:image_size] || :default
  end

  def render_errors(errors, status: :unprocessable_content)
    render json: { errors: errors.full_messages }, status: status
  rescue NoMethodError
    render json: { errors: errors }, status: status
  end
end
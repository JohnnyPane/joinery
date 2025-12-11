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
    paginated_resources = paginated_resources.preload(*preloaded_index_resources) if preloaded_index_resources.present?
    paginated_resources =  paginated_resources.includes(images_attachments: { blob: :variant_records }) if resource_class.reflect_on_association(:images)

    render_resource_collection(paginated_resources, resource_serializer, params: { image_size: image_size_for(:list) })
  end

  def show
    render_resource(resource, resource_serializer, params: { image_size: image_size_for(:show), show_page: true })
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
    attachment_config = resource.class.imageable_config
    attachment_name = attachment_config[:attachment_name]
    attachment_proxy = resource.send(attachment_name)
    files_to_attach = params[:images]

    if attachment_config[:type] == :one
      files_to_attach = Array(params[:images]).first
    end

    if attachment_proxy.attach(files_to_attach)
      render_resource(resource, resource_serializer)
    else
      render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end

  protected

  def build_resource_with_ownership(params)
    resource = resource_class.new(params)
    resource.assign_owner(current_user) if resource.respond_to?(:assign_owner)

    resource
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

  def preloaded_index_resources
    []
  end

  def image_size_for(action)
    defaults = {
      list: :default,
      show: :main_image
    }

    params[:image_size] || defaults[action]
  end

  def render_errors(errors, status: :unprocessable_content)
    render json: { errors: errors.full_messages }, status: status
  rescue NoMethodError
    render json: { errors: errors }, status: status
  end
end
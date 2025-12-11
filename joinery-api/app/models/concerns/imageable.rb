module Imageable
  extend ActiveSupport::Concern
  include Rails.application.routes.url_helpers

  IMAGE_SIZES = {
    main_image: [ 1000, 1000 ],
    default: [ 600, 600 ],
    thumbnail: [ 300, 300 ],
    small: [ 200, 200 ],
    cart: [ 150, 150 ]
  }.freeze

  class_methods do
    def acts_as_imageable_one(name = :image, processing_method: :resize_to_fit)
      has_one_attached name
      set_imageable_config(name, :one, processing_method)
    end

    def acts_as_imageable_many(name = :images, processing_method: :resize_to_fit)
      has_many_attached name
      set_imageable_config(name, :many, processing_method)
    end

    def imageable_config
      @imageable_config ||= {
        attachment_name: @imageable_attachment_name || :image,
        type: @imageable_type || :one,
        processing_method: @processing_method || :resize_to_fit
      }
    end

    private

    def set_imageable_config(name, type, processing_method)
      @imageable_attachment_name = name
      @imageable_type = type
      @processing_method = processing_method
    end
  end

  def image_urls(size_key: :default)
    image_variants(size_key).map do |image|
      {
        id: image.blob.id,
        image_url: Rails.application.routes.url_helpers.rails_blob_url(image, only_path: true)
      }
    end
  end

  def thumbnail_image_urls
    image_urls(:thumbnail)
  end

  def cart_image_urls
    image_urls(:cart)
  end

  def main_image_urls
    image_urls(:main_image)
  end

  private

  def resource_config
    self.class.imageable_config
  end

  def resize_to_fill(size)
    { resize_to_fill: size }
  end

  def resize_to_fit(size)
    { resize_to_fit: size }
  end

  def attached_images
    attachment_proxy = send(resource_config[:attachment_name])

    return [] unless attachment_proxy.attached?

    if resource_config[:type] == :one
      [ attachment_proxy ]
    else
      attachment_proxy
    end
  end

  def image_variants(size_key = :default)
    attached_images.map do |image|
      size = IMAGE_SIZES[size_key] || IMAGE_SIZES[:default]

      image.variant(send(resource_config[:processing_method], size))
    end
  end

end

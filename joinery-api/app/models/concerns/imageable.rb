module Imageable
  extend ActiveSupport::Concern

  included do
    has_many_attached :images
  end

  IMAGE_SIZES = {
    main_image: [1000, 1000],
    default: [600, 600],
    thumbnail: [300, 300],
    small: [200, 200],
    cart: [150, 150],
  }.freeze

  def image_variants(size_key = :default)
    images.map do |image|
      size = IMAGE_SIZES[size_key] || IMAGE_SIZES[:main_image]
      image.variant(resize_to_fill: size).processed
    end
  end

  def image_urls(size_key = :default, only_path: true)
    image_variants(size_key).map do |image|
      {
        id: image.blob.id,
        image_url: Rails.application.routes.url_helpers.rails_blob_url(image, only_path: only_path)
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

end
class ImageVariantProcessingJob < ApplicationJob
  queue_as :default

  def perform(image_variant_ids)
    image_variant_ids.each do |image_variant_id|
      process_variant(image_variant_id)
    end
  end

  def process_variant(image_variant_id)
    attachment = ActiveStorage::Attachment.find(image_variant_id)
    return unless attachment

    sizes = [ :main_image, :default, :thumbnail ]
    sizes.each do |size|
      attachment.variant(resize_to_fit: Imageable::IMAGE_SIZES[size]).processed
    end
  end
end

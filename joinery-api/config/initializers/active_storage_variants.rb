Rails.application.config.to_prepare do
  ActiveStorage::Attachment.class_eval do
    def after_upload_processing
      ActiveStorage::ProcessJob.perform_later(id)
    end
  end
end
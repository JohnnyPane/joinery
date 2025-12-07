module AvatarAttributes
  COLOR_PALETTE = %w[#1E88E5 #D81B60 #FFB300 #00ACC1 #43A047 #5E35B1 #F4511E #8D6E63].freeze

  def icon_color
    return '#808080' unless id

    COLOR_PALETTE[id % COLOR_PALETTE.size]
  end

  def initials
    name_to_use = self.respond_to?(:full_name) ? self.full_name : self.name
    return '??' unless name_to_use.present?

    name_parts = name_to_use.split(' ')

    if name_parts.size >= 2
      "#{name_parts.first[0]}#{name_parts.last[0]}".upcase
    else
      name_parts.first[0..1].upcase
    end
  end
end
# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

puts "Seeding Figure Types..."

figure_types = [
  { name: 'burl', label: 'Burl', description: 'Swirling, erratic grain knots and growth deformations.' },
  { name: 'spalting', label: 'Spalting', description: 'Dark fungal lines, zones, or color patterns.' },
  { name: 'curly', label: 'Curly/Fiddleback', description: 'Ripples or waves perpendicular to the grain, causing a 3D effect.' },
  { name: 'quilted', label: 'Quilted', description: 'Deep, wavy, cloud-like patterns, often larger than curly figure.' },
  { name: 'birdseye', label: 'Bird\'s Eye', description: 'Small, circular, distinct dots caused by localized grain distortion.' },
  { name: 'crotch_figure', label: 'Crotch Figure', description: 'V-shaped, highly figured grain where a limb meets the trunk.' },
  { name: 'iridescent_shimmer', label: 'Chatoyance/Shimmer', description: 'Optical effect where grain shifts color/hue with the viewing angle.' },
  { name: 'ambrosia', label: 'Ambrosia', description: 'Streaking and discoloration caused by fungus from Ambrosia beetle tracks.' },
  { name: 'mineral_streak', label: 'Mineral Streak', description: 'Dark, irregular lines caused by mineral absorption (common in Maple/Cherry).' },
  { name: 'straight_grain', label: 'Straight Grain', description: 'Uniform, parallel grain lines without significant figure.' }
]

figure_types.each do |data|
  FigureType.find_or_create_by!(name: data[:name]) do |ft|
    ft.label = data[:label]
    ft.description = data[:description]
  end
end

puts "Figure Types Seeding Complete. Created #{FigureType.count} records."
class Veneer < ApplicationRecord
  include ProductableDataHandler
  include ProductableSyncHelpers

  VALID_VENEER_TYPES = %w[raw_flitch paper_backed wood_on_wood phenolic_backed].freeze
  VALID_CUT_STYLES = %w[plain_sliced quarter_sawn rift_cut rotary_cut half_round].freeze
  VALID_MATCH_TYPES = %w[book_match slip_match random_match pleasing_match].freeze
  VALID_THICKNESS_UNITS = %w[inches millimeters thousandths].freeze

  has_one :product, as: :productable, dependent: :destroy
  has_many :veneer_figures, dependent: :destroy
  has_many :figure_types, through: :veneer_figures

  validates :veneer_type, inclusion: { in: VALID_VENEER_TYPES }
  validates :cut_style, inclusion: { in: VALID_CUT_STYLES }
  validates :thickness_unit, inclusion: { in: VALID_THICKNESS_UNITS }
  validates :match_type, inclusion: { in: VALID_MATCH_TYPES }, allow_nil: true

  sync_species_from :species
  sync_materials_from :species

  before_save :calculate_total_square_feet

  def self.productable_permitted_attributes
    [
      :species, :veneer_type, :cut_style, :thickness_value, :thickness_unit, :length_in_inches, :width_in_inches,
     :match_type, :leaf_count, :sequenced, :flitch_identifier, figure_types: []
    ]
  end

  def self.association_attributes
    [ :figure_types ]
  end

  private

  def calculate_total_square_feet
    self.total_square_feet = length_in_inches * width_in_inches * leaf_count / 144.0 if length_in_inches && width_in_inches && leaf_count
  end
end

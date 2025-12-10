class NominalDimensionConverter
  DIMENSIONAL_CONVERSIONS = {
    "1x2" => [ 0.75, 1.5 ], "1x3" => [ 0.75, 2.5 ], "1x4" => [ 0.75, 3.5 ],
    "1x6" => [ 0.75, 5.5 ], "1x8" => [ 0.75, 7.25 ], "1x10" => [ 0.75, 9.25 ],
    "1x12" => [ 0.75, 11.25 ],

    "2x2" => [ 1.5, 1.5 ], "2x3" => [ 1.5, 2.5 ], "2x4" => [ 1.5, 3.5 ], "2x6" => [ 1.5, 5.5 ],
    "2x8" => [ 1.5, 7.25 ], "2x10" => [ 1.5, 9.25 ], "2x12" => [ 1.5, 11.25 ],

    "4x4" => [ 3.5, 3.5 ],
    "4x6" => [ 3.5, 5.5 ],

    "5/4x6" => [ 1.0, 5.5 ],

    "6x6" => [ 5.5, 5.5 ],
    "4x8" => [ 3.5, 7.25 ],
    "6x8" => [ 5.5, 7.25 ],
    "6x10" => [ 5.5, 9.25 ],
    "6x12" => [ 5.5, 11.25 ],
    "8x8" => [ 7.25, 7.25 ],
    "8x10" => [ 7.25, 9.25 ],
    "8x12" => [ 7.25, 11.25 ],
    "10x10" => [ 9.25, 9.25 ],
    "10x12" => [ 9.25, 11.25 ],
    "12x12" => [ 11.25, 11.25 ]
  }.freeze

  QUARTER_CONVERSIONS = {
    "4/4" => 1.0, "5/4" => 1.25, "6/4" => 1.5, "7/4" => 1.75,
    "8/4" => 2.0, "10/4" => 2.5, "12/4" => 3.0, "14/4" => 3.5,
    "16/4" => 4.0
  }.freeze

  TIMBER_PLANING_REDUCTION = 0.75

  def initialize(nominal_dimension)
    @nominal_dimension = nominal_dimension.to_s.strip
    @thickness = nil
    @width = nil
  end

  def call
    return false unless @nominal_dimension.present?

    if DIMENSIONAL_CONVERSIONS.key?(@nominal_dimension)
      convert_fixed_dimensional

      # 2. ROUGH/RESAWN (Handles 8/4 x 10, etc.)
    elsif @nominal_dimension.match(/(\d\/\d)\s*x\s*(\d+)/i)
      convert_rough_or_resawn

      # 3. CUSTOM/NON-STANDARD DIMENSIONAL (Handles 14x14, 7x9, etc.)
    elsif @nominal_dimension.match(/(\d+)\s*x\s*(\d+)/i)
      convert_custom_dimensional
    else
      errors.add(:base, "Nominal dimension is not in a recognized format (e.g., 2x4, 8/4 x 10, or 14x14).") if respond_to?(:errors)
      false
    end
  end

  attr_reader :thickness, :width

  private

  def convert_fixed_dimensional
    actual = DIMENSIONAL_CONVERSIONS[@nominal_dimension]
    @thickness = actual[0]
    @width = actual[1]
    true
  end

  def convert_rough_or_resawn
    match = @nominal_dimension.match(/(\d\/\d)\s*x\s*(\d+)/i)

    quarter_thickness_str = match[1]
    nominal_width_int = match[2].to_d

    if QUARTER_CONVERSIONS.key?(quarter_thickness_str)
      @thickness = QUARTER_CONVERSIONS[quarter_thickness_str]
      @width = nominal_width_int
      true
    else
      errors.add(:base, "Rough thickness '#{quarter_thickness_str}' is not recognized.") if respond_to?(:errors)
      false
    end
  end

  def convert_custom_dimensional
    match = @nominal_dimension.match(/(\d+)\s*x\s*(\d+)/i)

    nominal_t = match[1].to_i
    nominal_w = match[2].to_i

    if nominal_t < 5 || nominal_w < 5
      reduction = 0.5
    else
      reduction = TIMBER_PLANING_REDUCTION
    end

    @thickness = nominal_t - reduction
    @width = nominal_w - reduction
    true
  end
end
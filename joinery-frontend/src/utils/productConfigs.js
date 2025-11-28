import { woodSpecies } from "./woodSpecies.js";
import { SURFACED_NOMINAL_DIMENSIONS}  from "./productDimensions.js";

export const productConfigs = {
  Slab: [
    { name: 'species', label: 'Species', type: 'select', options: woodSpecies, searchable: true, required: true },
    {
      name: 'slab_type',
      label: 'Type',
      type: 'select',
      required: true,
      options: [
        { value: 'live_edge', label: 'Live Edge'},
        { value: 'bookmatched', label: 'Bookmatched'},
        { value: 'square_edge', label: 'Square Edge' },
        { value: 'edge_glued', label: 'Edge Glued' }
      ]
    },
    { name: 'length', label: 'Length (inches)', type: 'number', required: true, icon: 'rulerVertical' },
    { name: 'width', label: 'Width (inches)', type: 'number', required: true, icon: 'rulerHorizontal' },
    { name: 'height', label: 'Height (inches)', type: 'number', required: true, icon: 'rulerVertical' },
    { name: 'dried', label: 'Dried', type: 'checkbox', required: false },
  ],
  Log: [
    { name: 'species', label: 'Species', type: 'select', options: woodSpecies, searchable: true, required: true },
    { name: 'length', label: 'Length (inches)', type: 'number', required: true, icon: 'rulerVertical' },
    { name: 'diameter', label: 'Diameter (inches)', type: 'number', required: true, icon: 'rulerHorizontal' },
    { name: 'weight', label: 'Weight (lbs)', type: 'number', required: false, icon: 'weight' },
    { name: 'origin', label: 'Origin', type: 'text', required: false, icon: 'location' },
    {
      name: 'moisture_content',
      label: 'Moisture Content',
      type: 'select',
      required: true,
      options: [{ value: 'green', label: 'Green' }, { value: 'air_dried', label: 'Air-Dried' }, { value: 'kiln_dried', label: 'Kiln-Dried' }, { value: 'oven_dried', label: 'Oven-Dried' }, { value: 'equilibrium', label: 'Equilibrium' }],
    },
    { name: 'grade', label: 'Grade', type: 'select', required: true, options: [{ value: 'veneer', label: 'Veneer' }, { value: 'grade_1', label: 'Grade 1' }, { value: 'grade_2', label: 'Grade 2' }, { value: 'grade_3', label: 'Grade 3' }, { value: 'culls', label: 'Culls' }] },
  ],
  RoughLumber: [
    { name: 'species', label: 'Species', type: 'select', options: woodSpecies, searchable: true, required: true },
    {
      name: 'nominal_thickness_inches',
      label: 'Nominal Thickness (Quarter-Inch)',
      type: 'select',
      required: true,
      icon: 'rulerVertical',
      options: [
        { value: '1.0', label: '4/4 (1.0")' },
        { value: '1.25', label: '5/4 (1.25")' },
        { value: '1.5', label: '6/4 (1.5")' },
        { value: '2.0', label: '8/4 (2.0")' },
        { value: '2.5', label: '10/4 (2.5")' },
        { value: '3.0', label: '12/4 (3.0")' }
      ],
    },
    { name: 'nominal_width_inches', label: 'Min. Usable Width (inches)', type: 'number', required: true, icon: 'rulerHorizontal', min: 1 },
    { name: 'length_in_feet', label: 'Length (feet)', type: 'number', required: true, icon: 'rulerVertical', min: 1 },
    { name: 'moisture_content_percent', label: 'Moisture Content (%)', type: 'number', icon: 'water', min: 0, max: 999 },
    {
      name: 'grade',
      label: 'Lumber Grade (FAS, Select, etc.)',
      type: 'select',
      icon: 'star',
      options: [
        { value: 'fas', label: 'FAS (First and Seconds)' },
        { value: 'select', label: 'Select' },
        { value: 'no_1_common', label: 'No. 1 Common' },
        { value: 'no_2_common', label: 'No. 2 Common' },
      ],
    },
    { name: 'can_be_straight_lined', label: 'Offer Straight-Lined Edge Service', type: 'switch', required: false }
  ],
  SurfacedLumber: [
    { name: 'species', label: 'Species', type: 'select', options: woodSpecies, searchable: true, required: true },
    { name: 'nominal_dimension', label: 'Nominal Dimension (e.g., 2x4)', type: 'select', searchable: true, options: SURFACED_NOMINAL_DIMENSIONS, required: true },
    { name: 'thickness_in_inches', label: 'Thickness (inches)', type: 'number', required: true, icon: 'rulerVertical', step: 0.01, placeholder: 'e.g., 1.5' },
    { name: 'width_in_inches', label: 'Width (inches)', type: 'number', required: true, icon: 'rulerHorizontal', step: 0.01, placeholder: 'e.g., 3.5' },
    { name: 'length_in_feet', label: 'Length (feet)', type: 'number', required: true, icon: 'rulerHorizontal', min: 1 },
    { name: 'moisture_content_percent', label: 'Moisture Content (%)', type: 'number', icon: 'water', min: 0, max: 999 },
    {
      name: 'profile',
      label: 'Edge Profile',
      type: 'select',
      required: false,
      searchable: true,
      icon: 'cut',
      options: [
        { value: 's4s', label: 'S4S (Surfaced Four Sides)' },
        { value: 's3s', label: 'S3S (Surfaced Three Sides)' },
        { value: 's2s', label: 'S2S (Surfaced Two Sides)' },
        { value: 't_g', label: 'Tongue and Groove (T&G)' },
        { value: 'end_match_t_g', label: 'End-Matched T&G (T&G on all 4 edges)' },
        { value: 'v_groove', label: 'V-Groove (Beaded tongue and groove)' },
        { value: 'shiplap', label: 'Shiplap' },
        { value: 'nickel_gap', label: 'Nickel Gap (A specific shiplap style)' },
        { value: 'bevel_siding', label: 'Bevel Siding (Lap Siding)' },
        { value: 'board_batten', label: 'Board and Batten (Finished Set)' },
        { value: 'bullnose', label: 'Bullnose (Rounded edge trim)' },
        { value: 'ogee', label: 'Ogee (S-shaped curve molding)' },
        { value: 'cove', label: 'Cove (Concave molding)' },
        { value: 'eased_edge', label: 'Eased Edge (E4E - Edges rounded slightly)' },
      ],
    },
    {
      name: 'treatment',
      label: 'Chemical Treatment',
      type: 'select',
      required: false,
      icon: 'hazard',
      options: [
        { value: 'none', label: 'None' },
        { value: 'pressure_treated', label: 'Pressure Treated' },
        { value: 'fire_retardant', label: 'Fire Retardant' },
      ],
    },
  ],
  TurningBlank: [
    { name: 'species', label: 'Species', type: 'select', options: woodSpecies, searchable: true, required: true },
    { name: 'thickness_in_inches', label: 'Thickness (inches)', type: 'number', required: true, icon: 'rulerVertical', step: 0.01, placeholder: 'e.g., 1.5' },
    { name: 'width_in_inches', label: 'Width (inches)', type: 'number', required: true, icon: 'rulerHorizontal', step: 0.01, placeholder: 'e.g., 3.5' },
    { name: 'length_in_inches', label: 'Length (inches)', type: 'number', required: true, icon: 'rulerVertical', step: 0.01, placeholder: 'e.g., 3.5' },
    {
      name: 'shape',
      label: 'Blank Shape',
      type: 'select',
      placeholder: 'Select a blank shape',
      searchable: true,
      options: [
        { value: 'square_block', label: 'Square Block' },
        { value: 'round_dowel', label: 'Round Dowel' },
        { value: 'bowl_blank', label: 'Round Bowl Blank' },
        { value: 'pen_blank', label: 'Pen/Small Project Blank' },
        { value: 'corkscrew_blank', label: 'Corkscrew/Handle Blank' },
        { value: 'segmented_ring', label: 'Segmented Ring' },
        { value: 'other_irregular', label: 'Other/Irregular Shape' }
      ]
    },
    {
      name: 'figure_type',
      label: 'Figure Type',
      type: 'select',
      placeholder: 'Select a figure type',
      searchable: true,
      options: [
        { value: 'burl', label: 'Burl (Swirling, erratic grain knots)' },
        { value: 'spalting', label: 'Spalting (Dark fungal lines/zones)' },
        { value: 'curly', label: 'Curly/Fiddleback (3D ripples/ribbons)' },
        { value: 'quilted', label: 'Quilted (Deep, wavy, cloud-like pattern)' },
        { value: 'birdseye', label: 'Bird\'s Eye (Small, circular dots)' },
        { value: 'crotch_figure', label: 'Crotch Figure (V-shaped, chaotic grain where branches meet)' },
        { value: 'iridescent_shimmer', label: 'Iridescent Shimmer (Grain shifts hue with angle)' },
        { value: 'ambrosia', label: 'Ambrosia (Small beetle track marks and streaking)' },
        { value: 'straight_grain', label: 'Straight Grain (Uniform, clear, standard)' },
        { value: 'quartered_rift', label: 'Quarter-Sawn/Rift-Sawn (Straight lines, highly stable)' },
      ]
    },
    { name: 'moisture_content_percent', label: 'Moisture Content (%)', type: 'number', required: true, icon: 'water', min: 0, max: 999 },
    { name: 'wax_sealed', label: 'Blank is wax sealed', type: 'switch', required: false },
  ],
  CarvingStock: [
    { name: 'species', label: 'Species', type: 'select', options: woodSpecies, searchable: true, required: true },
    { name: 'thickness_in_inches', label: 'Thickness (inches)', type: 'number', required: true, icon: 'rulerVertical', step: 0.01, placeholder: 'e.g., 1.5' },
    { name: 'width_in_inches', label: 'Width (inches)', type: 'number', required: true, icon: 'rulerHorizontal', step: 0.01, placeholder: 'e.g., 3.5' },
    { name: 'length_in_feet', label: 'Length (inches)', type: 'number', required: true, icon: 'rulerVertical', step: 0.01, placeholder: 'e.g., 3.5' },
    {
      name: 'grade',
      label: 'Grade',
      type: 'select',
      searchable: true,
      options: [
        {value: 'museum_grade', label: 'Museum Grade (100% Clear, Highest Figure)'},
        {value: 'veneer_grade', label: 'Veneer Grade (Exception Clear, Few Defects)'},
        {value: 'fas_clear', label: 'FAS Clear (Premium Grade, No Visible Defects)'},
        {value: 'select_clear', label: 'Select & Clear (Very High Quality, Minimal Defects)'},
      ]
    },
    {
      name: 'grain_structure',
      label: 'Grain Structure',
      type: 'select',
      searchable: true,
      options: [
        { value: 'straight_and_even', label: 'Straight and Even (Best for Detailed Sculpting)' },
        { value: 'tight_closed', label: 'Tight and Closed (Ideal for Miniature and Fine Detail)' },
        { value: 'interlocked_figure', label: 'Interlocked (Figured Grain, Highly Decorative but Difficult)' },
        { value: 'medium_open', label: 'Medium/Open Grain (Suitable for Roughing and Larger Pieces)' },
      ]
    },
    {
      name: 'density_lb_per_cu_ft',
      label: 'Density (lbs/ft³) - At Listed MC',
      type: 'number',
      required: true,
      step: 0.1,
      placeholder: 'e.g., 40.5',
      icon: 'weight',
    }
  ]
}

export const productTypeDisplayName = {
  Slab: 'Slab',
  Log: 'Log',
  RoughLumber: 'Rough Lumber',
  SurfacedLumber: 'Surfaced Lumber',
  TurningBlank: 'Turning Blank',
  CarvingStock: 'Carving Stock'
}

export const productableConfig = {
  slabs: { slug: 'slabs', type: 'Slab', plural: 'Slabs' },
  logs: { slug: 'logs', type: 'Log', plural: 'Logs' },
  rough_lumber: { slug: 'rough_lumber', type: 'RoughLumber', plural: 'Rough Lumber' },
  surfaced_lumber: { slug: 'surfaced_lumber', type: 'SurfacedLumber', plural: 'Surfaced Lumber' },
  turning_blanks: { slug: 'turning_blanks', type: 'TurningBlank', plural: 'Turning Blanks' },
  carving_stock: { slug: 'carving_stock', type: 'CarvingStock', plural: 'Carving Stock' },
}

export const productTypeOptions = Object.keys(productConfigs).map(key => ({
  value: key, label: productTypeDisplayName[key] || key
}));

export const productableDetailsFilled = (formValues) => {
  const productableType = formValues.productable_type;
  const productableValues = formValues.productable || {};
  if (!productableType) return false;

  switch (productableType) {
    case 'Slab':
      return productableValues.species && productableValues.slab_type && productableValues.length && productableValues.width && productableValues.height;
    case 'Log':
      return productableValues.species && productableValues.length && productableValues.diameter && productableValues.moisture_content && productableValues.grade;
    case 'RoughLumber':
      return productableValues.species && productableValues.nominal_thickness_inches && productableValues.nominal_width_inches && productableValues.length_in_feet;
    case 'SurfacedLumber':
      return productableValues.species && productableValues.nominal_dimension && productableValues.length_in_feet
    case 'TurningBlank':
      return productableValues.species && productableValues.thickness_in_inches && productableValues.width_in_inches && productableValues.length_in_inches
    case 'CarvingStock':
      return productableValues.species && productableValues.thickness_in_inches && productableValues.width_in_inches && productableValues.length_in_feet
    default:
      return true;
  }
}
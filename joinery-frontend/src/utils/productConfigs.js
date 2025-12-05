import { woodSpecies } from "./woodSpecies.js";
import { SURFACED_NOMINAL_DIMENSIONS, SHEET_MATERIAL_DIMENSIONS }  from "./productDimensions.js";

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
  WoodBlock: [
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
        { value: 'other_irregular', label: 'Other/Irregular Shape' }
      ]
    },
    {
      name: 'figure_types',
      label: 'Figure Types',
      type: 'multi_select',
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
        { value: 'mineral_streaks', label: 'Mineral Streaks (Dark streaks from mineral absorption)' },
        { value: 'straight_grain', label: 'Straight Grain (Uniform, clear, standard)' },
      ]
    },
    {
      name: 'grain_orientation',
      label: 'Grain Orientation',
      type: 'select',
      placeholder: 'Select grain orientation',
      searchable: true,
      options: [
        { value: 'plain_sawn', label: 'Plain Sawn (Flat Sawn)' },
        { value: 'quarter_sawn', label: 'Quarter Sawn' },
        { value: 'rift_sawn', label: 'Rift Sawn' },
        { value: 'end_grain', label: 'End Grain' },
        { value: 'radial_cut', label: 'Radial Cut' },
        { value: 'chaotic', label: 'Chaotic (Irregular Grain)' },
      ]
    },
    { name: 'moisture_content_percent', label: 'Moisture Content (%)', type: 'number', required: true, icon: 'water', min: 0, max: 999 },
    { name: 'ideal_application', label: 'Ideal For', type: 'text', required: false },
    { name: 'is_reclaimed', label: 'Blank is reclaimed wood', type: 'switch', required: false },
    { name: 'is_carving_suitable', label: 'Blank is suitable for carving', type: 'switch', required: false },
    { name: 'wax_sealed', label: 'Blank is wax sealed', type: 'switch', required: false },
  ],
  SheetGood: [
    { name: 'material_type', label: 'Material Type', type: 'select', required: true,
      options: [
        { value: 'plywood', label: 'Plywood (Veneer Core)' },
        { value: 'mdf', label: 'MDF (Medium Density Fiberboard)' },
        { value: 'particle_board', label: 'Particle Board' },
        { value: 'melamine', label: 'Melamine (TFL)' },
        { value: 'osb', label: 'OSB (Oriented Strand Board)' },
        { value: 'hardboard', label: 'Hardboard / Pegboard' }
      ]
    },
    { name: 'face_species', label: 'Front Face Species/Type', type: 'select', required: true, options: woodSpecies, searchable: true },
    { name: 'back_species', label: 'Back Face Species/Type', type: 'select', required: false, options: woodSpecies, searchable: true },
    { name: 'grade_face', label: 'Front Face Grade', type: 'select', required: false,
      options: [{ value: 'a', label: 'A (Best Quality - Paint/Clear Finish)' }, { value: 'b', label: 'B (Minor Defects - Sound)' }, { value: 'c', label: 'C (Tight Knots/Plugs Allowed)' }, { value: 'd', label: 'D (Large Defects/Patches Allowed)' }, { value: 'n', label: 'N (Natural/Clear - No Defects)' }]
    },
    { name: 'grade_back', label: 'Back Face Grade', type: 'select', required: false,
      options: [ { value: '1', label: '1 (Sound - Good for Painting)' }, { value: '2', label: '2 (Patch/Repaired - Standard)' }, { value: '3', label: '3 (Rough - Utility Grade)' }, { value: '4', label: '4 (Structural Only)' } ]
    },
    { name: 'core_type', label: 'Core Type', type: 'select', required: false,
     options: [{ value: 'veneer_core', label: 'Veneer Core' }, { value: 'mdf_core', label: 'MDF Core (Uniform, heavy)' }, { value: 'lumber_core', label: 'Lumber Core (Light, strong)' }, { value: 'combi_core', label: 'Combi-Core (MDF/Veneer Mix)' }, { value: 'particle_board_core', label: 'Particle Board Core' } ]
    },
    { name: 'cut_style', label: 'Cut Style', type: 'select', required: false,
      options: [ { value: 'rotary', label: 'Rotary Cut (Wild, Random Grain)' }, { value: 'plain_sliced', label: 'Plain Sliced / Flat Cut' }, { value: 'quarter_sliced', label: 'Quarter Sliced (Straight Grain)' }, { value: 'rift_cut', label: 'Rift Cut (Very Straight, No Fleck)' } ]
    },
    { name: 'matching', label: 'Matching Style', type: 'select', required: false,
      options: [ { value: 'book_match', label: 'Book Match (Mirror Image)' }, { value: 'slip_match', label: 'Slip Match (Repeating Pattern)' }, { value: 'random_match', label: 'Random Match' }, { value: 'plank_match', label: 'Plank Match (Simulates Solid Wood)' }, { value: 'whole_piece', label: 'Whole Piece (No Seams)' } ]
    },
    { name: 'ply_count', label: 'Number of Plies', type: 'number', icon: 'number', required: false, min: 1 },
    { name: 'glue_type', label: 'Glue Type', type: 'select', required: false,
      options: [ { value: 'interior', label: 'Interior Grade (Standard)' }, { value: 'exterior', label: 'Exterior Grade (Water Resistant)' }, { value: 'marine', label: 'Marine Grade (Waterproof)' }, { value: 'naf', label: 'NAF (No Added Formaldehyde)' }, { value: 'uf', label: 'UF (Urea Formaldehyde)' } ]
    },
    { name: 'thickness_nominal', label: 'Nominal Thickness', type: 'select', searchable: true, options: SHEET_MATERIAL_DIMENSIONS },
    { name: 'thickness_actual', label: 'Actual Thickness (inches)', type: 'number', required: false, step: 0.001, icon: 'rulerVertical' },
    { name: 'width_in_feet', label: 'Width (feet)', type: 'number', required: true, min: 1, icon: 'rulerHorizontal' },
    { name: 'length_in_feet', label: 'Length (feet)', type: 'number', required: true, min: 1, icon: 'rulerVertical' },
    { name: 'is_prefinished', label: 'Prefinished Surface', type: 'switch', required: false },
    { name: 'is_shop_grade', label: 'Shop Grade Quality', type: 'switch', required: false },
  ],
}

export const productTypeDisplayName = {
  Slab: 'Slab',
  Log: 'Log',
  RoughLumber: 'Rough Lumber',
  SurfacedLumber: 'Surfaced Lumber',
  WoodBlock: 'Wood Block',
  SheetGood: 'Sheet Good',
}

export const productableConfig = {
  slabs: { slug: 'slabs', type: 'Slab', plural: 'Slabs' },
  logs: { slug: 'logs', type: 'Log', plural: 'Logs' },
  rough_lumber: { slug: 'rough_lumber', type: 'RoughLumber', plural: 'Rough Lumber' },
  surfaced_lumber: { slug: 'surfaced_lumber', type: 'SurfacedLumber', plural: 'Surfaced Lumber' },
  wood_blocks: { slug: 'wood_blocks', type: 'WoodBlock', plural: 'Wood Blocks' },
  sheet_goods: { slug: 'sheet_goods', type: 'SheetGood', plural: 'Sheet Goods' },
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
      return productableValues.species
    case 'SurfacedLumber':
      return productableValues.species && productableValues.nominal_dimension && productableValues.length_in_feet
    case 'WoodBlock':
      return productableValues.species && productableValues.thickness_in_inches && productableValues.width_in_inches && productableValues.length_in_inches
    default:
      return true;
  }
}
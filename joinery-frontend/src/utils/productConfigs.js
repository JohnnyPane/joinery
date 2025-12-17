import { woodSpecies } from "./woodSpecies.js";
import { NOMINAL_DIMENSIONS, ROUGH_THICKNESS_OPTIONS, ROUGH_WIDTH_OPTIONS, SHEET_MATERIAL_DIMENSIONS, TIMBER_NOMINAL_DIMENSIONS }  from "./productDimensions.js";
import { FIGURE_TYPES } from "./woodDetails.js";

export const productConfigs = {
  Log: [
    { name: 'species', label: 'Species', type: 'select', options: woodSpecies, searchable: true, required: true },
    { name: 'length_in_feet', label: 'Length (feet)', type: 'number', required: true, icon: 'rulerVertical', gridSize: 6 },
    { name: 'weight_in_pounds', label: 'Weight (lbs)', type: 'number', required: false, icon: 'weight', gridSize: 6 },
    { name: 'diameter_at_small_end_in_inches', label: 'Diameter at small end (inches)', type: 'number', required: true, icon: 'rulerHorizontal', gridSize: 6 },
    { name: 'diameter_at_large_end_in_inches', label: 'Diameter at large end (inches)', type: 'number', required: true, icon: 'rulerHorizontal', gridSize: 6 },
    { name: 'log_rule', label: 'Log Rule', type: 'select', required: true, options: [{ value: 'doyle', label: 'Doyle' }, { value: 'international_1_4', label: 'International 1/4 Inch' }], gridSize: 6 },
    { name: 'origin', label: 'Origin', type: 'text', required: false, icon: 'location', gridSize: 6 },
    { name: 'moisture_content_percent', label: 'Moisture Content (%)', type: 'number', icon: 'water', min: 0, max: 999, gridSize: 6 },
    { name: 'grade', label: 'Grade', type: 'select', required: true, options: [{ value: 'veneer', label: 'Veneer' }, { value: 'grade_1', label: 'Grade 1' }, { value: 'grade_2', label: 'Grade 2' }, { value: 'grade_3', label: 'Grade 3' }, { value: 'culls', label: 'Culls' }], gridSize: 6 },
  ],
  Lumber: [
    { name: 'species', label: 'Species', type: 'select', options: woodSpecies, searchable: true, required: true },
    { name: 'finish_type', label: 'Finish Type', type: 'select', required: true,
      options: [
        { value: 'rough', label: 'Rough Lumber' },
        { value: 's2s', label: 'Surfaced Two Sides (S2S)' },
        { value: 's3s', label: 'Surfaced Three Sides (S3S)' },
        { value: 's4s', label: 'Surfaced Four Sides (S4S)' },
        { value: 'resawn', label: 'Resawn' },
      ]
    },
    { name: 'nominal_dimension', label: 'Nominal Dimensions', type: 'select', options: NOMINAL_DIMENSIONS, searchable: true, required: true, show: { field: 'finish_type', values: ['s2s', 's3s', 's4s']} },
    { name: 'rough_thickness' , label: 'Rough Thickness Options', type: 'select', required: false, options: ROUGH_THICKNESS_OPTIONS, show: { field: 'finish_type', values: ['rough', 'resawn']}, gridSize: 6 },
    { name: 'rough_width' , label: 'Rough Width Options', type: 'select', required: false, options: ROUGH_WIDTH_OPTIONS, show: { field: 'finish_type', values: ['rough', 'resawn']}, gridSize: 6 },
    { name: 'length_in_feet', label: 'Length (feet)', type: 'number', required: true, icon: 'rulerVertical', min: 1 },
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
      gridSize: 6
    },
    {
      name: 'profile',
      label: 'Edge Profile',
      type: 'select',
      required: false,
      searchable: true,
      icon: 'cut',
      options: [
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
      gridSize: 6
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
      gridSize: 6
    },
    { name: 'moisture_content_percent', label: 'Moisture Content (%)', type: 'number', icon: 'water', min: 0, max: 999, gridSize: 6 },
  ],
  Moulding: [
    { name: 'species', label: 'Species', type: 'select', options: woodSpecies, searchable: true, required: true },
    { name: 'material_grade', label: 'Material Grade', type: 'select', required: true, options: [{ value: 'stain_grade', label: 'Stain Grade (Clear/Select)' }, { value: 'paint_grade', label: 'Paint Grade (Smooth/Uniform)' }, { value: 'character_grade', label: 'Character / Rustic Grade (Knots/Color)' }, { value: 'primed', label: 'Primed / Ready for Paint' }], gridSize: 6 },
    { name: 'substrate_material', label: 'Substrate Material', type: 'select', required: true, options: [
        { value: 'solid_hardwood', label: 'Solid Hardwood' },
        { value: 'solid_softwood', label: 'Solid Softwood' },
        { value: 'finger_jointed_pine', label: 'Finger-Jointed Pine' },
        { value: 'mdf', label: 'MDF (Medium Density Fiberboard)' },
        { value: 'hdf', label: 'HDF (High Density Fiberboard)' },
        { value: 'pvc', label: 'PVC / Cellular PVC' },
        { value: 'lvp', label: 'LVP (Luxury Vinyl)' },
        { value: 'plywood_core', label: 'Plywood / Veneer Core' },
        { value: 'reclaimed_wood', label: 'Reclaimed / Antique Wood' },
        { value: 'composite', label: 'Wood Plastic Composite (WPC)' }
      ],
      gridSize: 6
    },
    { name: 'length_per_piece_feet', label: 'Length Per Piece (feet) - leave blank if no standard length', type: 'number', required: false, icon: 'rulerVertical' },
    { name: 'nominal_width_inches', label: 'Nominal Width (inches)', type: 'select', options: [
        { value: '2.0', label: '2"' },
        { value: '3.0', label: '3"' },
        { value: '4.0', label: '4"' },
        { value: '5.0', label: '5"' },
        { value: '6.0', label: '6"' },
        { value: '7.0', label: '7"' },
        { value: '8.0', label: '8"' },
        { value: '10.0', label: '10"' },
        { value: '12.0', label: '12"' },
        { value: 'custom', label: 'Custom Width' }
      ], gridSize: 6
    },
    { name: 'nominal_thickness_inches', label: 'Nominal Thickness (inches)', type: 'select', options: [
        { value: '0.75', label: '3/4" (3/4 Nominal)' },
        { value: '1.0', label: '4/4 (1" Nominal)' },
        { value: '1.25', label: '5/4 (1-1/4" Nominal)' },
        { value: '1.5', label: '6/4 (1-1/2" Nominal)' },
        { value: '2.0', label: '8/4 (2" Nominal)' },
        { value: 'custom', label: 'Custom Thickness' }
      ], gridSize: 6 },
    { name: 'actual_width_inches', label: 'Actual Width (inches)', type: 'number', required: false, icon: 'rulerHorizontal', step: 0.01, gridSize: 6 },
    { name: 'actual_thickness_inches', label: 'Actual Thickness (inches)', type: 'number', required: false, icon: 'rulerVertical', step: 0.01, gridSize: 6 },
    { name: 'profile_type', label: 'Profile Type', type: 'select', required: true, options: [
        { value: 'baseboard', label: 'Baseboard' },
        { value: 'crown_moulding', label: 'Crown Moulding' },
        { value: 'casing', label: 'Casing (Door & Window)' },
        { value: 'chair_rail', label: 'Chair Rail' },
        { value: 'picture_rail', label: 'Picture Rail' },
        { value: 'cove', label: 'Cove' },
        { value: 'quarter_round', label: 'Quarter Round' },
        { value: 'shoe_moulding', label: 'Shoe Moulding' },
        { value: 'door_jamb', label: 'Door Jamb' },
        { value: 'window_sill', label: 'Window Sill' },
        { value: 's4s_board', label: 'S4S Board (Square Stock)' },
        { value: 'back_band', label: 'Back Band' },
        { value: 'tongue_and_groove', label: 'Tongue & Groove (Paneling)' },
        { value: 'custom_match', label: 'Custom Profile Match' }
      ], gridSize: 6},
    { name: 'profile_style', label: 'Profile Style', type: 'select', options: [
        { value: 'modern_minimalist', label: 'Modern / Minimalist' },
        { value: 'shaker_craftsman', label: 'Shaker / Craftsman' },
        { value: 'colonial', label: 'Colonial' },
        { value: 'victorian', label: 'Victorian' },
        { value: 'art_deco', label: 'Art Deco' },
        { value: 'traditional', label: 'Traditional' },
        { value: 'rustic', label: 'Rustic' },
        { value: 'industrial', label: 'Industrial' }
      ], gridSize: 6},
    { name: 'surfacing', label: 'Surfacing', type: 'select', required: true, options: [
        { value: 's4s', label: 'S4S (Surfaced 4 Sides)' },
        { value: 's2s', label: 'S2S (Surfaced 2 Sides)' },
        { value: 'rough_sawn', label: 'Rough Sawn' },
        { value: 'sanded', label: 'Sanded (Finish Ready)' },
        { value: 'milled_to_pattern', label: 'Milled to Pattern (Unfinished)' }
      ], gridSize: 6 },
    { name: 'edge_treatment', label: 'Edge Treatment', type: 'select', required: false, options: [
        { value: 'square_edge', label: 'Square Edge' },
        { value: 'eased_edge', label: 'Eased Edge (Micro-bevel)' },
        { value: 'beveled', label: 'Beveled' },
        { value: 'bullnose', label: 'Bullnose (Full Round)' },
        { value: 'chamfered', label: 'Chamfered' }
      ], gridSize: 6 },
    { name: 'finish_sanded', label: 'Finish Sanded', type: 'switch', required: false },
    { name: 'standard_id', label: 'Standard ID', type: 'text', required: false },
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
    { name: 'face_species', label: 'Front Face Species/Type', type: 'select', required: true, options: woodSpecies, searchable: true, gridSize: 6 },
    { name: 'back_species', label: 'Back Face Species/Type', type: 'select', required: false, options: woodSpecies, searchable: true, gridSize: 6 },
    { name: 'grade_face', label: 'Front Face Grade', type: 'select', required: false, gridSize: 6,
      options: [{ value: 'a', label: 'A (Best Quality - Paint/Clear Finish)' }, { value: 'b', label: 'B (Minor Defects - Sound)' }, { value: 'c', label: 'C (Tight Knots/Plugs Allowed)' }, { value: 'd', label: 'D (Large Defects/Patches Allowed)' }, { value: 'n', label: 'N (Natural/Clear - No Defects)' }]
    },
    { name: 'grade_back', label: 'Back Face Grade', type: 'select', required: false, gridSize: 6,
      options: [ { value: '1', label: '1 (Sound - Good for Painting)' }, { value: '2', label: '2 (Patch/Repaired - Standard)' }, { value: '3', label: '3 (Rough - Utility Grade)' }, { value: '4', label: '4 (Structural Only)' } ]
    },
    { name: 'width_in_feet', label: 'Width (feet)', type: 'number', required: true, min: 1, icon: 'rulerHorizontal', gridSize: 6 },
    { name: 'length_in_feet', label: 'Length (feet)', type: 'number', required: true, min: 1, icon: 'rulerVertical', gridSize: 6 },
    { name: 'thickness_nominal', label: 'Nominal Thickness', type: 'select', searchable: true, options: SHEET_MATERIAL_DIMENSIONS, gridSize: 6 },
    { name: 'thickness_actual', label: 'Actual Thickness (inches)', type: 'number', required: false, step: 0.001, icon: 'rulerVertical', gridSize: 6 },
    { name: 'core_type', label: 'Core Type', type: 'select', required: false, gridSize: 6,
     options: [{ value: 'veneer_core', label: 'Veneer Core' }, { value: 'mdf_core', label: 'MDF Core (Uniform, heavy)' }, { value: 'lumber_core', label: 'Lumber Core (Light, strong)' }, { value: 'combi_core', label: 'Combi-Core (MDF/Veneer Mix)' }, { value: 'particle_board_core', label: 'Particle Board Core' } ]
    },
    { name: 'cut_style', label: 'Cut Style', type: 'select', required: false, gridSize: 6,
      options: [ { value: 'rotary', label: 'Rotary Cut (Wild, Random Grain)' }, { value: 'plain_sliced', label: 'Plain Sliced / Flat Cut' }, { value: 'quarter_sliced', label: 'Quarter Sliced (Straight Grain)' }, { value: 'rift_cut', label: 'Rift Cut (Very Straight, No Fleck)' } ]
    },
    { name: 'matching', label: 'Matching Style', type: 'select', required: false, gridSize: 6,
      options: [ { value: 'book_match', label: 'Book Match (Mirror Image)' }, { value: 'slip_match', label: 'Slip Match (Repeating Pattern)' }, { value: 'random_match', label: 'Random Match' }, { value: 'plank_match', label: 'Plank Match (Simulates Solid Wood)' }, { value: 'whole_piece', label: 'Whole Piece (No Seams)' } ]
    },
    { name: 'ply_count', label: 'Number of Plies', type: 'number', icon: 'number', required: false, min: 1, gridSize: 6 },
    { name: 'glue_type', label: 'Glue Type', type: 'select', required: false, gridSize: 6,
      options: [ { value: 'interior', label: 'Interior Grade (Standard)' }, { value: 'exterior', label: 'Exterior Grade (Water Resistant)' }, { value: 'marine', label: 'Marine Grade (Waterproof)' }, { value: 'naf', label: 'NAF (No Added Formaldehyde)' }, { value: 'uf', label: 'UF (Urea Formaldehyde)' } ]
    },
    { name: 'is_prefinished', label: 'Prefinished Surface', type: 'switch', required: false },
    { name: 'is_shop_grade', label: 'Shop Grade Quality', type: 'switch', required: false },
  ],
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
      ],
    },
    { name: 'length_in_inches', label: 'Length (inches)', type: 'number', required: true, icon: 'rulerVertical', gridSize: 6 },
    { name: 'thickness_in_inches', label: 'Thickness (inches)', type: 'number', required: true, icon: 'rulerVertical', step: 0.01, gridSize: 6 },
    { name: 'width_at_narrowest_in_inches', label: 'Width at narrowest (inches)', type: 'number', required: true, icon: 'rulerHorizontal', gridSize: 6 },
    { name: 'width_at_widest_in_inches', label: 'Width at widest (inches)', type: 'number', required: true, icon: 'rulerHorizontal', gridSize: 6 },
    { name: 'moisture_content_percent', label: 'Moisture Content (%)', type: 'number', icon: 'water', min: 0, max: 999, gridSize: 6 },
    { name: 'weight_in_pounds', label: 'Weight (lbs)', type: 'number', required: false, icon: 'weight', gridSize: 6 },
    { name: 'drying_status', label: 'Drying Status', type: 'select', required: false, options: [
        { value: 'green', label: 'Green (Freshly Cut)' },
        { value: 'air_dried', label: 'Air Dried' },
        { value: 'kiln_dried', label: 'Kiln Dried' },
        { value: 'partially_dried', label: 'Partially Dried' },
      ],
      gridSize: 6
    },
    { name: 'kiln_dried', label: 'Kiln Dried', type: 'switch', required: false },
  ],
  Timber: [
    { name: 'species', label: 'Species', type: 'select', options: woodSpecies, searchable: true, required: true },
    { name: 'nominal_dimension', label: 'Nominal Dimensions', type: 'select', options: TIMBER_NOMINAL_DIMENSIONS, searchable: true, required: true, gridSize: 6 },
    { name: 'length_in_feet', label: 'Length (feet)', type: 'number', required: true, icon: 'rulerVertical', min: 1, gridSize: 6 },
    { name: 'grading_standard', label: 'Grading Standard', type: 'select', required: false, options: [
        { value: 'select_structural', label: 'Select Structural' },
        { value: 'no_1', label: 'No. 1' },
        { value: 'no_2', label: 'No. 2' },
        { value: 'custom_appearance', label: 'Custom Appearance Grade' },
        { value: 'none', label: 'None (As-Is)' },
      ],
      gridSize: 6
    },
    { name: 'heart_content_type', label: 'Heart Content Type', type: 'select', required: false, options: [
        { value: 'boxed_heart', label: 'Boxed Heart' },
        { value: 'free_of_heart', label: 'Free of Heart' },
        { value: 'free_of_heart_center', label: 'Free of Heart Center' },
      ],
      gridSize: 6
    },
    { name: 'surface_finish_type', label: 'Surface Finish Type', type: 'select', required: false, options: [
        { value: 'rough_sawn', label: 'Rough Sawn' },
        { value: 'sawn_smooth', label: 'Sawn Smooth' },
        { value: 'hand_hewn', label: 'Hand Hewn' },
        { value: 's4s', label: 'Surfaced Four Sides (S4S)' },
        { value: 'resawn', label: 'Resawn' },
      ],
      gridSize: 6
    },
    { name: 'moisture_condition', label: 'Moisture Condition', type: 'select', required: false, options: [
        { value: 'green', label: 'Green' },
        { value: 'air_dried', label: 'Air-Dried' },
        { value: 'kiln_dried', label: 'Kiln-Dried' },
      ],
      gridSize: 6
    },
    { name: 'end_cut_style', label: 'End Cut Style', type: 'select', required: false, options: [
        { value: 'square', label: 'Square Cut (Standard)' },
        { value: 'beveled', label: 'Beveled (45-degree decorative angle)' },
        { value: 'rounded', label: 'Rounded (Simple radius)' },
        { value: 'tapered', label: 'Tapered (Gradual reduction for aesthetics)' },
        { value: 'mortise_tenon', label: 'Mortise and Tenon (Pre-cut joint)' },
        { value: 'custom_joinery', label: 'Custom Joinery (Specify in notes)' },
      ],
      gridSize: 6
    },
    { name: 'preservative_treatment', label: 'Preservative Treatment', type: 'select', required: false, options: [
        { value: 'none', label: 'None' },
        { value: 'acq', label: 'ACQ (Alkaline Copper Quaternary)' },
        { value: 'cca', label: 'CCA (Chromated Copper Arsenate)' },
        { value: 'pt', label: 'PT (Pressure Treated) - Unknown Chemical' },
        { value: 'borate', label: 'Borate (Interior Fire/Insect Resistance)' },
        { value: 'fire_retardant', label: 'Fire Retardant Treated (FRT)' },
      ],
      gridSize: 6
    },
  ],
  Veneer: [
    { name: 'species', label: 'Species', type: 'select', options: woodSpecies, searchable: true, required: true },
    {
      name: 'veneer_type',
      label: 'Veneer Type',
      type: 'select',
      required: true,
      options: [
        { value: 'raw_flitch', label: 'Raw Flitch' },
        { value: 'paper_backed', label: 'Paper Backed' },
        { value: 'wood_on_wood', label: 'Wood on Wood' },
        { value: 'phenolic_backed', label: 'Phenolic Backed' }
      ],
      gridSize: 6
    },
    {
      name: 'cut_style',
      label: 'Cut Style',
      type: 'select',
      required: true,
      options: [
        { value: 'plain_sliced', label: 'Plain Sliced' },
        { value: 'quarter_sawn', label: 'Quarter Sawn' },
        { value: 'rift_cut', label: 'Rift Cut' },
        { value: 'rotary_cut', label: 'Rotary Cut' },
        { value: 'half_round', label: 'Half Round' }
      ],
      gridSize: 6
    },
    {
      name: 'figure_types',
      label: 'Figure Types',
      type: 'multi_select',
      placeholder: 'Select a figure type',
      searchable: true,
      options: FIGURE_TYPES
    },
    { name: 'thickness_value', label: 'Thickness', type: 'number', required: true, step: 0.001, icon: 'rulerVertical', gridSize: 6 },
    {
      name: 'thickness_unit',
      label: 'Thickness Unit',
      type: 'select',
      required: true,
      options: [
        { value: 'inches', label: 'Inches' },
        { value: 'millimeters', label: 'Millimeters' },
        { value: 'thousandths', label: 'Thousandths of an Inch' }
      ],
      gridSize: 6
    },
    { name: 'length_in_inches', label: 'Length (inches)', type: 'number', required: true, icon: 'rulerVertical', gridSize: 6 },
    { name: 'width_in_inches', label: 'Width (inches)', type: 'number', required: true, icon: 'rulerHorizontal', gridSize: 6 },
    {
      name: 'match_type',
      label: 'Match Type',
      type: 'select',
      required: false,
      options: [
        { value: 'book_match', label: 'Book Match' },
        { value: 'slip_match', label: 'Slip Match' },
        { value: 'random_match', label: 'Random Match' },
        { value: 'pleasing_match', label: 'Pleasing Match' }
      ],
    },
    { name: 'leaf_count', label: 'Leaf Count', type: 'number', required: false, min: 1, icon: 'number' },
    { name: 'sequenced', label: 'Sequenced Veneer', type: 'switch', required: false },
    { name: 'flitch_identifier', label: 'Flitch Identifier', type: 'text', required: false, icon: 'tag' },

  ],
  WoodBlock: [
    { name: 'species', label: 'Species', type: 'select', options: woodSpecies, searchable: true, required: true },
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
    { name: 'thickness_in_inches', label: 'Thickness (inches)', type: 'number', required: true, icon: 'rulerVertical', step: 0.01, placeholder: 'e.g., 1.5', gridSize: 6 },
    { name: 'width_in_inches', label: 'Width (inches)', type: 'number', required: true, icon: 'rulerHorizontal', step: 0.01, placeholder: 'e.g., 3.5', gridSize: 6 },
    { name: 'length_in_inches', label: 'Length (inches)', type: 'number', required: true, icon: 'rulerVertical', step: 0.01, placeholder: 'e.g., 3.5', gridSize: 6 },
    { name: 'moisture_content_percent', label: 'Moisture Content (%)', type: 'number', required: true, icon: 'water', min: 0, max: 999, gridSize: 6 },
    {
      name: 'figure_types',
      label: 'Figure Types',
      type: 'multi_select',
      placeholder: 'Select a figure type',
      searchable: true,
      options: FIGURE_TYPES,
      gridSize: 6
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
      ],
      gridSize: 6
    },
    { name: 'ideal_application', label: 'Ideal For', type: 'text', required: false },
    { name: 'is_reclaimed', label: 'Blank is reclaimed wood', type: 'switch', required: false },
    { name: 'is_carving_suitable', label: 'Blank is suitable for carving', type: 'switch', required: false },
    { name: 'wax_sealed', label: 'Blank is wax sealed', type: 'switch', required: false },
  ],
}

export const productTypeDisplayName = {
  Slab: 'Slab',
  Log: 'Log',
  Lumber: 'Lumber',
  Moulding: 'Moulding',
  SheetGood: 'Sheet Good',
  Timber: 'Timber',
  Veneer: 'Veneer',
  WoodBlock: 'Wood Block',
}

export const productableConfig = {
  logs: { slug: 'logs', type: 'Log', plural: 'Logs' },
  lumber: { slug: 'lumber', type: 'Lumber', plural: 'Lumber' },
  moulding: { slug: 'moulding', type: 'Moulding', plural: 'Moulding' },
  sheet_goods: { slug: 'sheet_goods', type: 'SheetGood', plural: 'Sheet Goods' },
  slabs: { slug: 'slabs', type: 'Slab', plural: 'Slabs' },
  timber: { slug: 'timber', type: 'Timber', plural: 'Timber' },
  veneer: { slug: 'veneer', type: 'Veneer', plural: 'Veneer' },
  wood_blocks: { slug: 'wood_blocks', type: 'WoodBlock', plural: 'Turning Blanks & Burls' },
}

export const productTypeOptions = Object.keys(productConfigs).map(key => ({
  value: key, label: productTypeDisplayName[key] || key
}));

export const productableDetailsFilled = (formValues) => {
  const productableType = formValues.productable_type;
  const productableValues = formValues.productable || {};
  if (!productableType) return false;

  switch (productableType) {
    case 'Log':
      return productableValues.species && productableValues.length_in_feet && productableValues.diameter_at_small_end_in_inches && productableValues.diameter_at_large_end_in_inches;
    case 'Lumber':
      return productableValues.species
    case 'Moulding':
      return productableValues.species && productableValues.material_grade && productableValues.substrate_material;
    case 'SheetGood':
      return productableValues.material_type && productableValues.face_species && productableValues.thickness_nominal && productableValues.width_in_feet && productableValues.length_in_feet;
    case 'Slab':
      return productableValues.species && productableValues.slab_type && productableValues.length_in_inches && productableValues.width_at_narrowest_in_inches && productableValues.width_at_widest_in_inches && productableValues.thickness_in_inches;
    case 'Timber':
      return productableValues.species && productableValues.nominal_dimension && productableValues.length_in_feet;
    case 'WoodBlock':
      return productableValues.species && productableValues.thickness_in_inches && productableValues.width_in_inches && productableValues.length_in_inches
    default:
      return true;
  }
}
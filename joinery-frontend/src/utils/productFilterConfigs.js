import { woodSpecies } from "./woodSpecies.js";
import {NOMINAL_DIMENSIONS, SHEET_MATERIAL_DIMENSIONS, TIMBER_NOMINAL_DIMENSIONS} from "./productDimensions.js";

export const productFilterConfigs = {
  Log: [
    { name: 'species', label: 'Species', operator: 'eq', options: woodSpecies },
    { name: 'grade', label: 'Grade', operator: 'eq', options: [{ value: 'veneer', label: 'Veneer' }, { value: 'grade_1', label: 'Grade 1' }, { value: 'grade_2', label: 'Grade 2' }, { value: 'grade_3', label: 'Grade 3' }, { value: 'culls', label: 'Culls' }] },
    { name: 'length_in_feet', label: 'Length (feet)', operator: 'between', type: 'range', min: 0, max: 24 },
    { name: 'diameter_at_small_end_in_inches', label: 'Diameter at Small End (inches)', operator: 'between', type: 'range', min: 0, max: 72 },
    { name: 'diameter_at_large_end_in_inches', label: 'Diameter at Large End (inches)', operator: 'between', type: 'range', min: 0, max: 72 },
    { name: 'weight_in_pounds', label: 'Weight (lbs)', operator: 'between', type: 'range', min: 1, max: 20000 },
    { name: 'estimated_board_feet', label: 'Estimated Board Feet', operator: 'between', type: 'range', min: 1, max: 2500 },
    { name: 'moisture_content_percent', label: 'Moisture Content (%)', operator: 'between', type: 'range', min: 0, max: 250 },
  ],
  Lumber: [
    { name: 'species', label: 'Species', operator: 'eq', options: woodSpecies },
    { name: 'finish_type', label: 'Finish Type', operator: 'eq', options: [ { value: 'rough', label: 'Rough' }, { value: 'surfaced_1_side', label: 'Surfaced 1 Side (S1S)' }, { value: 'surfaced_2_sides', label: 'Surfaced 2 Sides (S2S)' }, { value: 'surfaced_4_sides', label: 'Surfaced 4 Sides (S4S)' } ] },
    { name: 'nominal_dimension', label: 'Dimensions', operator: 'eq', options: NOMINAL_DIMENSIONS },
    { name: 'grade', label: 'Grade', operator: 'eq', options: [
        { value: 'fas', label: 'FAS (First and Seconds)' },
        { value: 'select', label: 'Select' },
        { value: 'no_1_common', label: 'No. 1 Common' },
        { value: 'no_2_common', label: 'No. 2 Common' },
      ],
    },
    {
      name: 'profile', label: 'Profile', operator: 'eq', options: [
        {value: 't_g', label: 'Tongue and Groove (T&G)'},
        {value: 'end_match_t_g', label: 'End-Matched T&G (T&G on all 4 edges)'},
        {value: 'v_groove', label: 'V-Groove (Beaded tongue and groove)'},
        {value: 'shiplap', label: 'Shiplap'},
        {value: 'nickel_gap', label: 'Nickel Gap (A specific shiplap style)'},
        {value: 'bevel_siding', label: 'Bevel Siding (Lap Siding)'},
        {value: 'board_batten', label: 'Board and Batten (Finished Set)'},
        {value: 'bullnose', label: 'Bullnose (Rounded edge trim)'},
        {value: 'ogee', label: 'Ogee (S-shaped curve molding)'},
        {value: 'cove', label: 'Cove (Concave molding)'},
        {value: 'eased_edge', label: 'Eased Edge (E4E - Edges rounded slightly)'},
      ],
    },
    {
      name: 'treatment', label: 'Treatment', operator: 'eq', options: [
        {value: 'none', label: 'None'},
        {value: 'pressure_treated', label: 'Pressure Treated'},
        {value: 'fire_retardant', label: 'Fire Retardant'}
      ]
    },
    { name: 'thickness_in_inches', label: 'Thickness (inches)', operator: 'between', type: 'range', min: 0.25, max: 12 },
    { name: 'width_in_inches', label: 'Width (inches)', operator: 'between', type: 'range', min: 1, max: 24 },
    { name: 'length_in_feet', label: 'Length (feet)', operator: 'between', type: 'range', min: 1, max: 24 },
    { name: 'board_feet', label: 'Board Feet', operator: 'between', type: 'range', min: 1, max: 2500 },
    { name: 'moisture_content_percent', label: 'Moisture Content (%)', operator: 'between', type: 'range', min: 0, max: 250 },
  ],
  SheetGood: [
    { name: 'material_type', label: 'Material Type', operator: 'eq', options: [
      { value: 'plywood', label: 'Plywood' },
      { value: 'mdf', label: 'MDF' },
      { value: 'particle_board', label: 'Particle Board' },
      { value: 'melamine', label: 'Melamine' },
      { value: 'osb', label: 'OSB' },
      { value: 'hardboard', label: 'Hardboard' },
    ]},
    { name: 'face_species', label: 'Face Species', operator: 'eq', options: woodSpecies },
    { name: 'back_species', label: 'Back Species', operator: 'eq', options: woodSpecies },
    { name: 'grade_face', label: 'Face Grade', operator: 'eq', options: [{ value: 'a', label: 'A (Best Quality - Paint/Clear Finish)' }, { value: 'b', label: 'B (Minor Defects - Sound)' }, { value: 'c', label: 'C (Tight Knots/Plugs Allowed)' }, { value: 'd', label: 'D (Large Defects/Patches Allowed)' }, { value: 'n', label: 'N (Natural/Clear - No Defects)' }] },
    { name: 'grade_back', label: 'Back Grade', operator: 'eq', options: [ { value: '1', label: '1 (Sound - Good for Painting)' }, { value: '2', label: '2 (Patch/Repaired - Standard)' }, { value: '3', label: '3 (Rough - Utility Grade)' }, { value: '4', label: '4 (Structural Only)' } ] },
    { name: 'core_type', label: 'Core Type', operator: 'eq', options: [{ value: 'veneer_core', label: 'Veneer Core' }, { value: 'mdf_core', label: 'MDF Core (Uniform, heavy)' }, { value: 'lumber_core', label: 'Lumber Core (Light, strong)' }, { value: 'combi_core', label: 'Combi-Core (MDF/Veneer Mix)' }, { value: 'particle_board_core', label: 'Particle Board Core' } ] },
    { name: 'cut_style', label: 'Cut Style', operator: 'eq', options: [ { value: 'rotary', label: 'Rotary Cut (Wild, Random Grain)' }, { value: 'plain_sliced', label: 'Plain Sliced / Flat Cut' }, { value: 'quarter_sliced', label: 'Quarter Sliced (Straight Grain)' }, { value: 'rift_cut', label: 'Rift Cut (Very Straight, No Fleck)' } ] },
    { name: 'matching', label: 'Matching Style', operator: 'eq', options: [ { value: 'book_match', label: 'Book Match (Mirror Image)' }, { value: 'slip_match', label: 'Slip Match (Repeating Pattern)' }, { value: 'random_match', label: 'Random Match' }, { value: 'plank_match', label: 'Plank Match (Simulates Solid Wood)' }, { value: 'whole_piece', label: 'Whole Piece (No Seams)' } ] },
    { name: 'ply_count', label: 'Number of Plies', operator: 'eq', options: [ { value: '3', label: '3 Ply' }, { value: '5', label: '5 Ply' }, { value: '7', label: '7 Ply' }, { value: '9', label: '9 Ply' }, { value: '11', label: '11 Ply' } ] },
    { name: 'glue_type', label: 'Glue Type', operator: 'eq', options: [ { value: 'interior', label: 'Interior Grade (Standard)' }, { value: 'exterior', label: 'Exterior Grade (Water Resistant)' }, { value: 'marine', label: 'Marine Grade (Waterproof)' }, { value: 'naf', label: 'NAF (No Added Formaldehyde)' }, { value: 'uf', label: 'UF (Urea Formaldehyde)' } ] },
    { name: 'thickness_nominal', label: 'Nominal Thickness', operator: 'eq', options: SHEET_MATERIAL_DIMENSIONS },
    { name: 'is_prefinished', label: 'Prefinished Surface', operator: 'eq', options: [ { value: 'true', label: 'Yes' }, { value: 'false', label: 'No' } ] },
    { name: 'is_shop_grade', label: 'Shop Grade Quality', operator: 'eq', options: [ { value: 'true', label: 'Yes' }, { value: 'false', label: 'No' } ] },
  ],
  Slab: [
    { name: 'species', label: 'Species', operator: 'eq', options: woodSpecies },
    { name: 'slab_type', label: 'Type', operator: 'eq',   options: [
        { value: 'live_edge', label: 'Live Edge'},
        { value: 'bookmatched', label: 'Bookmatched'},
        { value: 'square_edge', label: 'Square Edge' },
        { value: 'edge_glued', label: 'Edge Glued' }
      ]
    },
    { name: 'drying_status', label: 'Drying Status', operator: 'eq', options: [
        { value: 'green', label: 'Green' },
        { value: 'air_dried', label: 'Air Dried' },
        { value: 'kiln_dried', label: 'Kiln Dried' },
      ]
    },
    { name: 'length_in_inches', label: 'Length (inches)', operator: 'between', type: 'range', min: 12, max: 300 },
    { name: 'width_at_narrowest_in_inches', label: 'Width at Narrowest (inches)', operator: 'between', type: 'range', min: 6, max: 72 },
    { name: 'width_at_widest_in_inches', label: 'Width at Widest (inches)', operator: 'between', type: 'range', min: 6, max: 72 },
    { name: 'thickness_in_inches', label: 'Thickness (inches)', operator: 'between', type: 'range', min: 1, max: 12 },
    { name: 'moisture_content_percent', label: 'Moisture Content (%)', operator: 'between', type: 'range', min: 0, max: 250 },
    { name: 'weight_in_pounds', label: 'Weight (lbs)', operator: 'between', type: 'range', min: 1, max: 20000 },
    { name: 'calculated_board_feet', label: 'Board Feet', operator: 'between', type: 'range', min: 1, max: 2500 },
  ],
  Timber: [
    { name: 'species', label: 'Species', operator: 'eq', options: woodSpecies },
    { name: 'nominal_dimension', label: 'Dimensions', operator: 'eq', options: TIMBER_NOMINAL_DIMENSIONS },
    { name: 'grading_standard', label: 'Grading Standard', operator: 'eq', options: [
        { value: 'select_structural', label: 'Select Structural' },
        { value: 'no_1', label: 'No. 1' },
        { value: 'no_2', label: 'No. 2' },
        { value: 'custom_appearance', label: 'Custom Appearance Grade' },
        { value: 'none', label: 'None (As-Is)' },
      ]
    },
    { name: 'heart_content_type', label: 'Heart Content', operator: 'eq', options: [
        {value: 'boxed_heart', label: 'Boxed Heart'},
        {value: 'free_of_heart', label: 'Free of Heart'},
        {value: 'free_of_heart_center', label: 'Free of Heart Center'},
      ]
    },
    { name: 'surface_finish_type', label: 'Surface Finish', operator: 'eq', options: [
        {value: 'rough_sawn', label: 'Rough Sawn'},
        {value: 'sawn_smooth', label: 'Sawn Smooth'},
        {value: 'hand_hewn', label: 'Hand Hewn'},
        {value: 's4s', label: 'Surfaced Four Sides (S4S)'},
        {value: 'resawn', label: 'Resawn'},
      ]
    },
    { name: 'moisture_condition', label: 'Moisture Condition', operator: 'eq', options: [
        {value: 'green', label: 'Green'},
        {value: 'air_dried', label: 'Air-Dried'},
        {value: 'kiln_dried', label: 'Kiln-Dried'},
      ]
    },
    { name: 'end_cut_style', label: 'End Cut Style', operator: 'eq', options: [
        {value: 'square', label: 'Square Cut (Standard)'},
        {value: 'beveled', label: 'Beveled (45-degree decorative angle)'},
        {value: 'rounded', label: 'Rounded (Simple radius)'},
        {value: 'tapered', label: 'Tapered (Gradual reduction for aesthetics)'},
        {value: 'mortise_tenon', label: 'Mortise and Tenon (Pre-cut joint)'},
        {value: 'custom_joinery', label: 'Custom Joinery'},
      ]
    },
    { name: 'preservative_treatment', label: 'Preservative Treatment', operator: 'eq', options: [
        { value: 'none', label: 'None' },
        { value: 'acq', label: 'ACQ (Alkaline Copper Quaternary)' },
        { value: 'cca', label: 'CCA (Chromated Copper Arsenate)' },
        { value: 'pt', label: 'PT (Pressure Treated) - Unknown Chemical' },
        { value: 'borate', label: 'Borate (Interior Fire/Insect Resistance)' },
        { value: 'fire_retardant', label: 'Fire Retardant Treated (FRT)' },
      ]
    },
    { name: 'board_feet', label: 'Board Feet', operator: 'between', type: 'range', min: 1, max: 5000 },
    { name: 'thickness_in_inches', label: 'Thickness (inches)', operator: 'between', type: 'range', min: 1, max: 24 },
    { name: 'width_in_inches', label: 'Width (inches)', operator: 'between', type: 'range', min: 1, max: 24 },
    { name: 'length_in_feet', label: 'Length (feet)', operator: 'between', type: 'range', min: 1, max: 40 },
  ],
  WoodBlock: [
    { name: 'species', label: 'Species', operator: 'eq', options: woodSpecies },
    { name: 'shape', label: 'Shape', operator: 'eq', options: [
        { value: 'square_block', label: 'Square Block' },
        { value: 'round_dowel', label: 'Round Dowel' },
        { value: 'bowl_blank', label: 'Round Bowl Blank' },
        { value: 'other_irregular', label: 'Other/Irregular Shape' }
      ]
    },
    // MAJOR TODO: Figure out how to apply this filter - join table on wood block but filtering on products
    // {
    //   name: 'figure_types.name', label: 'Figure Types', operator: 'eq', options: [
    //     {value: 'burl', label: 'Burl (Swirling, erratic grain knots)'},
    //     {value: 'spalting', label: 'Spalting (Dark fungal lines/zones)'},
    //     {value: 'curly', label: 'Curly/Fiddleback (3D ripples/ribbons)'},
    //     {value: 'quilted', label: 'Quilted (Deep, wavy, cloud-like pattern)'},
    //     {value: 'birdseye', label: 'Bird\'s Eye (Small, circular dots)'},
    //     {value: 'crotch_figure', label: 'Crotch Figure (V-shaped, chaotic grain where branches meet)'},
    //     {value: 'iridescent_shimmer', label: 'Iridescent Shimmer (Grain shifts hue with angle)'},
    //     {value: 'ambrosia', label: 'Ambrosia (Small beetle track marks and streaking)'},
    //     {value: 'mineral_streaks', label: 'Mineral Streaks (Dark streaks from mineral absorption)'},
    //     {value: 'straight_grain', label: 'Straight Grain (Uniform, clear, standard)'},
    //   ]
    // },
    {
      name: 'grain_orientation', label: 'Grain Orientation', operator: 'eq', options: [
        {value: 'plain_sawn', label: 'Plain Sawn (Flat Sawn)'},
        {value: 'quarter_sawn', label: 'Quarter Sawn'},
        {value: 'rift_sawn', label: 'Rift Sawn'},
        {value: 'end_grain', label: 'End Grain'},
        {value: 'radial_cut', label: 'Radial Cut'},
        {value: 'chaotic', label: 'Chaotic (Irregular Grain)'},
      ]
    },
  ]
};
export const SURFACED_NOMINAL_DIMENSIONS = [
  // --- 1-By (Nominal 1" Thick, Actual 3/4" Thick) ---
  { value: '1x2', label: '1x2' },
  { value: '1x3', label: '1x3' },
  { value: '1x4', label: '1x4' },
  { value: '1x6', label: '1x6' },
  { value: '1x8', label: '1x8' },
  { value: '1x10', label: '1x10' },
  { value: '1x12', label: '1x12' },

  // --- 2-By (Nominal 2" Thick, Actual 1-1/2" Thick) ---
  { value: '2x2', label: '2x2' },
  { value: '2x3', label: '2x3' },
  { value: '2x4', label: '2x4 (Standard Stud)' },
  { value: '2x6', label: '2x6' },
  { value: '2x8', label: '2x8' },
  { value: '2x10', label: '2x10' },
  { value: '2x12', label: '2x12' },

  // --- 4-By (Nominal 4" Thick, Actual 3-1/2" Thick) ---
  { value: '4x4', label: '4x4 (Post)' },
  { value: '4x6', label: '4x6' },
  { value: '4x8', label: '4x8' },

  // --- Specialty and Decking ---
  // Note: 5/4 deck board is very common and often included in nominal lists
  { value: '5/4x6', label: '5/4x6 (Decking)' },

  // --- Larger Timbers (If your suppliers carry them) ---
  { value: '6x6', label: '6x6 (Timber)' },
  { value: '8x8', label: '8x8 (Timber)' },
];

export const SHEET_MATERIAL_DIMENSIONS = [
  { value: '2.5mm', label: '2.5 mm (Thin)' }, { value: '3mm', label: '3 mm (Approx. 1/8")' }, { value: '1/8', label: '1/8 inch' },
  { value: '3/16', label: '3/16 inch' }, { value: '4mm', label: '4 mm' }, { value: '1/4', label: '1/4 inch (6mm)' }, { value: '6mm', label: '6 mm' },
  { value: '3/8', label: '3/8 inch (9mm)' }, { value: '9mm', label: '9 mm' }, { value: '1/2', label: '1/2 inch (12mm)' },
  { value: '12mm', label: '12 mm' }, { value: '5/8', label: '5/8 inch (15mm)' }, { value: '15mm', label: '15 mm' }, { value: '3/4', label: '3/4 inch (18mm)' },
  { value: '18mm', label: '18 mm' }, { value: '7/8', label: '7/8 inch' }, { value: '1', label: '1 inch (25mm)' }, { value: '25mm', label: '25 mm' },
];

export const productUnitDisplays = {
  cubic_foot: 'Cubic ft.',
  board_foot: 'Board ft.',
  linear_foot: 'Linear ft.',
  square_foot: 'Square ft.',
};
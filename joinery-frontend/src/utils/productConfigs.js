import { woodSpecies } from "./woodSpecies.js";

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
    { name: 'length', label: 'Length (inches)', type: 'number', required: true, icon: 'rulerHeight' },
    { name: 'width', label: 'Width (inches)', type: 'number', required: true, icon: 'rulerWidth' },
    { name: 'height', label: 'Height (inches)', type: 'number', required: true, icon: 'rulerHeight' },
    { name: 'dried', label: 'Dried', type: 'checkbox', required: false },
  ],
  Log: [
    { name: 'species', label: 'Species', type: 'select', options: woodSpecies, searchable: true, required: true },
    { name: 'length', label: 'Length (inches)', type: 'number', required: true, icon: 'rulerHeight' },
    { name: 'diameter', label: 'Diameter (inches)', type: 'number', required: true, icon: 'rulerWidth' },
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
}

export const productTypeDisplayName = {
  'Slab': 'Slab',
  'Log': 'Log',
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
    default:
      return true;
  }
}
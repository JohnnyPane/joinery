export const productFieldConfigs = {
  Slab: [
    { name: 'species', label: 'Species', type: 'text', required: true },
    { name: 'slab_type', label: 'Type', type: 'select', required: true, options: ['Live Edge', 'Bookmatched', 'Square Edge', 'Edge Glued'] },
    { name: 'length', label: 'Length (inches)', type: 'number', required: true },
    { name: 'width', label: 'Width (inches)', type: 'number', required: true },
    { name: 'height', label: 'height (inches)', type: 'number', required: true },
    { name: 'dried', label: 'Dried', type: 'checkbox', required: false },
  ]
}
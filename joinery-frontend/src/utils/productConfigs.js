export const productConfigs = {
  Slab: [
    { name: 'species', label: 'Species', type: 'text', required: true },
    { name: 'slab_type', label: 'Type', type: 'select', required: true, options: ['Live Edge', 'Bookmatched', 'Square Edge', 'Edge Glued'] },
    { name: 'length', label: 'Length (inches)', type: 'number', required: true, icon: 'rulerHeight' },
    { name: 'width', label: 'Width (inches)', type: 'number', required: true, icon: 'rulerWidth' },
    { name: 'height', label: 'Height (inches)', type: 'number', required: true, icon: 'rulerHeight' },
    { name: 'dried', label: 'Dried', type: 'checkbox', required: false },
  ]
}

export const productTypeDisplayName = {
  'Slab': 'Slab',
}
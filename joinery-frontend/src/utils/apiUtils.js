export const unwrapJsonApi = resource => ({
  id: resource.id,
  ...resource.attributes
})
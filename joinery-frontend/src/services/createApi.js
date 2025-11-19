import joineryClient from "./joineryClient.js";

import { toPluralName, toSingularName } from "../utils/railsNames.js";

export const createApi = (resourceName) => {
  const pluralName = toPluralName(resourceName);
  const singularName = toSingularName(resourceName);

  return {
    async get ( id, params = {} ) {
      try {
        const response = await joineryClient.get(`/${pluralName}/${id}`, { params });
        return response.data;
      } catch (error) {
        throw new Error(`Failed to fetch ${singularName} with ID ${id}`);
      }
    },

    async query ( params = {} ) {
      try {
        return await joineryClient.get(`/${pluralName}`, { params });
      } catch (error) {
        throw new Error(`Failed to query ${pluralName}`);
      }
    },

    async create ( data ) {
      const formattedData = { [singularName]: data };
      try {
        const response = await joineryClient.post(`/${pluralName}`, formattedData);
        return response.data;
      } catch (error) {
        throw new Error(`Failed to create ${singularName}`);
      }
    },

    async update ( id, data ) {
      const formattedData = { [singularName]: data };

      try {
        const response = await joineryClient.put(`/${pluralName}/${id}`, formattedData);
        return response.data;
      } catch (error) {
        throw new Error(`Failed to update ${singularName} with ID ${id}`);
      }
    },

    async delete ( id ) {
      try {
        const response = await joineryClient.delete(`/${pluralName}/${id}`);
        return response.data;
      } catch (error) {
        throw new Error(`Failed to delete ${singularName} with ID ${id}`);
      }
    },

    async fetchRoute ( route, params = {} ) {
      try {
        const response = await joineryClient.get(`/${pluralName}/${route}`, { params });
        return response.data;
      } catch (error) {
        throw new Error(`Failed to fetch ${route} for ${pluralName}`);
      }
    },

    async postMemberRoute ( id, route, data = {} ) {
      try {
        const response = await joineryClient.post(`/${pluralName}/${id}/${route}`, data);
        return response.data;
      } catch (error) {
        throw new Error(`Failed to post to ${route} for ${singularName} with ID ${id}`);
      }
    },

    async deleteMemberRoute ( id, member) {
      try {
        const response = await joineryClient.delete(`/${pluralName}/${id}/${member.name}/${member.id}`);
        return response.data;
      } catch (error) {
        throw new Error(`Failed to delete to ${route} for ${singularName} with ID ${id}`);
      }
    },

    async updateMany ( resources ) {
      const params = { updates: resources };
      const response = await joineryClient.put(`/${pluralName}/update_many`, params);
      return response.data;
    },

    async uploadImages (id, files) {
      const formData = new FormData();
      files.forEach(file => formData.append('images[]', file));

      const response = await joineryClient.post(`/${pluralName}/${id}/upload_images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    }
  }
}
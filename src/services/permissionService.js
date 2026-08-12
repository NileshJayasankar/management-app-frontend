import api from './api';

const permissionService = {
  applyPermission: async (permissionData) => {
    const { data } = await api.post('/permissions', permissionData);
    return data;
  },

  getMyPermissions: async () => {
    const { data } = await api.get('/permissions/my');
    return data;
  },

  getPendingPermissions: async () => {
    const { data } = await api.get('/permissions/pending');
    return data;
  },

  updatePermissionStatus: async (id, status) => {
    const { data } = await api.patch(`/permissions/${id}/status`, { status });
    return data;
  },

  cancelPermission: async (id) => {
    const { data } = await api.delete(`/permissions/${id}`);
    return data;
  },
};

export default permissionService;

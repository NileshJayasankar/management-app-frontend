import api from './api';

const allocationService = {
  getAllocations: async () => {
    const { data } = await api.get('/allocations');
    return data;
  },

  allocateUser: async (allocationData) => {
    const { data } = await api.post('/allocations', allocationData);
    return data;
  },

  removeAllocation: async (id) => {
    const { data } = await api.delete(`/allocations/${id}`);
    return data;
  },

  getProjectAllocations: async (projectId) => {
    const { data } = await api.get(`/allocations/project/${projectId}`);
    return data;
  },
};

export default allocationService;

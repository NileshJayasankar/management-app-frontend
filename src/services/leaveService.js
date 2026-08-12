import api from './api';

const leaveService = {
  applyLeave: async (leaveData) => {
    const { data } = await api.post('/leaves', leaveData);
    return data;
  },

  getMyLeaves: async () => {
    const { data } = await api.get('/leaves/my');
    return data;
  },

  getPendingLeaves: async () => {
    const { data } = await api.get('/leaves/pending');
    return data;
  },

  updateLeaveStatus: async (id, status) => {
    const { data } = await api.patch(`/leaves/${id}/status`, { status });
    return data;
  },

  cancelLeave: async (id) => {
    const { data } = await api.delete(`/leaves/${id}`);
    return data;
  },
};

export default leaveService;

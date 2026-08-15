import api from './api';

const userService = {
  getUsers: async () => {
    const { data } = await api.get('/api/users');
    return data;
  },

  createUser: async (userData) => {
    const { data } = await api.post('/api/users', userData);
    return data;
  },

  getUserById: async (id) => {
    const { data } = await api.get(`/api/users${id}`);
    return data;
  },

  updateUser: async (id, userData) => {
    const { data } = await api.put(`/api/users${id}`, userData);
    return data;
  },

  deleteUser: async (id) => {
    const { data } = await api.delete(`/api/users${id}`);
    return data;
  },
};

export default userService;

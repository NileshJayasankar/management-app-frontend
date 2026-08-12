import api from './api';

const authService = {
  login: async (credentials) => {
    const { data } = await api.post('/auth/login', credentials);
    return data;
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // ignore logout API errors; clear local session anyway
    }
  },

  getProfile: async () => {
    const { data } = await api.get('/auth/me');
    return data;
  },
};

export default authService;

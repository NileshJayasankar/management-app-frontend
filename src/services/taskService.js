import api from './api';

const taskService = {
  createTask: async (taskData) => {
    const { data } = await api.post('/tasks', taskData);
    return data;
  },

  getMyTasks: async () => {
    const { data } = await api.get('/tasks/my');
    return data;
  },

  getAllTasks: async () => {
    const { data } = await api.get('/tasks');
    return data;
  },

  getTaskById: async (id) => {
    const { data } = await api.get(`/tasks/${id}`);
    return data;
  },

  updateTask: async (id, taskData) => {
    const { data } = await api.put(`/tasks/${id}`, taskData);
    return data;
  },

  updateTaskStatus: async (id, status) => {
    const { data } = await api.patch(`/tasks/${id}/status`, { status });
    return data;
  },

  deleteTask: async (id) => {
    const { data } = await api.delete(`/tasks/${id}`);
    return data;
  },
};

export default taskService;

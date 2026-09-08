import api from './api';

const projectService = {
  getProjects: async () => {
    const { data } = await api.get('/api/projects');
    return data;
  },

  createProject: async (projectData) => {
    const { data } = await api.post('/api/projects', projectData);
    return data;
  },

  getProjectById: async (id) => {
    const { data } = await api.get(`/api/projects/${id}`);
    return data;
  },

  updateProject: async (id, projectData) => {
    const { data } = await api.put(`/api/projects/${id}`, projectData);
    return data;
  },

  deleteProject: async (id) => {
    const { data } = await api.delete(`/api/projects/${id}`);
    return data;
  },
};

export default projectService;

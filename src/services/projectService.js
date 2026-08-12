import api from './api';

const projectService = {
  getProjects: async () => {
    const { data } = await api.get('/projects');
    return data;
  },

  createProject: async (projectData) => {
    const { data } = await api.post('/projects', projectData);
    return data;
  },

  getProjectById: async (id) => {
    const { data } = await api.get(`/projects/${id}`);
    return data;
  },

  updateProject: async (id, projectData) => {
    const { data } = await api.put(`/projects/${id}`, projectData);
    return data;
  },

  deleteProject: async (id) => {
    const { data } = await api.delete(`/projects/${id}`);
    return data;
  },
};

export default projectService;

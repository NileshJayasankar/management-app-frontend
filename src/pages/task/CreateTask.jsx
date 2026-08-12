import { useEffect, useState } from 'react';
import taskService from '../../services/taskService';
import projectService from '../../services/projectService';
import userService from '../../services/userService';

const CreateTask = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    projectId: '',
    assignedTo: '',
    priority: 'medium',
    dueDate: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [projectData, userData] = await Promise.all([
          projectService.getProjects(),
          userService.getUsers(),
        ]);
        setProjects(Array.isArray(projectData) ? projectData : projectData?.data || []);
        setUsers(Array.isArray(userData) ? userData : userData?.data || []);
      } catch {
        // lists may fail if API is offline; form still usable once API is up
      }
    };
    load();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setSubmitting(true);
    try {
      await taskService.createTask(form);
      setMessage('Task created successfully.');
      setForm({
        title: '',
        description: '',
        projectId: '',
        assignedTo: '',
        priority: 'medium',
        dueDate: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page">
      <h2>Create Task</h2>
      <p className="muted">Assign work to a team member.</p>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      <form className="form-panel" onSubmit={handleSubmit}>
        <label>
          Title
          <input name="title" value={form.title} onChange={handleChange} required />
        </label>
        <label>
          Description
          <textarea name="description" value={form.description} onChange={handleChange} rows={4} />
        </label>
        <label>
          Project
          <select name="projectId" value={form.projectId} onChange={handleChange} required>
            <option value="">Select project</option>
            {projects.map((p) => (
              <option key={p._id || p.id} value={p._id || p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Assign To
          <select name="assignedTo" value={form.assignedTo} onChange={handleChange} required>
            <option value="">Select user</option>
            {users.map((u) => (
              <option key={u._id || u.id} value={u._id || u.id}>
                {u.name || u.email}
              </option>
            ))}
          </select>
        </label>
        <div className="form-row">
          <label>
            Priority
            <select name="priority" value={form.priority} onChange={handleChange}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
          <label>
            Due Date
            <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
          </label>
        </div>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Creating...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
};

export default CreateTask;

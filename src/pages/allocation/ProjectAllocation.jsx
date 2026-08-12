import { useEffect, useState } from 'react';
import allocationService from '../../services/allocationService';
import projectService from '../../services/projectService';
import userService from '../../services/userService';
import Loading from '../../components/Loading';

const ProjectAllocation = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [allocations, setAllocations] = useState([]);
  const [form, setForm] = useState({ projectId: '', userId: '', role: 'member' });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [projectData, userData, allocationData] = await Promise.all([
        projectService.getProjects(),
        userService.getUsers(),
        allocationService.getAllocations(),
      ]);
      setProjects(Array.isArray(projectData) ? projectData : projectData?.data || []);
      setUsers(Array.isArray(userData) ? userData : userData?.data || []);
      setAllocations(Array.isArray(allocationData) ? allocationData : allocationData?.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load allocation data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
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
      await allocationService.allocateUser(form);
      setMessage('User allocated to project.');
      setForm({ projectId: '', userId: '', role: 'member' });
      await loadData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to allocate user.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemove = async (id) => {
    try {
      await allocationService.removeAllocation(id);
      setMessage('Allocation removed.');
      await loadData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to remove allocation.');
    }
  };

  if (loading) return <Loading message="Loading allocations..." />;

  return (
    <div className="page">
      <h2>Project Allocation</h2>
      <p className="muted">Assign users to projects.</p>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      <form className="form-panel" onSubmit={handleSubmit}>
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
          User
          <select name="userId" value={form.userId} onChange={handleChange} required>
            <option value="">Select user</option>
            {users.map((u) => (
              <option key={u._id || u.id} value={u._id || u.id}>
                {u.name || u.email}
              </option>
            ))}
          </select>
        </label>
        <label>
          Role on Project
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="member">Member</option>
            <option value="lead">Lead</option>
          </select>
        </label>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Allocating...' : 'Allocate'}
        </button>
      </form>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Project</th>
              <th>User</th>
              <th>Role</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {allocations.length === 0 ? (
              <tr>
                <td colSpan={4}>No allocations yet.</td>
              </tr>
            ) : (
              allocations.map((a) => (
                <tr key={a._id || a.id}>
                  <td>{a.project?.name || a.projectName || a.projectId}</td>
                  <td>{a.user?.name || a.userName || a.userId}</td>
                  <td>{a.role}</td>
                  <td>
                    <button type="button" className="btn btn-ghost" onClick={() => handleRemove(a._id || a.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectAllocation;

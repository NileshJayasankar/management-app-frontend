import { useEffect, useState } from 'react';
import taskService from '../../services/taskService';
import Loading from '../../components/Loading';

const ManageTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const data = await taskService.getAllTasks();
      setTasks(Array.isArray(data) ? data : data?.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load tasks.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    setMessage('');
    setError('');
    try {
      await taskService.deleteTask(id);
      setMessage('Task deleted.');
      await load();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task.');
    }
  };

  if (loading) return <Loading message="Loading tasks..." />;

  return (
    <div className="page">
      <h2>Manage Tasks</h2>
      <p className="muted">Overview of all project tasks.</p>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Project</th>
              <th>Assignee</th>
              <th>Priority</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan={6}>No tasks found.</td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr key={task._id || task.id}>
                  <td>{task.title}</td>
                  <td>{task.project?.name || task.projectName || task.projectId}</td>
                  <td>{task.assignedTo?.name || task.assigneeName || task.assignedTo}</td>
                  <td>{task.priority}</td>
                  <td>
                    <span className={`badge badge-${task.status || 'pending'}`}>{task.status || 'pending'}</span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => handleDelete(task._id || task.id)}
                    >
                      Delete
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

export default ManageTasks;

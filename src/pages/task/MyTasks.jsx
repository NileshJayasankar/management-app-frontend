import { useEffect, useState } from 'react';
import taskService from '../../services/taskService';
import Loading from '../../components/Loading';

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const data = await taskService.getMyTasks();
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

  const updateStatus = async (id, status) => {
    setMessage('');
    setError('');
    try {
      await taskService.updateTaskStatus(id, status);
      setMessage('Task status updated.');
      await load();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task.');
    }
  };

  if (loading) return <Loading message="Loading your tasks..." />;

  return (
    <div className="page">
      <h2>My Tasks</h2>
      <p className="muted">Tasks assigned to you.</p>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Project</th>
              <th>Priority</th>
              <th>Due</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan={6}>No tasks assigned.</td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr key={task._id || task.id}>
                  <td>{task.title}</td>
                  <td>{task.project?.name || task.projectName || task.projectId}</td>
                  <td>{task.priority}</td>
                  <td>{task.dueDate?.slice?.(0, 10) || task.dueDate || '—'}</td>
                  <td>
                    <span className={`badge badge-${task.status || 'pending'}`}>{task.status || 'pending'}</span>
                  </td>
                  <td>
                    <select
                      defaultValue={task.status || 'pending'}
                      onChange={(e) => updateStatus(task._id || task.id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
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

export default MyTasks;

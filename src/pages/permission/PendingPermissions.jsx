import { useEffect, useState } from 'react';
import permissionService from '../../services/permissionService';
import Loading from '../../components/Loading';

const PendingPermissions = () => {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const data = await permissionService.getPendingPermissions();
      setPermissions(Array.isArray(data) ? data : data?.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load pending permissions.');
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
      await permissionService.updatePermissionStatus(id, status);
      setMessage(`Permission ${status}.`);
      await load();
    } catch (err) {
      setError(err.response?.data?.message || `Failed to ${status} permission.`);
    }
  };

  if (loading) return <Loading message="Loading pending permissions..." />;

  return (
    <div className="page">
      <h2>Pending Permissions</h2>
      <p className="muted">Approve or reject permission requests.</p>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Date</th>
              <th>From</th>
              <th>To</th>
              <th>Reason</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {permissions.length === 0 ? (
              <tr>
                <td colSpan={6}>No pending permission requests.</td>
              </tr>
            ) : (
              permissions.map((item) => (
                <tr key={item._id || item.id}>
                  <td>{item.user?.name || item.employeeName || item.userId}</td>
                  <td>{item.date?.slice?.(0, 10) || item.date}</td>
                  <td>{item.fromTime}</td>
                  <td>{item.toTime}</td>
                  <td>{item.reason}</td>
                  <td className="actions">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => updateStatus(item._id || item.id, 'approved')}
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => updateStatus(item._id || item.id, 'rejected')}
                    >
                      Reject
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

export default PendingPermissions;

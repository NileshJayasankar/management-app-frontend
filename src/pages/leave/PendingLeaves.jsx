import { useEffect, useState } from 'react';
import leaveService from '../../services/leaveService';
import Loading from '../../components/Loading';

const PendingLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const data = await leaveService.getPendingLeaves();
      setLeaves(Array.isArray(data) ? data : data?.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load pending leaves.');
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
      await leaveService.updateLeaveStatus(id, status);
      setMessage(`Leave ${status}.`);
      await load();
    } catch (err) {
      setError(err.response?.data?.message || `Failed to ${status} leave.`);
    }
  };

  if (loading) return <Loading message="Loading pending leaves..." />;

  return (
    <div className="page">
      <h2>Pending Leaves</h2>
      <p className="muted">Approve or reject leave requests.</p>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Type</th>
              <th>From</th>
              <th>To</th>
              <th>Reason</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.length === 0 ? (
              <tr>
                <td colSpan={6}>No pending leave requests.</td>
              </tr>
            ) : (
              leaves.map((leave) => (
                <tr key={leave._id || leave.id}>
                  <td>{leave.user?.name || leave.employeeName || leave.userId}</td>
                  <td>{leave.leaveType || leave.type}</td>
                  <td>{leave.fromDate?.slice?.(0, 10) || leave.fromDate}</td>
                  <td>{leave.toDate?.slice?.(0, 10) || leave.toDate}</td>
                  <td>{leave.reason}</td>
                  <td className="actions">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => updateStatus(leave._id || leave.id, 'approved')}
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => updateStatus(leave._id || leave.id, 'rejected')}
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

export default PendingLeaves;

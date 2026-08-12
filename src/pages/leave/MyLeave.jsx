import { useEffect, useState } from 'react';
import leaveService from '../../services/leaveService';
import Loading from '../../components/Loading';

const MyLeave = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await leaveService.getMyLeaves();
        setLeaves(Array.isArray(data) ? data : data?.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load leaves.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Loading message="Loading your leaves..." />;

  return (
    <div className="page">
      <h2>My Leave</h2>
      <p className="muted">Track your leave applications.</p>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>From</th>
              <th>To</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.length === 0 ? (
              <tr>
                <td colSpan={5}>No leave records found.</td>
              </tr>
            ) : (
              leaves.map((leave) => (
                <tr key={leave._id || leave.id}>
                  <td>{leave.leaveType || leave.type}</td>
                  <td>{leave.fromDate?.slice?.(0, 10) || leave.fromDate}</td>
                  <td>{leave.toDate?.slice?.(0, 10) || leave.toDate}</td>
                  <td>{leave.reason}</td>
                  <td>
                    <span className={`badge badge-${leave.status || 'pending'}`}>{leave.status || 'pending'}</span>
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

export default MyLeave;

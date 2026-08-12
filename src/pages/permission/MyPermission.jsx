import { useEffect, useState } from 'react';
import permissionService from '../../services/permissionService';
import Loading from '../../components/Loading';

const MyPermission = () => {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await permissionService.getMyPermissions();
        setPermissions(Array.isArray(data) ? data : data?.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load permissions.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Loading message="Loading your permissions..." />;

  return (
    <div className="page">
      <h2>My Permission</h2>
      <p className="muted">Track your permission requests.</p>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>From</th>
              <th>To</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {permissions.length === 0 ? (
              <tr>
                <td colSpan={5}>No permission records found.</td>
              </tr>
            ) : (
              permissions.map((item) => (
                <tr key={item._id || item.id}>
                  <td>{item.date?.slice?.(0, 10) || item.date}</td>
                  <td>{item.fromTime}</td>
                  <td>{item.toTime}</td>
                  <td>{item.reason}</td>
                  <td>
                    <span className={`badge badge-${item.status || 'pending'}`}>{item.status || 'pending'}</span>
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

export default MyPermission;

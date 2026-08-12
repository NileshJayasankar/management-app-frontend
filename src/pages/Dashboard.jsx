import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="page">
      <h2>Dashboard</h2>
      <p className="muted">
        Welcome back{user?.name ? `, ${user.name}` : ''}. Pick a module to continue.
      </p>

      <div className="dash-links">
        <Link to="/tasks/my">My Tasks</Link>
        <Link to="/leave/apply">Apply Leave</Link>
        <Link to="/permission/apply">Apply Permission</Link>
        {(user?.role === 'admin' || user?.role === 'manager') && (
          <>
            <Link to="/projects/create">Create Project</Link>
            <Link to="/tasks/manage">Manage Tasks</Link>
            <Link to="/leave/pending">Pending Leaves</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

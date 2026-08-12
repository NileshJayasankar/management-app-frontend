import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const timeZones = [
  { value: 'Asia/Kolkata', label: 'IST' },
  { value: 'UTC', label: 'UTC' },
  { value: 'America/New_York', label: 'EST' },
  { value: 'Europe/London', label: 'GMT' },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [now, setNow] = useState(new Date());
  const [timeZone, setTimeZone] = useState('Asia/Kolkata');

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDateTime = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone,
  }).format(now);

  const displayName = user?.name || user?.email || 'User';
  const roleLabel = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : 'User';
  const initials = displayName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="top-header">
      <div className="top-header-right">
        <span className="header-datetime">{formattedDateTime}</span>

        <select
          className="timezone-select"
          value={timeZone}
          onChange={(e) => setTimeZone(e.target.value)}
          aria-label="Timezone"
        >
          {timeZones.map((tz) => (
            <option key={tz.value} value={tz.value}>
              {tz.label}
            </option>
          ))}
        </select>

        <button type="button" className="icon-btn" aria-label="Notifications">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5" />
            <path d="M10 17a2 2 0 0 0 4 0" />
          </svg>
        </button>

        <div className="header-user">
          <div className="header-user-text">
            <strong>{displayName}</strong>
            <span>{roleLabel}</span>
          </div>
          <button type="button" className="avatar-btn" onClick={handleLogout} title="Logout">
            {user?.avatar ? (
              <img src={user.avatar} alt={displayName} />
            ) : (
              <span className="avatar-fallback">{initials}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

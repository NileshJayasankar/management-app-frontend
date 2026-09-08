import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const icons = {
  dashboard: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  tasks: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 11l2 2 4-4" />
      <rect x="4" y="3" width="16" height="18" rx="2" />
    </svg>
  ),
  projects: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 20V8l8-4 8 4v12" />
      <path d="M9 20v-6h6v6" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M16 14.5c2.6.4 4.5 2.2 4.5 4.5" />
    </svg>
  ),
  leave: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  ),
  permission: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3l7 3v5c0 4.5-3 8.2-7 9-4-.8-7-4.5-7-9V6l7-3z" />
      <path d="M9.5 12l1.8 1.8L15 10" />
    </svg>
  ),
  allocation: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="8" cy="8" r="3" />
      <circle cx="16" cy="8" r="3" />
      <path d="M4 19c.8-3 2.8-4.5 4-4.5S11.2 16 12 19" />
      <path d="M12 19c.8-3 2.8-4.5 4-4.5S19.2 16 20 19" />
    </svg>
  ),
};

const Sidebar = () => {
  const { user } = useAuth();
  const role = user?.role;
  const designation = user?.designation;

  // const links = [
  //   { to: '/', label: 'Dashboard', icon: 'dashboard', end: true },
  //   { to: '/tasks/my', label: 'Tasks', icon: 'tasks' },
  //   { to: '/projects/create', label: 'Projects', icon: 'projects', roles: ['ADMIN'] },
  //   { to: '/allocation', label: 'Allocate', icon: 'allocation', roles: ['ADMIN',] },
  //   { to: '/users/create', label: 'Users', icon: 'users', roles: ['ADMIN'] },
  //   { to: '/leave/apply', label: 'Leave', icon: 'leave' },
  //   { to: '/permission/apply', label: 'Permit', icon: 'permission' },
  // ];

  const links = [
    {
        to: "/",
        label: "Dashboard",
        icon: "dashboard",
        end: true,
        access: () => role === "ADMIN" || role === "EMPLOYEE",
    },
    { to: "/tasks", label: "Tasks", icon: "tasks", access: () => role === "EMPLOYEE" },
    { to: "/projects/create", label: "Projects", icon: "projects", access: () => role === "ADMIN" },
    { to: "/allocation", label: "Allocate", icon: "allocation", access: () => role === "ADMIN" },
    { to: "/users/create", label: "Users", icon: "users", access: () => role === "ADMIN" },
    {
        to: "/approvals",
        label: "Approvals",
        icon: "approval",
        access: () => role === "EMPLOYEE" && designation === "PROJECT_MANAGER",
    },
    { to: "/leave/apply", label: "Leave", icon: "leave", access: () => role === "ADMIN" || role === "EMPLOYEE" },
    {
        to: "/permission/apply",
        label: "Permit",
        icon: "permission",
        access: () => role === "ADMIN" || role === "EMPLOYEE",
    },
];


  const visibleLinks = links.filter(
    (link) => !link.roles || (role && link.roles.includes(role))
  );

  return (
    <aside className="icon-sidebar">
      <div className="sidebar-logo" aria-label="TaskFlow">
        <svg viewBox="0 0 40 40" width="34" height="34">
          <defs>
            <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2f80ed" />
              <stop offset="100%" stopColor="#56ccf2" />
            </linearGradient>
          </defs>
          <path
            d="M20 3l12 5v10c0 7.2-4.8 13.2-12 15-7.2-1.8-12-7.8-12-15V8l12-5z"
            fill="url(#logoGrad)"
          />
          <path d="M14 20l4 4 8-8" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </div>

      <nav className="icon-sidebar-nav">
        {visibleLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) => `icon-nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="icon-nav-icon">{icons[link.icon]}</span>
            <span className="icon-nav-label">{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

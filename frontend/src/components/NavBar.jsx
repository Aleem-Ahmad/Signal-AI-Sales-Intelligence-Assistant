
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Clock3, BrainCircuit } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const links = [
    {
      name: 'Dashboard',
      path: '/',
      icon: LayoutDashboard,
    },
    {
      name: 'History',
      path: '/history',
      icon: Clock3,
    },
  ];

  return (
    <aside className="sidebar">
      <Link to="/" className="brand">
        <div className="brand-icon magnet-target">
          <BrainCircuit size={21} />
        </div>
        <span>Signal<span className="brand-dot">.</span></span>
      </Link>

      <div className="sidebar-label">WORKSPACE</div>

      <nav className="sidebar-nav">
        {links.map((link) => {
          const Icon = link.icon;
          const active = location.pathname === link.path;

          return (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link magnet-target ${active ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <div className="status-indicator">
          <span className="status-dot"></span>
          AI ENGINE READY
        </div>
        <p>Turn conversations into decisions.</p>
        <span className="sidebar-version">SIGNAL STUDIO · MVP 1.0</span>
      </div>
    </aside>
  );
};

export default Navbar;

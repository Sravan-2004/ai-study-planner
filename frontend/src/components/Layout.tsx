import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Layout: React.FC = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-600 text-white p-6">
        <h1 className="text-2xl font-bold mb-8">📚 StudyAI</h1>
        <nav className="space-y-4">
          <NavLink to="/dashboard" label="Dashboard" />
          <NavLink to="/schedule" label="Schedule" />
          <NavLink to="/tasks" label="Tasks" />
          <NavLink to="/quiz" label="Quiz" />
          <NavLink to="/chat" label="Study Buddy" />
          <NavLink to="/progress" label="Progress" />
        </nav>
        <button
          onClick={handleLogout}
          className="mt-8 w-full bg-red-500 hover:bg-red-600 py-2 rounded text-white font-semibold"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

const NavLink: React.FC<{ to: string; label: string }> = ({ to, label }) => {
  return (
    <a
      href={to}
      className="block px-4 py-2 rounded hover:bg-indigo-700 transition"
    >
      {label}
    </a>
  );
};

export default Layout;
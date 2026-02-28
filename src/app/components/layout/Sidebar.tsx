import React from 'react';
import { NavLink } from 'react-router';
import { LayoutDashboard, Users, BarChart3, Settings, LogOut, Code2 } from 'lucide-react';

export default function Sidebar() {
  const links = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/analytics', icon: BarChart3, label: 'Analytics' },
    { to: '/design-system', icon: Settings, label: 'Design System' }, // For dev purposes
  ];

  return (
    <aside className="w-64 bg-background-secondary border-r border-border flex flex-col py-6 px-4">
      <div className="flex items-center gap-3 px-2 mb-10">
        <Code2 className="w-8 h-8 text-primary" />
        <span className="text-xl font-serif font-bold tracking-tight text-white">DevSync AI</span>
      </div>

      <nav className="flex-1 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-text-secondary hover:bg-surface hover:text-white'
              }`
            }
          >
            <link.icon size={20} />
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-border">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-text-secondary hover:text-error transition-colors">
          <LogOut size={20} />
          Log Out
        </button>
      </div>
    </aside>
  );
}

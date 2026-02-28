import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import {
  LayoutDashboard, MessageSquare, BarChart3, Code2, Palette,
  ChevronLeft, ChevronRight, Bell, Settings, LogOut, Zap, User,
  Users, Hash, Sparkles, Play
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: MessageSquare, label: 'Dev Chat', path: '/room/main-room' },
  { icon: Code2, label: 'Code View', path: '/code/main-room' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Play, label: 'Prototype Flow', path: '/prototype-flow' },
  { icon: Palette, label: 'Design System', path: '/design-system' },
];

const rooms = [
  { id: 'main-room', name: 'main-backend', lang: 'TypeScript', online: 4 },
  { id: 'frontend-room', name: 'react-ui', lang: 'React', online: 2 },
  { id: 'devops-room', name: 'infra-ops', lang: 'Bash', online: 1 },
];

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#0B0F1A', fontFamily: "'Inter', sans-serif" }}>
      {/* Sidebar */}
      <aside
        className="flex flex-col flex-shrink-0 transition-all duration-300 relative"
        style={{
          width: collapsed ? '72px' : '260px',
          backgroundColor: '#0D1220',
          borderRight: '1px solid #2D3748',
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 px-4 cursor-pointer"
          style={{ height: '64px', borderBottom: '1px solid #2D3748' }}
          onClick={() => navigate('/')}
        >
          <div
            className="flex-shrink-0 flex items-center justify-center rounded-xl"
            style={{
              width: '36px', height: '36px',
              background: 'linear-gradient(135deg, #F5C542 0%, #F59E0B 100%)',
              boxShadow: '0 0 16px rgba(245,197,66,0.4)',
            }}
          >
            <Zap size={18} color="#0B0F1A" strokeWidth={2.5} />
          </div>
          {!collapsed && (
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '18px', color: '#F9FAFB', letterSpacing: '-0.3px' }}>
              DevSync <span style={{ color: '#F5C542' }}>AI</span>
            </span>
          )}
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-16 z-10 flex items-center justify-center rounded-full transition-colors"
          style={{
            width: '24px', height: '24px',
            backgroundColor: '#1F2937',
            border: '1px solid #2D3748',
            color: '#9CA3AF',
          }}
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path || location.pathname.startsWith(item.path.replace('main-room', ''));
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="w-full flex items-center gap-3 rounded-xl transition-all duration-150 text-left"
                  style={{
                    padding: collapsed ? '10px' : '10px 12px',
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    backgroundColor: active ? 'rgba(245,197,66,0.1)' : 'transparent',
                    color: active ? '#F5C542' : '#9CA3AF',
                    borderLeft: active ? '2px solid #F5C542' : '2px solid transparent',
                  }}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon size={18} />
                  {!collapsed && <span style={{ fontSize: '14px', fontWeight: 500 }}>{item.label}</span>}
                </button>
              );
            })}
          </div>

          {/* Active Rooms */}
          {!collapsed && (
            <div className="mt-6">
              <p className="px-3 mb-2" style={{ fontSize: '11px', color: '#6B7280', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Active Rooms
              </p>
              <div className="space-y-1">
                {rooms.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => navigate(`/room/${room.id}`)}
                    className="w-full flex items-center gap-3 rounded-xl transition-all duration-150 text-left"
                    style={{ padding: '8px 12px', backgroundColor: 'transparent' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1F2937')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <Hash size={14} color="#6B7280" />
                    <div className="flex-1 min-w-0">
                      <p style={{ fontSize: '13px', color: '#D1D5DB', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {room.name}
                      </p>
                      <p style={{ fontSize: '11px', color: '#6B7280' }}>{room.lang}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="rounded-full" style={{ width: '6px', height: '6px', backgroundColor: '#22C55E' }} />
                      <span style={{ fontSize: '11px', color: '#6B7280' }}>{room.online}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Bottom User */}
        <div style={{ borderTop: '1px solid #2D3748', padding: '12px 8px' }}>
          <div
            className="flex items-center gap-3 rounded-xl p-2 cursor-pointer transition-colors"
            style={{ backgroundColor: 'transparent' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1F2937')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <div className="relative flex-shrink-0">
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: '34px', height: '34px',
                  background: 'linear-gradient(135deg, #3B82F6, #6366F1)',
                  fontSize: '13px', color: '#fff', fontWeight: 600,
                }}
              >
                AK
              </div>
              <div
                className="absolute bottom-0 right-0 rounded-full border-2"
                style={{ width: '10px', height: '10px', backgroundColor: '#22C55E', borderColor: '#0D1220' }}
              />
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p style={{ fontSize: '13px', color: '#F9FAFB', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  Alex Kumar
                </p>
                <p style={{ fontSize: '11px', color: '#9CA3AF' }}>Team Lead</p>
              </div>
            )}
            {!collapsed && (
              <button
                onClick={() => navigate('/')}
                className="p-1 rounded-lg transition-colors"
                style={{ color: '#6B7280' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F5C542')}
                onMouseLeave={e => (e.currentTarget.style.color = '#6B7280')}
              >
                <LogOut size={14} />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header
          className="flex items-center justify-between px-6 flex-shrink-0"
          style={{ height: '64px', borderBottom: '1px solid #2D3748', backgroundColor: '#0D1220' }}
        >
          <div className="flex items-center gap-2">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
              style={{ backgroundColor: 'rgba(245,197,66,0.08)', border: '1px solid rgba(245,197,66,0.2)' }}
            >
              <Sparkles size={13} color="#F5C542" />
              <span style={{ fontSize: '12px', color: '#F5C542', fontWeight: 600 }}>AI Copilot Active</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="relative p-2 rounded-xl transition-colors"
              style={{ color: '#9CA3AF', backgroundColor: 'transparent' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1F2937')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <Bell size={18} />
              <span
                className="absolute top-1 right-1 rounded-full"
                style={{ width: '8px', height: '8px', backgroundColor: '#F5C542' }}
              />
            </button>
            <button
              className="p-2 rounded-xl transition-colors"
              style={{ color: '#9CA3AF', backgroundColor: 'transparent' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1F2937')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <Settings size={18} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto" style={{ backgroundColor: '#0B0F1A' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
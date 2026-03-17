import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Plus, Users, Clock, Zap, Hash, ArrowRight, Sparkles,
  CheckCircle, AlertTriangle, TrendingUp, Lock, Globe,
  Filter, Search
} from 'lucide-react';
import { fetchApi } from '../lib/api';
import { CreateRoomModal } from '../components/CreateRoomModal';
import { Room, User } from '../types';

const aiSuggestions = [
  { icon: AlertTriangle, color: '#EF4444', label: 'Bug Detected', desc: 'Memory leak in backend-auth session handler', room: 'backend-auth', time: '3 min ago' },
  { icon: TrendingUp, color: '#F5C542', label: 'Optimization', desc: 'Bundle size can be reduced 34% in react-ui', room: 'react-ui-overhaul', time: '22 min ago' },
  { icon: CheckCircle, color: '#22C55E', label: 'Fix Applied', desc: 'Race condition resolved in ml-pipeline ETL', room: 'ml-pipeline', time: '1 hr ago' },
  { icon: Zap, color: '#3B82F6', label: 'Suggestion', desc: 'Add connection pooling to api-gateway Go service', room: 'api-gateway', time: '2 hrs ago' },
];

const statusColor: Record<string, string> = {
  active: '#22C55E',
  idle: '#F97316',
  offline: '#6B7280',
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [rooms, setRooms] = useState<Room[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));

        const fetchedRooms = await fetchApi('/rooms');
        const mappedRooms = fetchedRooms.map((r: any) => ({
          id: r.id,
          name: r.name,
          lang: r.lang || 'TypeScript',
          description: r.description || 'New Collaborative Space',
          status: 'active',
          private: false,
          starred: false,
          aiAssists: r._count?.aiUsageLogs || 0,
          issuesOpen: 0,
          lastActivity: new Date(r.updatedAt).toLocaleDateString(),
          members: r.members.map((m: any) => ({ 
            initials: m.user?.email ? m.user.email.substring(0, 2).toUpperCase() : '??', 
            color: '#3B82F6' 
          }))
        }));
        setRooms(mappedRooms);
      } catch (err) {
        console.error("Failed to load rooms", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filtered = rooms.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.lang.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex" style={{ minHeight: 'calc(100vh - 64px)', backgroundColor: '#0B0F1A', fontFamily: "'Inter', sans-serif" }}>
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '4px' }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '34px', color: '#F9FAFB', lineHeight: 1.2 }}>
              Welcome back, <span style={{ color: '#F5C542' }}>{user?.email ? user.email.split('@')[0] : 'Developer'}</span> 👋
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={15} color="#6B7280" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                placeholder="Search rooms..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  padding: '10px 14px 10px 36px',
                  borderRadius: '12px',
                  backgroundColor: '#111827',
                  border: '1px solid #2D3748',
                  color: '#F9FAFB', fontSize: '13px', outline: 'none',
                  width: '240px', fontFamily: "'Inter', sans-serif",
                }}
                onFocus={e => (e.target.style.borderColor = '#F5C542')}
                onBlur={e => (e.target.style.borderColor = '#2D3748')}
              />
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-colors"
              style={{ backgroundColor: '#111827', border: '1px solid #2D3748', color: '#9CA3AF', fontSize: '13px', cursor: 'pointer' }}
            >
              <Filter size={14} />
              Filter
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Rooms', value: rooms.length.toString(), change: 'Total', color: '#22C55E', icon: Hash },
            { label: 'Team Members', value: '12', change: '8 online now', color: '#3B82F6', icon: Users },
            { label: 'AI Assists Today', value: '47', change: '+12 vs yesterday', color: '#F5C542', icon: Sparkles },
            { label: 'Bugs Resolved', value: '9', change: '100% this week', color: '#22C55E', icon: CheckCircle },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-2xl p-5"
              style={{ backgroundColor: '#111827', border: '1px solid #2D3748' }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                  <stat.icon size={17} color={stat.color} />
                </div>
              </div>
              <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '28px', color: '#F9FAFB', lineHeight: 1, marginBottom: '4px' }}>{stat.value}</p>
              <p style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '4px' }}>{stat.label}</p>
              <p style={{ fontSize: '11px', color: stat.color }}>{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-5">
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '20px', color: '#F9FAFB' }}>
            Your Rooms <span style={{ fontSize: '14px', color: '#6B7280', fontFamily: "'Inter', sans-serif" }}>({filtered.length})</span>
          </h2>
        </div>

        {loading ? (
           <div className="flex items-center justify-center p-20">
              <Sparkles className="animate-pulse" size={32} color="#F5C542" />
           </div>
        ) : filtered.length === 0 ? (
           <div className="text-center p-20 border-2 border-dashed border-[#2D3748] rounded-3xl">
              <p className="text-[#9CA3AF] mb-4">No rooms found. Create one to get started!</p>
              <button 
                onClick={() => setShowModal(true)}
                className="px-6 py-2 rounded-xl bg-[#F5C542] text-[#0B0F1A] font-bold"
              >
                Create Room
              </button>
           </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {filtered.map(room => (
              <div
                key={room.id}
                className="rounded-2xl p-6 flex flex-col transition-all duration-200 cursor-pointer group"
                style={{ backgroundColor: '#111827', border: '1px solid #2D3748' }}
                onClick={() => navigate(`/room/${room.id}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColor[room.status] || '#22C55E' }} />
                    <span style={{ fontSize: '11px', color: statusColor[room.status] || '#22C55E', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {room.status}
                    </span>
                    {room.private && <Lock size={11} color="#6B7280" />}
                  </div>
                  <span
                    className="px-2 py-0.5 rounded-md"
                    style={{ fontSize: '11px', color: '#9CA3AF', backgroundColor: '#1F2937' }}
                  >
                    {room.lang}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <Hash size={15} color="#9CA3AF" />
                  <h3 style={{ fontSize: '16px', color: '#F9FAFB', fontWeight: 600 }}>{room.name}</h3>
                </div>
                <p style={{ fontSize: '13px', color: '#9CA3AF', lineHeight: 1.6, marginBottom: '16px' }}>{room.description}</p>

                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{ backgroundColor: 'rgba(245,197,66,0.08)', border: '1px solid rgba(245,197,66,0.15)' }}>
                    <Sparkles size={11} color="#F5C542" />
                    <span style={{ fontSize: '11px', color: '#F5C542', fontWeight: 600 }}>{room.aiAssists} AI assists</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {room.members.slice(0, 3).map((m, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-center rounded-full border-2"
                          style={{
                            width: '26px', height: '26px',
                            backgroundColor: m.color,
                            borderColor: '#111827',
                            fontSize: '9px', color: m.color === '#F5C542' ? '#0B0F1A' : '#fff', fontWeight: 700,
                          }}
                        >
                          {m.initials}
                        </div>
                      ))}
                      {room.members.length > 3 && (
                        <div
                          className="flex items-center justify-center rounded-full border-2"
                          style={{ width: '26px', height: '26px', backgroundColor: '#2D3748', borderColor: '#111827', fontSize: '9px', color: '#9CA3AF', fontWeight: 600 }}
                        >
                          +{room.members.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all duration-150 border border-blue-500/30 text-blue-500 text-xs font-bold"
                  >
                    Join <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex-shrink-0 flex flex-col p-6" style={{ width: '320px', borderLeft: '1px solid #2D3748', backgroundColor: '#0D1220' }}>
        <button
          onClick={() => setShowModal(true)}
          className="w-full flex items-center justify-center gap-2 rounded-2xl py-4 mb-6"
          style={{ background: 'linear-gradient(135deg, #F5C542, #F59E0B)', color: '#0B0F1A', fontWeight: 700, boxShadow: '0 0 24px rgba(245,197,66,0.3)' }}
        >
          <Plus size={18} />
          Create New Room
        </button>

        <div className="rounded-2xl p-5 mb-5" style={{ backgroundColor: '#111827', border: '1px solid rgba(245,197,66,0.15)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={15} color="#F5C542" />
            <h3 style={{ fontSize: '14px', color: '#F5C542', fontWeight: 700 }}>Recent AI Activity</h3>
          </div>
          <div className="space-y-4">
            {aiSuggestions.map((s, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${s.color}12` }}>
                  <s.icon size={13} color={s.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: '12px', color: s.color, fontWeight: 600, marginBottom: '2px' }}>{s.label}</p>
                  <p className="text-xs text-[#D1D5DB] truncate">{s.desc}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-[10px] text-[#6B7280]">#{s.room}</span>
                    <span className="text-[10px] text-[#4B5563]">·</span>
                    <span className="text-[10px] text-[#6B7280]">{s.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-5" style={{ backgroundColor: '#111827', border: '1px solid #2D3748' }}>
          <h3 className="text-sm text-[#F9FAFB] font-semibold mb-4">Team Online</h3>
          <div className="space-y-3">
            {[
              { name: 'Sarah R.', role: 'react-ui-overhaul', av: 'SR', color: '#F5C542' },
              { name: 'Mike R.', role: 'backend-auth', av: 'MR', color: '#22C55E' },
            ].map((m, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: m.color, color: m.color === '#F5C542' ? '#0B0F1A' : '#fff' }}>
                  {m.av}
                </div>
                <div>
                  <p className="text-sm text-[#F9FAFB] font-medium">{m.name}</p>
                  <p className="text-[11px] text-[#6B7280]">#{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && <CreateRoomModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

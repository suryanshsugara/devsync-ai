import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Plus, Users, Clock, Zap, Hash, ArrowRight, Sparkles, Bot,
  CheckCircle, AlertTriangle, TrendingUp, Code2, Lock, Globe,
  Filter, Search, MoreVertical, Star
} from 'lucide-react';
import { fetchApi } from '../lib/api';

type Room = {
  id: string;
  name: string;
  description: string;
  lang: string;
  status: string;
  private: boolean;
  starred: boolean;
  aiAssists: number;
  issuesOpen: number;
  lastActivity: string;
  members: { initials: string; color: string }[];
};



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

function CreateRoomModal({ onClose }: { onClose: () => void }) {
  const [roomName, setRoomName] = useState('');
  const [stack, setStack] = useState('typescript');
  const [isPrivate, setIsPrivate] = useState(false);
  const navigate = useNavigate();

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '11px 14px', borderRadius: '12px',
    backgroundColor: '#0B0F1A', border: '1px solid #2D3748',
    color: '#F9FAFB', fontSize: '14px', outline: 'none',
    fontFamily: "'Inter', sans-serif", boxSizing: 'border-box',
    transition: 'border-color 0.15s',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}>
      <div
        className="rounded-3xl p-8 relative"
        style={{ width: '480px', backgroundColor: '#111827', border: '1px solid #2D3748', boxShadow: '0 0 60px rgba(0,0,0,0.5)' }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F5C542, #F59E0B)', boxShadow: '0 0 16px rgba(245,197,66,0.3)' }}>
            <Plus size={18} color="#0B0F1A" />
          </div>
          <div>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '22px', color: '#F9FAFB' }}>Create New Room</h3>
            <p style={{ fontSize: '13px', color: '#9CA3AF' }}>Set up a collaborative dev space</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label style={{ fontSize: '13px', color: '#9CA3AF', display: 'block', marginBottom: '8px', fontWeight: 500 }}>Room Name</label>
            <input placeholder="e.g. backend-refactor" value={roomName} onChange={e => setRoomName(e.target.value)} style={inputStyle}
              onFocus={e => (e.target.style.borderColor = '#F5C542')} onBlur={e => (e.target.style.borderColor = '#2D3748')} />
          </div>

          <div>
            <label style={{ fontSize: '13px', color: '#9CA3AF', display: 'block', marginBottom: '8px', fontWeight: 500 }}>Tech Stack</label>
            <select value={stack} onChange={e => setStack(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
              <option value="typescript">TypeScript / Node</option>
              <option value="react">React / Next.js</option>
              <option value="python">Python / FastAPI</option>
              <option value="go">Go</option>
              <option value="rust">Rust</option>
              <option value="kubernetes">Kubernetes / DevOps</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '13px', color: '#9CA3AF', display: 'block', marginBottom: '8px', fontWeight: 500 }}>Invite Members</label>
            <input placeholder="Enter email addresses..." style={inputStyle}
              onFocus={e => (e.target.style.borderColor = '#F5C542')} onBlur={e => (e.target.style.borderColor = '#2D3748')} />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: '#0B0F1A', border: '1px solid #2D3748' }}>
            <div className="flex items-center gap-3">
              {isPrivate ? <Lock size={16} color="#9CA3AF" /> : <Globe size={16} color="#9CA3AF" />}
              <div>
                <p style={{ fontSize: '14px', color: '#F9FAFB', fontWeight: 500 }}>{isPrivate ? 'Private Room' : 'Public Room'}</p>
                <p style={{ fontSize: '12px', color: '#6B7280' }}>{isPrivate ? 'Invite-only access' : 'Anyone with link can join'}</p>
              </div>
            </div>
            <button
              onClick={() => setIsPrivate(!isPrivate)}
              className="relative rounded-full transition-all duration-200"
              style={{ width: '44px', height: '24px', backgroundColor: isPrivate ? '#F5C542' : '#2D3748', border: 'none', cursor: 'pointer' }}
            >
              <div
                className="absolute top-1 rounded-full transition-all duration-200"
                style={{ width: '16px', height: '16px', backgroundColor: '#fff', left: isPrivate ? '26px' : '4px' }}
              />
            </button>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl transition-colors"
            style={{ backgroundColor: '#1F2937', color: '#9CA3AF', border: 'none', cursor: 'pointer', fontSize: '14px', fontFamily: "'Inter', sans-serif" }}
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              try {
                const res = await fetchApi('/rooms', {
                  method: 'POST',
                  body: JSON.stringify({ name: roomName, lang: stack, description: isPrivate ? 'Private Room' : 'Public Room' })
                });
                onClose(); // In a real app we'd refresh the room list here or rely on WS
                navigate(`/room/${res.id}`);
              } catch (e) {
                console.error("Failed to create room", e);
              }
            }}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all"
            style={{
              background: 'linear-gradient(135deg, #F5C542, #F59E0B)',
              color: '#0B0F1A', fontWeight: 700, fontSize: '14px',
              border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif",
              boxShadow: '0 0 20px rgba(245,197,66,0.3)',
            }}
          >
            <Zap size={15} />
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [rooms, setRooms] = useState<Room[]>([]);
  const [user, setUser] = useState<{ id: string, name?: string, email: string } | null>(null);

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));

        const fetchedRooms = await fetchApi('/rooms');
        // Map backend format to UI expected format (stubbing some UI only properties for now)
        const mappedRooms = fetchedRooms.map((r: any) => ({
          id: r.id,
          name: r.name,
          lang: 'TypeScript',
          description: 'New Collaborative Space',
          status: 'active',
          private: false,
          starred: false,
          aiAssists: r._count?.aiUsageLogs || 0,
          issuesOpen: 0,
          lastActivity: new Date(r.updatedAt).toLocaleDateString(),
          members: r.members.map((m: any) => ({ initials: m.user.email.substring(0, 2).toUpperCase(), color: '#3B82F6' }))
        }));
        setRooms(mappedRooms);
      } catch (err) {
        console.error("Failed to load rooms", err);
        // Fallback or handle later
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
      {/* Main Area */}
      <div className="flex-1 p-8 overflow-auto">
        {/* Header */}
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

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Rooms', value: '3', change: '+1 today', color: '#22C55E', icon: Hash },
            { label: 'Team Members', value: '12', change: '8 online now', color: '#3B82F6', icon: Users },
            { label: 'AI Assists Today', value: '47', change: '+12 vs yesterday', color: '#F5C542', icon: Sparkles },
            { label: 'Bugs Resolved', value: '9', change: '100% this week', color: '#F97316', icon: CheckCircle },
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

        {/* Room Grid */}
        <div className="flex items-center justify-between mb-5">
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '20px', color: '#F9FAFB' }}>
            Your Rooms <span style={{ fontSize: '14px', color: '#6B7280', fontFamily: "'Inter', sans-serif" }}>({filtered.length})</span>
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {filtered.map(room => (
            <div
              key={room.id}
              className="rounded-2xl p-6 flex flex-col transition-all duration-200 cursor-pointer group"
              style={{ backgroundColor: '#111827', border: '1px solid #2D3748' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#3D4F65'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#2D3748'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColor[room.status] }} />
                  <span style={{ fontSize: '11px', color: statusColor[room.status], fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {room.status}
                  </span>
                  {room.private && <Lock size={11} color="#6B7280" />}
                  {room.starred && <Star size={11} color="#F5C542" fill="#F5C542" />}
                </div>
                <span
                  className="px-2 py-0.5 rounded-md"
                  style={{ fontSize: '11px', color: '#9CA3AF', backgroundColor: '#1F2937' }}
                >
                  {room.lang}
                </span>
              </div>

              {/* Room Name */}
              <div className="flex items-center gap-2 mb-2">
                <Hash size={15} color="#9CA3AF" />
                <h3 style={{ fontSize: '16px', color: '#F9FAFB', fontWeight: 600 }}>{room.name}</h3>
              </div>
              <p style={{ fontSize: '13px', color: '#9CA3AF', lineHeight: 1.6, marginBottom: '16px' }}>{room.description}</p>

              {/* AI Stats */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{ backgroundColor: 'rgba(245,197,66,0.08)', border: '1px solid rgba(245,197,66,0.15)' }}>
                  <Sparkles size={11} color="#F5C542" />
                  <span style={{ fontSize: '11px', color: '#F5C542', fontWeight: 600 }}>{room.aiAssists} AI assists</span>
                </div>
                {room.issuesOpen > 0 && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{ backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)' }}>
                    <AlertTriangle size={11} color="#EF4444" />
                    <span style={{ fontSize: '11px', color: '#EF4444', fontWeight: 600 }}>{room.issuesOpen} open</span>
                  </div>
                )}
              </div>

              {/* Members */}
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
                  <div className="flex items-center gap-1">
                    <Clock size={11} color="#6B7280" />
                    <span style={{ fontSize: '11px', color: '#6B7280' }}>{room.lastActivity}</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/room/${room.id}`)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all duration-150"
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid rgba(59,130,246,0.3)',
                    color: '#3B82F6', fontSize: '12px', fontWeight: 600,
                    cursor: 'pointer', fontFamily: "'Inter', sans-serif",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(59,130,246,0.1)'; (e.currentTarget as HTMLElement).style.borderColor = '#3B82F6'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(59,130,246,0.3)'; }}
                >
                  Join <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div
        className="flex-shrink-0 flex flex-col p-6"
        style={{ width: '320px', borderLeft: '1px solid #2D3748', backgroundColor: '#0D1220' }}
      >
        {/* Create Room CTA */}
        <button
          onClick={() => setShowModal(true)}
          className="w-full flex items-center justify-center gap-2 rounded-2xl py-4 mb-6 transition-all duration-200"
          style={{
            background: 'linear-gradient(135deg, #F5C542, #F59E0B)',
            color: '#0B0F1A', fontWeight: 700, fontSize: '15px',
            border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif",
            boxShadow: '0 0 24px rgba(245,197,66,0.3)',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 36px rgba(245,197,66,0.5)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(245,197,66,0.3)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
        >
          <Plus size={18} />
          Create New Room
        </button>

        {/* AI Suggestions Panel */}
        <div
          className="rounded-2xl p-5 mb-5"
          style={{
            backgroundColor: '#111827',
            border: '1px solid rgba(245,197,66,0.15)',
            boxShadow: '0 0 20px rgba(245,197,66,0.05)',
          }}
        >
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
                  <p style={{ fontSize: '12px', color: '#D1D5DB', lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.desc}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span style={{ fontSize: '10px', color: '#6B7280' }}>#{s.room}</span>
                    <span style={{ fontSize: '10px', color: '#4B5563' }}>·</span>
                    <span style={{ fontSize: '10px', color: '#6B7280' }}>{s.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Online */}
        <div className="rounded-2xl p-5" style={{ backgroundColor: '#111827', border: '1px solid #2D3748' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ fontSize: '14px', color: '#F9FAFB', fontWeight: 600 }}>Team Online</h3>
            <span
              className="px-2 py-0.5 rounded-full text-xs font-semibold"
              style={{ backgroundColor: 'rgba(34,197,94,0.12)', color: '#22C55E', fontSize: '11px' }}
            >
              8 online
            </span>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Sarah R.', role: 'react-ui-overhaul', av: 'SR', color: '#F5C542' },
              { name: 'Mike R.', role: 'backend-auth', av: 'MR', color: '#22C55E' },
              { name: 'Jake P.', role: 'backend-auth', av: 'JP', color: '#F97316' },
              { name: 'Priya P.', role: 'ml-pipeline', av: 'PP', color: '#6366F1' },
            ].map((m, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="relative">
                  <div
                    className="flex items-center justify-center rounded-full"
                    style={{ width: '30px', height: '30px', backgroundColor: m.color, fontSize: '10px', color: m.color === '#F5C542' ? '#0B0F1A' : '#fff', fontWeight: 700 }}
                  >
                    {m.av}
                  </div>
                  <div className="absolute bottom-0 right-0 rounded-full border" style={{ width: '8px', height: '8px', backgroundColor: '#22C55E', borderColor: '#111827' }} />
                </div>
                <div className="flex-1">
                  <p style={{ fontSize: '13px', color: '#F9FAFB', fontWeight: 500 }}>{m.name}</p>
                  <p style={{ fontSize: '11px', color: '#6B7280' }}>#{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics shortcut */}
        <button
          onClick={() => navigate('/analytics')}
          className="flex items-center justify-between w-full rounded-2xl p-4 mt-4 transition-all duration-150"
          style={{ backgroundColor: '#111827', border: '1px solid #2D3748', cursor: 'pointer', textAlign: 'left' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#3B82F6'; (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(59,130,246,0.05)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#2D3748'; (e.currentTarget as HTMLElement).style.backgroundColor = '#111827'; }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(59,130,246,0.12)' }}>
              <TrendingUp size={15} color="#3B82F6" />
            </div>
            <div>
              <p style={{ fontSize: '13px', color: '#F9FAFB', fontWeight: 500 }}>Team Analytics</p>
              <p style={{ fontSize: '11px', color: '#9CA3AF' }}>View full report</p>
            </div>
          </div>
          <ArrowRight size={14} color="#6B7280" />
        </button>
      </div>

      {showModal && <CreateRoomModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

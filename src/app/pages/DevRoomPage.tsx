import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  Sparkles, Send, Paperclip, Code2, Users, Hash, Radio,
  ChevronRight, AlertTriangle, CheckCircle, Lightbulb, TrendingUp,
  Zap, RefreshCw, Copy, ThumbsUp, ThumbsDown, MoreVertical,
  FileCode, Terminal, ArrowUpRight, X, Settings, Wifi
} from 'lucide-react';

import { io, Socket } from 'socket.io-client';
import { fetchApi } from '../lib/api';

const members = [
  { initials: 'AK', name: 'Alex Kumar', role: 'Team Lead', color: '#3B82F6', file: 'auth.service.ts', status: 'coding' },
  { initials: 'SR', name: 'Sarah R.', role: 'Frontend', color: '#F5C542', file: 'hooks/useAuth.ts', status: 'reviewing' },
  { initials: 'MR', name: 'Mike R.', role: 'Backend', color: '#22C55E', file: 'middleware/jwt.ts', status: 'coding' },
  { initials: 'JP', name: 'Jake P.', role: 'DevOps', color: '#F97316', file: 'docker-compose.yml', status: 'idle' },
];

type MessageType = {
  id: string; // Updated from number to UUID string to match DB
  sender: string;
  initials: string;
  color: string;
  time: string;
  content: string;
  code?: string;
  isAI?: boolean;
  aiType?: 'fix' | 'explain' | 'optimize';
};

// Removing unused initialMessages variable

const aiSuggestions = [
  {
    type: 'fix' as const,
    icon: CheckCircle,
    color: '#22C55E',
    bgColor: 'rgba(34,197,94,0.08)',
    borderColor: 'rgba(34,197,94,0.2)',
    title: 'Suggested Fix',
    content: 'Cookie key mismatch: refreshToken → refresh_token in jwt.ts:47',
    confidence: 94,
  },
  {
    type: 'explain' as const,
    icon: AlertTriangle,
    color: '#EF4444',
    bgColor: 'rgba(239,68,68,0.08)',
    borderColor: 'rgba(239,68,68,0.2)',
    title: 'Error Explanation',
    content: '401 occurs when token validation fails at middleware level before route handler executes.',
    confidence: 89,
  },
  {
    type: 'optimize' as const,
    icon: TrendingUp,
    color: '#3B82F6',
    bgColor: 'rgba(59,130,246,0.08)',
    borderColor: 'rgba(59,130,246,0.2)',
    title: 'Optimization Advice',
    content: 'Implement token rotation + blocklist to prevent refresh token replay attacks.',
    confidence: 76,
  },
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#1F2937', border: '1px solid rgba(245,197,66,0.4)' }}>
        <Sparkles size={8} color="#F5C542" />
      </div>
      <div className="px-3 py-2 rounded-xl flex items-center gap-1" style={{ backgroundColor: 'rgba(245,197,66,0.06)', border: '1px solid rgba(245,197,66,0.2)' }}>
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: '#F5C542',
              animation: `bounce 1.2s ease-in-out ${i * 0.15}s infinite`,
            }}
          />
        ))}
      </div>
      <span style={{ fontSize: '11px', color: '#9CA3AF' }}>AI Copilot is analyzing...</span>
    </div>
  );
}

export default function DevRoomPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [room, setRoom] = useState<{ id: string, name: string } | null>(null);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    // 1. Fetch Room Meta Context
    const loadRoom = async () => {
      try {
        const r = await fetchApi(`/rooms/${roomId}`);
        setRoom(r);
        // Map backend history format to UI
        if (r.messages) {
          const history = r.messages.map((m: any) => ({
            id: m.id,
            sender: m.isAi ? 'AI Copilot' : m.user?.email || 'Unknown',
            initials: m.isAi ? '✦' : (m.user?.email?.substring(0, 2).toUpperCase() || '?'),
            color: m.isAi ? '#F5C542' : '#3B82F6',
            time: new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            content: m.content,
            isAI: m.isAi
          }));
          setMessages(history);
        }
      } catch (err: any) {
        if (err.message.includes('Forbidden')) {
          // Attempt to join the room if we are not a member yet.
          await fetchApi(`/rooms/${roomId}/join`, { method: 'POST' }).catch(() => navigate('/dashboard'));
          // Reload page to retry fetching room context
          window.location.reload();
        } else {
          navigate('/dashboard');
        }
      }
    };

    loadRoom();

    // 2. Establish WebSocket Connection
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/auth');
      return;
    }

    const newSocket = io('http://localhost:3000', {
      auth: { token },
      transports: ['websocket'],
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      newSocket.emit('joinRoom', { roomId });
    });

    newSocket.on('newMessage', (msg: any) => {
      setMessages(prev => [...prev, {
        id: msg.id,
        sender: msg.isAi ? 'AI Copilot' : msg.user?.email || 'Unknown',
        initials: msg.isAi ? '✦' : (msg.user?.email?.substring(0, 2).toUpperCase() || '?'),
        color: msg.isAi ? '#F5C542' : '#22C55E',
        time: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: msg.content,
        isAI: msg.isAi
      }]);
    });

    newSocket.on('aiTyping', ({ isTyping }: { isTyping: boolean }) => {
      setIsTyping(isTyping);
    });

    newSocket.on('error', (err: any) => {
      console.error('WS Error:', err);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomId, navigate]);

  const sendMessage = () => {
    if (!input.trim() || !socket) return;
    socket.emit('sendMessage', { roomId, content: input });
    setInput('');
  };

  return (
    <div className="flex" style={{ height: 'calc(100vh - 64px)', backgroundColor: '#0B0F1A', fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 8px rgba(245,197,66,0.3); }
          50% { box-shadow: 0 0 20px rgba(245,197,66,0.6); }
        }
      `}</style>

      {/* LEFT PANEL — Members (20%) */}
      <div
        className="flex-shrink-0 flex flex-col"
        style={{ width: '220px', borderRight: '1px solid #2D3748', backgroundColor: '#0D1220', overflow: 'hidden' }}
      >
        <div className="p-4" style={{ borderBottom: '1px solid #2D3748' }}>
          <p style={{ fontSize: '10px', color: '#6B7280', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Room Members
          </p>
          <div className="space-y-3">
            {members.map((m, i) => (
              <div key={i} className="flex items-start gap-2.5 group">
                <div className="relative flex-shrink-0">
                  <div
                    className="flex items-center justify-center rounded-full"
                    style={{ width: '32px', height: '32px', backgroundColor: m.color, fontSize: '10px', color: m.color === '#F5C542' ? '#0B0F1A' : '#fff', fontWeight: 700 }}
                  >
                    {m.initials}
                  </div>
                  <div
                    className="absolute bottom-0 right-0 rounded-full border-2"
                    style={{ width: '10px', height: '10px', backgroundColor: m.status === 'idle' ? '#F97316' : '#22C55E', borderColor: '#0D1220' }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: '12px', color: '#F9FAFB', fontWeight: 600 }}>{m.name}</p>
                  <p style={{ fontSize: '10px', color: '#9CA3AF' }}>{m.role}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <FileCode size={9} color="#6B7280" />
                    <p style={{ fontSize: '9px', color: '#6B7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {m.file}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Files */}
        <div className="p-4 flex-1">
          <p style={{ fontSize: '10px', color: '#6B7280', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>
            Active Files
          </p>
          <div className="space-y-1.5">
            {['middleware/jwt.ts', 'auth.service.ts', 'hooks/useAuth.ts'].map((f, i) => (
              <button
                key={i}
                onClick={() => navigate(`/code/${roomId}`)}
                className="w-full flex items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors"
                style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1F2937')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <Code2 size={11} color="#9CA3AF" />
                <span style={{ fontSize: '11px', color: '#D1D5DB', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CENTER PANEL — Chat (50%) */}
      <div className="flex-1 flex flex-col" style={{ overflow: 'hidden' }}>
        {/* Chat Top Bar */}
        <div
          className="flex items-center justify-between px-6 flex-shrink-0"
          style={{ height: '56px', borderBottom: '1px solid #2D3748', backgroundColor: '#0D1220' }}
        >
          <div className="flex items-center gap-3">
            <Hash size={16} color="#9CA3AF" />
            <span style={{ fontSize: '15px', color: '#F9FAFB', fontWeight: 600 }}>
              {room?.name || 'Loading room...'}
            </span>
            <div className="flex items-center gap-1.5 ml-2">
              <Users size={13} color="#9CA3AF" />
              <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{members.length} active</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* LIVE Badge */}
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                backgroundColor: 'rgba(239,68,68,0.12)',
                border: '1px solid rgba(239,68,68,0.3)',
                animation: 'pulse-glow 2s ease-in-out infinite',
              }}
            >
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#EF4444' }} />
              <span style={{ fontSize: '11px', color: '#EF4444', fontWeight: 700, letterSpacing: '0.08em' }}>LIVE</span>
            </div>
            <button
              onClick={() => navigate(`/code/${roomId}`)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-colors"
              style={{ backgroundColor: '#1F2937', border: '1px solid #2D3748', color: '#9CA3AF', fontSize: '12px', cursor: 'pointer' }}
            >
              <Code2 size={13} />
              Code View
            </button>
            <button
              className="p-1.5 rounded-xl transition-colors"
              style={{ color: '#9CA3AF', cursor: 'pointer', background: 'none', border: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F9FAFB')}
              onMouseLeave={e => (e.currentTarget.style.color = '#9CA3AF')}
            >
              <Settings size={15} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {messages.map(msg => (
            <div key={msg.id} className={`flex items-start gap-3 group ${msg.isAI ? '' : ''}`}>
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: '32px', height: '32px',
                    backgroundColor: msg.isAI ? '#1F2937' : msg.color,
                    border: msg.isAI ? '1px solid rgba(245,197,66,0.4)' : 'none',
                    fontSize: msg.isAI ? '12px' : '10px',
                    color: msg.isAI ? '#F5C542' : (msg.color === '#F5C542' ? '#0B0F1A' : '#fff'),
                    fontWeight: 700,
                  }}
                >
                  {msg.isAI ? <Sparkles size={12} /> : msg.initials}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span style={{ fontSize: '13px', color: msg.isAI ? '#F5C542' : '#F9FAFB', fontWeight: 600 }}>
                    {msg.sender}
                  </span>
                  {msg.isAI && (
                    <span
                      className="px-1.5 py-0.5 rounded-md"
                      style={{ fontSize: '10px', color: '#F5C542', backgroundColor: 'rgba(245,197,66,0.1)', fontWeight: 600, letterSpacing: '0.05em' }}
                    >
                      AI
                    </span>
                  )}
                  <span style={{ fontSize: '11px', color: '#6B7280' }}>{msg.time}</span>
                </div>

                {/* Message bubble */}
                <div
                  className="rounded-2xl p-4 max-w-xl"
                  style={msg.isAI ? {
                    backgroundColor: 'rgba(245,197,66,0.05)',
                    border: '1px solid rgba(245,197,66,0.25)',
                    boxShadow: '0 0 20px rgba(245,197,66,0.08)',
                  } : {
                    backgroundColor: '#1F2937',
                    border: '1px solid #2D3748',
                  }}
                >
                  <p style={{ fontSize: '14px', color: '#D1D5DB', lineHeight: 1.65 }}>{msg.content}</p>
                  {msg.code && (
                    <div
                      className="mt-3 rounded-xl p-3 font-mono"
                      style={{ backgroundColor: '#0B0F1A', border: '1px solid #2D3748', fontSize: '12px', color: '#22C55E', lineHeight: 1.7, whiteSpace: 'pre-wrap', overflow: 'auto' }}
                    >
                      {msg.code}
                    </div>
                  )}
                  {msg.isAI && (
                    <div className="flex items-center gap-2 mt-3 pt-3" style={{ borderTop: '1px solid rgba(245,197,66,0.1)' }}>
                      <button className="flex items-center gap-1 px-2 py-1 rounded-lg transition-colors" style={{ color: '#9CA3AF', fontSize: '11px', background: 'none', border: 'none', cursor: 'pointer' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#22C55E')} onMouseLeave={e => (e.currentTarget.style.color = '#9CA3AF')}>
                        <ThumbsUp size={11} /> Helpful
                      </button>
                      <button className="flex items-center gap-1 px-2 py-1 rounded-lg transition-colors" style={{ color: '#9CA3AF', fontSize: '11px', background: 'none', border: 'none', cursor: 'pointer' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#EF4444')} onMouseLeave={e => (e.currentTarget.style.color = '#9CA3AF')}>
                        <ThumbsDown size={11} /> Not quite
                      </button>
                      <button className="flex items-center gap-1 px-2 py-1 rounded-lg transition-colors ml-auto" style={{ color: '#9CA3AF', fontSize: '11px', background: 'none', border: 'none', cursor: 'pointer' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#F9FAFB')} onMouseLeave={e => (e.currentTarget.style.color = '#9CA3AF')}>
                        <Copy size={11} /> Copy
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="px-1">
              <TypingIndicator />
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 flex-shrink-0" style={{ borderTop: '1px solid #2D3748', backgroundColor: '#0D1220' }}>
          <div
            className="flex items-end gap-3 rounded-2xl p-3"
            style={{ backgroundColor: '#111827', border: '1px solid #2D3748' }}
          >
            <div className="flex gap-2">
              <button
                className="p-2 rounded-xl transition-colors"
                style={{ color: '#6B7280', background: 'none', border: 'none', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#9CA3AF')}
                onMouseLeave={e => (e.currentTarget.style.color = '#6B7280')}
              >
                <Paperclip size={16} />
              </button>
              <button
                className="p-2 rounded-xl transition-colors"
                style={{ color: '#6B7280', background: 'none', border: 'none', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#9CA3AF')}
                onMouseLeave={e => (e.currentTarget.style.color = '#6B7280')}
              >
                <Code2 size={16} />
              </button>
            </div>

            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder="Message #backend-auth..."
              rows={1}
              className="flex-1 resize-none outline-none"
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#F9FAFB',
                fontSize: '14px',
                lineHeight: '1.5',
                fontFamily: "'Inter', sans-serif",
                maxHeight: '120px',
                overflowY: 'auto',
              }}
            />

            <div className="flex items-center gap-2">
              <button
                className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-150"
                style={{
                  backgroundColor: 'rgba(245,197,66,0.1)',
                  border: '1px solid rgba(245,197,66,0.3)',
                  color: '#F5C542', fontSize: '12px', fontWeight: 700,
                  cursor: 'pointer', fontFamily: "'Inter', sans-serif",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(245,197,66,0.2)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(245,197,66,0.1)'; }}
              >
                <Sparkles size={13} />
                Ask AI
              </button>
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="p-2.5 rounded-xl transition-all duration-150"
                style={{
                  background: input.trim() ? 'linear-gradient(135deg, #3B82F6, #2563EB)' : '#1F2937',
                  border: 'none', cursor: input.trim() ? 'pointer' : 'not-allowed',
                  color: '#fff',
                }}
              >
                <Send size={15} />
              </button>
            </div>
          </div>
          <p style={{ fontSize: '11px', color: '#4B5563', marginTop: '8px', textAlign: 'center' }}>
            Press Enter to send · Shift+Enter for new line · Use @AI to invoke copilot
          </p>
        </div>
      </div>

      {/* RIGHT PANEL — AI Copilot (30%) */}
      <div
        className="flex-shrink-0 flex flex-col"
        style={{
          width: '300px',
          borderLeft: '1px solid rgba(245,197,66,0.15)',
          backgroundColor: '#0D1220',
          boxShadow: 'inset -1px 0 30px rgba(245,197,66,0.03)',
          overflow: 'hidden',
        }}
      >
        {/* Copilot Header */}
        <div
          className="flex items-center justify-between p-4 flex-shrink-0"
          style={{
            borderBottom: '1px solid rgba(245,197,66,0.12)',
            background: 'linear-gradient(180deg, rgba(245,197,66,0.05) 0%, transparent 100%)',
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="flex items-center justify-center w-7 h-7 rounded-xl"
              style={{ background: 'linear-gradient(135deg, rgba(245,197,66,0.2), rgba(245,197,66,0.05))', border: '1px solid rgba(245,197,66,0.3)', animation: 'pulse-glow 2s ease-in-out infinite' }}
            >
              <Sparkles size={13} color="#F5C542" />
            </div>
            <span style={{ fontSize: '13px', color: '#F5C542', fontWeight: 700 }}>AI Copilot</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#22C55E' }} />
            <span style={{ fontSize: '10px', color: '#22C55E', fontWeight: 600 }}>ACTIVE</span>
          </div>
        </div>

        {/* Context Awareness */}
        <div
          className="mx-3 mt-3 rounded-xl p-3 flex-shrink-0"
          style={{ backgroundColor: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)' }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <Wifi size={11} color="#3B82F6" />
            <span style={{ fontSize: '11px', color: '#3B82F6', fontWeight: 700 }}>Context Awareness Enabled</span>
          </div>
          <p style={{ fontSize: '11px', color: '#9CA3AF', lineHeight: 1.5 }}>
            Monitoring active discussion + code snippets in{' '}
            <span style={{ color: '#D1D5DB', fontWeight: 600 }}>middleware/jwt.ts</span>
          </p>
        </div>

        {/* AI Suggestions */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {aiSuggestions.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl p-4 transition-all duration-200"
              style={{
                backgroundColor: s.bgColor,
                border: `1px solid ${s.borderColor}`,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 16px ${s.bgColor.replace('0.08', '0.15')}`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
            >
              <div className="flex items-center gap-2 mb-2">
                <s.icon size={13} color={s.color} />
                <span style={{ fontSize: '11px', color: s.color, fontWeight: 700 }}>{s.title}</span>
              </div>
              <p style={{ fontSize: '12px', color: '#D1D5DB', lineHeight: 1.6, marginBottom: '10px' }}>
                {s.content}
              </p>
              {/* Confidence Bar */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span style={{ fontSize: '10px', color: '#9CA3AF' }}>AI Confidence</span>
                  <span style={{ fontSize: '10px', color: s.color, fontWeight: 700 }}>{s.confidence}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#2D3748' }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${s.confidence}%`, backgroundColor: s.color }}
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  className="flex-1 py-1.5 rounded-xl text-center transition-colors"
                  style={{ backgroundColor: `${s.color}18`, color: s.color, fontSize: '11px', fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  Apply Fix
                </button>
                <button
                  className="py-1.5 px-3 rounded-xl transition-colors"
                  style={{ backgroundColor: '#1F2937', color: '#9CA3AF', fontSize: '11px', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}
                >
                  Explain
                </button>
              </div>
            </div>
          ))}

          {/* Bug notification */}
          <div
            className="rounded-2xl p-4"
            style={{
              background: 'linear-gradient(135deg, rgba(239,68,68,0.08), rgba(239,68,68,0.04))',
              border: '1px solid rgba(239,68,68,0.25)',
              boxShadow: '0 0 12px rgba(239,68,68,0.08)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#EF4444' }} />
              <span style={{ fontSize: '11px', color: '#EF4444', fontWeight: 700 }}>AI Detected Potential Bug</span>
            </div>
            <p style={{ fontSize: '12px', color: '#D1D5DB', lineHeight: 1.6 }}>
              No error boundary around async auth calls. Unhandled promise rejections may cause silent failures.
            </p>
            <button
              className="mt-3 flex items-center gap-1.5 transition-colors"
              style={{ color: '#EF4444', fontSize: '11px', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif", padding: 0 }}
            >
              View details <ArrowUpRight size={11} />
            </button>
          </div>

          {/* Generate Code */}
          <button
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-200"
            style={{
              backgroundColor: 'rgba(245,197,66,0.08)',
              border: '1px solid rgba(245,197,66,0.2)',
              color: '#F5C542', fontSize: '13px', fontWeight: 700,
              cursor: 'pointer', fontFamily: "'Inter', sans-serif",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(245,197,66,0.14)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 16px rgba(245,197,66,0.15)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(245,197,66,0.08)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
          >
            <Zap size={14} />
            Generate Full Fix
          </button>
        </div>

        {/* Copilot Footer */}
        <div
          className="p-3 flex-shrink-0"
          style={{ borderTop: '1px solid rgba(245,197,66,0.1)' }}
        >
          <div className="flex items-center gap-2 justify-center">
            <RefreshCw size={11} color="#6B7280" />
            <span style={{ fontSize: '11px', color: '#6B7280' }}>Syncing with codebase...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

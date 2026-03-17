import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  Sparkles, Send, Paperclip, Code2, Users, Hash,
  AlertTriangle, CheckCircle, TrendingUp, Zap, RefreshCw, Copy, 
  ThumbsUp, ThumbsDown, FileCode, Settings, Wifi, ArrowUpRight
} from 'lucide-react';
import { io, Socket } from 'socket.io-client';
import { fetchApi } from '../lib/api';
import { TypingIndicator } from '../components/TypingIndicator';
import { Message, RoomMember, Room } from '../types';

const members: RoomMember[] = [
  { initials: 'AK', name: 'Alex Kumar', role: 'Team Lead', color: '#3B82F6', file: 'auth.service.ts', status: 'coding' },
  { initials: 'SR', name: 'Sarah R.', role: 'Frontend', color: '#F5C542', file: 'hooks/useAuth.ts', status: 'reviewing' },
  { initials: 'MR', name: 'Mike R.', role: 'Backend', color: '#22C55E', file: 'middleware/jwt.ts', status: 'coding' },
  { initials: 'JP', name: 'Jake P.', role: 'DevOps', color: '#F97316', file: 'docker-compose.yml', status: 'idle' },
];

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

export default function DevRoomPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [room, setRoom] = useState<Room | null>(null);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    const loadRoom = async () => {
      try {
        const r = await fetchApi(`/rooms/${roomId}`);
        setRoom(r);
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
        if (err.status === 403) {
          await fetchApi(`/rooms/${roomId}/join`, { method: 'POST' }).catch(() => navigate('/dashboard'));
          window.location.reload();
        } else {
          navigate('/dashboard');
        }
      }
    };

    loadRoom();

    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/auth');
      return;
    }

    const socketUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const newSocket = io(socketUrl, {
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
      <div className="flex-shrink-0 flex flex-col" style={{ width: '220px', borderRight: '1px solid #2D3748', backgroundColor: '#0D1220', overflow: 'hidden' }}>
        <div className="p-4" style={{ borderBottom: '1px solid #2D3748' }}>
          <p className="text-[10px] text-[#6B7280] font-bold tracking-widest uppercase mb-4">Room Members</p>
          <div className="space-y-3">
            {members.map((m, i) => (
              <div key={i} className="flex items-start gap-2.5 group">
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: m.color, color: m.color === '#F5C542' ? '#0B0F1A' : '#fff' }}>
                    {m.initials}
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#0D1220]" style={{ backgroundColor: m.status === 'idle' ? '#F97316' : '#22C55E' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#F9FAFB] font-semibold truncate">{m.name}</p>
                  <p className="text-[10px] text-[#9CA3AF] truncate">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 h-14 border-b border-[#2D3748] bg-[#0D1220]">
          <div className="flex items-center gap-3">
            <Hash size={16} color="#9CA3AF" />
            <span className="text-sm text-[#F9FAFB] font-semibold">{room?.name || 'Loading room...'}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/30">
              <div className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse" />
              <span className="text-[10px] text-[#EF4444] font-bold tracking-widest">LIVE</span>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#2D3748] bg-[#1F2937] text-[#9CA3AF] text-xs">
              <Code2 size={13} />
              Code View
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {messages.map(msg => (
            <div key={msg.id} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: msg.isAI ? '#1F2937' : msg.color, border: msg.isAI ? '1px solid rgba(245,197,66,0.4)' : 'none', color: msg.isAI ? '#F5C542' : '#fff' }}>
                {msg.isAI ? <Sparkles size={12} /> : msg.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-sm font-semibold" style={{ color: msg.isAI ? '#F5C542' : '#F9FAFB' }}>{msg.sender}</span>
                  {msg.isAI && <span className="px-1.5 py-0.5 rounded-md bg-[#F5C542]/10 text-[#F5C542] text-[10px] font-bold">AI</span>}
                  <span className="text-xs text-[#6B7280]">{msg.time}</span>
                </div>
                <div className={`rounded-2xl p-4 max-w-xl ${msg.isAI ? 'bg-[#F5C542]/5 border border-[#F5C542]/20' : 'bg-[#1F2937] border border-[#2D3748]'}`}>
                  <p className="text-sm text-[#D1D5DB] leading-relaxed">{msg.content}</p>
                  {msg.code && (
                    <div className="mt-3 rounded-xl p-3 bg-[#0B0F1A] border border-[#2D3748] font-mono text-xs text-[#22C55E] overflow-auto">
                      {msg.code}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        <div className="p-4 border-t border-[#2D3748] bg-[#0D1220]">
          <div className="flex items-end gap-3 rounded-2xl p-3 bg-[#111827] border border-[#2D3748]">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder={`Message #${room?.name || 'room'}...`}
              rows={1}
              className="flex-1 bg-transparent border-none text-[#F9FAFB] text-sm outline-none resize-none max-h-32"
            />
            <button
               onClick={sendMessage}
               disabled={!input.trim()}
               className="p-2.5 rounded-xl transition-all"
               style={{ background: input.trim() ? 'linear-gradient(135deg, #3B82F6, #2563EB)' : '#1F2937', color: '#fff' }}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      </div>

      <div className="w-[300px] flex-shrink-0 flex flex-col border-l border-[#F5C542]/10 bg-[#0D1220] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-[#F5C542]/10 bg-gradient-to-b from-[#F5C542]/5 to-transparent">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl flex items-center justify-center bg-[#F5C542]/10 border border-[#F5C542]/30 shadow-[#F5C542]/20 shadow-sm">
              <Sparkles size={13} color="#F5C542" />
            </div>
            <span className="text-sm text-[#F5C542] font-bold">AI Copilot</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
            <span className="text-[10px] text-[#22C55E] font-bold">ACTIVE</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {aiSuggestions.map((s, i) => (
            <div key={i} className="rounded-2xl p-4 border transition-all" style={{ backgroundColor: s.bgColor, borderColor: s.borderColor }}>
              <div className="flex items-center gap-2 mb-2">
                <s.icon size={13} color={s.color} />
                <span className="text-[11px] font-bold" style={{ color: s.color }}>{s.title}</span>
              </div>
              <p className="text-xs text-[#D1D5DB] leading-relaxed mb-3">{s.content}</p>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-[#9CA3AF]">AI Confidence</span>
                <span className="text-[10px] font-bold" style={{ color: s.color }}>{s.confidence}%</span>
              </div>
              <div className="h-1 bg-[#2D3748] rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${s.confidence}%`, backgroundColor: s.color }} />
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-[#F5C542]/10 text-center">
            <div className="flex items-center justify-center gap-2 opacity-50">
               <RefreshCw size={11} color="#6B7280" />
               <span className="text-[10px] text-[#6B7280]">Syncing with codebase...</span>
            </div>
        </div>
      </div>
    </div>
  );
}

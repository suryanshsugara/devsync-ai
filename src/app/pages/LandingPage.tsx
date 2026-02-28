import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Zap, Users, Bot, Radio, ArrowRight, Play,
  MessageSquare, Sparkles, CheckCircle,
  ChevronRight, Cpu, BarChart3, Github, Star, TrendingUp
} from 'lucide-react';

const features = [
  { icon: Radio, title: 'Real-Time Rooms', desc: 'Spin up collaborative dev rooms in seconds. Share code, context, and conversations with your team live.', color: '#3B82F6', glow: 'rgba(59,130,246,0.18)' },
  { icon: Bot, title: 'AI Bug Resolution', desc: 'Contextual AI analyzes your code and conversation to surface fixes before bugs become blockers.', color: '#F5C542', glow: 'rgba(245,197,66,0.18)' },
  { icon: Cpu, title: 'Context-Aware Support', desc: 'The AI learns from your tech stack, history, and active discussion to provide precision assistance.', color: '#22C55E', glow: 'rgba(34,197,94,0.18)' },
];

const stats = [
  { value: '10k+', label: 'Developers' },
  { value: '98%', label: 'Bug Resolution' },
  { value: '< 2s', label: 'AI Response' },
  { value: '50+', label: 'Integrations' },
];

const testimonials = [
  { name: 'Sarah Chen', role: 'Senior Engineer @ Stripe', avatar: 'SC', color: '#3B82F6', text: 'DevSync AI caught a race condition that would have taken us days to debug. The AI copilot is genuinely impressive.' },
  { name: 'Marcus Rivera', role: 'CTO @ Vercel', avatar: 'MR', color: '#F5C542', text: 'We replaced 4 tools with DevSync. Real-time collaboration + AI in one panel changed how our team ships.' },
  { name: 'Priya Patel', role: 'Lead Dev @ Linear', avatar: 'PP', color: '#22C55E', text: 'The context-aware AI is mind-blowing. It understands our stack and gives suggestions that actually make sense.' },
];

const roadmapItems = [
  { phase: 'Q2 2026', status: 'live', title: 'Core Platform', items: ['3-panel Dev Chat Room', 'AI Copilot v1', 'Real-time collaboration', 'Basic analytics'] },
  { phase: 'Q3 2026', status: 'next', title: 'AI Deep Dive', items: ['AI code generation', 'Multi-model support', 'Git integration', 'Context memory'] },
  { phase: 'Q4 2026', status: 'planned', title: 'Enterprise Scale', items: ['SSO + RBAC', 'On-premise deploy', 'Custom AI tuning', 'Audit logs'] },
  { phase: '2027', status: 'vision', title: 'Autonomous AI', items: ['Auto bug resolution', 'Predictive quality', 'Voice-to-code', 'AI team personas'] },
];

const roadmapColors: Record<string, { color: string; bg: string; border: string }> = {
  live: { color: '#22C55E', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.25)' },
  next: { color: '#F5C542', bg: 'rgba(245,197,66,0.1)', border: 'rgba(245,197,66,0.25)' },
  planned: { color: '#3B82F6', bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.25)' },
  vision: { color: '#A78BFA', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.25)' },
};

// Mock 3-panel preview (compact for hero)
function HeroPreview() {
  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{
        backgroundColor: '#111827',
        border: '1px solid #2D3748',
        boxShadow: '0 0 60px rgba(245,197,66,0.1), 0 0 120px rgba(59,130,246,0.07)',
        width: '100%',
        maxWidth: '580px',
      }}
    >
      {/* Chrome */}
      <div className="flex items-center gap-2 px-4" style={{ height: '34px', backgroundColor: '#0D1220', borderBottom: '1px solid #2D3748' }}>
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#EF4444' }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#F97316' }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#22C55E' }} />
        <div className="flex-1 flex justify-center">
          <div className="px-3 py-0.5 rounded-md" style={{ backgroundColor: '#1F2937', fontSize: '10px', color: '#9CA3AF' }}>devsync.ai/room/backend-auth</div>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)' }}>
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#EF4444' }} />
          <span style={{ fontSize: '9px', color: '#EF4444', fontWeight: 700 }}>LIVE</span>
        </div>
      </div>
      {/* 3 panels */}
      <div className="flex" style={{ height: '300px' }}>
        {/* Left: Members */}
        <div className="flex-shrink-0 p-3" style={{ width: '100px', backgroundColor: '#0D1220', borderRight: '1px solid #2D3748' }}>
          <p style={{ fontSize: '8px', color: '#6B7280', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '8px' }}>MEMBERS</p>
          {[{ av: 'AK', c: '#3B82F6', n: 'Alex', s: 'coding' }, { av: 'SR', c: '#F5C542', n: 'Sarah', s: 'reviewing' }, { av: 'MR', c: '#22C55E', n: 'Mike', s: 'coding' }].map(m => (
            <div key={m.av} className="flex items-center gap-1.5 mb-2.5">
              <div className="relative">
                <div className="flex items-center justify-center rounded-full" style={{ width: '22px', height: '22px', backgroundColor: m.c, fontSize: '7px', color: m.c === '#F5C542' ? '#0B0F1A' : '#fff', fontWeight: 700 }}>{m.av}</div>
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full border" style={{ backgroundColor: '#22C55E', borderColor: '#0D1220' }} />
              </div>
              <div><p style={{ fontSize: '8px', color: '#F9FAFB' }}>{m.n}</p><p style={{ fontSize: '7px', color: '#22C55E' }}>{m.s}</p></div>
            </div>
          ))}
        </div>
        {/* Center: Chat */}
        <div className="flex-1 flex flex-col p-3" style={{ backgroundColor: '#111827' }}>
          <div className="flex-1 space-y-2 overflow-hidden">
            <div className="flex items-start gap-1.5">
              <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: '#3B82F6', fontSize: '7px', color: '#fff', fontWeight: 700 }}>AK</div>
              <div className="rounded-xl p-2" style={{ backgroundColor: '#1F2937' }}>
                <p style={{ fontSize: '9px', color: '#D1D5DB' }}>Getting 401 on /api/auth/refresh.</p>
              </div>
            </div>
            <div className="flex items-start gap-1.5">
              <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: '#F5C542', fontSize: '7px', color: '#0B0F1A', fontWeight: 700 }}>SR</div>
              <div className="rounded-xl p-2" style={{ backgroundColor: '#1F2937' }}>
                <div className="font-mono rounded p-1.5 mb-1" style={{ backgroundColor: '#0B0F1A', fontSize: '8px', color: '#22C55E' }}>Bearer {'${token}'}</div>
                <p style={{ fontSize: '9px', color: '#D1D5DB' }}>Check the header format</p>
              </div>
            </div>
            <div className="flex items-start gap-1.5">
              <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: '#1F2937', border: '1px solid rgba(245,197,66,0.4)' }}>
                <Sparkles size={8} color="#F5C542" />
              </div>
              <div className="rounded-xl p-2" style={{ backgroundColor: 'rgba(245,197,66,0.06)', border: '1px solid rgba(245,197,66,0.25)', boxShadow: '0 0 8px rgba(245,197,66,0.1)', maxWidth: '90%' }}>
                <p style={{ fontSize: '8px', color: '#F5C542', fontWeight: 700, marginBottom: '2px' }}>AI Copilot</p>
                <p style={{ fontSize: '9px', color: '#D1D5DB' }}>Cookie key mismatch. refreshToken → refresh_token on line 30.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl p-2 mt-2" style={{ backgroundColor: '#1F2937', border: '1px solid #2D3748' }}>
            <p style={{ fontSize: '9px', color: '#6B7280', flex: 1 }}>Message...</p>
            <div className="px-2 py-1 rounded-lg flex items-center gap-1" style={{ backgroundColor: '#F5C542' }}>
              <Sparkles size={7} color="#0B0F1A" /><span style={{ fontSize: '8px', color: '#0B0F1A', fontWeight: 700 }}>Ask AI</span>
            </div>
          </div>
        </div>
        {/* Right: AI Panel */}
        <div className="flex-shrink-0 p-3 flex flex-col" style={{ width: '140px', backgroundColor: '#0D1220', borderLeft: '1px solid rgba(245,197,66,0.15)' }}>
          <div className="flex items-center gap-1.5 mb-3">
            <Sparkles size={9} color="#F5C542" /><p style={{ fontSize: '9px', color: '#F5C542', fontWeight: 700 }}>AI Copilot</p>
          </div>
          <div className="rounded-xl p-2 mb-2" style={{ backgroundColor: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
            <p style={{ fontSize: '8px', color: '#22C55E', fontWeight: 600, marginBottom: '3px' }}>Suggested Fix</p>
            <p style={{ fontSize: '8px', color: '#9CA3AF' }}>refresh_token key on line 30</p>
            <div className="mt-2"><div className="flex justify-between mb-1"><span style={{ fontSize: '7px', color: '#9CA3AF' }}>Confidence</span><span style={{ fontSize: '7px', color: '#22C55E', fontWeight: 700 }}>94%</span></div>
              <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: '#2D3748' }}><div className="h-full rounded-full" style={{ width: '94%', backgroundColor: '#22C55E' }} /></div>
            </div>
          </div>
          <div className="rounded-xl p-2" style={{ backgroundColor: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}>
            <p style={{ fontSize: '8px', color: '#3B82F6', fontWeight: 600, marginBottom: '2px' }}>Optimization</p>
            <p style={{ fontSize: '8px', color: '#9CA3AF' }}>Cache JWT verification</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mobile Preview (stacked layout)
function MobilePreview() {
  return (
    <div
      className="rounded-3xl overflow-hidden mx-auto"
      style={{
        width: '200px',
        backgroundColor: '#111827',
        border: '2px solid #2D3748',
        boxShadow: '0 0 40px rgba(245,197,66,0.1)',
      }}
    >
      {/* Phone status bar */}
      <div className="flex items-center justify-between px-4 py-2" style={{ backgroundColor: '#0B0F1A' }}>
        <span style={{ fontSize: '9px', color: '#6B7280' }}>9:41</span>
        <div className="flex gap-1">
          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#22C55E' }} />
          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#22C55E' }} />
          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#22C55E' }} />
        </div>
      </div>
      {/* App header */}
      <div className="flex items-center justify-between px-3 py-2" style={{ backgroundColor: '#0D1220', borderBottom: '1px solid #2D3748' }}>
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F5C542, #F59E0B)' }}>
            <Zap size={10} color="#0B0F1A" />
          </div>
          <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '11px', color: '#F9FAFB' }}>DevSync</span>
        </div>
        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)' }}>
          <div className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: '#EF4444' }} />
          <span style={{ fontSize: '7px', color: '#EF4444', fontWeight: 700 }}>LIVE</span>
        </div>
      </div>
      {/* Chat messages */}
      <div className="p-2.5 space-y-2" style={{ minHeight: '200px' }}>
        {[
          { av: 'AK', c: '#3B82F6', msg: '401 on auth refresh?', ai: false },
          { av: '✦', c: '#1F2937', msg: 'Cookie key mismatch detected', ai: true },
          { av: 'MR', c: '#22C55E', msg: 'Fix applied ✓', ai: false },
        ].map((m, i) => (
          <div key={i} className="flex items-start gap-1.5">
            <div className="flex items-center justify-center rounded-full flex-shrink-0" style={{ width: '16px', height: '16px', backgroundColor: m.ai ? m.c : m.c, border: m.ai ? '1px solid rgba(245,197,66,0.4)' : 'none', fontSize: '7px', color: m.c === '#F5C542' ? '#0B0F1A' : '#fff', fontWeight: 700 }}>
              {m.ai ? <Sparkles size={7} color="#F5C542" /> : m.av}
            </div>
            <div className="rounded-lg p-1.5" style={{ backgroundColor: m.ai ? 'rgba(245,197,66,0.06)' : '#1F2937', border: m.ai ? '1px solid rgba(245,197,66,0.2)' : 'none' }}>
              <p style={{ fontSize: '8px', color: '#D1D5DB' }}>{m.msg}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Input */}
      <div className="p-2 border-t" style={{ borderColor: '#2D3748' }}>
        <div className="flex items-center gap-1.5 rounded-lg p-2" style={{ backgroundColor: '#1F2937' }}>
          <p style={{ fontSize: '8px', color: '#6B7280', flex: 1 }}>Message...</p>
          <div className="w-4 h-4 rounded-md flex items-center justify-center" style={{ backgroundColor: '#F5C542' }}>
            <Sparkles size={8} color="#0B0F1A" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#0B0F1A', fontFamily: "'Inter', sans-serif" }}>
      {/* Navbar */}
      <nav
        className="flex items-center justify-between px-6 lg:px-10 sticky top-0 z-50"
        style={{ height: '68px', borderBottom: '1px solid #2D3748', backgroundColor: 'rgba(11,15,26,0.94)', backdropFilter: 'blur(14px)' }}
      >
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="flex items-center justify-center rounded-xl" style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #F5C542 0%, #F59E0B 100%)', boxShadow: '0 0 18px rgba(245,197,66,0.4)' }}>
            <Zap size={18} color="#0B0F1A" strokeWidth={2.5} />
          </div>
          <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '20px', color: '#F9FAFB' }}>
            DevSync <span style={{ color: '#F5C542' }}>AI</span>
          </span>
          {/* Beta badge */}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)' }}>
            <span style={{ fontSize: '10px', color: '#3B82F6', fontWeight: 700 }}>BETA</span>
          </div>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {['Features', 'How It Works', 'Pricing'].map(item => (
            <button key={item} style={{ fontSize: '14px', color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F9FAFB')}
              onMouseLeave={e => (e.currentTarget.style.color = '#9CA3AF')}>
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/auth')} className="hidden sm:block"
            style={{ fontSize: '14px', color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F9FAFB')}
            onMouseLeave={e => (e.currentTarget.style.color = '#9CA3AF')}>
            Login
          </button>
          <button onClick={() => navigate('/auth')}
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 transition-all duration-200"
            style={{ background: 'linear-gradient(135deg, #F5C542 0%, #F59E0B 100%)', color: '#0B0F1A', fontSize: '14px', fontWeight: 700, boxShadow: '0 0 18px rgba(245,197,66,0.3)', border: 'none', cursor: 'pointer' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(245,197,66,0.5)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 18px rgba(245,197,66,0.3)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
            <Zap size={14} /> Create Room
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ padding: '80px 32px 80px', maxWidth: '1440px', margin: '0 auto' }}>
        {/* Gradient bg blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div style={{ position: 'absolute', top: '-150px', left: '20%', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 65%)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', top: '-50px', right: '5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(245,197,66,0.07) 0%, transparent 65%)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: '-100px', left: '5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(167,139,250,0.04) 0%, transparent 70%)', borderRadius: '50%' }} />
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative">
          {/* Left */}
          <div className="flex-shrink-0 lg:max-w-[520px] w-full">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6" style={{ backgroundColor: 'rgba(245,197,66,0.08)', border: '1px solid rgba(245,197,66,0.2)' }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#F5C542' }} />
              <span style={{ fontSize: '13px', color: '#F5C542', fontWeight: 600 }}>Public Beta · 10k+ Developers</span>
            </div>

            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(38px, 5vw, 56px)', color: '#F9FAFB', lineHeight: '1.1', marginBottom: '24px', letterSpacing: '-0.5px' }}>
              Collaborate.{' '}
              <span style={{ color: '#F5C542' }}>Code.</span>{' '}
              Fix Instantly.
            </h1>

            <p style={{ fontSize: 'clamp(15px, 1.5vw, 18px)', color: '#9CA3AF', lineHeight: '1.75', marginBottom: '40px', maxWidth: '440px' }}>
              Real-time dev chat rooms powered by contextual AI assistance. Debug faster, ship smarter, stay in flow.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button onClick={() => navigate('/auth')}
                className="flex items-center gap-2 rounded-xl px-6 py-3.5 transition-all duration-200"
                style={{ background: 'linear-gradient(135deg, #F5C542 0%, #F59E0B 100%)', color: '#0B0F1A', fontSize: '15px', fontWeight: 700, boxShadow: '0 0 28px rgba(245,197,66,0.35)', border: 'none', cursor: 'pointer' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(245,197,66,0.5)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 28px rgba(245,197,66,0.35)'; }}>
                <Zap size={17} /> Create Room — Free
              </button>
              <button onClick={() => navigate('/auth')}
                className="flex items-center gap-2 rounded-xl px-6 py-3.5 transition-all duration-200"
                style={{ backgroundColor: 'transparent', color: '#3B82F6', fontSize: '15px', fontWeight: 600, border: '1px solid rgba(59,130,246,0.4)', cursor: 'pointer' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(59,130,246,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = '#3B82F6'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(59,130,246,0.4)'; }}>
                <Play size={15} /> Join Room
              </button>
              <button onClick={() => navigate('/prototype-flow')}
                className="flex items-center gap-2 transition-all"
                style={{ color: '#9CA3AF', fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F9FAFB')}
                onMouseLeave={e => (e.currentTarget.style.color = '#9CA3AF')}>
                See demo flow <ChevronRight size={14} />
              </button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex -space-x-2">
                {['#3B82F6', '#F5C542', '#22C55E', '#F97316', '#6366F1'].map((c, i) => (
                  <div key={i} className="flex items-center justify-center rounded-full border-2" style={{ width: '30px', height: '30px', backgroundColor: c, borderColor: '#0B0F1A', fontSize: '10px', color: i === 1 ? '#0B0F1A' : '#fff', fontWeight: 700 }}>
                    {['AK', 'SR', 'MR', 'JP', 'LP'][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => <span key={i} style={{ color: '#F5C542', fontSize: '13px' }}>★</span>)}
                </div>
                <p style={{ fontSize: '12px', color: '#9CA3AF' }}>Loved by 10,000+ developers</p>
              </div>
            </div>
          </div>

          {/* Right: Desktop + Mobile Previews */}
          <div className="flex-1 flex items-center gap-6 justify-center lg:justify-end w-full">
            <div className="flex-1 flex justify-center">
              <HeroPreview />
            </div>
            <div className="hidden xl:block flex-shrink-0">
              <p style={{ fontSize: '10px', color: '#6B7280', textAlign: 'center', marginBottom: '8px', fontWeight: 600, letterSpacing: '0.08em' }}>MOBILE</p>
              <MobilePreview />
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ borderTop: '1px solid #2D3748', borderBottom: '1px solid #2D3748', padding: '48px 32px', maxWidth: '1440px', margin: '0 auto' }}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(32px, 4vw, 44px)', color: '#F5C542', lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontSize: '14px', color: '#9CA3AF', marginTop: '8px' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY DEVSYNC */}
      <section style={{ padding: '90px 32px', maxWidth: '1440px', margin: '0 auto' }}>
        <div className="text-center mb-14">
          <p style={{ fontSize: '12px', color: '#F5C542', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '14px' }}>Why DevSync AI</p>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(30px, 3.5vw, 44px)', color: '#F9FAFB', lineHeight: 1.2, marginBottom: '14px' }}>
            Built for how developers actually work
          </h2>
          <p style={{ fontSize: '17px', color: '#9CA3AF', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 }}>
            Every feature is designed to minimize context switching and maximize flow state.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div key={i} className="rounded-2xl p-8 transition-all duration-300 cursor-default"
              style={{ backgroundColor: '#111827', border: '1px solid #2D3748' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = f.color; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${f.glow}`; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#2D3748'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
              <div className="flex items-center justify-center rounded-2xl mb-6" style={{ width: '52px', height: '52px', backgroundColor: `${f.color}14`, border: `1px solid ${f.color}28` }}>
                <f.icon size={22} color={f.color} />
              </div>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '22px', color: '#F9FAFB', marginBottom: '12px' }}>{f.title}</h3>
              <p style={{ fontSize: '15px', color: '#9CA3AF', lineHeight: '1.7' }}>{f.desc}</p>
              <div className="flex items-center gap-2 mt-6" style={{ color: f.color }}>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>Learn more</span>
                <ChevronRight size={15} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '80px 32px', backgroundColor: '#111827', borderTop: '1px solid #2D3748', borderBottom: '1px solid #2D3748' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="text-center mb-14">
            <p style={{ fontSize: '12px', color: '#3B82F6', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '14px' }}>How It Works</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#F9FAFB', lineHeight: 1.2 }}>Three steps to smarter debugging</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: '01', title: 'Create a Room', desc: 'Set up a collaborative dev room in seconds. Invite your team and select your tech stack.' },
              { num: '02', title: 'Share Code & Context', desc: 'Paste snippets, describe the issue. AI immediately begins analyzing the context.' },
              { num: '03', title: 'Fix with AI', desc: 'Get contextual fixes instantly. AI learns from your codebase and conversation patterns.' },
            ].map((step, i) => (
              <div key={i}>
                <div style={{ fontSize: '60px', fontFamily: "'DM Serif Display', serif", color: 'rgba(245,197,66,0.07)', lineHeight: 1, marginBottom: '20px' }}>{step.num}</div>
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '22px', color: '#F9FAFB', marginBottom: '12px' }}>{step.title}</h3>
                <p style={{ fontSize: '15px', color: '#9CA3AF', lineHeight: '1.7' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '90px 32px', maxWidth: '1440px', margin: '0 auto' }}>
        <div className="text-center mb-14">
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#F9FAFB', lineHeight: 1.2 }}>Trusted by elite engineering teams</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-2xl p-8" style={{ backgroundColor: '#111827', border: '1px solid #2D3748' }}>
              <div className="flex items-center gap-1 mb-4">{[...Array(5)].map((_, j) => <span key={j} style={{ color: '#F5C542', fontSize: '14px' }}>★</span>)}</div>
              <p style={{ fontSize: '15px', color: '#D1D5DB', lineHeight: '1.75', marginBottom: '24px', fontStyle: 'italic' }}>"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center rounded-full" style={{ width: '40px', height: '40px', backgroundColor: t.color, fontSize: '13px', color: t.color === '#F5C542' ? '#0B0F1A' : '#fff', fontWeight: 700 }}>{t.avatar}</div>
                <div>
                  <p style={{ fontSize: '14px', color: '#F9FAFB', fontWeight: 600 }}>{t.name}</p>
                  <p style={{ fontSize: '12px', color: '#9CA3AF' }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🏆 VISION ROADMAP (Judges Bonus) */}
      <section style={{ padding: '90px 32px', borderTop: '1px solid #2D3748', maxWidth: '1440px', margin: '0 auto' }}>
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6" style={{ backgroundColor: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)' }}>
            <TrendingUp size={13} color="#A78BFA" />
            <span style={{ fontSize: '12px', color: '#A78BFA', fontWeight: 700 }}>Vision Roadmap</span>
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#F9FAFB', lineHeight: 1.2, marginBottom: '14px' }}>
            Where DevSync AI is headed
          </h2>
          <p style={{ fontSize: '17px', color: '#9CA3AF', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
            Our mission is to make AI a first-class citizen in every developer's workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {roadmapItems.map((r, i) => {
            const s = roadmapColors[r.status];
            return (
              <div
                key={r.phase}
                className="rounded-2xl p-6 relative overflow-hidden transition-all duration-200"
                style={{ backgroundColor: '#111827', border: `1px solid ${s.border}` }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${s.bg}`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${s.bg} 0%, transparent 70%)`, transform: 'translate(30%, -30%)' }} />
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ backgroundColor: s.bg, border: `1px solid ${s.border}` }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
                    <span style={{ fontSize: '10px', color: s.color, fontWeight: 700 }}>{r.status.toUpperCase()}</span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#6B7280', fontFamily: 'monospace' }}>{r.phase}</span>
                </div>
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '18px', color: '#F9FAFB', marginBottom: '12px' }}>{r.title}</h3>
                <div className="space-y-2">
                  {r.items.map(item => (
                    <div key={item} className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: s.color }} />
                      <p style={{ fontSize: '12px', color: '#D1D5DB', lineHeight: 1.55 }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button onClick={() => navigate('/design-system')} className="inline-flex items-center gap-2 rounded-xl px-6 py-3 transition-all"
            style={{ backgroundColor: '#111827', border: '1px solid rgba(167,139,250,0.25)', color: '#A78BFA', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(167,139,250,0.06)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#111827'; }}>
            View Full Design System <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding: '0 32px 90px', maxWidth: '1440px', margin: '0 auto' }}>
        <div className="rounded-3xl p-14 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(245,197,66,0.11) 0%, rgba(59,130,246,0.07) 100%)', border: '1px solid rgba(245,197,66,0.2)', boxShadow: '0 0 60px rgba(245,197,66,0.07)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(245,197,66,0.09) 0%, transparent 60%)' }} />
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(30px, 3.5vw, 48px)', color: '#F9FAFB', lineHeight: 1.2, marginBottom: '18px', position: 'relative' }}>
            Start building smarter today.
          </h2>
          <p style={{ fontSize: '17px', color: '#9CA3AF', marginBottom: '36px', position: 'relative' }}>Free forever for individuals. Scale with your team.</p>
          <div className="flex flex-wrap items-center justify-center gap-4" style={{ position: 'relative' }}>
            <button onClick={() => navigate('/auth')} className="flex items-center gap-2 rounded-xl px-8 py-4 transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #F5C542 0%, #F59E0B 100%)', color: '#0B0F1A', fontSize: '16px', fontWeight: 700, boxShadow: '0 0 28px rgba(245,197,66,0.4)', border: 'none', cursor: 'pointer' }}>
              <Zap size={18} /> Get Started Free
            </button>
            <button onClick={() => navigate('/prototype-flow')} className="flex items-center gap-2 rounded-xl px-8 py-4 transition-all duration-200"
              style={{ backgroundColor: 'transparent', color: '#9CA3AF', fontSize: '16px', fontWeight: 600, border: '1px solid #2D3748', cursor: 'pointer' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#4B5563'; (e.currentTarget as HTMLElement).style.color = '#F9FAFB'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#2D3748'; (e.currentTarget as HTMLElement).style.color = '#9CA3AF'; }}>
              <Play size={16} /> View Prototype Flow
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #2D3748', padding: '40px 32px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }} className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="flex items-center justify-center rounded-xl" style={{ width: '30px', height: '30px', background: 'linear-gradient(135deg, #F5C542 0%, #F59E0B 100%)' }}>
              <Zap size={14} color="#0B0F1A" strokeWidth={2.5} />
            </div>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '16px', color: '#F9FAFB' }}>
              DevSync <span style={{ color: '#F5C542' }}>AI</span>
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {['Privacy', 'Terms', 'Blog', 'Status', 'GitHub', 'Design System'].map(item => (
              <button key={item} onClick={() => item === 'Design System' ? navigate('/design-system') : undefined}
                style={{ fontSize: '13px', color: '#6B7280', background: 'none', border: 'none', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#9CA3AF')}
                onMouseLeave={e => (e.currentTarget.style.color = '#6B7280')}>
                {item}
              </button>
            ))}
          </div>
          <p style={{ fontSize: '12px', color: '#6B7280' }}>© 2026 DevSync AI · All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

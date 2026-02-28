import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  Zap, Sparkles, ArrowRight, CheckCircle, Code2, MessageSquare,
  Play, AlertTriangle, RefreshCw, ChevronRight, X, Wifi,
  Users, Hash, Send, Copy, ThumbsUp
} from 'lucide-react';

const steps = [
  {
    id: 1,
    label: 'Landing',
    title: 'User lands on DevSync AI',
    desc: 'The hero immediately communicates the value prop. CTA "Create Room" draws the eye.',
    action: 'Click "Create Room" →',
    note: 'Smart Animate: Gold button hover → scale(1.02) + glow intensifies',
  },
  {
    id: 2,
    label: 'Create Room',
    title: 'Create Room modal appears',
    desc: 'Centered modal with 16px radius. User fills room name, selects TypeScript, invites team.',
    action: 'Click "Create Room" →',
    note: 'Transition: Fade in modal, backdrop blur applied',
  },
  {
    id: 3,
    label: 'Room Interface',
    title: '3-panel Dev Room opens',
    desc: 'The room loads instantly with LIVE badge. Team members join. Chat is ready.',
    action: 'User pastes code snippet →',
    note: 'Transition: Slide in from right, members animate in',
  },
  {
    id: 4,
    label: 'AI Suggestion',
    title: 'AI Copilot analyzes in real-time',
    desc: 'User pastes buggy code. AI detects the issue in <2 seconds with 94% confidence.',
    action: 'Accept AI fix →',
    note: 'Smart Animate: Gold glow card fades in, confidence bar fills',
  },
  {
    id: 5,
    label: 'Fix Applied',
    title: 'Fix confirmed — bug resolved!',
    desc: 'Green confirmation state. Bug marked resolved in Analytics. Team gets notified.',
    action: 'View in Analytics →',
    note: 'Transition: Green pulse confirmation, checkmark animation',
  },
];

// Step 1: Landing Hero Preview
function Step1Preview() {
  return (
    <div className="relative rounded-2xl overflow-hidden" style={{ backgroundColor: '#0B0F1A', border: '1px solid #2D3748', height: '360px' }}>
      {/* Gradient bg */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 40%, rgba(59,130,246,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, rgba(245,197,66,0.07) 0%, transparent 55%)' }} />
      {/* Navbar */}
      <div className="flex items-center justify-between px-6 py-3 relative" style={{ borderBottom: '1px solid #2D3748' }}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F5C542, #F59E0B)' }}>
            <Zap size={12} color="#0B0F1A" />
          </div>
          <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '14px', color: '#F9FAFB' }}>DevSync <span style={{ color: '#F5C542' }}>AI</span></span>
        </div>
        <div className="flex items-center gap-4">
          {['Features', 'How It Works', 'Login'].map(l => (
            <span key={l} style={{ fontSize: '11px', color: '#9CA3AF' }}>{l}</span>
          ))}
          <div className="px-3 py-1.5 rounded-lg flex items-center gap-1.5" style={{ background: 'linear-gradient(135deg, #F5C542, #F59E0B)', boxShadow: '0 0 12px rgba(245,197,66,0.4)' }}>
            <Zap size={10} color="#0B0F1A" />
            <span style={{ fontSize: '11px', color: '#0B0F1A', fontWeight: 700 }}>Create Room</span>
          </div>
        </div>
      </div>
      {/* Hero */}
      <div className="flex items-center justify-between px-8 pt-8 relative">
        <div style={{ maxWidth: '260px' }}>
          <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 mb-4" style={{ backgroundColor: 'rgba(245,197,66,0.1)', border: '1px solid rgba(245,197,66,0.2)' }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#F5C542' }} />
            <span style={{ fontSize: '10px', color: '#F5C542', fontWeight: 600 }}>Now in Public Beta</span>
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '26px', color: '#F9FAFB', lineHeight: 1.2, marginBottom: '10px' }}>
            Collaborate. <span style={{ color: '#F5C542' }}>Code.</span> Fix Instantly.
          </h2>
          <p style={{ fontSize: '11px', color: '#9CA3AF', lineHeight: 1.7, marginBottom: '16px' }}>Real-time dev chat rooms powered by contextual AI assistance.</p>
          <div className="flex gap-2">
            <div className="px-3 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer" style={{ background: 'linear-gradient(135deg, #F5C542, #F59E0B)', boxShadow: '0 0 16px rgba(245,197,66,0.35)' }}>
              <Zap size={11} color="#0B0F1A" /><span style={{ fontSize: '11px', color: '#0B0F1A', fontWeight: 700 }}>Create Room</span>
            </div>
            <div className="px-3 py-2 rounded-xl flex items-center gap-1.5" style={{ border: '1px solid rgba(59,130,246,0.4)', color: '#3B82F6' }}>
              <Play size={10} /><span style={{ fontSize: '11px', color: '#3B82F6', fontWeight: 600 }}>Join Room</span>
            </div>
          </div>
        </div>
        {/* Mini preview */}
        <div className="rounded-xl overflow-hidden" style={{ width: '220px', backgroundColor: '#111827', border: '1px solid #2D3748', boxShadow: '0 0 30px rgba(245,197,66,0.08)' }}>
          <div className="flex items-center gap-1.5 px-3 py-2" style={{ backgroundColor: '#0D1220', borderBottom: '1px solid #2D3748' }}>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#EF4444' }} /><div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#F97316' }} /><div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#22C55E' }} />
            <div className="flex items-center gap-1 ml-auto px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)' }}>
              <div className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: '#EF4444' }} />
              <span style={{ fontSize: '8px', color: '#EF4444', fontWeight: 700 }}>LIVE</span>
            </div>
          </div>
          <div className="p-3 space-y-2">
            {['backend-auth', 'react-ui-overhaul', 'ml-pipeline'].map((r, i) => (
              <div key={r} className="flex items-center gap-2 p-2 rounded-lg" style={{ backgroundColor: '#1F2937' }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ['#22C55E', '#22C55E', '#F97316'][i] }} />
                <span style={{ fontSize: '9px', color: '#D1D5DB' }}>{r}</span>
                <div className="ml-auto flex -space-x-1">
                  {[...Array([4,2,3][i])].map((_, j) => (
                    <div key={j} className="w-3 h-3 rounded-full border" style={{ backgroundColor: ['#3B82F6','#F5C542','#22C55E'][j % 3], borderColor: '#1F2937' }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Arrow pointer */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-xl px-4 py-2" style={{ backgroundColor: 'rgba(245,197,66,0.1)', border: '1px solid rgba(245,197,66,0.25)' }}>
        <span style={{ fontSize: '11px', color: '#F5C542', fontWeight: 600 }}>Click "Create Room"</span>
        <ArrowRight size={13} color="#F5C542" />
      </div>
    </div>
  );
}

// Step 2: Create Room Modal
function Step2Preview() {
  return (
    <div className="relative rounded-2xl overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#0B0F1A', border: '1px solid #2D3748', height: '360px', backdropFilter: 'blur(6px)' }}>
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} />
      <div className="relative rounded-2xl p-6" style={{ width: '340px', backgroundColor: '#111827', border: '1px solid #2D3748', boxShadow: '0 0 60px rgba(0,0,0,0.5)' }}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F5C542, #F59E0B)', boxShadow: '0 0 12px rgba(245,197,66,0.3)' }}>
            <Zap size={14} color="#0B0F1A" />
          </div>
          <div>
            <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '16px', color: '#F9FAFB' }}>Create New Room</p>
            <p style={{ fontSize: '11px', color: '#9CA3AF' }}>Set up your collaborative space</p>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { label: 'Room Name', value: 'backend-auth-fix', focused: true },
            { label: 'Tech Stack', value: 'TypeScript / Node.js', focused: false },
            { label: 'Invite Members', value: 'sarah@team.dev, mike@team.dev', focused: false },
          ].map(f => (
            <div key={f.label}>
              <p style={{ fontSize: '11px', color: '#9CA3AF', marginBottom: '4px' }}>{f.label}</p>
              <div
                className="px-3 py-2 rounded-xl"
                style={{
                  backgroundColor: '#0B0F1A',
                  border: `1px solid ${f.focused ? '#F5C542' : '#2D3748'}`,
                  boxShadow: f.focused ? '0 0 0 3px rgba(245,197,66,0.1)' : 'none',
                  fontSize: '12px', color: '#F9FAFB',
                }}
              >
                {f.value}
              </div>
            </div>
          ))}
          {/* Privacy toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: '#0B0F1A', border: '1px solid #2D3748' }}>
            <div className="flex items-center gap-2">
              <Wifi size={12} color="#9CA3AF" />
              <span style={{ fontSize: '12px', color: '#F9FAFB' }}>Public Room</span>
            </div>
            <div className="w-9 h-5 rounded-full relative" style={{ backgroundColor: '#F5C542' }}>
              <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full" style={{ backgroundColor: '#fff' }} />
            </div>
          </div>
        </div>
        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl mt-4" style={{ background: 'linear-gradient(135deg, #F5C542, #F59E0B)', color: '#0B0F1A', fontWeight: 700, fontSize: '13px', border: 'none', cursor: 'pointer', boxShadow: '0 0 16px rgba(245,197,66,0.3)' }}>
          <Zap size={13} /> Create Room
        </button>
      </div>
    </div>
  );
}

// Step 3: Room Interface
function Step3Preview() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#111827', border: '1px solid #2D3748', height: '360px' }}>
      <div className="flex items-center justify-between px-4 py-2" style={{ backgroundColor: '#0D1220', borderBottom: '1px solid #2D3748' }}>
        <div className="flex items-center gap-2">
          <Hash size={12} color="#9CA3AF" />
          <span style={{ fontSize: '12px', color: '#F9FAFB', fontWeight: 600 }}>backend-auth-fix</span>
          <div className="flex items-center gap-1 ml-2"><Users size={10} color="#9CA3AF" /><span style={{ fontSize: '10px', color: '#9CA3AF' }}>3 active</span></div>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ backgroundColor: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)' }}>
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#EF4444' }} />
          <span style={{ fontSize: '9px', color: '#EF4444', fontWeight: 700 }}>LIVE</span>
        </div>
      </div>
      <div className="flex" style={{ height: 'calc(100% - 42px)' }}>
        {/* Members */}
        <div className="flex-shrink-0 p-3" style={{ width: '100px', backgroundColor: '#0D1220', borderRight: '1px solid #2D3748' }}>
          <p style={{ fontSize: '8px', color: '#6B7280', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '8px' }}>MEMBERS</p>
          {[{ av: 'AK', c: '#3B82F6', n: 'Alex', s: 'coding' }, { av: 'SR', c: '#F5C542', n: 'Sarah', s: 'reviewing' }, { av: 'MR', c: '#22C55E', n: 'Mike', s: 'coding' }].map(m => (
            <div key={m.av} className="flex items-center gap-1.5 mb-3">
              <div className="relative">
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: m.c, fontSize: '7px', color: m.c === '#F5C542' ? '#0B0F1A' : '#fff', fontWeight: 700 }}>{m.av}</div>
                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full border" style={{ backgroundColor: '#22C55E', borderColor: '#0D1220' }} />
              </div>
              <div><p style={{ fontSize: '8px', color: '#F9FAFB' }}>{m.n}</p><p style={{ fontSize: '7px', color: '#22C55E' }}>{m.s}</p></div>
            </div>
          ))}
        </div>
        {/* Chat */}
        <div className="flex-1 flex flex-col p-3" style={{ backgroundColor: '#111827' }}>
          <div className="flex-1 space-y-2 overflow-hidden">
            <div className="flex items-start gap-1.5">
              <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: '#3B82F6', fontSize: '7px', color: '#fff', fontWeight: 700 }}>AK</div>
              <div className="rounded-xl p-2" style={{ backgroundColor: '#1F2937' }}><p style={{ fontSize: '10px', color: '#D1D5DB' }}>401 on refresh token endpoint — need eyes on this.</p></div>
            </div>
            <div className="flex items-start gap-1.5">
              <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: '#22C55E', fontSize: '7px', color: '#fff', fontWeight: 700 }}>MR</div>
              <div className="rounded-xl p-2" style={{ backgroundColor: '#1F2937' }}><p style={{ fontSize: '10px', color: '#D1D5DB' }}>Paste the middleware code and I'll take a look</p></div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl p-2 mt-2" style={{ backgroundColor: '#1F2937', border: '1px solid #2D3748' }}>
            <p style={{ fontSize: '9px', color: '#6B7280', flex: 1 }}>Paste code snippet here...</p>
            <div className="px-2 py-1 rounded-lg flex items-center gap-1" style={{ backgroundColor: '#F5C542' }}>
              <Sparkles size={8} color="#0B0F1A" /><span style={{ fontSize: '8px', color: '#0B0F1A', fontWeight: 700 }}>Ask AI</span>
            </div>
          </div>
        </div>
        {/* AI Panel */}
        <div className="flex-shrink-0 p-3" style={{ width: '140px', backgroundColor: '#0D1220', borderLeft: '1px solid rgba(245,197,66,0.15)' }}>
          <div className="flex items-center gap-1.5 mb-3">
            <Sparkles size={10} color="#F5C542" /><span style={{ fontSize: '10px', color: '#F5C542', fontWeight: 700 }}>AI Copilot</span>
          </div>
          <div className="rounded-xl p-2 mb-2" style={{ backgroundColor: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}>
            <p style={{ fontSize: '8px', color: '#3B82F6', fontWeight: 600, marginBottom: '2px' }}>Awaiting context...</p>
            <p style={{ fontSize: '9px', color: '#9CA3AF' }}>Paste code to activate AI analysis</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 4: AI Suggestion
function Step4Preview() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#111827', border: '1px solid #2D3748', height: '360px' }}>
      <div className="flex" style={{ height: '100%' }}>
        {/* Chat with code */}
        <div className="flex-1 flex flex-col p-3" style={{ borderRight: '1px solid #2D3748' }}>
          <p style={{ fontSize: '9px', color: '#6B7280', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '8px' }}>#backend-auth-fix</p>
          <div className="space-y-2 flex-1 overflow-hidden">
            <div className="flex items-start gap-1.5">
              <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: '#3B82F6', fontSize: '7px', color: '#fff', fontWeight: 700 }}>AK</div>
              <div className="rounded-xl p-2" style={{ backgroundColor: '#1F2937', maxWidth: '85%' }}>
                <p style={{ fontSize: '9px', color: '#D1D5DB', marginBottom: '4px' }}>Here's the middleware:</p>
                <div className="rounded-lg p-2 font-mono" style={{ backgroundColor: '#0B0F1A', fontSize: '8px', color: '#FCA5A5', lineHeight: 1.6 }}>
                  {`const token =\n  req.cookies.refreshToken;`}
                </div>
              </div>
            </div>
            {/* AI response */}
            <div className="flex items-start gap-1.5">
              <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: '#1F2937', border: '1px solid rgba(245,197,66,0.4)' }}>
                <Sparkles size={8} color="#F5C542" />
              </div>
              <div className="rounded-xl p-2" style={{ backgroundColor: 'rgba(245,197,66,0.05)', border: '1px solid rgba(245,197,66,0.25)', boxShadow: '0 0 12px rgba(245,197,66,0.1)', maxWidth: '85%' }}>
                <p style={{ fontSize: '8px', color: '#F5C542', fontWeight: 700, marginBottom: '3px' }}>AI Copilot</p>
                <p style={{ fontSize: '9px', color: '#D1D5DB', marginBottom: '4px' }}>Cookie key mismatch on line 30. Change to snake_case:</p>
                <div className="rounded-lg p-2 font-mono" style={{ backgroundColor: '#0B0F1A', fontSize: '8px', color: '#86EFAC', lineHeight: 1.6 }}>
                  {`const token =\n  req.cookies.refresh_token;`}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* AI Copilot Panel */}
        <div className="flex-shrink-0 flex flex-col p-3" style={{ width: '180px', backgroundColor: '#0D1220' }}>
          <div className="flex items-center gap-1.5 mb-3">
            <div className="w-5 h-5 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(245,197,66,0.2), rgba(245,197,66,0.05))', border: '1px solid rgba(245,197,66,0.3)' }}>
              <Sparkles size={9} color="#F5C542" />
            </div>
            <span style={{ fontSize: '10px', color: '#F5C542', fontWeight: 700 }}>AI Copilot</span>
          </div>
          {/* Suggested Fix */}
          <div className="rounded-xl p-2.5 mb-2" style={{ backgroundColor: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
            <div className="flex items-center gap-1 mb-1"><CheckCircle size={9} color="#22C55E" /><span style={{ fontSize: '8px', color: '#22C55E', fontWeight: 700 }}>Suggested Fix</span></div>
            <p style={{ fontSize: '9px', color: '#D1D5DB', lineHeight: 1.5, marginBottom: '6px' }}>refreshToken → refresh_token on line 30</p>
            <div className="mb-1 flex justify-between"><span style={{ fontSize: '8px', color: '#9CA3AF' }}>Confidence</span><span style={{ fontSize: '8px', color: '#22C55E', fontWeight: 700 }}>94%</span></div>
            <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: '#2D3748' }}>
              <div className="h-full rounded-full" style={{ width: '94%', backgroundColor: '#22C55E' }} />
            </div>
            <button className="w-full mt-2 py-1 rounded-lg" style={{ background: 'linear-gradient(135deg, #F5C542, #F59E0B)', color: '#0B0F1A', fontWeight: 700, fontSize: '9px', border: 'none', cursor: 'pointer' }}>
              Apply Fix
            </button>
          </div>
          {/* Error explanation */}
          <div className="rounded-xl p-2.5 mb-2" style={{ backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
            <div className="flex items-center gap-1 mb-1"><AlertTriangle size={9} color="#EF4444" /><span style={{ fontSize: '8px', color: '#EF4444', fontWeight: 700 }}>Error Explanation</span></div>
            <p style={{ fontSize: '9px', color: '#D1D5DB', lineHeight: 1.5 }}>Cookie stored as snake_case but read as camelCase</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 5: Fix Applied
function Step5Preview() {
  return (
    <div className="rounded-2xl overflow-hidden flex flex-col" style={{ backgroundColor: '#111827', border: '1px solid #2D3748', height: '360px' }}>
      {/* Success banner */}
      <div className="flex items-center gap-3 px-5 py-3" style={{ backgroundColor: 'rgba(34,197,94,0.1)', borderBottom: '1px solid rgba(34,197,94,0.2)' }}>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(34,197,94,0.15)' }}>
          <CheckCircle size={18} color="#22C55E" />
        </div>
        <div>
          <p style={{ fontSize: '13px', color: '#22C55E', fontWeight: 700 }}>Fix Applied Successfully!</p>
          <p style={{ fontSize: '11px', color: '#9CA3AF' }}>BUG-001 resolved · AI confidence: 94%</p>
        </div>
        <div className="ml-auto text-right">
          <p style={{ fontSize: '11px', color: '#22C55E', fontWeight: 600 }}>Time to fix</p>
          <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '22px', color: '#22C55E' }}>2m 14s</p>
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        {/* Code diff */}
        <div className="flex-1 p-4 overflow-hidden" style={{ borderRight: '1px solid #2D3748' }}>
          <p style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: 600, marginBottom: '10px' }}>Code Diff Applied</p>
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#0B0F1A', border: '1px solid #2D3748' }}>
            <div className="px-3 py-2" style={{ backgroundColor: '#0D1220', borderBottom: '1px solid #2D3748' }}>
              <span style={{ fontSize: '10px', color: '#9CA3AF', fontFamily: 'monospace' }}>middleware/jwt.ts</span>
            </div>
            <div className="p-3 font-mono space-y-1">
              {[
                { ln: '29', code: '// Cookie key validation', color: '#9CA3AF', bg: 'transparent' },
                { ln: '30', code: '- const token = req.cookies.refreshToken;', color: '#FCA5A5', bg: 'rgba(239,68,68,0.08)' },
                { ln: '30', code: '+ const token = req.cookies.refresh_token;', color: '#86EFAC', bg: 'rgba(34,197,94,0.08)' },
                { ln: '31', code: '', color: '#9CA3AF', bg: 'transparent' },
                { ln: '32', code: 'if (!token) { ... }', color: '#D1D5DB', bg: 'transparent' },
              ].map((l, i) => (
                <div key={i} className="flex gap-3 rounded px-2 py-0.5" style={{ backgroundColor: l.bg }}>
                  <span style={{ fontSize: '10px', color: '#4B5563', minWidth: '20px', textAlign: 'right' }}>{l.ln}</span>
                  <span style={{ fontSize: '10px', color: l.color }}>{l.code}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Stats */}
        <div className="flex-shrink-0 p-4 flex flex-col gap-3" style={{ width: '180px' }}>
          <p style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: 600 }}>Resolution Stats</p>
          {[
            { label: 'Bug Type', value: 'Cookie Key Mismatch', color: '#F9FAFB' },
            { label: 'AI Assisted', value: 'Yes ✦', color: '#F5C542' },
            { label: 'Resolved By', value: 'Mike R.', color: '#F9FAFB' },
            { label: 'Added to Analytics', value: 'BUG-001 ✓', color: '#22C55E' },
          ].map(s => (
            <div key={s.label}>
              <p style={{ fontSize: '10px', color: '#6B7280', marginBottom: '2px' }}>{s.label}</p>
              <p style={{ fontSize: '11px', color: s.color, fontWeight: 600 }}>{s.value}</p>
            </div>
          ))}
          <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl mt-auto" style={{ background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: '#fff', fontSize: '10px', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
            View Analytics <ArrowRight size={10} />
          </button>
        </div>
      </div>
    </div>
  );
}

const stepPreviews = [Step1Preview, Step2Preview, Step3Preview, Step4Preview, Step5Preview];

export default function PrototypeFlowPage() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = (idx: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveStep(idx);
      setAnimating(false);
    }, 200);
  };

  const next = () => { if (activeStep < steps.length - 1) goTo(activeStep + 1); };
  const prev = () => { if (activeStep > 0) goTo(activeStep - 1); };

  const ActivePreview = stepPreviews[activeStep];
  const step = steps[activeStep];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0B0F1A', fontFamily: "'Inter', sans-serif" }}>
      {/* Top Bar */}
      <div
        className="flex items-center justify-between px-8 sticky top-0 z-40"
        style={{ height: '64px', backgroundColor: 'rgba(11,15,26,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #2D3748' }}
      >
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F5C542, #F59E0B)', boxShadow: '0 0 16px rgba(245,197,66,0.4)' }}>
            <Zap size={16} color="#0B0F1A" strokeWidth={2.5} />
          </div>
          <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '18px', color: '#F9FAFB' }}>
            DevSync <span style={{ color: '#F5C542' }}>AI</span>
          </span>
          <div className="h-4 w-px mx-1" style={{ backgroundColor: '#2D3748' }} />
          <span style={{ fontSize: '13px', color: '#9CA3AF' }}>Prototype Flow</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/design-system')} className="flex items-center gap-2 px-4 py-2 rounded-xl transition-colors"
            style={{ backgroundColor: '#111827', border: '1px solid #2D3748', color: '#9CA3AF', fontSize: '13px', cursor: 'pointer' }}>
            Design System
          </button>
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all"
            style={{ background: 'linear-gradient(135deg, #F5C542, #F59E0B)', color: '#0B0F1A', fontWeight: 700, fontSize: '13px', border: 'none', cursor: 'pointer', boxShadow: '0 0 16px rgba(245,197,66,0.3)' }}>
            <Play size={13} /> Try Live App
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 48px' }}>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6" style={{ backgroundColor: 'rgba(245,197,66,0.08)', border: '1px solid rgba(245,197,66,0.2)' }}>
            <Play size={12} color="#F5C542" />
            <span style={{ fontSize: '12px', color: '#F5C542', fontWeight: 700 }}>Prototype Flow · Hackathon Demo</span>
          </div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '48px', color: '#F9FAFB', lineHeight: 1.15, marginBottom: '16px' }}>
            From Bug to Fix in <span style={{ color: '#F5C542' }}>5 Steps</span>
          </h1>
          <p style={{ fontSize: '17px', color: '#9CA3AF', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            An interactive walkthrough of the complete DevSync AI experience — from landing to resolution.
          </p>
        </div>

        {/* Step Progress */}
        <div className="flex items-center justify-center gap-0 mb-12">
          {steps.map((s, i) => (
            <React.Fragment key={s.id}>
              <button
                onClick={() => goTo(i)}
                className="flex flex-col items-center gap-2 transition-all duration-200"
                style={{ cursor: 'pointer', background: 'none', border: 'none', padding: '0 8px' }}
              >
                <div
                  className="flex items-center justify-center rounded-full transition-all duration-300"
                  style={{
                    width: '40px', height: '40px',
                    backgroundColor: i === activeStep ? '#F5C542' : i < activeStep ? 'rgba(34,197,94,0.2)' : '#1F2937',
                    border: i === activeStep ? '2px solid #F5C542' : i < activeStep ? '2px solid rgba(34,197,94,0.5)' : '2px solid #2D3748',
                    boxShadow: i === activeStep ? '0 0 20px rgba(245,197,66,0.4)' : 'none',
                  }}
                >
                  {i < activeStep
                    ? <CheckCircle size={18} color="#22C55E" />
                    : <span style={{ fontSize: '14px', fontWeight: 700, color: i === activeStep ? '#0B0F1A' : '#9CA3AF' }}>{s.id}</span>}
                </div>
                <span style={{ fontSize: '11px', color: i === activeStep ? '#F5C542' : i < activeStep ? '#22C55E' : '#6B7280', fontWeight: i === activeStep ? 700 : 400, whiteSpace: 'nowrap' }}>
                  {s.label}
                </span>
              </button>
              {i < steps.length - 1 && (
                <div className="flex-shrink-0 mb-5" style={{ width: '60px', height: '2px', backgroundColor: i < activeStep ? 'rgba(34,197,94,0.4)' : '#2D3748', transition: 'background-color 0.3s' }} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-5 gap-8 mb-8">
          {/* Left: Step Info */}
          <div className="col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F5C542', fontSize: '11px', fontWeight: 700, color: '#0B0F1A' }}>
                  {step.id}
                </div>
                <span style={{ fontSize: '12px', color: '#F5C542', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Step {step.id} of {steps.length}</span>
              </div>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '28px', color: '#F9FAFB', lineHeight: 1.25, marginBottom: '14px' }}>
                {step.title}
              </h2>
              <p style={{ fontSize: '15px', color: '#9CA3AF', lineHeight: 1.75, marginBottom: '28px' }}>
                {step.desc}
              </p>
              {/* Annotation */}
              <div className="rounded-2xl p-4" style={{ backgroundColor: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)' }}>
                <p style={{ fontSize: '11px', color: '#3B82F6', fontWeight: 700, marginBottom: '4px' }}>✦ Animation Note</p>
                <p style={{ fontSize: '12px', color: '#9CA3AF', lineHeight: 1.6 }}>{step.note}</p>
              </div>
            </div>

            {/* Action label */}
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px flex-1" style={{ backgroundColor: '#2D3748' }} />
                <span style={{ fontSize: '11px', color: '#6B7280' }}>INTERACTION</span>
                <div className="h-px flex-1" style={{ backgroundColor: '#2D3748' }} />
              </div>
              <div
                className="flex items-center gap-2 rounded-xl px-4 py-3"
                style={{
                  backgroundColor: activeStep < steps.length - 1 ? 'rgba(245,197,66,0.08)' : 'rgba(34,197,94,0.08)',
                  border: `1px solid ${activeStep < steps.length - 1 ? 'rgba(245,197,66,0.2)' : 'rgba(34,197,94,0.2)'}`,
                }}
              >
                {activeStep < steps.length - 1
                  ? <ArrowRight size={14} color="#F5C542" />
                  : <CheckCircle size={14} color="#22C55E" />}
                <span style={{ fontSize: '13px', color: activeStep < steps.length - 1 ? '#F5C542' : '#22C55E', fontWeight: 600 }}>
                  {step.action}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Screen Preview */}
          <div
            className="col-span-3"
            style={{ opacity: animating ? 0 : 1, transition: 'opacity 0.2s ease' }}
          >
            <ActivePreview />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={prev}
            disabled={activeStep === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-150"
            style={{
              backgroundColor: activeStep === 0 ? 'transparent' : '#111827',
              border: `1px solid ${activeStep === 0 ? 'transparent' : '#2D3748'}`,
              color: activeStep === 0 ? '#2D3748' : '#9CA3AF',
              fontSize: '14px', cursor: activeStep === 0 ? 'default' : 'pointer',
            }}
          >
            <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} />
            Previous
          </button>

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="rounded-full transition-all duration-200"
                style={{
                  width: i === activeStep ? '24px' : '8px',
                  height: '8px',
                  backgroundColor: i === activeStep ? '#F5C542' : i < activeStep ? '#22C55E' : '#2D3748',
                  border: 'none', cursor: 'pointer',
                }}
              />
            ))}
          </div>

          {activeStep < steps.length - 1 ? (
            <button
              onClick={next}
              className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #F5C542, #F59E0B)',
                color: '#0B0F1A', fontWeight: 700, fontSize: '14px',
                border: 'none', cursor: 'pointer', boxShadow: '0 0 20px rgba(245,197,66,0.3)',
              }}
            >
              Next Step
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #22C55E, #16A34A)',
                color: '#fff', fontWeight: 700, fontSize: '14px',
                border: 'none', cursor: 'pointer', boxShadow: '0 0 20px rgba(34,197,94,0.3)',
              }}
            >
              <Play size={16} />
              Try the Live App
            </button>
          )}
        </div>

        {/* All Steps Overview */}
        <div className="mt-16 pt-12" style={{ borderTop: '1px solid #2D3748' }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '28px', color: '#F9FAFB', marginBottom: '8px' }}>Complete Flow Overview</h2>
          <p style={{ fontSize: '14px', color: '#9CA3AF', marginBottom: '24px' }}>Click any step to jump directly to that screen.</p>
          <div className="grid grid-cols-5 gap-4">
            {steps.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                className="text-left rounded-2xl p-4 transition-all duration-200"
                style={{
                  backgroundColor: i === activeStep ? 'rgba(245,197,66,0.08)' : '#111827',
                  border: `1px solid ${i === activeStep ? 'rgba(245,197,66,0.3)' : '#2D3748'}`,
                  cursor: 'pointer',
                }}
                onMouseEnter={e => { if (i !== activeStep) (e.currentTarget as HTMLElement).style.borderColor = '#3D4F65'; }}
                onMouseLeave={e => { if (i !== activeStep) (e.currentTarget as HTMLElement).style.borderColor = '#2D3748'; }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{
                    backgroundColor: i === activeStep ? '#F5C542' : i < activeStep ? 'rgba(34,197,94,0.2)' : '#1F2937',
                    fontSize: '11px', fontWeight: 700, color: i === activeStep ? '#0B0F1A' : i < activeStep ? '#22C55E' : '#9CA3AF',
                  }}>
                    {i < activeStep ? <CheckCircle size={14} color="#22C55E" /> : s.id}
                  </div>
                  <span style={{ fontSize: '11px', color: i === activeStep ? '#F5C542' : '#9CA3AF', fontWeight: 600 }}>{s.label}</span>
                </div>
                <p style={{ fontSize: '12px', color: '#6B7280', lineHeight: 1.5 }}>{s.title}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

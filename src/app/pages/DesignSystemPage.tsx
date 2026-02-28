import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Zap, Sparkles, Radio, AlertTriangle, CheckCircle, Clock,
  Users, Code2, Lock, Globe, ArrowRight, Copy, Eye, EyeOff,
  MessageSquare, TrendingUp, Bot, Palette, Mail, Search,
  Menu, X, BarChart3, Github, LogIn, Play, ChevronDown
} from 'lucide-react';

/* ─── Data ─────────────────────────────────────────────────────────── */

const colorTokens = [
  {
    group: 'Background',
    tokens: [
      { token: 'BG / Primary Dark', name: 'Primary BG', hex: '#0B0F1A', css: '--color-primary-bg', usage: 'Main app background' },
      { token: 'BG / Surface', name: 'Secondary BG', hex: '#111827', css: '--color-secondary-bg', usage: 'Cards, side panels' },
      { token: 'BG / Elevated', name: 'Card Surface', hex: '#1F2937', css: '--color-card-bg', usage: 'Hover states, modals' },
    ],
  },
  {
    group: 'Text',
    tokens: [
      { token: 'Text / High', name: 'Text Primary', hex: '#F9FAFB', css: '--color-text-primary', usage: 'Headings, important labels' },
      { token: 'Text / Medium', name: 'Text Medium', hex: '#D1D5DB', css: '—', usage: 'Body text, descriptions' },
      { token: 'Text / Muted', name: 'Text Muted', hex: '#9CA3AF', css: '--color-text-secondary', usage: 'Captions, subtitles' },
    ],
  },
  {
    group: 'Brand',
    tokens: [
      { token: 'Brand / Primary Yellow', name: 'Accent Gold', hex: '#F5C542', css: '--color-accent-gold', usage: 'Primary CTA, AI elements' },
      { token: 'Brand / Yellow Hover', name: 'Gold Hover', hex: '#F59E0B', css: '—', usage: 'Button hover state' },
      { token: 'Accent / Blue', name: 'Accent Blue', hex: '#3B82F6', css: '--color-accent-blue', usage: 'Secondary actions, links' },
      { token: 'Accent / Green', name: 'Success', hex: '#22C55E', css: '--color-success', usage: 'Online status, resolved bugs' },
    ],
  },
  {
    group: 'Semantic',
    tokens: [
      { token: 'Error / Red', name: 'Error', hex: '#EF4444', css: '--color-error', usage: 'Bugs, failures, LIVE badge' },
      { token: 'Warning / Orange', name: 'Warning', hex: '#F97316', css: '--color-warning', usage: 'Idle status, caution states' },
      { token: 'Border / Subtle', name: 'Border', hex: '#2D3748', css: '--color-border-subtle', usage: 'Dividers, card borders' },
      { token: 'Muted / Dark', name: 'Muted', hex: '#6B7280', css: '—', usage: 'Placeholders, disabled elements' },
    ],
  },
];

const typoScale = [
  { label: 'H1 / Hero', size: '56px', weight: 400, family: 'DM Serif Display', sample: 'Collaborate. Code. Fix Instantly.', tag: 'H1' },
  { label: 'H2 / Section', size: '36px', weight: 700, family: 'Inter Bold', sample: 'Real-time AI-powered Dev Rooms', tag: 'H2' },
  { label: 'H3 / Card Title', size: '20px', weight: 600, family: 'Inter Semibold', sample: 'AI Copilot Suggestions', tag: 'H3' },
  { label: 'Body / Regular', size: '16px', weight: 400, family: 'Inter Regular', sample: 'Real-time dev chat rooms powered by contextual AI assistance.', tag: 'P' },
  { label: 'Body / Small', size: '14px', weight: 400, family: 'Inter Regular', sample: 'Last active 2 minutes ago · 4 members online', tag: 'P' },
  { label: 'Caption', size: '12px', weight: 500, family: 'Inter Medium', sample: 'AI ACTIVE · CONTEXT ENABLED · 94% CONFIDENCE', tag: 'Caption' },
];

const spacingScale = [8, 16, 24, 32, 48, 64];

const shadowTokens = [
  { name: 'Shadow / Glow Gold', value: '0 0 20px rgba(245,197,66,0.35)', usage: 'Primary CTA, AI elements', color: '#F5C542' },
  { name: 'Shadow / Glow Blue', value: '0 0 20px rgba(59,130,246,0.35)', usage: 'Secondary actions, links', color: '#3B82F6' },
  { name: 'Shadow / Glow Green', value: '0 0 16px rgba(34,197,94,0.3)', usage: 'Success states, resolved', color: '#22C55E' },
  { name: 'Shadow / Card', value: '0 4px 24px rgba(0,0,0,0.3)', usage: 'Card elevation', color: '#9CA3AF' },
  { name: 'Shadow / Modal', value: '0 20px 60px rgba(0,0,0,0.5)', usage: 'Modals, overlays', color: '#6B7280' },
];

const principles = [
  { icon: MessageSquare, color: '#3B82F6', title: 'Minimize Context Switching', desc: 'Everything lives in one 3-panel interface. No tab switching, no lost context.' },
  { icon: Bot, color: '#F5C542', title: 'AI as Assistant, Not Replacement', desc: 'AI suggests and generates — but the developer always approves. Confidence scores make reasoning transparent.' },
  { icon: Eye, color: '#22C55E', title: 'Clear Human vs AI Distinction', desc: 'AI messages use gold glow borders, distinct avatars, and labeled responses.' },
  { icon: Radio, color: '#EF4444', title: 'Real-Time Collaborative Clarity', desc: 'LIVE badges, online dots, and typing indicators give instant awareness.' },
];

/* ─── Sub-components ──────────────────────────────────────────────── */

function Section({ id, title, label, children }: { id: string; title: string; label?: string; children: React.ReactNode }) {
  return (
    <div id={id} className="mb-20">
      {label && <p style={{ fontSize: '11px', color: '#F5C542', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>{label}</p>}
      <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '32px', color: '#F9FAFB', marginBottom: '8px', lineHeight: 1.2 }}>{title}</h2>
      <div className="h-px mb-10" style={{ backgroundColor: '#2D3748' }} />
      {children}
    </div>
  );
}

function CopyableCode({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1400); }}
      className="flex items-center gap-1.5 rounded-lg px-2 py-1 transition-all duration-150"
      style={{ backgroundColor: '#1F2937', border: '1px solid #2D3748', cursor: 'pointer', fontFamily: 'monospace' }}
    >
      <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{value}</span>
      {copied ? <CheckCircle size={10} color="#22C55E" /> : <Copy size={10} color="#6B7280" />}
    </button>
  );
}

/* ─── Button Showcase ─────────────────────────────────────────────── */
function ButtonShowcase() {
  type BtnVariant = 'Primary' | 'Secondary' | 'Ghost' | 'OAuth';
  type BtnState = 'Default' | 'Hover' | 'Pressed' | 'Disabled';
  type BtnSize = 'Large' | 'Medium';

  const variants: BtnVariant[] = ['Primary', 'Secondary', 'Ghost', 'OAuth'];
  const states: BtnState[] = ['Default', 'Hover', 'Pressed', 'Disabled'];
  const sizes: BtnSize[] = ['Large', 'Medium'];

  const getStyle = (variant: BtnVariant, state: BtnState, size: BtnSize): React.CSSProperties => {
    const pad = size === 'Large' ? '12px 24px' : '8px 16px';
    const fs = size === 'Large' ? '15px' : '13px';
    const disabled = state === 'Disabled';
    const hover = state === 'Hover';
    const pressed = state === 'Pressed';

    const base: React.CSSProperties = { padding: pad, fontSize: fs, borderRadius: '12px', fontWeight: 700, cursor: disabled ? 'not-allowed' : 'pointer', border: 'none', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.15s', opacity: disabled ? 0.45 : 1 };

    if (variant === 'Primary') return { ...base, background: disabled ? '#1F2937' : hover ? 'linear-gradient(135deg, #F59E0B, #D97706)' : pressed ? 'linear-gradient(135deg, #D97706, #B45309)' : 'linear-gradient(135deg, #F5C542, #F59E0B)', color: disabled ? '#6B7280' : '#0B0F1A', boxShadow: disabled ? 'none' : hover ? '0 0 32px rgba(245,197,66,0.55)' : pressed ? '0 0 8px rgba(245,197,66,0.2)' : '0 0 20px rgba(245,197,66,0.35)', transform: pressed ? 'scale(0.97)' : hover ? 'translateY(-1px)' : 'none' };
    if (variant === 'Secondary') return { ...base, backgroundColor: 'transparent', color: disabled ? '#4B5563' : '#3B82F6', border: `1px solid ${disabled ? '#2D3748' : hover ? '#3B82F6' : 'rgba(59,130,246,0.4)'}`, background: hover ? 'rgba(59,130,246,0.08)' : 'transparent' };
    if (variant === 'Ghost') return { ...base, backgroundColor: hover ? '#1F2937' : 'transparent', color: disabled ? '#4B5563' : '#9CA3AF', border: '1px solid transparent', fontWeight: 500 };
    if (variant === 'OAuth') return { ...base, backgroundColor: hover ? '#2D3748' : '#1F2937', color: disabled ? '#4B5563' : '#D1D5DB', border: `1px solid ${disabled ? '#1F2937' : '#2D3748'}`, fontWeight: 500, gap: '10px' };
    return base;
  };

  return (
    <div className="space-y-8">
      {/* By Size */}
      <div className="rounded-2xl p-6" style={{ backgroundColor: '#111827', border: '1px solid #2D3748' }}>
        <p style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 700, marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Size Variants</p>
        <div className="flex items-center gap-6">
          {sizes.map(size => (
            <div key={size} className="flex flex-col items-center gap-3">
              <button style={getStyle('Primary', 'Default', size)}>
                <Zap size={size === 'Large' ? 16 : 13} /> {size} Button
              </button>
              <span style={{ fontSize: '11px', color: '#6B7280' }}>{size} · {size === 'Large' ? '48px h' : '36px h'}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Full Matrix */}
      <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#111827', border: '1px solid #2D3748' }}>
        <div className="grid" style={{ gridTemplateColumns: '100px repeat(4, 1fr)' }}>
          {/* Header row */}
          <div className="p-3" style={{ backgroundColor: '#0D1220', borderBottom: '1px solid #2D3748', borderRight: '1px solid #2D3748' }} />
          {states.map(state => (
            <div key={state} className="p-3 text-center" style={{ backgroundColor: '#0D1220', borderBottom: '1px solid #2D3748', borderRight: '1px solid #1F2937', fontSize: '11px', color: '#9CA3AF', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              {state}
            </div>
          ))}
          {/* Rows */}
          {variants.map((variant, vi) => (
            <React.Fragment key={variant}>
              <div className="flex items-center p-3" style={{ backgroundColor: '#0B0F1A', borderBottom: vi < variants.length - 1 ? '1px solid #2D3748' : 'none', borderRight: '1px solid #2D3748' }}>
                <span style={{ fontSize: '12px', color: '#F9FAFB', fontWeight: 600 }}>{variant}</span>
              </div>
              {states.map(state => (
                <div key={state} className="flex items-center justify-center p-4" style={{ backgroundColor: '#111827', borderBottom: vi < variants.length - 1 ? '1px solid #2D3748' : 'none', borderRight: '1px solid #1F2937' }}>
                  <button style={getStyle(variant, state, 'Medium')}>
                    {variant === 'OAuth' && <Github size={13} />}
                    {variant === 'Primary' && <Zap size={13} />}
                    {variant}
                  </button>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Input Showcase ──────────────────────────────────────────────── */
function InputShowcase() {
  const [showPass, setShowPass] = useState(false);

  const inputBase: React.CSSProperties = { width: '100%', padding: '11px 14px', borderRadius: '12px', backgroundColor: '#0B0F1A', color: '#F9FAFB', fontSize: '14px', outline: 'none', fontFamily: "'Inter', sans-serif", boxSizing: 'border-box' };

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Default */}
      <div className="rounded-2xl p-5" style={{ backgroundColor: '#111827', border: '1px solid #2D3748' }}>
        <p style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Default</p>
        <label style={{ fontSize: '12px', color: '#9CA3AF', display: 'block', marginBottom: '6px' }}>Room Name</label>
        <input placeholder="Enter room name..." style={{ ...inputBase, border: '1px solid #2D3748' }} readOnly />
        <p style={{ fontSize: '11px', color: '#6B7280', marginTop: '6px' }}>Idle state · border: #2D3748</p>
      </div>
      {/* Focused */}
      <div className="rounded-2xl p-5" style={{ backgroundColor: '#111827', border: '1px solid #2D3748' }}>
        <p style={{ fontSize: '11px', color: '#F5C542', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Focused</p>
        <label style={{ fontSize: '12px', color: '#F5C542', display: 'block', marginBottom: '6px' }}>Room Name</label>
        <input defaultValue="backend-auth-fix" style={{ ...inputBase, border: '1px solid #F5C542', boxShadow: '0 0 0 3px rgba(245,197,66,0.12)' }} readOnly />
        <p style={{ fontSize: '11px', color: '#F5C542', marginTop: '6px' }}>Focus ring: rgba(gold, 0.12)</p>
      </div>
      {/* Error */}
      <div className="rounded-2xl p-5" style={{ backgroundColor: '#111827', border: '1px solid #2D3748' }}>
        <p style={{ fontSize: '11px', color: '#EF4444', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Error</p>
        <label style={{ fontSize: '12px', color: '#EF4444', display: 'block', marginBottom: '6px' }}>Email Address</label>
        <input defaultValue="not-an-email" style={{ ...inputBase, border: '1px solid #EF4444', boxShadow: '0 0 0 3px rgba(239,68,68,0.1)' }} readOnly />
        <p style={{ fontSize: '11px', color: '#EF4444', marginTop: '6px' }}>⚠ Invalid email address</p>
      </div>
      {/* With Icon */}
      <div className="rounded-2xl p-5" style={{ backgroundColor: '#111827', border: '1px solid #2D3748' }}>
        <p style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>With Icon</p>
        <label style={{ fontSize: '12px', color: '#9CA3AF', display: 'block', marginBottom: '6px' }}>Search Rooms</label>
        <div className="relative">
          <Search size={14} color="#6B7280" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input placeholder="Search rooms..." style={{ ...inputBase, paddingLeft: '36px', border: '1px solid #2D3748' }} readOnly />
        </div>
        <p style={{ fontSize: '11px', color: '#6B7280', marginTop: '6px' }}>Icon: 14px, left: 12px offset</p>
      </div>
      {/* Password */}
      <div className="rounded-2xl p-5" style={{ backgroundColor: '#111827', border: '1px solid #2D3748' }}>
        <p style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Password (Eye Toggle)</p>
        <label style={{ fontSize: '12px', color: '#9CA3AF', display: 'block', marginBottom: '6px' }}>Password</label>
        <div className="relative">
          <Lock size={14} color="#6B7280" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input type={showPass ? 'text' : 'password'} defaultValue="devsync2026" style={{ ...inputBase, paddingLeft: '36px', paddingRight: '40px', border: '1px solid #2D3748' }} readOnly />
          <button onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', padding: 0 }}>
            {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
        <p style={{ fontSize: '11px', color: '#6B7280', marginTop: '6px' }}>Click eye to toggle visibility</p>
      </div>
      {/* Select / Dropdown */}
      <div className="rounded-2xl p-5" style={{ backgroundColor: '#111827', border: '1px solid #2D3748' }}>
        <p style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Select / Dropdown</p>
        <label style={{ fontSize: '12px', color: '#9CA3AF', display: 'block', marginBottom: '6px' }}>Tech Stack</label>
        <div className="relative">
          <select style={{ ...inputBase, border: '1px solid #2D3748', appearance: 'none', cursor: 'pointer', paddingRight: '36px' }}>
            <option>TypeScript / Node</option>
            <option>React / Next.js</option>
            <option>Python / FastAPI</option>
          </select>
          <ChevronDown size={14} color="#6B7280" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
        </div>
        <p style={{ fontSize: '11px', color: '#6B7280', marginTop: '6px' }}>Chevron icon right · 12px</p>
      </div>
    </div>
  );
}

/* ─── Card Showcase ───────────────────────────────────────────────── */
function CardShowcase() {
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Feature Card */}
      <div>
        <p style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 700, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Feature Card</p>
        <div className="rounded-2xl p-7 transition-all duration-200 cursor-default"
          style={{ backgroundColor: '#111827', border: '1px solid #2D3748' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#3B82F6'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(59,130,246,0.12)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#2D3748'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)' }}>
            <Radio size={22} color="#3B82F6" />
          </div>
          <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '20px', color: '#F9FAFB', marginBottom: '10px' }}>Real-Time Rooms</h3>
          <p style={{ fontSize: '14px', color: '#9CA3AF', lineHeight: 1.7 }}>Spin up collaborative dev rooms in seconds. Share code, context, and conversations live.</p>
          <div className="flex items-center gap-1.5 mt-5" style={{ color: '#3B82F6' }}>
            <span style={{ fontSize: '13px', fontWeight: 600 }}>Learn more</span><ArrowRight size={14} />
          </div>
        </div>
      </div>
      {/* Testimonial Card */}
      <div>
        <p style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 700, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Testimonial Card</p>
        <div className="rounded-2xl p-7" style={{ backgroundColor: '#111827', border: '1px solid #2D3748' }}>
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => <span key={i} style={{ color: '#F5C542', fontSize: '16px' }}>★</span>)}
          </div>
          <p style={{ fontSize: '15px', color: '#D1D5DB', lineHeight: 1.75, marginBottom: '20px', fontStyle: 'italic' }}>
            "DevSync AI caught a race condition that would have taken us days to debug. The AI copilot is genuinely impressive."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#3B82F6', fontSize: '13px', color: '#fff', fontWeight: 700 }}>SC</div>
            <div>
              <p style={{ fontSize: '14px', color: '#F9FAFB', fontWeight: 600 }}>Sarah Chen</p>
              <p style={{ fontSize: '12px', color: '#9CA3AF' }}>Senior Engineer @ Stripe</p>
            </div>
          </div>
        </div>
      </div>
      {/* Pricing Card */}
      <div>
        <p style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 700, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Pricing Card</p>
        <div className="rounded-2xl p-7" style={{ backgroundColor: '#111827', border: '1px solid rgba(245,197,66,0.3)', boxShadow: '0 0 30px rgba(245,197,66,0.08)' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 style={{ fontSize: '18px', color: '#F9FAFB', fontWeight: 700 }}>Team Pro</h3>
            <div className="px-2.5 py-1 rounded-full" style={{ backgroundColor: 'rgba(245,197,66,0.12)', border: '1px solid rgba(245,197,66,0.3)' }}>
              <span style={{ fontSize: '11px', color: '#F5C542', fontWeight: 700 }}>POPULAR</span>
            </div>
          </div>
          <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '42px', color: '#F9FAFB', lineHeight: 1, marginBottom: '4px' }}>$29<span style={{ fontSize: '16px', color: '#9CA3AF', fontFamily: "'Inter', sans-serif" }}>/mo</span></p>
          <p style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '20px' }}>Per workspace · billed annually</p>
          <div className="space-y-2.5 mb-6">
            {['Unlimited AI assists', 'Up to 20 team members', 'Analytics dashboard', 'Priority support'].map(f => (
              <div key={f} className="flex items-center gap-2"><CheckCircle size={13} color="#22C55E" /><span style={{ fontSize: '13px', color: '#D1D5DB' }}>{f}</span></div>
            ))}
          </div>
          <button className="w-full py-3 rounded-xl" style={{ background: 'linear-gradient(135deg, #F5C542, #F59E0B)', color: '#0B0F1A', fontWeight: 700, fontSize: '14px', border: 'none', cursor: 'pointer', boxShadow: '0 0 20px rgba(245,197,66,0.3)' }}>
            Get Started
          </button>
        </div>
      </div>
      {/* AI Suggestion Card */}
      <div>
        <p style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 700, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>AI Suggestion Card (Glow Border)</p>
        <div className="rounded-2xl p-7" style={{ backgroundColor: 'rgba(245,197,66,0.04)', border: '1px solid rgba(245,197,66,0.3)', boxShadow: '0 0 28px rgba(245,197,66,0.1), inset 0 0 20px rgba(245,197,66,0.03)' }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(245,197,66,0.2), rgba(245,197,66,0.05))', border: '1px solid rgba(245,197,66,0.3)' }}>
              <Sparkles size={13} color="#F5C542" />
            </div>
            <span style={{ fontSize: '13px', color: '#F5C542', fontWeight: 700 }}>Suggested Fix</span>
            <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#F5C542', fontWeight: 700 }}>94% confident</span>
          </div>
          <p style={{ fontSize: '14px', color: '#D1D5DB', lineHeight: 1.7, marginBottom: '14px' }}>
            Cookie key mismatch: <code style={{ color: '#FCA5A5', fontFamily: 'monospace' }}>refreshToken</code> → <code style={{ color: '#86EFAC', fontFamily: 'monospace' }}>refresh_token</code> on line 30 of <code style={{ color: '#93C5FD', fontFamily: 'monospace' }}>jwt.ts</code>
          </p>
          <div className="mb-4">
            <div className="flex justify-between mb-1.5"><span style={{ fontSize: '11px', color: '#9CA3AF' }}>AI Confidence Level</span><span style={{ fontSize: '11px', color: '#F5C542', fontWeight: 700 }}>94%</span></div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#2D3748' }}>
              <div className="h-full rounded-full" style={{ width: '94%', backgroundColor: '#F5C542' }} />
            </div>
          </div>
          <button className="px-4 py-2 rounded-xl" style={{ backgroundColor: 'rgba(245,197,66,0.12)', color: '#F5C542', fontWeight: 700, fontSize: '13px', border: '1px solid rgba(245,197,66,0.25)', cursor: 'pointer' }}>Apply Fix →</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Badge Showcase ──────────────────────────────────────────────── */
function BadgeShowcase() {
  const badges = [
    { label: 'Live', icon: null, dot: true, dotColor: '#EF4444', textColor: '#EF4444', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.3)', desc: 'Real-time session active' },
    { label: 'Beta', icon: null, dot: false, dotColor: '', textColor: '#3B82F6', bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.3)', desc: 'Feature in beta testing' },
    { label: 'AI Active', icon: true, dot: false, dotColor: '', textColor: '#F5C542', bg: 'rgba(245,197,66,0.12)', border: 'rgba(245,197,66,0.3)', desc: 'AI Copilot engaged' },
    { label: 'Online', icon: null, dot: true, dotColor: '#22C55E', textColor: '#22C55E', bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.3)', desc: 'User is online' },
    { label: 'Idle', icon: null, dot: true, dotColor: '#F97316', textColor: '#F97316', bg: 'rgba(249,115,22,0.12)', border: 'rgba(249,115,22,0.3)', desc: 'User is inactive' },
    { label: 'Resolved', icon: null, dot: false, dotColor: '', textColor: '#22C55E', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.2)', desc: 'Bug fixed', check: true },
    { label: 'Offline', icon: null, dot: true, dotColor: '#6B7280', textColor: '#6B7280', bg: 'rgba(107,114,128,0.12)', border: 'rgba(107,114,128,0.3)', desc: 'User is offline' },
    { label: 'Error', icon: null, dot: false, dotColor: '', textColor: '#EF4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.2)', desc: 'Error state', warn: true },
  ];

  return (
    <div className="rounded-2xl p-8" style={{ backgroundColor: '#111827', border: '1px solid #2D3748' }}>
      <div className="grid grid-cols-4 gap-6">
        {badges.map(b => (
          <div key={b.label} className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ backgroundColor: b.bg, border: `1px solid ${b.border}` }}>
              {b.dot && <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: b.dotColor }} />}
              {b.icon && <Sparkles size={11} color={b.textColor} />}
              {b.check && <CheckCircle size={11} color={b.textColor} />}
              {b.warn && <AlertTriangle size={11} color={b.textColor} />}
              <span style={{ fontSize: '11px', color: b.textColor, fontWeight: 700, letterSpacing: '0.03em' }}>{b.label}</span>
            </div>
            <p style={{ fontSize: '11px', color: '#6B7280' }}>{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Navbar Showcase ─────────────────────────────────────────────── */
function NavbarShowcase() {
  return (
    <div className="space-y-6">
      {[
        { label: 'Desktop · Logged Out', mobile: false, loggedIn: false },
        { label: 'Desktop · Logged In', mobile: false, loggedIn: true },
        { label: 'Mobile · Logged Out', mobile: true, loggedIn: false },
        { label: 'Mobile · Logged In', mobile: true, loggedIn: true },
      ].map(v => (
        <div key={v.label}>
          <p style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{v.label}</p>
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #2D3748' }}>
            <div className="flex items-center justify-between px-5 py-3" style={{ backgroundColor: '#0D1220' }}>
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F5C542, #F59E0B)', boxShadow: '0 0 10px rgba(245,197,66,0.35)' }}>
                  <Zap size={14} color="#0B0F1A" strokeWidth={2.5} />
                </div>
                <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '15px', color: '#F9FAFB' }}>
                  DevSync <span style={{ color: '#F5C542' }}>AI</span>
                </span>
                {/* Beta badge */}
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full ml-1" style={{ backgroundColor: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)' }}>
                  <span style={{ fontSize: '9px', color: '#3B82F6', fontWeight: 700 }}>BETA</span>
                </div>
              </div>

              {v.mobile ? (
                /* Mobile nav */
                <div className="flex items-center gap-3">
                  {v.loggedIn ? (
                    <>
                      <div className="relative">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: '#3B82F6', fontSize: '10px', color: '#fff', fontWeight: 700 }}>AK</div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full border" style={{ backgroundColor: '#22C55E', borderColor: '#0D1220' }} />
                      </div>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: 0 }}><Menu size={18} /></button>
                    </>
                  ) : (
                    <>
                      <button style={{ fontSize: '12px', color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer' }}>Login</button>
                      <div className="px-3 py-1.5 rounded-lg" style={{ background: 'linear-gradient(135deg, #F5C542, #F59E0B)', boxShadow: '0 0 10px rgba(245,197,66,0.3)' }}>
                        <span style={{ fontSize: '12px', color: '#0B0F1A', fontWeight: 700 }}>Sign Up</span>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                /* Desktop nav */
                <div className="flex items-center gap-6">
                  {['Features', 'How It Works', 'Pricing'].map(l => (
                    <span key={l} style={{ fontSize: '13px', color: '#9CA3AF', cursor: 'pointer' }}>{l}</span>
                  ))}
                </div>
              )}

              {!v.mobile && (
                <div className="flex items-center gap-3">
                  {v.loggedIn ? (
                    <>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl" style={{ backgroundColor: 'rgba(245,197,66,0.08)', border: '1px solid rgba(245,197,66,0.2)' }}>
                        <Sparkles size={12} color="#F5C542" />
                        <span style={{ fontSize: '12px', color: '#F5C542', fontWeight: 600 }}>AI Active</span>
                      </div>
                      <div className="relative">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#3B82F6', fontSize: '11px', color: '#fff', fontWeight: 700 }}>AK</div>
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2" style={{ backgroundColor: '#22C55E', borderColor: '#0D1220' }} />
                      </div>
                    </>
                  ) : (
                    <>
                      <span style={{ fontSize: '13px', color: '#9CA3AF', cursor: 'pointer' }}>Login</span>
                      <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl" style={{ background: 'linear-gradient(135deg, #F5C542, #F59E0B)', boxShadow: '0 0 14px rgba(245,197,66,0.3)' }}>
                        <Zap size={13} color="#0B0F1A" />
                        <span style={{ fontSize: '13px', color: '#0B0F1A', fontWeight: 700 }}>Create Room</span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Grid System ─────────────────────────────────────────────────── */
function GridSystem() {
  return (
    <div className="space-y-8">
      {[
        { label: 'Desktop — 12 Column Grid (1440px)', cols: 12, bg: '#3B82F6' },
        { label: 'Tablet — 8 Column Grid (768px)', cols: 8, bg: '#F5C542' },
        { label: 'Mobile — 4 Column Grid (375px)', cols: 4, bg: '#22C55E' },
      ].map(g => (
        <div key={g.label}>
          <p style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 600, marginBottom: '10px' }}>{g.label}</p>
          <div className="rounded-2xl p-5" style={{ backgroundColor: '#111827', border: '1px solid #2D3748' }}>
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${g.cols}, 1fr)` }}>
              {[...Array(g.cols)].map((_, i) => (
                <div key={i} className="rounded-md flex items-center justify-center" style={{ height: '40px', backgroundColor: `${g.bg}18`, border: `1px solid ${g.bg}30` }}>
                  <span style={{ fontSize: '9px', color: g.bg, fontWeight: 700 }}>{i + 1}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-3">
              <span style={{ fontSize: '11px', color: '#6B7280' }}>{g.cols} columns · 16px gutter · 48px outer margin</span>
              <span style={{ fontSize: '11px', color: '#9CA3AF', fontFamily: 'monospace' }}>gap: 16px</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Developer Handoff ───────────────────────────────────────────── */
function DevHandoff() {
  const cssVars = `/* DevSync AI — CSS Custom Properties */
:root {
  /* Background */
  --color-primary-bg:       #0B0F1A;  /* BG / Primary Dark */
  --color-secondary-bg:     #111827;  /* BG / Surface */
  --color-card-bg:          #1F2937;  /* BG / Elevated */

  /* Text */
  --color-text-primary:     #F9FAFB;  /* Text / High */
  --color-text-medium:      #D1D5DB;  /* Text / Medium */
  --color-text-secondary:   #9CA3AF;  /* Text / Muted */

  /* Brand */
  --color-accent-gold:      #F5C542;  /* Brand / Primary Yellow */
  --color-accent-gold-hover:#F59E0B;  /* Brand / Yellow Hover */
  --color-accent-blue:      #3B82F6;  /* Accent / Blue */
  --color-success:          #22C55E;  /* Accent / Green */

  /* Semantic */
  --color-error:            #EF4444;  /* Error / Red */
  --color-warning:          #F97316;  /* Warning / Orange */
  --color-border-subtle:    #2D3748;  /* Border / Subtle */

  /* Typography */
  --font-heading:           "DM Serif Display", Georgia, serif;
  --font-body:              "Inter", -apple-system, sans-serif;

  /* Spacing (8px base grid) */
  --space-1: 8px;   --space-2: 16px;
  --space-3: 24px;  --space-4: 32px;
  --space-6: 48px;  --space-8: 64px;

  /* Border Radius */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;  /* Primary — 16px everywhere */
  --radius-2xl:  20px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-glow-gold: 0 0 20px rgba(245,197,66,0.35);
  --shadow-glow-blue: 0 0 20px rgba(59,130,246,0.35);
  --shadow-card:      0 4px 24px rgba(0,0,0,0.3);
  --shadow-modal:     0 20px 60px rgba(0,0,0,0.5);
}`;

  return (
    <div className="space-y-6">
      {/* CSS Variables */}
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #2D3748' }}>
        <div className="flex items-center justify-between px-5 py-3" style={{ backgroundColor: '#0D1220', borderBottom: '1px solid #2D3748' }}>
          <div className="flex items-center gap-2">
            <Code2 size={14} color="#F5C542" />
            <span style={{ fontSize: '13px', color: '#F9FAFB', fontWeight: 600 }}>design-tokens.css</span>
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(cssVars)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors"
            style={{ backgroundColor: '#1F2937', border: '1px solid #2D3748', color: '#9CA3AF', fontSize: '12px', cursor: 'pointer' }}
          >
            <Copy size={12} /> Copy All
          </button>
        </div>
        <pre style={{ backgroundColor: '#0B0F1A', padding: '20px 24px', fontSize: '12px', color: '#D1D5DB', fontFamily: "'Fira Code', 'JetBrains Mono', monospace", lineHeight: 1.75, overflowX: 'auto', margin: 0 }}>
          {cssVars}
        </pre>
      </div>

      {/* Font Stack */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl p-5" style={{ backgroundColor: '#111827', border: '1px solid #2D3748' }}>
          <p style={{ fontSize: '11px', color: '#F5C542', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Heading Font</p>
          <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '28px', color: '#F9FAFB', marginBottom: '8px' }}>DM Serif Display</p>
          <code style={{ fontSize: '12px', color: '#9CA3AF', fontFamily: 'monospace' }}>font-family: "DM Serif Display", Georgia, serif;</code>
          <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '8px' }}>Weight: 400 Regular (only weight needed)</p>
          <p style={{ fontSize: '12px', color: '#6B7280' }}>Import: Google Fonts · Serve via @import</p>
        </div>
        <div className="rounded-2xl p-5" style={{ backgroundColor: '#111827', border: '1px solid #2D3748' }}>
          <p style={{ fontSize: '11px', color: '#3B82F6', fontWeight: 700, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Body Font</p>
          <p style={{ fontSize: '28px', color: '#F9FAFB', marginBottom: '8px', fontWeight: 400 }}>Inter</p>
          <code style={{ fontSize: '12px', color: '#9CA3AF', fontFamily: 'monospace' }}>font-family: "Inter", -apple-system, sans-serif;</code>
          <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '8px' }}>Weights: 300, 400, 500, 600, 700, 800</p>
          <p style={{ fontSize: '12px', color: '#6B7280' }}>Import: Google Fonts or self-hosted</p>
        </div>
      </div>

      {/* Shadows */}
      <div className="rounded-2xl p-6" style={{ backgroundColor: '#111827', border: '1px solid #2D3748' }}>
        <p style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 700, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Shadow System</p>
        <div className="grid grid-cols-3 gap-4">
          {shadowTokens.map(s => (
            <div key={s.name} className="rounded-xl p-4" style={{ backgroundColor: '#0B0F1A' }}>
              <div className="h-12 rounded-xl mb-4" style={{ backgroundColor: '#1F2937', boxShadow: s.value }} />
              <p style={{ fontSize: '12px', color: '#F9FAFB', fontWeight: 600, marginBottom: '3px' }}>{s.name}</p>
              <p style={{ fontSize: '10px', color: '#6B7280', fontFamily: 'monospace', marginBottom: '4px', lineHeight: 1.5 }}>{s.value}</p>
              <p style={{ fontSize: '10px', color: '#9CA3AF' }}>{s.usage}</p>
            </div>
          ))}
        </div>
      </div>

      {/* A11y Notes */}
      <div className="rounded-2xl p-6" style={{ backgroundColor: '#111827', border: '1px solid #2D3748' }}>
        <p style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 700, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Accessibility Notes</p>
        <div className="grid grid-cols-2 gap-5">
          {[
            { title: 'Contrast Ratios', items: ['Text/High on BG/Primary: 17.5:1 ✓ AAA', 'Gold on BG/Primary: 8.2:1 ✓ AA+', 'Muted on BG/Surface: 4.7:1 ✓ AA', 'Always use Text/High for critical labels'] },
            { title: 'Focus States', items: ['All interactive elements have visible :focus-visible', 'Focus ring: 2px solid rgba(gold, 0.5) + 2px offset', 'Never remove outlines without a custom replacement', 'Tab order follows visual reading order'] },
            { title: 'Motion & Animation', items: ['Respect prefers-reduced-motion media query', 'All animations ≤ 300ms for UI feedback', 'Typing indicators use gentle bounce (<5px)', 'LIVE badge pulse: 2s ease-in-out infinite'] },
            { title: 'Semantic HTML', items: ['Use <button> for actions, <a> for navigation', 'ARIA labels on icon-only buttons required', 'AI messages include role="status" for SR', 'Color never used as sole information carrier'] },
          ].map(section => (
            <div key={section.title} className="rounded-xl p-4" style={{ backgroundColor: '#0B0F1A', border: '1px solid #2D3748' }}>
              <p style={{ fontSize: '13px', color: '#F9FAFB', fontWeight: 600, marginBottom: '10px' }}>{section.title}</p>
              <div className="space-y-2">
                {section.items.map(item => (
                  <div key={item} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#F5C542' }} />
                    <p style={{ fontSize: '12px', color: '#9CA3AF', lineHeight: 1.6 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Vision Roadmap ──────────────────────────────────────────────── */
function VisionRoadmap() {
  const roadmap = [
    { phase: 'Q2 2026', label: 'Now', status: 'live', title: 'Core Platform', items: ['3-panel Dev Chat Room', 'AI Copilot v1 (bug detection)', 'Real-time room collaboration', 'Basic analytics dashboard'] },
    { phase: 'Q3 2026', label: 'Next', status: 'building', title: 'AI Deep Dive', items: ['AI code generation (full functions)', 'Multi-model support (GPT-4, Claude)', 'Git integration + PR reviews', 'Advanced context memory'] },
    { phase: 'Q4 2026', label: 'Soon', status: 'planned', title: 'Enterprise Scale', items: ['SSO + RBAC permissions', 'On-premise deployment option', 'Custom AI fine-tuning per org', 'Audit logs + compliance'] },
    { phase: '2027', label: 'Vision', status: 'vision', title: 'AI-Native Dev Platform', items: ['Autonomous bug resolution', 'Predictive code quality scoring', 'Voice-to-code sessions', 'AI team member personas'] },
  ];

  const statusStyle: Record<string, { color: string; bg: string; border: string; dot: string }> = {
    live: { color: '#22C55E', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.25)', dot: '#22C55E' },
    building: { color: '#F5C542', bg: 'rgba(245,197,66,0.1)', border: 'rgba(245,197,66,0.25)', dot: '#F5C542' },
    planned: { color: '#3B82F6', bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.25)', dot: '#3B82F6' },
    vision: { color: '#A78BFA', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.25)', dot: '#A78BFA' },
  };

  return (
    <div>
      {/* Roadmap grid */}
      <div className="grid grid-cols-4 gap-5 mb-10">
        {roadmap.map((r, i) => {
          const s = statusStyle[r.status];
          return (
            <div
              key={r.phase}
              className="rounded-2xl p-6 relative overflow-hidden transition-all duration-200"
              style={{ backgroundColor: '#111827', border: `1px solid ${s.border}` }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${s.bg.replace('0.1', '0.15')}`; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              {/* Glow bg */}
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${s.bg.replace('0.1', '0.12')} 0%, transparent 70%)`, transform: 'translate(30%, -30%)' }} />

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ backgroundColor: s.bg, border: `1px solid ${s.border}` }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.dot, animation: r.status === 'live' ? 'pulse 1.5s ease-in-out infinite' : 'none' }} />
                  <span style={{ fontSize: '10px', color: s.color, fontWeight: 700 }}>{r.label.toUpperCase()}</span>
                </div>
                <span style={{ fontSize: '12px', color: '#6B7280', fontFamily: 'monospace' }}>{r.phase}</span>
              </div>

              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '20px', color: '#F9FAFB', marginBottom: '14px', lineHeight: 1.3 }}>{r.title}</h3>

              <div className="space-y-2">
                {r.items.map((item, j) => (
                  <div key={j} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: s.color }} />
                    <p style={{ fontSize: '12px', color: '#D1D5DB', lineHeight: 1.6 }}>{item}</p>
                  </div>
                ))}
              </div>

              {/* Phase connector */}
              {i < roadmap.length - 1 && (
                <div className="absolute -right-3 top-1/2 z-10 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#111827', border: '1px solid #2D3748', transform: 'translateY(-50%)' }}>
                  <ArrowRight size={10} color="#6B7280" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Dashboard preview concepts */}
      <div className="rounded-2xl p-8" style={{ backgroundColor: '#111827', border: '1px solid rgba(167,139,250,0.2)', boxShadow: '0 0 40px rgba(167,139,250,0.05)' }}>
        <div className="flex items-center gap-2 mb-6">
          <Sparkles size={16} color="#A78BFA" />
          <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '22px', color: '#F9FAFB' }}>Vision: Future UI Concepts</h3>
          <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ backgroundColor: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.25)' }}>
            <span style={{ fontSize: '10px', color: '#A78BFA', fontWeight: 700 }}>2027 CONCEPT</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { title: 'Autonomous Debug Mode', desc: 'AI monitors all rooms continuously, auto-files issues, and proposes PRs without being asked.', icon: Bot, color: '#A78BFA' },
            { title: 'Predictive Quality Score', desc: 'Real-time code quality score per room. AI flags technical debt before it ships.', icon: BarChart3, color: '#3B82F6' },
            { title: 'Voice-to-Code Sessions', desc: 'Describe the bug in natural language. AI generates the fix and explains it step-by-step.', icon: MessageSquare, color: '#22C55E' },
          ].map(c => (
            <div key={c.title} className="rounded-xl p-5" style={{ backgroundColor: '#0B0F1A', border: '1px solid #2D3748' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${c.color}12` }}>
                <c.icon size={18} color={c.color} />
              </div>
              <h4 style={{ fontSize: '15px', color: '#F9FAFB', fontWeight: 600, marginBottom: '8px' }}>{c.title}</h4>
              <p style={{ fontSize: '13px', color: '#9CA3AF', lineHeight: 1.65 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Anchor Nav ──────────────────────────────────────────────────── */
const navSections = [
  { id: 'color-tokens', label: 'Color Tokens' },
  { id: 'typography', label: 'Typography' },
  { id: 'spacing-grid', label: 'Spacing & Grid' },
  { id: 'buttons', label: 'Buttons' },
  { id: 'inputs', label: 'Input Fields' },
  { id: 'cards', label: 'Cards' },
  { id: 'badges', label: 'Badges' },
  { id: 'navbar', label: 'Navbar' },
  { id: 'ux-principles', label: 'UX Principles' },
  { id: 'dev-handoff', label: 'Developer Handoff' },
  { id: 'vision-roadmap', label: 'Vision Roadmap' },
];

/* ─── Page ────────────────────────────────────────────────────────── */
export default function DesignSystemPage() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('color-tokens');

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveSection(id);
  };

  return (
    <div style={{ backgroundColor: '#0B0F1A', fontFamily: "'Inter', sans-serif", minHeight: '100vh' }}>
      {/* Top Bar */}
      <div
        className="flex items-center justify-between px-8 sticky top-0 z-40"
        style={{ height: '64px', backgroundColor: 'rgba(11,15,26,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #2D3748' }}
      >
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F5C542, #F59E0B)', boxShadow: '0 0 16px rgba(245,197,66,0.4)' }}>
            <Zap size={16} color="#0B0F1A" strokeWidth={2.5} />
          </div>
          <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '18px', color: '#F9FAFB' }}>
            DevSync <span style={{ color: '#F5C542' }}>AI</span>
          </span>
          <div className="h-4 w-px mx-2" style={{ backgroundColor: '#2D3748' }} />
          <div className="flex items-center gap-2">
            <Palette size={14} color="#9CA3AF" />
            <span style={{ fontSize: '14px', color: '#9CA3AF' }}>Design System</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/prototype-flow')} className="flex items-center gap-2 px-4 py-2 rounded-xl transition-colors"
            style={{ backgroundColor: '#111827', border: '1px solid #2D3748', color: '#9CA3AF', fontSize: '13px', cursor: 'pointer' }}>
            <Play size={13} /> Prototype Flow
          </button>
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all"
            style={{ background: 'linear-gradient(135deg, #F5C542, #F59E0B)', color: '#0B0F1A', fontWeight: 700, fontSize: '13px', border: 'none', cursor: 'pointer', boxShadow: '0 0 16px rgba(245,197,66,0.3)' }}>
            <Zap size={13} /> Open App
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sticky Left Nav */}
        <nav
          className="sticky top-16 self-start flex-shrink-0 py-8 px-4 overflow-y-auto"
          style={{ width: '200px', height: 'calc(100vh - 64px)', borderRight: '1px solid #2D3748' }}
        >
          <p style={{ fontSize: '10px', color: '#6B7280', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px', paddingLeft: '8px' }}>Sections</p>
          <div className="space-y-0.5">
            {navSections.map(s => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="w-full text-left rounded-xl px-3 py-2 transition-all duration-150"
                style={{
                  fontSize: '13px',
                  color: activeSection === s.id ? '#F5C542' : '#9CA3AF',
                  backgroundColor: activeSection === s.id ? 'rgba(245,197,66,0.08)' : 'transparent',
                  borderLeft: activeSection === s.id ? '2px solid #F5C542' : '2px solid transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: activeSection === s.id ? 600 : 400,
                }}
                onMouseEnter={e => { if (activeSection !== s.id) (e.currentTarget.style.color = '#D1D5DB'); }}
                onMouseLeave={e => { if (activeSection !== s.id) (e.currentTarget.style.color = '#9CA3AF'); }}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Spec badge */}
          <div className="mt-8 mx-2 rounded-xl p-3" style={{ backgroundColor: 'rgba(245,197,66,0.06)', border: '1px solid rgba(245,197,66,0.15)' }}>
            <p style={{ fontSize: '10px', color: '#F5C542', fontWeight: 700, marginBottom: '4px' }}>SPEC</p>
            <p style={{ fontSize: '10px', color: '#9CA3AF', lineHeight: 1.5 }}>8px grid · 16px radius · DM Serif + Inter</p>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 py-12 px-10 overflow-y-auto" style={{ maxWidth: '1100px' }}>
          {/* Page Header */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F5C542, #F59E0B)', boxShadow: '0 0 24px rgba(245,197,66,0.4)' }}>
                <Palette size={24} color="#0B0F1A" />
              </div>
              <div>
                <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '36px', color: '#F9FAFB', lineHeight: 1.1 }}>DevSync AI Design System</h1>
                <p style={{ fontSize: '14px', color: '#9CA3AF' }}>Hackathon Edition · 8px Grid · 16px Radius · DM Serif + Inter</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)' }}>
                  <span style={{ fontSize: '11px', color: '#3B82F6', fontWeight: 700 }}>BETA</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(245,197,66,0.1)', border: '1px solid rgba(245,197,66,0.25)' }}>
                  <Sparkles size={11} color="#F5C542" />
                  <span style={{ fontSize: '11px', color: '#F5C542', fontWeight: 700 }}>AI ENHANCED</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Color Tokens ── */}
          <Section id="color-tokens" label="Design Tokens" title="Color System">
            <div className="space-y-6">
              {colorTokens.map(group => (
                <div key={group.group}>
                  <p style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 700, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{group.group}</p>
                  <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #2D3748' }}>
                    <table className="w-full">
                      <thead>
                        <tr style={{ backgroundColor: '#0D1220' }}>
                          {['Token Name', 'Swatch', 'Hex', 'CSS Variable', 'Usage'].map(h => (
                            <th key={h} style={{ padding: '10px 16px', fontSize: '10px', color: '#6B7280', fontWeight: 700, textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid #2D3748' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {group.tokens.map((token, i) => (
                          <tr key={token.token} style={{ backgroundColor: '#111827', borderBottom: i < group.tokens.length - 1 ? '1px solid #1F2937' : 'none' }}
                            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1F2937')}
                            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#111827')}>
                            <td style={{ padding: '12px 16px' }}>
                              <p style={{ fontSize: '13px', color: '#F9FAFB', fontWeight: 600 }}>{token.token}</p>
                              <p style={{ fontSize: '11px', color: '#6B7280' }}>{token.name}</p>
                            </td>
                            <td style={{ padding: '12px 16px' }}>
                              <div className="w-8 h-8 rounded-lg border" style={{ backgroundColor: token.hex, borderColor: '#2D3748' }} />
                            </td>
                            <td style={{ padding: '12px 16px' }}>
                              <CopyableCode value={token.hex} />
                            </td>
                            <td style={{ padding: '12px 16px' }}>
                              <CopyableCode value={token.css} />
                            </td>
                            <td style={{ padding: '12px 16px' }}>
                              <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{token.usage}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* ── Typography ── */}
          <Section id="typography" label="Type System" title="Typography Scale">
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #2D3748' }}>
              <div className="px-6 py-4" style={{ backgroundColor: '#0D1220', borderBottom: '1px solid #2D3748' }}>
                <div className="grid" style={{ gridTemplateColumns: '120px 80px 140px 1fr 80px' }}>
                  {['Style Label', 'Tag', 'Font', 'Sample', 'Size / Wt'].map(h => (
                    <p key={h} style={{ fontSize: '10px', color: '#6B7280', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</p>
                  ))}
                </div>
              </div>
              {typoScale.map((t, i) => (
                <div
                  key={t.label}
                  className="px-6 py-5"
                  style={{ backgroundColor: '#111827', borderBottom: i < typoScale.length - 1 ? '1px solid #1F2937' : 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1F2937')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#111827')}
                >
                  <div className="grid items-center" style={{ gridTemplateColumns: '120px 80px 140px 1fr 80px', gap: '16px' }}>
                    <p style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 600 }}>{t.label}</p>
                    <div className="px-2 py-0.5 rounded-md w-fit" style={{ backgroundColor: '#1F2937', fontSize: '11px', color: '#F5C542', fontFamily: 'monospace' }}>{t.tag}</div>
                    <p style={{ fontSize: '11px', color: '#6B7280' }}>{t.family}</p>
                    <p style={{ fontFamily: t.family.includes('Serif') ? "'DM Serif Display', serif" : "'Inter', sans-serif", fontSize: t.size, color: '#F9FAFB', fontWeight: t.weight, lineHeight: 1.25, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {t.sample}
                    </p>
                    <p style={{ fontSize: '11px', color: '#6B7280', fontFamily: 'monospace' }}>{t.size} / {t.weight}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* ── Spacing & Grid ── */}
          <Section id="spacing-grid" label="Layout System" title="Spacing & Grid">
            <div className="space-y-8">
              {/* Spacing Scale */}
              <div className="rounded-2xl p-6" style={{ backgroundColor: '#111827', border: '1px solid #2D3748' }}>
                <p style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 700, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>8px Base Spacing Scale</p>
                <div className="flex items-end gap-4 flex-wrap">
                  {spacingScale.map(s => (
                    <div key={s} className="flex flex-col items-center gap-2">
                      <div style={{ width: `${s}px`, height: `${s}px`, backgroundColor: 'rgba(245,197,66,0.12)', border: '1px solid rgba(245,197,66,0.25)', borderRadius: '4px' }} />
                      <span style={{ fontSize: '10px', color: '#9CA3AF', fontFamily: 'monospace' }}>{s}px</span>
                      <span style={{ fontSize: '9px', color: '#6B7280' }}>×{s / 8}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Grid Systems */}
              <GridSystem />
              {/* Border Radius */}
              <div className="rounded-2xl p-6" style={{ backgroundColor: '#111827', border: '1px solid #2D3748' }}>
                <p style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 700, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Border Radius — 16px Primary</p>
                <div className="flex items-end gap-8">
                  {[{ l: 'sm', r: '4px' }, { l: 'md', r: '8px' }, { l: 'lg', r: '12px' }, { l: 'xl', r: '16px', primary: true }, { l: '2xl', r: '20px' }, { l: 'full', r: '9999px' }].map(r => (
                    <div key={r.l} className="flex flex-col items-center gap-3">
                      <div style={{ width: '72px', height: '72px', backgroundColor: r.primary ? 'rgba(245,197,66,0.12)' : 'rgba(59,130,246,0.08)', border: `1px solid ${r.primary ? 'rgba(245,197,66,0.35)' : 'rgba(59,130,246,0.2)'}`, borderRadius: r.r, boxShadow: r.primary ? '0 0 16px rgba(245,197,66,0.15)' : 'none' }} />
                      <p style={{ fontSize: '12px', color: r.primary ? '#F5C542' : '#F9FAFB', fontWeight: r.primary ? 700 : 400 }}>{r.l}</p>
                      <p style={{ fontSize: '10px', color: '#6B7280', fontFamily: 'monospace' }}>{r.r}</p>
                      {r.primary && <p style={{ fontSize: '9px', color: '#F5C542', fontWeight: 700 }}>PRIMARY</p>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* ── Buttons ── */}
          <Section id="buttons" label="Components" title="Button Variants">
            <ButtonShowcase />
          </Section>

          {/* ── Inputs ── */}
          <Section id="inputs" label="Components" title="Input Fields">
            <InputShowcase />
          </Section>

          {/* ── Cards ── */}
          <Section id="cards" label="Components" title="Card Variants">
            <CardShowcase />
          </Section>

          {/* ── Badges ── */}
          <Section id="badges" label="Components" title="Badge System">
            <BadgeShowcase />
          </Section>

          {/* ── Navbar ── */}
          <Section id="navbar" label="Components" title="Navbar Variants">
            <NavbarShowcase />
          </Section>

          {/* ── UX Principles ── */}
          <Section id="ux-principles" label="Philosophy" title="UX Principles">
            <div className="grid grid-cols-2 gap-6">
              {principles.map((p, i) => (
                <div key={i} className="rounded-2xl p-8 transition-all duration-200"
                  style={{ backgroundColor: '#111827', border: '1px solid #2D3748' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = p.color + '60'; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${p.color}10`; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#2D3748'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: `${p.color}14`, border: `1px solid ${p.color}30` }}>
                    <p.icon size={22} color={p.color} />
                  </div>
                  <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '20px', color: '#F9FAFB', marginBottom: '10px' }}>{p.title}</h3>
                  <p style={{ fontSize: '14px', color: '#9CA3AF', lineHeight: 1.7 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* ── Developer Handoff ── */}
          <Section id="dev-handoff" label="Engineering" title="Developer Handoff Notes">
            <DevHandoff />
          </Section>

          {/* ── Vision Roadmap ── */}
          <Section id="vision-roadmap" label="🏆 Judges' Bonus" title="Vision Roadmap">
            <VisionRoadmap />
          </Section>
        </main>
      </div>
    </div>
  );
}

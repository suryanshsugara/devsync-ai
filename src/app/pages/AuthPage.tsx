import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Zap, Mail, Lock, ChevronDown, Eye, EyeOff, Sparkles, ArrowLeft, CheckCircle, AlertCircle, Github, Chrome } from 'lucide-react';

const perks = [
  'AI-powered bug resolution in real-time',
  'Collaborative dev rooms with code sharing',
  'Context-aware suggestions for your stack',
  'Team analytics and progress tracking',
];

type FieldError = { email?: string; password?: string; name?: string };

function validateEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter a valid email address';
}
function validatePassword(v: string) {
  return v.length >= 8 ? '' : 'Password must be at least 8 characters';
}

export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [showPass, setShowPass] = useState(false);
  const [role, setRole] = useState('developer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldError>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (): FieldError => {
    const e: FieldError = {};
    if (mode === 'signup' && !name.trim()) e.name = 'Full name is required';
    const emailErr = validateEmail(email);
    if (emailErr) e.email = emailErr;
    const passErr = validatePassword(password);
    if (passErr) e.password = passErr;
    return e;
  };

  const handleBlur = (field: string) => {
    setTouched(t => ({ ...t, [field]: true }));
    const e = validate();
    setErrors(e);
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setTouched({ email: true, password: true, name: true });
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setLoading(true);

    try {
      const { fetchApi } = await import('../lib/api');
      const payload = mode === 'signup'
        ? { email, password, role: role.toUpperCase().replace('-', '_') } // Map dev/team-lead to DEVELOPER / TEAM_LEAD format
        : { email, password };

      const response = await fetchApi(`/auth/${mode === 'signup' ? 'register' : 'login'}`, {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      localStorage.setItem('access_token', response.accessToken);
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/dashboard');
    } catch (err: any) {
      setErrors({ email: err.message || 'Authentication failed' });
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = (provider: string) => {
    setOauthLoading(provider);
    setTimeout(() => { setOauthLoading(null); navigate('/dashboard'); }, 1800);
  };

  const inputBase: React.CSSProperties = {
    width: '100%', padding: '12px 16px', borderRadius: '12px',
    backgroundColor: '#0B0F1A', color: '#F9FAFB', fontSize: '14px',
    outline: 'none', fontFamily: "'Inter', sans-serif", boxSizing: 'border-box',
    transition: 'border-color 0.15s, box-shadow 0.15s',
  };

  const getInputStyle = (field: string, hasLeft = false, hasRight = false): React.CSSProperties => {
    const hasErr = touched[field] && errors[field as keyof FieldError];
    return {
      ...inputBase,
      border: `1px solid ${hasErr ? '#EF4444' : '#2D3748'}`,
      boxShadow: hasErr ? '0 0 0 3px rgba(239,68,68,0.1)' : 'none',
      paddingLeft: hasLeft ? '40px' : '16px',
      paddingRight: hasRight ? '44px' : '16px',
    };
  };

  const FieldError = ({ field }: { field: keyof FieldError }) =>
    touched[field] && errors[field] ? (
      <div className="flex items-center gap-1.5 mt-2">
        <AlertCircle size={12} color="#EF4444" />
        <p style={{ fontSize: '12px', color: '#EF4444' }}>{errors[field]}</p>
      </div>
    ) : null;

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: '#0B0F1A', fontFamily: "'Inter', sans-serif" }}>

      {/* Left Brand Panel — hidden on mobile */}
      <div className="hidden lg:flex flex-shrink-0 flex-col justify-between p-12 relative overflow-hidden"
        style={{ width: '500px', background: 'linear-gradient(160deg, #0D1220 0%, #111827 100%)', borderRight: '1px solid #2D3748' }}>
        {/* Glow blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: 'absolute', top: '-80px', left: '-80px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(245,197,66,0.06) 0%, transparent 70%)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: '-100px', right: '-100px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)', borderRadius: '50%' }} />
        </div>

        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer relative z-10" onClick={() => navigate('/')}>
          <div className="flex items-center justify-center rounded-xl" style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #F5C542 0%, #F59E0B 100%)', boxShadow: '0 0 20px rgba(245,197,66,0.4)' }}>
            <Zap size={20} color="#0B0F1A" strokeWidth={2.5} />
          </div>
          <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '20px', color: '#F9FAFB' }}>
            DevSync <span style={{ color: '#F5C542' }}>AI</span>
          </span>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)' }}>
            <span style={{ fontSize: '10px', color: '#3B82F6', fontWeight: 700 }}>BETA</span>
          </div>
        </div>

        {/* Center content */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8" style={{ backgroundColor: 'rgba(245,197,66,0.08)', border: '1px solid rgba(245,197,66,0.2)' }}>
            <Sparkles size={13} color="#F5C542" />
            <span style={{ fontSize: '12px', color: '#F5C542', fontWeight: 600 }}>AI Copilot Included Free</span>
          </div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '40px', color: '#F9FAFB', lineHeight: 1.15, marginBottom: '20px' }}>
            Smarter collaboration starts here.
          </h1>
          <p style={{ fontSize: '16px', color: '#9CA3AF', lineHeight: 1.75, marginBottom: '36px' }}>
            Join 10,000+ developers who debug faster and ship smarter with real-time AI assistance.
          </p>
          <div className="space-y-4">
            {perks.map((perk, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle size={15} color="#22C55E" />
                <span style={{ fontSize: '14px', color: '#D1D5DB' }}>{perk}</span>
              </div>
            ))}
          </div>

          {/* AI Status */}
          <div className="flex items-center gap-3 rounded-2xl p-4 mt-10" style={{ backgroundColor: 'rgba(245,197,66,0.06)', border: '1px solid rgba(245,197,66,0.15)', boxShadow: '0 0 20px rgba(245,197,66,0.06)' }}>
            <div className="flex items-center justify-center rounded-xl flex-shrink-0" style={{ width: '34px', height: '34px', backgroundColor: 'rgba(245,197,66,0.12)' }}>
              <Sparkles size={15} color="#F5C542" />
            </div>
            <div>
              <p style={{ fontSize: '13px', color: '#F5C542', fontWeight: 600, marginBottom: '2px' }}>AI Copilot Active</p>
              <p style={{ fontSize: '12px', color: '#9CA3AF' }}>Monitoring 2,847 sessions right now</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#22C55E' }} />
              <span style={{ fontSize: '11px', color: '#22C55E' }}>LIVE</span>
            </div>
          </div>
        </div>

        <p style={{ fontSize: '12px', color: '#4B5563', position: 'relative', zIndex: 1 }}>© 2026 DevSync AI · Privacy · Terms</p>
      </div>

      {/* Right: Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full rounded-3xl p-8 lg:p-10" style={{ maxWidth: '460px', backgroundColor: '#111827', border: '1px solid #2D3748' }}>

          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F5C542, #F59E0B)', boxShadow: '0 0 14px rgba(245,197,66,0.4)' }}>
              <Zap size={16} color="#0B0F1A" strokeWidth={2.5} />
            </div>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '18px', color: '#F9FAFB' }}>DevSync <span style={{ color: '#F5C542' }}>AI</span></span>
          </div>

          {/* Tab toggle */}
          <div className="flex rounded-xl p-1 mb-8" style={{ backgroundColor: '#0B0F1A', border: '1px solid #2D3748' }}>
            {(['login', 'signup'] as const).map(tab => (
              <button key={tab} onClick={() => { setMode(tab); setErrors({}); setTouched({}); }}
                className="flex-1 py-2.5 rounded-lg transition-all duration-200"
                style={{ fontSize: '14px', fontWeight: 600, backgroundColor: mode === tab ? '#F5C542' : 'transparent', color: mode === tab ? '#0B0F1A' : '#9CA3AF', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
                {tab === 'login' ? 'Log In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '26px', color: '#F9FAFB', marginBottom: '6px' }}>
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h2>
          <p style={{ fontSize: '14px', color: '#9CA3AF', marginBottom: '28px' }}>
            {mode === 'login' ? 'Sign in to your DevSync AI workspace.' : 'Start collaborating with AI assistance today.'}
          </p>

          {/* OAuth Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { provider: 'GitHub', icon: Github, label: 'GitHub' },
              { provider: 'Google', icon: Chrome, label: 'Google' },
            ].map(({ provider, icon: Icon, label }) => (
              <button key={provider} onClick={() => handleOAuth(provider)} disabled={!!oauthLoading}
                className="flex items-center justify-center gap-2 rounded-xl py-3 transition-all duration-150"
                style={{ backgroundColor: '#1F2937', border: '1px solid #2D3748', color: '#D1D5DB', fontSize: '14px', fontWeight: 500, cursor: oauthLoading ? 'not-allowed' : 'pointer', fontFamily: "'Inter', sans-serif', opacity: oauthLoading && oauthLoading !== provider ? 0.5 : 1" }}
                onMouseEnter={e => { if (!oauthLoading) { (e.currentTarget as HTMLElement).style.borderColor = '#4B5563'; (e.currentTarget as HTMLElement).style.backgroundColor = '#2D3748'; } }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#2D3748'; (e.currentTarget as HTMLElement).style.backgroundColor = '#1F2937'; }}>
                {oauthLoading === provider ? (
                  <div className="w-4 h-4 rounded-full border-2 animate-spin" style={{ borderColor: 'transparent', borderTopColor: '#9CA3AF' }} />
                ) : (
                  <Icon size={16} />
                )}
                {oauthLoading === provider ? 'Connecting...' : label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px" style={{ backgroundColor: '#2D3748' }} />
            <span style={{ fontSize: '12px', color: '#6B7280' }}>or with email</span>
            <div className="flex-1 h-px" style={{ backgroundColor: '#2D3748' }} />
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label style={{ fontSize: '13px', color: touched.name && errors.name ? '#EF4444' : '#9CA3AF', fontWeight: 500, display: 'block', marginBottom: '7px' }}>Full Name</label>
                  <input type="text" placeholder="Alex Kumar" value={name} onChange={e => setName(e.target.value)} onBlur={() => handleBlur('name')}
                    style={getInputStyle('name')}
                    onFocus={e => { if (!errors.name) e.target.style.borderColor = '#F5C542'; }}
                  />
                  <FieldError field="name" />
                </div>
              )}

              <div>
                <label style={{ fontSize: '13px', color: touched.email && errors.email ? '#EF4444' : '#9CA3AF', fontWeight: 500, display: 'block', marginBottom: '7px' }}>Email Address</label>
                <div className="relative">
                  <Mail size={15} color={touched.email && errors.email ? '#EF4444' : '#6B7280'} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  <input type="email" placeholder="alex@company.com" value={email} onChange={e => setEmail(e.target.value)} onBlur={() => handleBlur('email')}
                    style={getInputStyle('email', true)}
                    onFocus={e => { if (!errors.email) e.target.style.borderColor = '#F5C542'; }}
                  />
                </div>
                <FieldError field="email" />
              </div>

              <div>
                <label style={{ fontSize: '13px', color: touched.password && errors.password ? '#EF4444' : '#9CA3AF', fontWeight: 500, display: 'block', marginBottom: '7px' }}>Password</label>
                <div className="relative">
                  <Lock size={15} color={touched.password && errors.password ? '#EF4444' : '#6B7280'} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  <input type={showPass ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} onBlur={() => handleBlur('password')}
                    style={getInputStyle('password', true, true)}
                    onFocus={e => { if (!errors.password) e.target.style.borderColor = '#F5C542'; }}
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', padding: 0 }}>
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                <FieldError field="password" />
                {/* Password strength indicator */}
                {mode === 'signup' && password.length > 0 && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex-1 h-1 rounded-full" style={{
                          backgroundColor: password.length >= (i + 1) * 2
                            ? password.length < 6 ? '#EF4444' : password.length < 10 ? '#F97316' : '#22C55E'
                            : '#2D3748'
                        }} />
                      ))}
                    </div>
                    <p style={{ fontSize: '11px', color: password.length < 6 ? '#EF4444' : password.length < 10 ? '#F97316' : '#22C55E' }}>
                      {password.length < 6 ? 'Weak' : password.length < 10 ? 'Fair' : 'Strong'} password
                    </p>
                  </div>
                )}
              </div>

              {mode === 'signup' && (
                <div>
                  <label style={{ fontSize: '13px', color: '#9CA3AF', fontWeight: 500, display: 'block', marginBottom: '7px' }}>Role</label>
                  <div className="relative">
                    <select value={role} onChange={e => setRole(e.target.value)}
                      style={{ ...inputBase, paddingRight: '40px', appearance: 'none', cursor: 'pointer', border: '1px solid #2D3748' }}>
                      <option value="developer">Developer</option>
                      <option value="team-lead">Team Lead</option>
                      <option value="architect">Architect</option>
                      <option value="devops">DevOps Engineer</option>
                    </select>
                    <ChevronDown size={15} color="#6B7280" style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  </div>
                </div>
              )}
            </div>

            {mode === 'login' && (
              <div className="flex justify-between items-center mt-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" style={{ accentColor: '#F5C542' }} />
                  <span style={{ fontSize: '13px', color: '#9CA3AF' }}>Remember me</span>
                </label>
                <button type="button" style={{ fontSize: '13px', color: '#3B82F6', background: 'none', border: 'none', cursor: 'pointer' }}>Forgot password?</button>
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl py-4 mt-6 transition-all duration-200"
              style={{ background: loading ? '#1F2937' : 'linear-gradient(135deg, #F5C542 0%, #F59E0B 100%)', color: loading ? '#9CA3AF' : '#0B0F1A', fontSize: '15px', fontWeight: 700, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: loading ? 'none' : '0 0 24px rgba(245,197,66,0.35)', fontFamily: "'Inter', sans-serif" }}>
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 animate-spin" style={{ borderColor: 'transparent', borderTopColor: '#9CA3AF' }} />
                  Authenticating...
                </div>
              ) : (
                <><Zap size={16} /> {mode === 'login' ? 'Sign In to DevSync' : 'Create Free Account'}</>
              )}
            </button>
          </form>

          {/* Error Example (demo) */}
          {Object.keys(errors).length > 0 && Object.keys(touched).length > 0 && (
            <div className="flex items-start gap-2.5 rounded-xl px-4 py-3 mt-4" style={{ backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
              <AlertCircle size={15} color="#EF4444" style={{ flexShrink: 0, marginTop: '1px' }} />
              <div>
                <p style={{ fontSize: '13px', color: '#EF4444', fontWeight: 600, marginBottom: '2px' }}>Please fix the errors above</p>
                <p style={{ fontSize: '12px', color: '#9CA3AF' }}>All fields marked with errors must be corrected before submitting.</p>
              </div>
            </div>
          )}

          <p style={{ fontSize: '13px', color: '#6B7280', textAlign: 'center', marginTop: '24px' }}>
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setErrors({}); setTouched({}); }}
              style={{ color: '#F5C542', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
              {mode === 'login' ? 'Sign up free' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>

      {/* Back to home */}
      <button onClick={() => navigate('/')} className="fixed top-5 right-5 flex items-center gap-2 rounded-xl px-4 py-2 transition-all duration-150"
        style={{ backgroundColor: '#111827', border: '1px solid #2D3748', color: '#9CA3AF', fontSize: '13px', cursor: 'pointer', zIndex: 50 }}
        onMouseEnter={e => (e.currentTarget.style.color = '#F9FAFB')}
        onMouseLeave={e => (e.currentTarget.style.color = '#9CA3AF')}>
        <ArrowLeft size={14} /> Back to home
      </button>
    </div>
  );
}

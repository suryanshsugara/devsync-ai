import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  Sparkles, MessageSquare, AlertTriangle, CheckCircle, Users,
  Code2, Play, Save, ChevronRight, GitBranch, RefreshCw,
  Zap, Copy, Maximize2, X, Hash, TrendingUp, FileCode
} from 'lucide-react';

const files = [
  { name: 'middleware/jwt.ts', active: true, hasIssue: true },
  { name: 'auth.service.ts', active: false, hasIssue: false },
  { name: 'hooks/useAuth.ts', active: false, hasIssue: false },
  { name: 'routes/auth.ts', active: false, hasIssue: true },
];

const codeLines = [
  { ln: 1, code: `import { Request, Response, NextFunction } from 'express';`, type: 'normal' },
  { ln: 2, code: `import jwt from 'jsonwebtoken';`, type: 'normal' },
  { ln: 3, code: `import { redisClient } from '../config/redis';`, type: 'normal' },
  { ln: 4, code: ``, type: 'normal' },
  { ln: 5, code: `const JWT_SECRET = process.env.JWT_SECRET!;`, type: 'normal' },
  { ln: 6, code: `const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET!;`, type: 'normal' },
  { ln: 7, code: ``, type: 'normal' },
  { ln: 8, code: `export async function verifyToken(`, type: 'normal' },
  { ln: 9, code: `  req: Request,`, type: 'normal' },
  { ln: 10, code: `  res: Response,`, type: 'normal' },
  { ln: 11, code: `  next: NextFunction`, type: 'normal' },
  { ln: 12, code: `): Promise<void> {`, type: 'normal' },
  { ln: 13, code: `  const authHeader = req.headers.authorization;`, type: 'normal' },
  { ln: 14, code: `  `, type: 'normal' },
  { ln: 15, code: `  if (!authHeader?.startsWith('Bearer ')) {`, type: 'normal' },
  { ln: 16, code: `    res.status(401).json({ error: 'No token provided' });`, type: 'normal' },
  { ln: 17, code: `    return;`, type: 'normal' },
  { ln: 18, code: `  }`, type: 'normal' },
  { ln: 19, code: ``, type: 'normal' },
  { ln: 20, code: `  // ... token verification logic`, type: 'normal' },
  { ln: 21, code: `}`, type: 'normal' },
  { ln: 22, code: ``, type: 'normal' },
  { ln: 23, code: `export async function refreshTokenMiddleware(`, type: 'normal' },
  { ln: 24, code: `  req: Request,`, type: 'normal' },
  { ln: 25, code: `  res: Response,`, type: 'normal' },
  { ln: 26, code: `  next: NextFunction`, type: 'normal' },
  { ln: 27, code: `): Promise<void> {`, type: 'normal' },
  { ln: 28, code: `  try {`, type: 'normal' },
  { ln: 29, code: `    // ⚠️  BUG: Cookie key mismatch`, type: 'error', comment: 'Bug detected by AI Copilot' },
  { ln: 30, code: `    const token = req.cookies.refreshToken;  // ← should be refresh_token`, type: 'error' },
  { ln: 31, code: ``, type: 'normal' },
  { ln: 32, code: `    if (!token) {`, type: 'normal' },
  { ln: 33, code: `      res.status(401).json({ error: 'No refresh token' });`, type: 'normal' },
  { ln: 34, code: `      return;`, type: 'normal' },
  { ln: 35, code: `    }`, type: 'normal' },
  { ln: 36, code: ``, type: 'normal' },
  { ln: 37, code: `    const decoded = jwt.verify(token, REFRESH_SECRET);`, type: 'normal' },
  { ln: 38, code: `    const isValid = await redisClient.get(\`refresh:\${decoded.userId}\`);`, type: 'normal' },
  { ln: 39, code: ``, type: 'normal' },
  { ln: 40, code: `    if (!isValid) {`, type: 'normal' },
  { ln: 41, code: `      res.status(401).json({ error: 'Token revoked' });`, type: 'normal' },
  { ln: 42, code: `      return;`, type: 'normal' },
  { ln: 43, code: `    }`, type: 'normal' },
  { ln: 44, code: ``, type: 'normal' },
  { ln: 45, code: `    next();`, type: 'normal' },
  { ln: 46, code: `  } catch (error) {`, type: 'normal' },
  { ln: 47, code: `    res.status(401).json({ error: 'Invalid refresh token' });`, type: 'normal' },
  { ln: 48, code: `  }`, type: 'normal' },
  { ln: 49, code: `}`, type: 'normal' },
];

const chatMessages = [
  { sender: 'Mike R.', initials: 'MR', color: '#22C55E', time: '10:45 AM', content: 'Found it — line 30. Cookie key is camelCase but should be snake_case.' },
  { sender: 'Alex K.', initials: 'AK', color: '#3B82F6', time: '10:46 AM', content: 'Confirmed. Fixing now.' },
  { sender: 'AI Copilot', initials: '✦', color: '#F5C542', time: '10:47 AM', isAI: true,
    content: 'Fix applied. Also consider adding token rotation to prevent replay attacks on line 37.' },
];

const aiSuggestions = [
  {
    color: '#EF4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)',
    icon: AlertTriangle, title: 'Bug on Line 30',
    content: 'req.cookies.refreshToken → req.cookies.refresh_token',
    line: 30,
  },
  {
    color: '#F5C542', bg: 'rgba(245,197,66,0.08)', border: 'rgba(245,197,66,0.2)',
    icon: Sparkles, title: 'Optimization',
    content: 'Add token rotation logic after line 37 to prevent replay attacks.',
    line: 37,
  },
  {
    color: '#3B82F6', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)',
    icon: TrendingUp, title: 'Improvement',
    content: 'Cache JWT verification result in Redis to reduce DB calls by ~60%.',
    line: null,
  },
];

function CodeLine({ line }: { line: typeof codeLines[0] }) {
  const isError = line.type === 'error';
  return (
    <div
      className="flex items-stretch group hover:bg-opacity-50 transition-colors"
      style={{
        backgroundColor: isError ? 'rgba(239,68,68,0.07)' : 'transparent',
        borderLeft: isError ? '2px solid #EF4444' : '2px solid transparent',
      }}
    >
      {/* Line number */}
      <div
        className="flex-shrink-0 select-none text-right pr-4 pl-4"
        style={{ minWidth: '52px', fontSize: '12px', color: isError ? '#EF4444' : '#4B5563', lineHeight: '22px', fontFamily: 'monospace' }}
      >
        {line.ln}
      </div>

      {/* Code */}
      <div className="flex-1 pr-4 relative">
        <pre
          style={{
            fontSize: '12.5px',
            color: isError ? '#FCA5A5' : '#D1D5DB',
            fontFamily: "'Fira Code', 'JetBrains Mono', 'Courier New', monospace",
            lineHeight: '22px',
            margin: 0,
            whiteSpace: 'pre',
          }}
        >
          {line.code}
        </pre>
        {line.comment && (
          <span
            className="absolute right-4 top-0"
            style={{ fontSize: '11px', color: '#EF4444', lineHeight: '22px', fontFamily: 'monospace' }}
          >
            {/* {line.comment} */}
          </span>
        )}
      </div>

      {/* Bug indicator */}
      {isError && (
        <div className="flex items-center pr-3 flex-shrink-0">
          <div
            className="flex items-center gap-1 px-2 py-0.5 rounded-md"
            style={{ backgroundColor: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)' }}
          >
            <AlertTriangle size={9} color="#EF4444" />
            <span style={{ fontSize: '9px', color: '#EF4444', fontWeight: 700 }}>AI BUG</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CodeViewPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [chatInput, setChatInput] = useState('');
  const [activeFile, setActiveFile] = useState(0);

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 64px)', backgroundColor: '#0B0F1A', fontFamily: "'Inter', sans-serif" }}>
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-6 flex-shrink-0"
        style={{ height: '48px', backgroundColor: '#0D1220', borderBottom: '1px solid #2D3748' }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <GitBranch size={13} color="#9CA3AF" />
            <span style={{ fontSize: '12px', color: '#9CA3AF' }}>main</span>
          </div>
          <div className="flex items-center gap-1">
            {files.map((f, i) => (
              <button
                key={i}
                onClick={() => setActiveFile(i)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-150"
                style={{
                  fontSize: '12px',
                  backgroundColor: activeFile === i ? '#1F2937' : 'transparent',
                  color: activeFile === i ? '#F9FAFB' : '#9CA3AF',
                  border: activeFile === i ? '1px solid #2D3748' : '1px solid transparent',
                  cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                <FileCode size={11} color={f.hasIssue ? '#EF4444' : '#9CA3AF'} />
                {f.name}
                {f.hasIssue && <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#EF4444' }} />}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* AI Bug notification */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}
          >
            <AlertTriangle size={11} color="#EF4444" />
            <span style={{ fontSize: '11px', color: '#EF4444', fontWeight: 700 }}>AI detected potential bug</span>
          </div>
          <button
            onClick={() => navigate(`/room/${roomId}`)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl transition-colors"
            style={{ backgroundColor: '#1F2937', border: '1px solid #2D3748', color: '#9CA3AF', fontSize: '12px', cursor: 'pointer' }}
          >
            <MessageSquare size={13} />
            Chat View
          </button>
          <button
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all"
            style={{ background: 'linear-gradient(135deg, #F5C542, #F59E0B)', color: '#0B0F1A', fontSize: '12px', fontWeight: 700, border: 'none', cursor: 'pointer' }}
          >
            <Save size={13} />
            Save
          </button>
        </div>
      </div>

      {/* Main 3-panel layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Code Editor */}
        <div className="flex-1 flex flex-col overflow-hidden" style={{ borderRight: '1px solid #2D3748' }}>
          {/* Editor header */}
          <div
            className="flex items-center justify-between px-4 py-2 flex-shrink-0"
            style={{ backgroundColor: '#0D1220', borderBottom: '1px solid #2D3748' }}
          >
            <div className="flex items-center gap-3">
              <Code2 size={13} color="#9CA3AF" />
              <span style={{ fontSize: '13px', color: '#F9FAFB', fontFamily: 'monospace' }}>
                {files[activeFile].name}
              </span>
              <span
                className="px-2 py-0.5 rounded-md"
                style={{ fontSize: '10px', color: '#9CA3AF', backgroundColor: '#1F2937' }}
              >
                TypeScript
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-2 py-1 rounded-lg" style={{ backgroundColor: 'rgba(245,197,66,0.08)', border: '1px solid rgba(245,197,66,0.15)' }}>
                <Users size={11} color="#F5C542" />
                <span style={{ fontSize: '10px', color: '#F5C542' }}>3 collaborators</span>
              </div>
              <button
                className="p-1.5 rounded-lg transition-colors"
                style={{ color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <Copy size={13} />
              </button>
              <button
                className="p-1.5 rounded-lg transition-colors"
                style={{ color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <Maximize2 size={13} />
              </button>
            </div>
          </div>

          {/* Code area */}
          <div className="flex-1 overflow-auto py-3" style={{ backgroundColor: '#0B0F1A' }}>
            {codeLines.map(line => (
              <CodeLine key={line.ln} line={line} />
            ))}
          </div>

          {/* Status bar */}
          <div
            className="flex items-center justify-between px-4 py-1.5 flex-shrink-0"
            style={{ backgroundColor: '#0D1220', borderTop: '1px solid #2D3748' }}
          >
            <div className="flex items-center gap-4">
              <span style={{ fontSize: '11px', color: '#6B7280' }}>TypeScript · UTF-8 · LF</span>
              <span style={{ fontSize: '11px', color: '#EF4444' }}>⚠ 2 issues</span>
            </div>
            <div className="flex items-center gap-3">
              <span style={{ fontSize: '11px', color: '#6B7280' }}>Ln 30, Col 24</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#22C55E' }} />
                <span style={{ fontSize: '11px', color: '#22C55E' }}>AI Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side: Chat + AI */}
        <div className="flex flex-col flex-shrink-0" style={{ width: '380px' }}>
          {/* Chat section (top half) */}
          <div className="flex flex-col" style={{ flex: '0 0 50%', borderBottom: '1px solid #2D3748', overflow: 'hidden' }}>
            <div
              className="flex items-center gap-2 px-4 py-3 flex-shrink-0"
              style={{ backgroundColor: '#0D1220', borderBottom: '1px solid #2D3748' }}
            >
              <MessageSquare size={13} color="#9CA3AF" />
              <span style={{ fontSize: '13px', color: '#F9FAFB', fontWeight: 600 }}>Chat Feed</span>
              <div className="flex items-center gap-1.5 ml-auto">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#EF4444' }} />
                <span style={{ fontSize: '10px', color: '#EF4444', fontWeight: 700 }}>LIVE</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((m, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div
                    className="flex items-center justify-center rounded-full flex-shrink-0"
                    style={{
                      width: '26px', height: '26px',
                      backgroundColor: m.isAI ? '#1F2937' : m.color,
                      border: m.isAI ? '1px solid rgba(245,197,66,0.4)' : 'none',
                      fontSize: '8px', color: m.color === '#F5C542' ? '#0B0F1A' : '#fff', fontWeight: 700,
                    }}
                  >
                    {m.isAI ? <Sparkles size={10} color="#F5C542" /> : m.initials}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span style={{ fontSize: '11px', color: m.isAI ? '#F5C542' : '#F9FAFB', fontWeight: 600 }}>{m.sender}</span>
                      <span style={{ fontSize: '10px', color: '#6B7280' }}>{m.time}</span>
                    </div>
                    <div
                      className="rounded-xl p-2.5"
                      style={m.isAI ? {
                        backgroundColor: 'rgba(245,197,66,0.05)',
                        border: '1px solid rgba(245,197,66,0.2)',
                        boxShadow: '0 0 10px rgba(245,197,66,0.06)',
                      } : {
                        backgroundColor: '#1F2937',
                      }}
                    >
                      <p style={{ fontSize: '12px', color: '#D1D5DB', lineHeight: 1.6 }}>{m.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 flex-shrink-0" style={{ borderTop: '1px solid #2D3748' }}>
              <div className="flex gap-2">
                <input
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  placeholder="Comment on code..."
                  style={{
                    flex: 1, padding: '8px 12px', borderRadius: '10px',
                    backgroundColor: '#1F2937', border: '1px solid #2D3748',
                    color: '#F9FAFB', fontSize: '12px', outline: 'none',
                    fontFamily: "'Inter', sans-serif",
                  }}
                  onFocus={e => (e.target.style.borderColor = '#F5C542')}
                  onBlur={e => (e.target.style.borderColor = '#2D3748')}
                />
                <button
                  className="px-3 rounded-xl transition-all"
                  style={{ background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: '#fff', border: 'none', cursor: 'pointer' }}
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* AI Suggestions (bottom half) */}
          <div className="flex flex-col flex-1 overflow-hidden" style={{ backgroundColor: '#0D1220' }}>
            <div
              className="flex items-center gap-2 px-4 py-3 flex-shrink-0"
              style={{
                borderBottom: '1px solid rgba(245,197,66,0.12)',
                background: 'linear-gradient(180deg, rgba(245,197,66,0.05) 0%, transparent 100%)',
              }}
            >
              <div
                className="w-5 h-5 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(245,197,66,0.2), rgba(245,197,66,0.05))', border: '1px solid rgba(245,197,66,0.3)' }}
              >
                <Sparkles size={10} color="#F5C542" />
              </div>
              <span style={{ fontSize: '13px', color: '#F5C542', fontWeight: 700 }}>Live AI Suggestions</span>
              <div className="ml-auto flex items-center gap-1.5">
                <RefreshCw size={10} color="#6B7280" />
                <span style={{ fontSize: '10px', color: '#6B7280' }}>Updating...</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {aiSuggestions.map((s, i) => (
                <div
                  key={i}
                  className="rounded-xl p-3 transition-all duration-200"
                  style={{ backgroundColor: s.bg, border: `1px solid ${s.border}` }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 12px ${s.bg.replace('0.08', '0.2')}`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <s.icon size={12} color={s.color} />
                    <span style={{ fontSize: '11px', color: s.color, fontWeight: 700 }}>{s.title}</span>
                    {s.line && (
                      <span
                        className="ml-auto px-1.5 py-0.5 rounded"
                        style={{ fontSize: '10px', color: '#9CA3AF', backgroundColor: '#1F2937', fontFamily: 'monospace' }}
                      >
                        L{s.line}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '11px', color: '#D1D5DB', lineHeight: 1.6, marginBottom: '10px' }}>{s.content}</p>
                  <div className="flex gap-2">
                    <button
                      className="flex-1 py-1.5 rounded-lg text-center transition-all"
                      style={{ backgroundColor: `${s.color}18`, color: s.color, fontSize: '11px', fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}
                    >
                      Apply
                    </button>
                    <button
                      className="py-1.5 px-3 rounded-lg"
                      style={{ backgroundColor: '#1F2937', color: '#9CA3AF', fontSize: '11px', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}
                    >
                      Skip
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

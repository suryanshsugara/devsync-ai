import React, { useState } from 'react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  TrendingUp, MessageSquare, Zap, Clock, CheckCircle,
  AlertTriangle, Sparkles, ArrowUp, ArrowDown, Filter,
  Download, Calendar, Users, Bot, Hash
} from 'lucide-react';

const bugResolutionData = [
  { day: 'Mon', bugs: 12, resolved: 10, aiAssists: 8 },
  { day: 'Tue', bugs: 19, resolved: 17, aiAssists: 15 },
  { day: 'Wed', bugs: 8, resolved: 8, aiAssists: 7 },
  { day: 'Thu', bugs: 24, resolved: 21, aiAssists: 19 },
  { day: 'Fri', bugs: 16, resolved: 15, aiAssists: 13 },
  { day: 'Sat', bugs: 5, resolved: 5, aiAssists: 4 },
  { day: 'Sun', bugs: 3, resolved: 3, aiAssists: 2 },
];

const weeklyActivity = [
  { week: 'W1', messages: 340, aiCalls: 120, resolved: 28 },
  { week: 'W2', messages: 420, aiCalls: 167, resolved: 39 },
  { week: 'W3', messages: 280, aiCalls: 98, resolved: 21 },
  { week: 'W4', messages: 510, aiCalls: 210, resolved: 54 },
  { week: 'W5', messages: 467, aiCalls: 189, resolved: 47 },
  { week: 'W6', messages: 620, aiCalls: 254, resolved: 63 },
];

const responseTimeData = [
  { time: '9AM', human: 18, ai: 1.2 },
  { time: '10AM', human: 12, ai: 0.9 },
  { time: '11AM', human: 9, ai: 1.1 },
  { time: '12PM', human: 24, ai: 1.4 },
  { time: '1PM', human: 31, ai: 1.0 },
  { time: '2PM', human: 14, ai: 0.8 },
  { time: '3PM', human: 10, ai: 1.2 },
  { time: '4PM', human: 8, ai: 1.0 },
];

const issues = [
  { id: 'BUG-001', issue: 'JWT refresh token cookie key mismatch', room: 'backend-auth', aiSuggested: true, status: 'resolved', resolvedBy: 'Mike R.', time: '2h 14m', severity: 'high' },
  { id: 'BUG-002', issue: 'Memory leak in WebSocket connection handler', room: 'backend-auth', aiSuggested: true, status: 'in-progress', resolvedBy: 'Alex K.', time: '—', severity: 'critical' },
  { id: 'BUG-003', issue: 'React hydration mismatch in SSR layout', room: 'react-ui-overhaul', aiSuggested: false, status: 'resolved', resolvedBy: 'Sarah R.', time: '45m', severity: 'medium' },
  { id: 'BUG-004', issue: 'K8s pod crash loop on startup probe timeout', room: 'infra-k8s', aiSuggested: true, status: 'resolved', resolvedBy: 'Jake P.', time: '1h 32m', severity: 'high' },
  { id: 'BUG-005', issue: 'Rate limiter not resetting window on Redis flush', room: 'api-gateway', aiSuggested: true, status: 'open', resolvedBy: '—', time: '—', severity: 'medium' },
  { id: 'BUG-006', issue: 'ML pipeline ETL race condition on batch writes', room: 'ml-pipeline', aiSuggested: true, status: 'resolved', resolvedBy: 'Anna N.', time: '3h 8m', severity: 'critical' },
  { id: 'BUG-007', issue: 'Go goroutine leak in HTTP client connection pool', room: 'api-gateway', aiSuggested: false, status: 'in-progress', resolvedBy: 'Marcus K.', time: '—', severity: 'high' },
  { id: 'BUG-008', issue: 'iOS navigation stack not clearing on logout', room: 'mobile-rn', aiSuggested: true, status: 'resolved', resolvedBy: 'Eve L.', time: '28m', severity: 'low' },
];

const statusStyle: Record<string, { bg: string; color: string; label: string }> = {
  resolved: { bg: 'rgba(34,197,94,0.1)', color: '#22C55E', label: 'Resolved' },
  'in-progress': { bg: 'rgba(245,197,66,0.1)', color: '#F5C542', label: 'In Progress' },
  open: { bg: 'rgba(239,68,68,0.1)', color: '#EF4444', label: 'Open' },
};

const severityStyle: Record<string, { color: string }> = {
  critical: { color: '#EF4444' },
  high: { color: '#F97316' },
  medium: { color: '#F5C542' },
  low: { color: '#9CA3AF' },
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: '#1F2937', border: '1px solid #2D3748', borderRadius: '12px', padding: '12px 16px' }}>
        <p style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '6px' }}>{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ fontSize: '13px', color: p.color, fontWeight: 600 }}>
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

import { fetchApi } from '../lib/api';
import { useNavigate } from 'react-router';

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('7d');
  const [stats, setStats] = useState<any[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchApi('/analytics/platform');
        setStats([
          { label: 'Total Messages', value: data.totalMessages.toString(), change: '+18%', up: true, icon: MessageSquare, color: '#3B82F6', sub: 'all time' },
          { label: 'Total Users', value: data.totalUsers.toString(), change: '+24%', up: true, icon: Users, color: '#22C55E', sub: 'all time' },
          { label: 'AI Assists', value: data.totalAiTokensUsed.toString(), change: '+31%', up: true, icon: Sparkles, color: '#F5C542', sub: 'tokens used' },
          { label: 'Active Rooms', value: data.totalRooms.toString(), change: '-42%', up: false, icon: Hash, color: '#F97316', sub: 'all time' },
        ]);
      } catch (err: any) {
        if (err.message.includes('Forbidden')) {
          alert("You must be a TEAM_LEAD to view analytics.");
          navigate('/dashboard');
        } else {
          console.error("Failed to load analytics", err);
        }
      }
    };
    loadStats();
  }, [navigate]);

  return (
    <div className="p-8" style={{ backgroundColor: '#0B0F1A', minHeight: '100%', fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '34px', color: '#F9FAFB', lineHeight: 1.2, marginBottom: '4px' }}>
            Platform Analytics
          </h1>
          <p style={{ fontSize: '14px', color: '#9CA3AF' }}>Team performance and AI-powered insights</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Period selector */}
          <div className="flex rounded-xl overflow-hidden" style={{ border: '1px solid #2D3748', backgroundColor: '#111827' }}>
            {['24h', '7d', '30d', '90d'].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                style={{
                  padding: '8px 16px',
                  fontSize: '13px',
                  fontWeight: 500,
                  backgroundColor: period === p ? '#F5C542' : 'transparent',
                  color: period === p ? '#0B0F1A' : '#9CA3AF',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                  transition: 'all 0.15s',
                }}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-colors"
            style={{ backgroundColor: '#111827', border: '1px solid #2D3748', color: '#9CA3AF', fontSize: '13px', cursor: 'pointer' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F9FAFB')}
            onMouseLeave={e => (e.currentTarget.style.color = '#9CA3AF')}
          >
            <Download size={14} />
            Export
          </button>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <div
            key={i}
            className="rounded-2xl p-6 transition-all duration-200"
            style={{ backgroundColor: '#111827', border: '1px solid #2D3748' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = s.color + '60'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#2D3748'; }}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${s.color}15` }}
              >
                <s.icon size={18} color={s.color} />
              </div>
              <div
                className="flex items-center gap-1 px-2 py-1 rounded-lg"
                style={{ backgroundColor: s.up ? 'rgba(34,197,94,0.1)' : 'rgba(59,130,246,0.1)' }}
              >
                {s.up ? <ArrowUp size={11} color="#22C55E" /> : <ArrowDown size={11} color="#3B82F6" />}
                <span style={{ fontSize: '11px', color: s.up ? '#22C55E' : '#3B82F6', fontWeight: 700 }}>{s.change}</span>
              </div>
            </div>
            <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '32px', color: '#F9FAFB', lineHeight: 1, marginBottom: '4px' }}>{s.value}</p>
            <p style={{ fontSize: '13px', color: '#9CA3AF' }}>{s.label}</p>
            <p style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {/* Bug Resolution Timeline — full width */}
        <div
          className="col-span-3 rounded-2xl p-6"
          style={{ backgroundColor: '#111827', border: '1px solid #2D3748' }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '18px', color: '#F9FAFB', marginBottom: '4px' }}>
                Bug Resolution Timeline
              </h2>
              <p style={{ fontSize: '12px', color: '#9CA3AF' }}>Daily bugs reported, resolved, and AI-assisted</p>
            </div>
            <div className="flex items-center gap-4">
              {[
                { label: 'Reported', color: '#EF4444' },
                { label: 'Resolved', color: '#22C55E' },
                { label: 'AI Assisted', color: '#F5C542' },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: l.color }} />
                  <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={bugResolutionData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="bugsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="resolvedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="aiGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F5C542" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#F5C542" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="bugs" name="Reported" stroke="#EF4444" fill="url(#bugsGrad)" strokeWidth={2} dot={false} />
              <Area type="monotone" dataKey="resolved" name="Resolved" stroke="#22C55E" fill="url(#resolvedGrad)" strokeWidth={2} dot={false} />
              <Area type="monotone" dataKey="aiAssists" name="AI Assisted" stroke="#F5C542" fill="url(#aiGrad)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* AI vs Human Response */}
        <div
          className="col-span-2 rounded-2xl p-6"
          style={{ backgroundColor: '#111827', border: '1px solid #2D3748' }}
        >
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '18px', color: '#F9FAFB', marginBottom: '4px' }}>
            Response Time
          </h2>
          <p style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '20px' }}>Human (min) vs AI (sec)</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={responseTimeData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" vertical={false} />
              <XAxis dataKey="time" tick={{ fill: '#6B7280', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6B7280', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="human" name="Human (min)" fill="#3B82F6" radius={[4, 4, 0, 0]} fillOpacity={0.7} />
              <Bar dataKey="ai" name="AI (sec)" fill="#F5C542" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div
          className="col-span-2 rounded-2xl p-6"
          style={{ backgroundColor: '#111827', border: '1px solid #2D3748' }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '18px', color: '#F9FAFB', marginBottom: '4px' }}>
                Weekly Activity
              </h2>
              <p style={{ fontSize: '12px', color: '#9CA3AF' }}>Messages, AI calls, and resolutions per week</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={weeklyActivity} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" vertical={false} />
              <XAxis dataKey="week" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="messages" name="Messages" stroke="#3B82F6" strokeWidth={2.5} dot={{ fill: '#3B82F6', r: 3 }} />
              <Line type="monotone" dataKey="aiCalls" name="AI Calls" stroke="#F5C542" strokeWidth={2.5} dot={{ fill: '#F5C542', r: 3 }} strokeDasharray="5 3" />
              <Line type="monotone" dataKey="resolved" name="Resolved" stroke="#22C55E" strokeWidth={2.5} dot={{ fill: '#22C55E', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Insights */}
        <div
          className="rounded-2xl p-6"
          style={{
            backgroundColor: '#111827',
            border: '1px solid rgba(245,197,66,0.15)',
            boxShadow: '0 0 20px rgba(245,197,66,0.04)',
          }}
        >
          <div className="flex items-center gap-2 mb-5">
            <Sparkles size={15} color="#F5C542" />
            <h2 style={{ fontSize: '14px', color: '#F5C542', fontWeight: 700 }}>AI Insights</h2>
          </div>
          <div className="space-y-4">
            {[
              { icon: TrendingUp, color: '#22C55E', text: 'AI resolution rate up 31% this week — highest ever.' },
              { icon: AlertTriangle, color: '#F97316', text: 'Backend-auth has 3x more bugs than other rooms.' },
              { icon: Zap, color: '#F5C542', text: 'ML pipeline AI assists have a 96% acceptance rate.' },
              { icon: Clock, color: '#3B82F6', text: 'Peak bug time: 1–3 PM. Consider AI standby alerts.' },
            ].map((ins, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${ins.color}12` }}>
                  <ins.icon size={13} color={ins.color} />
                </div>
                <p style={{ fontSize: '12px', color: '#D1D5DB', lineHeight: 1.6 }}>{ins.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Issues Table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ backgroundColor: '#111827', border: '1px solid #2D3748' }}
      >
        <div className="flex items-center justify-between p-6" style={{ borderBottom: '1px solid #2D3748' }}>
          <div>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '20px', color: '#F9FAFB', marginBottom: '2px' }}>
              Issue Tracker
            </h2>
            <p style={{ fontSize: '12px', color: '#9CA3AF' }}>All room issues with AI contribution tracking</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl transition-colors"
              style={{ backgroundColor: '#1F2937', border: '1px solid #2D3748', color: '#9CA3AF', fontSize: '13px', cursor: 'pointer' }}>
              <Filter size={13} />
              Filter
            </button>
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid #2D3748' }}>
              {['ID', 'Issue', 'Room', 'Suggested by AI?', 'Status', 'Resolved By', 'Time to Fix'].map(h => (
                <th key={h} style={{ padding: '12px 20px', fontSize: '11px', color: '#6B7280', fontWeight: 600, textAlign: 'left', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {issues.map((issue, i) => (
              <tr
                key={issue.id}
                style={{ borderBottom: i < issues.length - 1 ? '1px solid #1F2937' : 'none' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1F2937')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <td style={{ padding: '14px 20px' }}>
                  <span style={{ fontSize: '12px', color: '#6B7280', fontFamily: 'monospace' }}>{issue.id}</span>
                </td>
                <td style={{ padding: '14px 20px', maxWidth: '260px' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: severityStyle[issue.severity].color }} />
                    <span style={{ fontSize: '13px', color: '#F9FAFB', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{issue.issue}</span>
                  </div>
                </td>
                <td style={{ padding: '14px 20px' }}>
                  <span
                    className="px-2 py-1 rounded-lg"
                    style={{ fontSize: '11px', color: '#9CA3AF', backgroundColor: '#1F2937', fontFamily: 'monospace' }}
                  >
                    #{issue.room}
                  </span>
                </td>
                <td style={{ padding: '14px 20px' }}>
                  {issue.aiSuggested ? (
                    <div className="flex items-center gap-1.5">
                      <Sparkles size={11} color="#F5C542" />
                      <span style={{ fontSize: '12px', color: '#F5C542', fontWeight: 600 }}>Yes</span>
                    </div>
                  ) : (
                    <span style={{ fontSize: '12px', color: '#6B7280' }}>Manual</span>
                  )}
                </td>
                <td style={{ padding: '14px 20px' }}>
                  <span
                    className="px-2.5 py-1 rounded-full"
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      backgroundColor: statusStyle[issue.status].bg,
                      color: statusStyle[issue.status].color,
                    }}
                  >
                    {statusStyle[issue.status].label}
                  </span>
                </td>
                <td style={{ padding: '14px 20px' }}>
                  <span style={{ fontSize: '13px', color: '#D1D5DB' }}>{issue.resolvedBy}</span>
                </td>
                <td style={{ padding: '14px 20px' }}>
                  <span style={{ fontSize: '13px', color: '#9CA3AF', fontFamily: 'monospace' }}>{issue.time}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

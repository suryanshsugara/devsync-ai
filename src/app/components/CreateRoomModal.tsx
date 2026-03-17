import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Plus, Lock, Globe, Zap } from 'lucide-react';
import { fetchApi } from '../lib/api';

interface CreateRoomModalProps {
  onClose: () => void;
  onSuccess?: (roomId: string) => void;
}

export function CreateRoomModal({ onClose, onSuccess }: CreateRoomModalProps) {
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

  const handleSubmit = async () => {
    if (!roomName.trim()) return;
    try {
      const res = await fetchApi('/rooms', {
        method: 'POST',
        body: JSON.stringify({ 
          name: roomName, 
          lang: stack, 
          description: isPrivate ? 'Private Room' : 'Public Room' 
        })
      });
      onClose();
      if (onSuccess) {
          onSuccess(res.id);
      } else {
          navigate(`/room/${res.id}`);
      }
    } catch (e) {
      console.error("Failed to create room", e);
    }
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
            onClick={handleSubmit}
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

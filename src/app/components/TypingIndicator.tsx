import { Sparkles } from 'lucide-react';

export function TypingIndicator() {
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

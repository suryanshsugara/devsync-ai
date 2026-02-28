import React from 'react';
import { User, Bot, Copy, Check } from 'lucide-react';
import { cn } from '../ui/Button';
import { Avatar } from '../ui/Avatar';

interface ChatBubbleProps {
  message: {
    id: string;
    sender: 'user' | 'ai';
    name: string;
    avatar?: string;
    text: string;
    timestamp: string;
    code?: string;
  };
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isAI = message.sender === 'ai';

  return (
    <div className={cn('flex gap-4 mb-6', isAI ? 'bg-primary/5 -mx-4 px-4 py-4 border-y border-primary/10' : '')}>
      <div className="shrink-0">
        {isAI ? (
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 text-primary shadow-[0_0_10px_rgba(245,197,66,0.2)]">
            <Bot size={20} />
          </div>
        ) : (
          <Avatar src={message.avatar} fallback={message.name[0]} />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={cn('font-bold text-sm', isAI ? 'text-primary' : 'text-white')}>
            {message.name}
          </span>
          <span className="text-xs text-text-secondary">{message.timestamp}</span>
        </div>
        
        <div className="text-text-primary text-sm leading-relaxed whitespace-pre-wrap">
          {message.text}
        </div>

        {message.code && (
          <div className="mt-3 relative group">
            <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 rounded-md bg-surface text-text-secondary hover:text-white border border-border">
                <Copy size={14} />
              </button>
            </div>
            <pre className="bg-background-secondary p-4 rounded-lg border border-border overflow-x-auto text-sm font-mono text-text-secondary">
              <code>{message.code}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

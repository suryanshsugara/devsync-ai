import React from 'react';
import { Users, Clock, ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { Link } from 'react-router';

interface RoomProps {
  id: string;
  name: string;
  members: { id: string; avatar: string; name: string }[];
  lastActive: string;
  status: 'active' | 'idle';
  tags: string[];
}

export function RoomCard({ room }: { room: RoomProps }) {
  return (
    <Card className="hover:border-primary/50 transition-all duration-300 group relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowRight className="text-primary w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
      </div>

      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">{room.name}</h3>
          <div className="flex gap-2 text-xs text-text-secondary">
            {room.tags.map((tag) => (
              <span key={tag} className="bg-surface border border-border px-2 py-0.5 rounded-md">
                {tag}
              </span>
            ))}
          </div>
        </div>
        {room.status === 'active' && <Badge variant="live">LIVE</Badge>}
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="flex -space-x-2">
          {room.members.map((member) => (
            <Avatar 
              key={member.id} 
              src={member.avatar} 
              fallback={member.name[0]} 
              size="sm" 
              className="border-2 border-surface" 
            />
          ))}
          {room.members.length > 3 && (
            <div className="w-8 h-8 rounded-full bg-surface border-2 border-border flex items-center justify-center text-xs text-text-secondary">
              +2
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <Clock size={14} />
          <span>{room.lastActive}</span>
        </div>
      </div>

      <Link to={`/room/${room.id}`} className="mt-6 block">
        <Button variant="secondary" className="w-full group-hover:bg-secondary/80">
          Join Room
        </Button>
      </Link>
    </Card>
  );
}

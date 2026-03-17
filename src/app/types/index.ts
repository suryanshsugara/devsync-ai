export type UserRole = 'DEVELOPER' | 'TEAM_LEAD' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  lang: string;
  status: 'active' | 'idle' | 'offline';
  private: boolean;
  starred: boolean;
  aiAssists: number;
  issuesOpen: number;
  lastActivity: string;
  members: RoomMember[];
}

export interface RoomMember {
  initials: string;
  color: string;
  name?: string;
  email?: string;
  role?: string;
  status?: string;
  file?: string;
}

export interface Message {
  id: string;
  sender: string;
  initials: string;
  color: string;
  time: string;
  content: string;
  code?: string;
  isAI?: boolean;
  aiType?: 'fix' | 'explain' | 'optimize';
}

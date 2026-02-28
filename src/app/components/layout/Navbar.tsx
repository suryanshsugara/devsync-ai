import React from 'react';
import { Bell, Search, User } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="h-16 bg-background-secondary border-b border-border flex items-center justify-between px-6">
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary w-4 h-4" />
        <input
          type="text"
          placeholder="Search projects, files..."
          className="w-full bg-surface text-sm text-white rounded-xl pl-10 pr-4 py-2 border border-border focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-text-secondary hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">Alex Dev</p>
            <p className="text-xs text-text-secondary">Senior Engineer</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center overflow-hidden">
             <User className="text-text-secondary" />
          </div>
        </div>
      </div>
    </header>
  );
}

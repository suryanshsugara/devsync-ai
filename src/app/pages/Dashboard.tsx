import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { CreateRoomModal } from '../components/features/CreateRoomModal';
import { Link } from 'react-router';
import { Users, Clock, Plus, Zap, ArrowRight, Home, BarChart2, Code as CodeIcon, Settings } from 'lucide-react';
import { format } from 'date-fns';

export function Dashboard() {
  const [openModal, setOpenModal] = useState(false);

  // Mock Data
  const rooms = [
    { id: '1', name: 'Frontend Refactor', members: 4, lastActive: new Date(Date.now() - 1000 * 60 * 5), stack: 'React' },
    { id: '2', name: 'API Integration', members: 2, lastActive: new Date(Date.now() - 1000 * 60 * 30), stack: 'Node.js' },
    { id: '3', name: 'Design System', members: 6, lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2), stack: 'CSS' },
    { id: '4', name: 'Bug Bash Q1', members: 12, lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24), stack: 'Python' },
  ];

  const recentSuggestions = [
    { id: 1, title: 'Optimized API call', time: '2m ago' },
    { id: 2, title: 'Fixed memory leak', time: '15m ago' },
    { id: 3, title: 'Refactored auth hook', time: '1h ago' },
  ];

  return (
    <div className="flex min-h-screen bg-[#0B0F1A] text-[#F9FAFB] font-body">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#111827] border-r border-[#2D3748] flex flex-col fixed h-full z-20 hidden md:flex">
        <div className="p-6 border-b border-[#2D3748] flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#3B82F6] flex items-center justify-center text-white">
            <CodeIcon className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold font-heading">DevSync AI</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#1F2937] text-[#F5C542] font-medium">
            <Home className="w-5 h-5" />
            Dashboard
          </Link>
          <Link to="/analytics" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#9CA3AF] hover:bg-[#1F2937] hover:text-[#F9FAFB] transition-colors">
            <BarChart2 className="w-5 h-5" />
            Analytics
          </Link>
          <Link to="/code" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#9CA3AF] hover:bg-[#1F2937] hover:text-[#F9FAFB] transition-colors">
            <CodeIcon className="w-5 h-5" />
            Code View
          </Link>
          <div className="pt-4 mt-4 border-t border-[#2D3748]">
            <span className="px-4 text-xs font-semibold text-[#6B7280] uppercase tracking-wider">Settings</span>
            <Link to="/settings" className="flex items-center gap-3 px-4 py-3 mt-2 rounded-xl text-[#9CA3AF] hover:bg-[#1F2937] hover:text-[#F9FAFB] transition-colors">
              <Settings className="w-5 h-5" />
              Preferences
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-[#2D3748]">
          <div className="flex items-center gap-3 px-2">
            <Avatar fallback="JD" status="online" size="sm" />
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">John Doe</p>
              <p className="text-xs text-[#9CA3AF] truncate">Senior Dev</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:pl-64 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-[#2D3748] flex items-center justify-between px-8 bg-[#0B0F1A]/80 backdrop-blur sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-bold font-heading">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
             <Button size="sm" variant="ghost" className="hidden sm:flex">Documentation</Button>
             <Button size="sm" variant="ghost" className="hidden sm:flex">Support</Button>
          </div>
        </header>

        <div className="p-8 flex flex-col lg:flex-row gap-8">
          {/* Room Grid */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                 <h2 className="text-2xl font-bold font-heading">Active Rooms</h2>
                 <p className="text-[#9CA3AF]">Join a collaborative session currently in progress.</p>
              </div>
              <Button onClick={() => setOpenModal(true)} variant="primary" className="shadow-[0_0_15px_rgba(245,197,66,0.3)] flex items-center gap-2">
                <Plus className="w-4 h-4" /> Create Room
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
              {rooms.map((room) => (
                <Card key={room.id} variant="glow" className="group cursor-pointer hover:border-[#3B82F6]/50 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline" className="bg-[#111827]">{room.stack}</Badge>
                    <Badge variant="live" className="animate-pulse">LIVE</Badge>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#3B82F6] transition-colors">{room.name}</h3>
                  
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center -space-x-2">
                      {[...Array(3)].map((_, i) => (
                         <Avatar key={i} fallback={`U${i}`} size="sm" className="border-2 border-[#1F2937]" />
                      ))}
                      <div className="w-8 h-8 rounded-full bg-[#2D3748] flex items-center justify-center text-xs font-medium border-2 border-[#1F2937]">
                        +{room.members - 3}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[#9CA3AF]">
                      <Clock className="w-3 h-3" />
                      {format(room.lastActive, 'h:mm a')}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#2D3748] flex justify-end">
                    <Link to={`/room/${room.id}`}>
                      <Button size="sm" variant="secondary" className="group-hover:bg-[#3B82F6] group-hover:text-white transition-all">
                        Join Room <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Widgets */}
          <div className="w-full lg:w-80 space-y-6">
            <Card className="p-6 bg-[#111827]">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-[#F5C542]" />
                <h3 className="font-bold font-heading">Recent AI Suggestions</h3>
              </div>
              <div className="space-y-4">
                {recentSuggestions.map((item) => (
                  <div key={item.id} className="p-3 rounded-lg bg-[#1F2937] border border-[#2D3748] hover:border-[#F5C542]/50 transition-colors cursor-pointer group">
                    <p className="text-sm font-medium group-hover:text-[#F5C542] transition-colors">{item.title}</p>
                    <p className="text-xs text-[#9CA3AF] mt-1">{item.time}</p>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-4 text-[#3B82F6] hover:text-[#F5C542]">
                View All History
              </Button>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-[#3B82F6]/20 to-[#111827] border-[#3B82F6]/30">
              <h3 className="font-bold font-heading mb-2">Pro Tips</h3>
              <p className="text-sm text-[#9CA3AF] mb-4">
                Did you know? You can ask the AI to refactor entire components by selecting them in the code view.
              </p>
              <Button size="sm" variant="outline" className="w-full border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white">
                Learn More
              </Button>
            </Card>
          </div>
        </div>
      </main>

      <CreateRoomModal open={openModal} onOpenChange={setOpenModal} />
    </div>
  );
}

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, MessageSquare, MoreHorizontal, User, LogOut } from 'lucide-react';
import { UserInfoModal } from './UserInfoModal';

interface ChatSession {
  id: string;
  title: string;
  timestamp: string;
}

const mockSessions: ChatSession[] = [
  { id: '1', title: '这是一段对话', timestamp: '2023-05-29' },
  { id: '2', title: '这是一段对话', timestamp: '2023-05-29' },
  { id: '3', title: '这是一段对话这是一段对话', timestamp: '2023-05-29' },
  { id: '4', title: '这是一段对话', timestamp: '2023-05-29' },
];

export function ChatSidebar() {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  return (
    <>
      <div className="w-80 bg-chat-sidebar border-r border-border flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-2xl font-bold text-primary">PHILIPS</div>
          </div>
          <div className="text-sm text-muted-foreground mb-4">小飞同学</div>
          <Button className="w-full bg-primary hover:bg-primary-hover text-primary-foreground rounded-full">
            <Plus className="w-4 h-4 mr-2" />
            创建新对话
          </Button>
        </div>

        {/* Chat Sessions */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <MessageSquare className="w-4 h-4" />
              最近对话
            </div>
            <div className="space-y-2">
              {mockSessions.map((session) => (
                <div
                  key={session.id}
                  className="group flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-foreground truncate">
                      {session.title}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Section */}
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start p-3 bg-primary/10 hover:bg-primary/20 rounded-lg mb-2"
            onClick={() => setIsUserModalOpen(true)}
          >
            <User className="w-4 h-4 mr-3" />
            个人信息
          </Button>
          <div className="flex items-center gap-3 p-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-primary-foreground">A</span>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">Admin</div>
            </div>
            <Button variant="ghost" size="sm" className="p-1 h-auto">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <UserInfoModal 
        isOpen={isUserModalOpen} 
        onClose={() => setIsUserModalOpen(false)} 
      />
    </>
  );
}
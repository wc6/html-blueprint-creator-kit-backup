import { ChatSidebar } from '@/components/ChatSidebar';
import { ChatInterface } from '@/components/ChatInterface';

const Index = () => {
  return (
    <div className="min-h-screen flex bg-background">
      <ChatSidebar />
      <ChatInterface />
    </div>
  );
};

export default Index;

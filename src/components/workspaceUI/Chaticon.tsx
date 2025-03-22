// src/components/workspaceUI/ChatIcon.tsx
"use client";

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import ChatBox from './ChatBox';

const ChatIcon = ({ roomId }: { roomId: string }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <div 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="rounded-full border p-2 cursor-pointer"
      >
        <MessageCircle size={15} strokeWidth={3} />
      </div>

      {isChatOpen && (
        <ChatBox 
          roomId={roomId} 
          onClose={() => setIsChatOpen(false)} 
        />
      )}
    </>
  );
};

export default ChatIcon;

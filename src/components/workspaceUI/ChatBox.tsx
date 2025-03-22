// src/components/workspaceUI/ChatBox.tsx
"use client";

import { useEffect, useState, useRef } from 'react';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { X } from 'lucide-react';
import io from "socket.io-client";

const server = "http://10.5.81.235:3001";
const socket = io(server);

interface Message {
  text: string;
  username: string;
  isCurrentUser: boolean;
  timestamp: number;
}

interface ChatBoxProps {
  roomId: string;
  onClose: () => void;
}



const ChatBox = ({ roomId, onClose }: ChatBoxProps) => {
    const { user } = useKindeBrowserClient();
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const username = user?.given_name || user?.family_name || user?.email || 'Anonymous';
  
    useEffect(() => {
        console.log("Joining chat room:", roomId, "as", username);
      // Join chat room
      socket.emit('join-chat-room', { roomId, username });
  
      // Listen for chat messages
      const handleChatMessage = (data: { text: string; username: string; timestamp: number }) => {
        setMessages(prev => [...prev, {
          text: data.text,
          username: data.username,
          isCurrentUser: data.username === username,
          timestamp: data.timestamp
        }]);
      };
  
      // Listen for user join notifications
      const handleUserJoined = (data: { username: string }) => {
        console.log("Received chat message:", data);
        setMessages(prev => [...prev, {
          text: `${data.username} joined the chat`,
          username: 'System',
          isCurrentUser: false,
          timestamp: Date.now()
        }]);
      };

    
  
      socket.on('chat-message', handleChatMessage);
      socket.on('user-joined-chat', handleUserJoined);
  
      return () => {
        socket.off('chat-message', handleChatMessage);
        socket.off('user-joined-chat', handleUserJoined);
        socket.emit('leave-chat-room', { roomId, username });
      };
    }, [roomId, username]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!inputMessage.trim() || !user) return;
    
    const messageData = {
      roomId,
      text: inputMessage,
      username,
      timestamp: Date.now()
    };
    console.log("Sending chat message:", messageData);
    socket.emit('send-chat-message', messageData);
    
    setMessages(prev => [...prev, {
      text: inputMessage,
      username,
      isCurrentUser: true,
      timestamp: messageData.timestamp
    }]);
    
    setInputMessage('');
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed top-16 right-4 w-80 h-96 bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg flex flex-col z-50">
      <div className="bg-zinc-800 text-white p-3 rounded-t-lg flex justify-between items-center">
        <h3 className="font-medium">Room Chat</h3>
        <button onClick={onClose} className="text-white hover:text-gray-300">
          <X size={18} />
        </button>
      </div>
      
      <div className="flex-1 p-3 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`mb-2 ${msg.isCurrentUser ? 'text-right' : ''}`}
          >
            {msg.username !== 'System' && (
              <div 
                className={`inline-block p-2 rounded-lg max-w-[80%] ${
                  msg.isCurrentUser 
                    ? 'bg-indigo-900 text-white' 
                    : 'bg-zinc-800 text-white'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold">{msg.username}</span>
                  <span className="text-xs text-gray-400 ml-2">{formatTime(msg.timestamp)}</span>
                </div>
                <p className="text-sm">{msg.text}</p>
              </div>
            )}
            {msg.username === 'System' && (
              <div className="text-center text-xs text-gray-500 my-2">
                {msg.text}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-3 border-t border-zinc-700">
        <div className="flex">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 p-2 bg-zinc-800 border border-zinc-700 text-white rounded-l-md focus:outline-none"
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-600 text-white px-4 rounded-r-md hover:bg-indigo-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;

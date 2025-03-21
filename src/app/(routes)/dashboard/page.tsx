
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogoutLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Button from "@/components/Button";

interface Room {
  id: string;
  name: string;
  createdAt: string;
}

export default function DashboardPage() {
  const { user } = useKindeBrowserClient();
  const [roomName, setRoomName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userRooms, setUserRooms] = useState<Room[]>([]);
  const router = useRouter();

  // Fetch user's rooms when component mounts
  useEffect(() => {
    if (user?.id) {
      fetchUserRooms();
    }
  }, [user]);

  const fetchUserRooms = async () => {
    try {
      const response = await fetch('/api/rooms/user');
      if (response.ok) {
        const rooms = await response.json();
        setUserRooms(rooms);
      }
    } catch (error) {
      console.error("Failed to fetch user rooms:", error);
    }
  };

  const createRoom = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const response = await fetch('/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: roomName || 'Untitled Room' }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create room');
      }
      
      const room = await response.json();
      router.push(`/workspace/${room.id}`);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const joinRoom = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      if (!roomId.trim()) {
        setError('Please enter a room ID');
        setIsLoading(false);
        return;
      }
      
      const response = await fetch(`/api/rooms/${roomId}`);
      
      if (!response.ok) {
        throw new Error('Room not found');
      }
      
      router.push(`/workspace/${roomId}`);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Collaborative Drawing</h1>
        <Button>
          <LogoutLink>Logout</LogoutLink>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Create a Room</h2>
          <div className="mb-4">
            <label htmlFor="roomName" className="block text-sm font-medium text-gray-700 mb-1">
              Room Name (Optional)
            </label>
            <input 
              type="text" 
              id="roomName" 
              value={roomName} 
              onChange={(e) => setRoomName(e.target.value)} 
              placeholder="Enter room name"
              className="w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button 
            className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            onClick={createRoom}
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Room'}
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Join a Room</h2>
          <div className="mb-4">
            <label htmlFor="roomId" className="block text-sm font-medium text-gray-700 mb-1">
              Room ID
            </label>
            <input 
              type="text" 
              id="roomId" 
              value={roomId} 
              onChange={(e) => setRoomId(e.target.value)} 
              placeholder="Enter room ID" 
              className="w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button 
            className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            onClick={joinRoom}
            disabled={isLoading}
          >
            {isLoading ? 'Joining...' : 'Join Room'}
          </button>
        </div>
      </div>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-center max-w-4xl mx-auto">
          {error}
        </div>
      )}

      {/* User's rooms section */}
      {userRooms.length > 0 && (
        <div className="mt-8 max-w-4xl mx-auto w-full">
          <h2 className="text-xl font-semibold mb-4">Your Rooms</h2>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="grid gap-4">
              {userRooms.map((room) => (
                <div key={room.id} className="border p-4 rounded-md hover:bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-black font-medium">{room.name || 'Untitled Room'}</h3>
                      <p className="text-sm text-gray-500">ID: {room.id}</p>
                      <p className="text-sm text-gray-500">Created: {new Date(room.createdAt).toLocaleString()}</p>
                    </div>
                    <button 
                      className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-md text-sm hover:bg-indigo-200"
                      onClick={() => router.push(`/workspace/${room.id}`)}
                    >
                      Join
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

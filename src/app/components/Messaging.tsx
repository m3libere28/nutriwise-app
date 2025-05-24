'use client';

import { useState } from 'react';
import { Search, Send, Paperclip, MoreVertical, Phone, Video } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'client' | 'nutritionist';
  timestamp: string;
  read: boolean;
}

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  online: boolean;
  messages: Message[];
}

const mockChats: Chat[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'SJ',
    lastMessage: 'Thank you for the meal plan!',
    lastMessageTime: '2m ago',
    unreadCount: 2,
    online: true,
    messages: [
      {
        id: '1',
        content: 'Hi, I have a question about my meal plan',
        sender: 'client',
        timestamp: '10:30 AM',
        read: true,
      },
      {
        id: '2',
        content: 'Of course! What would you like to know?',
        sender: 'nutritionist',
        timestamp: '10:31 AM',
        read: true,
      },
      {
        id: '3',
        content: 'Can I substitute quinoa with rice?',
        sender: 'client',
        timestamp: '10:32 AM',
        read: true,
      },
      {
        id: '4',
        content: 'Yes, you can! Just make sure to adjust the portion size accordingly.',
        sender: 'nutritionist',
        timestamp: '10:33 AM',
        read: true,
      },
      {
        id: '5',
        content: 'Thank you for the meal plan!',
        sender: 'client',
        timestamp: '10:34 AM',
        read: false,
      },
    ],
  },
  {
    id: '2',
    name: 'Mike Smith',
    avatar: 'MS',
    lastMessage: "I'll try that recipe tonight",
    lastMessageTime: '1h ago',
    unreadCount: 0,
    online: false,
    messages: [],
  },
  {
    id: '3',
    name: 'Emma Davis',
    avatar: 'ED',
    lastMessage: 'How many calories should I aim for?',
    lastMessageTime: '2h ago',
    unreadCount: 1,
    online: true,
    messages: [],
  },
];

export function Messaging() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(mockChats[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = mockChats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message: Message = {
      id: Math.random().toString(),
      content: newMessage,
      sender: 'nutritionist',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
    };

    selectedChat.messages.push(message);
    selectedChat.lastMessage = newMessage;
    selectedChat.lastMessageTime = 'Just now';

    setNewMessage('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm h-[calc(100vh-12rem)] flex">
      {/* Chat List */}
      <div className="w-80 border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 ${
                selectedChat?.id === chat.id ? 'bg-emerald-50' : ''
              }`}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-medium">
                  {chat.avatar}
                </div>
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-900 truncate">{chat.name}</p>
                  <span className="text-xs text-gray-500">{chat.lastMessageTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                  {chat.unreadCount > 0 && (
                    <span className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      {selectedChat ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-medium">
                  {selectedChat.avatar}
                </div>
                {selectedChat.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div>
                <h2 className="font-medium text-gray-900">{selectedChat.name}</h2>
                <p className="text-sm text-gray-500">
                  {selectedChat.online ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                <Phone size={20} />
              </button>
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                <Video size={20} />
              </button>
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {selectedChat.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'nutritionist' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    message.sender === 'nutritionist'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p>{message.content}</p>
                  <p className="text-xs mt-1 opacity-75">{message.timestamp}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                <Paperclip size={20} />
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <button
                onClick={sendMessage}
                className="p-2 text-white bg-emerald-500 rounded-lg hover:bg-emerald-600"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select a chat to start messaging
        </div>
      )}
    </div>
  );
}

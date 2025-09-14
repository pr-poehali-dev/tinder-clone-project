import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
}

interface ChatTabProps {
  messages: Message[];
  newMessage: string;
  onNewMessageChange: (value: string) => void;
  onSendMessage: () => void;
}

export default function ChatTab({ messages, newMessage, onNewMessageChange, onSendMessage }: ChatTabProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSendMessage();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center animate-fade-in">
        <h2 className="text-3xl font-bold mb-4">Сообщения</h2>
      </div>
      
      <div className="max-w-md mx-auto">
        <Card className="h-96 flex flex-col">
          <div className="p-4 border-b bg-gradient-to-r from-pink-50 to-purple-50">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="/img/d5ed9f21-1358-4e9b-afc1-e7e4df3c153b.jpg" />
                <AvatarFallback>А</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">Анна</h3>
                <p className="text-sm text-gray-600">онлайн</p>
              </div>
              <div className="ml-auto flex space-x-2">
                <Button size="icon" variant="ghost">
                  <Icon name="Phone" size={18} />
                </Button>
                <Button size="icon" variant="ghost">
                  <Icon name="Video" size={18} />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl ${
                    message.sender === 'me'
                      ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'me' ? 'text-pink-100' : 'text-gray-500'}`}>
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => onNewMessageChange(e.target.value)}
                placeholder="Написать сообщение..."
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={onSendMessage} className="btn-gradient">
                <Icon name="Send" size={18} />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
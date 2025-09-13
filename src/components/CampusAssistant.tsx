import { useState } from 'react';
import { MessageSquare, Calendar, MapPin, Book, Utensils } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ChatMessage } from './ChatMessage';
import { QuickActions } from './QuickActions';
import { campusKnowledge } from '@/lib/campusData';
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export const CampusAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your Smart Campus Assistant. I can help you with schedules, dining options, library services, facilities, and administrative procedures. How can I assist you today?",
      sender: 'assistant',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = generateResponse(message);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const generateResponse = (query: string): string => {
    const queryLower = query.toLowerCase();
    
    // Check for specific keywords and return relevant information
    if (queryLower.includes('dining') || queryLower.includes('food') || queryLower.includes('restaurant')) {
      return campusKnowledge.dining;
    } else if (queryLower.includes('library') || queryLower.includes('book')) {
      return campusKnowledge.library;
    } else if (queryLower.includes('schedule') || queryLower.includes('class') || queryLower.includes('time')) {
      return campusKnowledge.schedules;
    } else if (queryLower.includes('facility') || queryLower.includes('building') || queryLower.includes('location')) {
      return campusKnowledge.facilities;
    } else if (queryLower.includes('admin') || queryLower.includes('office') || queryLower.includes('registration')) {
      return campusKnowledge.administrative;
    } else if (queryLower.includes('help') || queryLower.includes('support')) {
      return "I can help you with:\n• Class schedules and academic calendar\n• Dining halls and meal plan information\n• Library services and study spaces\n• Campus facilities and building locations\n• Administrative procedures and contacts\n\nWhat specific information do you need?";
    }
    
    return "I understand you're looking for campus information. Could you be more specific? I can help with schedules, dining, library services, facilities, or administrative procedures.";
  };

  const handleQuickAction = (action: string) => {
    handleSendMessage(action);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputMessage);
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-gradient-to-b from-background to-campus-blue-light">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-6 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Smart Campus Assistant</h1>
            <p className="text-white/90">Your AI guide to campus services and information</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 bg-white/50 backdrop-blur-sm border-b">
        <QuickActions onAction={handleQuickAction} />
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <Card className="p-4 bg-white shadow-sm max-w-xs">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.1s]"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
                </div>
                <span className="text-sm text-muted-foreground">Assistant is typing...</span>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white/80 backdrop-blur-sm border-t">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about schedules, dining, library, facilities..."
            className="flex-1"
          />
          <Button type="submit" className="px-6">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};
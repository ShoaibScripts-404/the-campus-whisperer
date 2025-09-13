import { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EnhancedChatMessage } from './EnhancedChatMessage';
import { EnhancedQuickActions } from './EnhancedQuickActions';
import { VoiceInput } from './VoiceInput';
import { SmartSuggestions } from './SmartSuggestions';
import { FloatingParticles } from './FloatingParticles';
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
      content: "🎓 **Welcome to your Smart Campus Assistant!**\n\nI'm here to help you navigate campus life with ease. I can assist with:\n• **Class schedules** and academic calendar\n• **Dining options** and meal plans\n• **Library services** and study spaces\n• **Campus facilities** and building locations\n• **Administrative procedures** and contacts\n\nWhat would you like to know about today?",
      sender: 'assistant',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

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
    }, 1500 + Math.random() * 1000);
  };

  const generateResponse = (query: string): string => {
    const queryLower = query.toLowerCase();
    
    if (queryLower.includes('dining') || queryLower.includes('food')) {
      return campusKnowledge.dining;
    } else if (queryLower.includes('library') || queryLower.includes('book')) {
      return campusKnowledge.library;
    } else if (queryLower.includes('schedule') || queryLower.includes('class')) {
      return campusKnowledge.schedules;
    } else if (queryLower.includes('facility') || queryLower.includes('building')) {
      return campusKnowledge.facilities;
    } else if (queryLower.includes('admin') || queryLower.includes('office')) {
      return campusKnowledge.administrative;
    } else {
      return "I'm here to help with campus information! Try asking about **schedules**, **dining**, **library services**, **facilities**, or **administrative procedures**. 🚀";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputMessage);
  };

  return (
    <div className="flex flex-col h-screen max-w-6xl mx-auto relative overflow-hidden">
      <FloatingParticles />
      
      {/* Header */}
      <div className="relative z-10 bg-gradient-primary p-6 shadow-float glass-effect border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm animate-bounce-in">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold font-poppins text-white">Smart Campus Assistant</h1>
            <p className="text-white/90 font-inter">Your AI-powered guide to campus life ✨</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="relative z-10 p-4 glass-effect border-b border-white/10">
        <EnhancedQuickActions onAction={handleSendMessage} />
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 relative z-10">
        {messages.map((message) => (
          <EnhancedChatMessage key={message.id} message={message} />
        ))}
        
        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="glass-effect p-4 rounded-2xl max-w-xs shadow-float">
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.1s]"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
                </div>
                <span className="text-sm text-muted-foreground font-medium">Assistant is thinking...</span>
              </div>
            </div>
          </div>
        )}

        {messages.length <= 2 && (
          <div className="animate-fade-in">
            <SmartSuggestions onSuggestionClick={handleSendMessage} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="relative z-10 p-4 glass-effect border-t border-white/10 backdrop-blur-xl">
        <form onSubmit={handleSubmit} className="flex gap-3 items-end">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about schedules, dining, library, facilities..."
            className="flex-1 glass-effect border-white/20 bg-white/50 backdrop-blur-sm focus:shadow-glow transition-all duration-300"
            disabled={isListening}
          />
          <VoiceInput 
            onTranscript={handleSendMessage} 
            isListening={isListening}
            onListeningChange={setIsListening}
          />
          <Button 
            type="submit" 
            className="px-6 bg-gradient-primary hover:shadow-glow transition-all duration-300"
            disabled={isListening}
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};
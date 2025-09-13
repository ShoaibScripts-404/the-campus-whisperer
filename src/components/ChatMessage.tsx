import { Card } from "@/components/ui/card";
import { Bot, User } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isAssistant = message.sender === 'assistant';
  
  return (
    <div className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} animate-in slide-in-from-bottom-2 duration-300`}>
      <div className={`flex items-start gap-3 max-w-[80%] ${isAssistant ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Avatar */}
        <div className={`p-2 rounded-full ${isAssistant ? 'bg-primary' : 'bg-secondary'} flex-shrink-0`}>
          {isAssistant ? (
            <Bot className="w-4 h-4 text-white" />
          ) : (
            <User className="w-4 h-4 text-white" />
          )}
        </div>
        
        {/* Message Bubble */}
        <Card className={`p-4 shadow-sm transition-all duration-200 hover:shadow-md ${
          isAssistant 
            ? 'bg-white border-campus-blue-light' 
            : 'bg-primary text-primary-foreground border-primary'
        }`}>
          <div className="whitespace-pre-wrap leading-relaxed">
            {message.content}
          </div>
          <div className={`text-xs mt-2 ${
            isAssistant ? 'text-muted-foreground' : 'text-primary-foreground/70'
          }`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </Card>
      </div>
    </div>
  );
};
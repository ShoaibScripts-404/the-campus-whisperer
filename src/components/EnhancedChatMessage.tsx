import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, User, Volume2, VolumeX, Copy, Heart, Star } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  type?: 'text' | 'rich' | 'interactive';
  data?: any;
}

interface EnhancedChatMessageProps {
  message: Message;
  onReaction?: (messageId: string, reaction: string) => void;
}

export const EnhancedChatMessage = ({ message, onReaction }: EnhancedChatMessageProps) => {
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();
  
  const isAssistant = message.sender === 'assistant';
  
  useEffect(() => {
    if (isAssistant && message.content) {
      setIsTyping(true);
      setDisplayedText('');
      
      const text = message.content;
      let currentIndex = 0;
      
      const typeText = () => {
        if (currentIndex < text.length) {
          setDisplayedText(prev => prev + text[currentIndex]);
          currentIndex++;
          setTimeout(typeText, 30 + Math.random() * 20);
        } else {
          setIsTyping(false);
        }
      };
      
      setTimeout(typeText, 500);
    } else {
      setDisplayedText(message.content);
    }
  }, [message.content, isAssistant]);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    toast({
      title: "Copied!",
      description: "Message copied to clipboard",
      duration: 2000,
    });
  };

  const handleTextToSpeech = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(message.content);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 0.8;
        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => setIsPlaying(false);
        speechSynthesis.speak(utterance);
      }
    }
  };

  const formatContent = (content: string) => {
    // Handle markdown-style formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^• (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/gs, '<ul class="list-disc list-inside space-y-1 my-2">$1</ul>');
  };

  return (
    <div className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} animate-slide-up group`}>
      <div className={`flex items-start gap-3 max-w-[85%] ${isAssistant ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Avatar */}
        <div className={`p-2 rounded-full glass-effect ${isAssistant ? 'bg-gradient-primary' : 'bg-secondary'} flex-shrink-0 animate-bounce-in`}>
          {isAssistant ? (
            <Bot className="w-5 h-5 text-white" />
          ) : (
            <User className="w-5 h-5 text-white" />
          )}
        </div>
        
        {/* Message Bubble */}
        <Card className={`p-4 shadow-glass transition-all duration-300 hover:shadow-float group-hover:scale-[1.02] ${
          isAssistant 
            ? 'glass-effect border-campus-blue-light bg-white/90 backdrop-blur-xl' 
            : 'bg-gradient-primary text-primary-foreground border-primary shadow-glow'
        }`}>
          <div className="relative">
            {/* Message Content */}
            <div 
              className={`whitespace-pre-wrap leading-relaxed ${isAssistant ? 'text-foreground' : 'text-primary-foreground'}`}
              dangerouslySetInnerHTML={{ __html: formatContent(displayedText) }}
            />
            
            {/* Typing Cursor */}
            {isTyping && (
              <span className="inline-block w-2 h-5 ml-1 bg-primary animate-pulse" />
            )}
            
            {/* Message Actions */}
            <div className={`flex items-center justify-between mt-3 pt-2 border-t ${
              isAssistant ? 'border-border' : 'border-primary-foreground/20'
            }`}>
              <div className={`text-xs ${
                isAssistant ? 'text-muted-foreground' : 'text-primary-foreground/70'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {isAssistant && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 hover:bg-primary/10"
                    onClick={handleTextToSpeech}
                  >
                    {isPlaying ? (
                      <VolumeX className="w-3 h-3" />
                    ) : (
                      <Volume2 className="w-3 h-3" />
                    )}
                  </Button>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-primary/10"
                  onClick={handleCopy}
                >
                  <Copy className="w-3 h-3" />
                </Button>
                
                {isAssistant && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 hover:bg-red-100"
                      onClick={() => onReaction?.(message.id, 'heart')}
                    >
                      <Heart className="w-3 h-3" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 hover:bg-yellow-100"
                      onClick={() => onReaction?.(message.id, 'star')}
                    >
                      <Star className="w-3 h-3" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
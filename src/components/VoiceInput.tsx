import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  isListening?: boolean;
  onListeningChange?: (listening: boolean) => void;
}

export const VoiceInput = ({ onTranscript, isListening = false, onListeningChange }: VoiceInputProps) => {
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();
      
      const recognition = recognitionRef.current;
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(interimTranscript || finalTranscript);
        
        if (finalTranscript) {
          onTranscript(finalTranscript.trim());
          setTranscript('');
        }
      };

      recognition.onstart = () => {
        onListeningChange?.(true);
        toast({
          title: "Listening...",
          description: "Speak now, I'm listening!",
          duration: 2000,
        });
      };

      recognition.onend = () => {
        onListeningChange?.(false);
        setTranscript('');
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        onListeningChange?.(false);
        toast({
          title: "Voice Input Error",
          description: "Please check microphone permissions and try again.",
          variant: "destructive",
          duration: 3000,
        });
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onTranscript, onListeningChange, toast]);

  const toggleListening = async () => {
    if (!isSupported) {
      toast({
        title: "Not Supported",
        description: "Speech recognition is not supported in this browser.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    try {
      if (isListening) {
        recognitionRef.current?.stop();
      } else {
        // Request microphone permission
        await navigator.mediaDevices.getUserMedia({ audio: true });
        recognitionRef.current?.start();
      }
    } catch (error) {
      console.error('Microphone access error:', error);
      toast({
        title: "Microphone Access",
        description: "Please allow microphone access to use voice input.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={isListening ? "default" : "outline"}
        size="sm"
        onClick={toggleListening}
        className={`transition-all duration-300 ${
          isListening 
            ? 'animate-pulse-glow bg-red-500 hover:bg-red-600 text-white' 
            : 'glass-effect hover:shadow-glow'
        }`}
      >
        {isListening ? (
          <MicOff className="w-4 h-4" />
        ) : (
          <Mic className="w-4 h-4" />
        )}
      </Button>
      
      {transcript && (
        <div className="glass-effect px-3 py-1 rounded-full text-sm text-muted-foreground max-w-xs truncate">
          {transcript}
        </div>
      )}
    </div>
  );
};
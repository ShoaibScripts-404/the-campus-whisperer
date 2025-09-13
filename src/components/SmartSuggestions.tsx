import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, Clock, Star } from 'lucide-react';

interface SmartSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
  context?: string;
}

interface Suggestion {
  id: string;
  text: string;
  category: 'popular' | 'contextual' | 'trending' | 'personal';
  icon: React.ReactNode;
  priority: number;
}

export const SmartSuggestions = ({ onSuggestionClick, context }: SmartSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setCurrentTime(new Date());
    
    const baseSuggestions: Suggestion[] = [
      {
        id: '1',
        text: "What's for lunch today?",
        category: 'popular',
        icon: <TrendingUp className="w-3 h-3" />,
        priority: 9
      },
      {
        id: '2',
        text: "Library study room availability",
        category: 'popular',
        icon: <Star className="w-3 h-3" />,
        priority: 8
      },
      {
        id: '3',
        text: "Campus map and directions",
        category: 'contextual',
        icon: <Sparkles className="w-3 h-3" />,
        priority: 7
      },
      {
        id: '4',
        text: "Upcoming campus events",
        category: 'trending',
        icon: <TrendingUp className="w-3 h-3" />,
        priority: 6
      }
    ];

    // Add time-based suggestions
    const hour = currentTime.getHours();
    const timeBasedSuggestions: Suggestion[] = [];

    if (hour >= 7 && hour < 11) {
      timeBasedSuggestions.push({
        id: 'morning',
        text: "Breakfast hours and locations",
        category: 'contextual',
        icon: <Clock className="w-3 h-3" />,
        priority: 10
      });
    } else if (hour >= 11 && hour < 14) {
      timeBasedSuggestions.push({
        id: 'lunch',
        text: "Lunch specials and wait times",
        category: 'contextual',
        icon: <Clock className="w-3 h-3" />,
        priority: 10
      });
    } else if (hour >= 17 && hour < 21) {
      timeBasedSuggestions.push({
        id: 'dinner',
        text: "Dinner options still available",
        category: 'contextual',
        icon: <Clock className="w-3 h-3" />,
        priority: 10
      });
    } else if (hour >= 21 || hour < 6) {
      timeBasedSuggestions.push({
        id: 'late',
        text: "24/7 study spaces and facilities",
        category: 'contextual',
        icon: <Clock className="w-3 h-3" />,
        priority: 10
      });
    }

    // Add context-based suggestions
    const contextualSuggestions: Suggestion[] = [];
    if (context?.toLowerCase().includes('schedule')) {
      contextualSuggestions.push({
        id: 'schedule-related',
        text: "How to add/drop classes",
        category: 'contextual',
        icon: <Sparkles className="w-3 h-3" />,
        priority: 9
      });
    } else if (context?.toLowerCase().includes('dining')) {
      contextualSuggestions.push({
        id: 'dining-related',
        text: "Meal plan options and prices",
        category: 'contextual',
        icon: <Sparkles className="w-3 h-3" />,
        priority: 9
      });
    }

    const allSuggestions = [
      ...timeBasedSuggestions,
      ...contextualSuggestions,
      ...baseSuggestions
    ];

    // Sort by priority and take top 6
    const topSuggestions = allSuggestions
      .sort((a, b) => b.priority - a.priority)
      .slice(0, 6);

    setSuggestions(topSuggestions);
  }, [context, currentTime]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'popular': return 'bg-primary/10 text-primary border-primary/20';
      case 'contextual': return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'trending': return 'bg-campus-purple/10 text-campus-purple border-campus-purple/20';
      case 'personal': return 'bg-campus-orange/10 text-campus-orange border-campus-orange/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'popular': return 'Popular';
      case 'contextual': return 'Smart';
      case 'trending': return 'Trending';
      case 'personal': return 'For You';
      default: return '';
    }
  };

  if (suggestions.length === 0) return null;

  return (
    <div className="space-y-3 p-4 glass-effect rounded-lg border border-white/10">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-primary" />
        <h4 className="font-medium text-sm">Smart Suggestions</h4>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {suggestions.map((suggestion, index) => (
          <Button
            key={suggestion.id}
            variant="outline"
            size="sm"
            className="justify-start text-left h-auto p-3 glass-effect hover:shadow-glow transition-all duration-300 group animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => onSuggestionClick(suggestion.text)}
          >
            <div className="flex items-start gap-2 w-full">
              <div className="mt-0.5 text-muted-foreground group-hover:text-primary transition-colors">
                {suggestion.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium leading-tight text-left truncate">
                  {suggestion.text}
                </div>
                <Badge 
                  variant="outline" 
                  className={`mt-1 text-xs ${getCategoryColor(suggestion.category)}`}
                >
                  {getCategoryLabel(suggestion.category)}
                </Badge>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  MapPin, 
  Book, 
  Utensils, 
  Clock, 
  HelpCircle,
  Users,
  CreditCard,
  Wifi,
  Car,
  Coffee,
  Dumbbell
} from 'lucide-react';

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  action: string;
  category: string;
  color: string;
  badge?: string;
  isPopular?: boolean;
}

interface EnhancedQuickActionsProps {
  onAction: (action: string) => void;
}

const quickActions: QuickAction[] = [
  {
    icon: <Calendar className="w-5 h-5" />,
    label: "Today's Schedule",
    action: "Show me my class schedule for today",
    category: "Academic",
    color: "bg-gradient-to-br from-primary to-primary-glow hover:shadow-glow",
    badge: "Updated",
    isPopular: true
  },
  {
    icon: <Utensils className="w-5 h-5" />,
    label: "Dining Menu",
    action: "What's available at dining halls right now?",
    category: "Dining",
    color: "bg-gradient-to-br from-secondary to-campus-green hover:shadow-glow",
    badge: "Live",
    isPopular: true
  },
  {
    icon: <Book className="w-5 h-5" />,
    label: "Library Hours",
    action: "Library hours and study room availability",
    category: "Study",
    color: "bg-gradient-to-br from-campus-blue to-campus-blue-dark hover:shadow-glow",
    isPopular: true
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: "Campus Map",
    action: "Help me navigate campus and find buildings",
    category: "Navigation",
    color: "bg-gradient-to-br from-campus-green to-secondary hover:shadow-glow"
  },
  {
    icon: <Users className="w-5 h-5" />,
    label: "Events Today",
    action: "What campus events are happening today?",
    category: "Events",
    color: "bg-gradient-to-br from-campus-purple to-primary hover:shadow-glow",
    badge: "3 New"
  },
  {
    icon: <CreditCard className="w-5 h-5" />,
    label: "Account Info",
    action: "Check my student account and payment information",
    category: "Financial",
    color: "bg-gradient-to-br from-campus-orange to-secondary hover:shadow-glow"
  },
  {
    icon: <Wifi className="w-5 h-5" />,
    label: "WiFi Help",
    action: "Campus WiFi setup and troubleshooting",
    category: "Tech Support",
    color: "bg-gradient-to-br from-muted-foreground to-primary hover:shadow-glow"
  },
  {
    icon: <Car className="w-5 h-5" />,
    label: "Parking Info",
    action: "Parking availability and permit information",
    category: "Transportation",
    color: "bg-gradient-to-br from-accent-foreground to-muted-foreground hover:shadow-glow"
  },
  {
    icon: <Coffee className="w-5 h-5" />,
    label: "Café Hours",
    action: "Campus café hours and coffee shop locations",
    category: "Dining",
    color: "bg-gradient-to-br from-amber-600 to-orange-500 hover:shadow-glow"
  },
  {
    icon: <Dumbbell className="w-5 h-5" />,
    label: "Gym Access",
    action: "Fitness center hours and equipment availability",
    category: "Recreation",
    color: "bg-gradient-to-br from-green-600 to-emerald-500 hover:shadow-glow"
  },
  {
    icon: <Clock className="w-5 h-5" />,
    label: "Office Hours",
    action: "Administrative office hours and contact information",
    category: "Administrative",
    color: "bg-gradient-to-br from-slate-600 to-gray-500 hover:shadow-glow"
  },
  {
    icon: <HelpCircle className="w-5 h-5" />,
    label: "General Help",
    action: "What can you help me with?",
    category: "Support",
    color: "bg-gradient-to-br from-indigo-600 to-purple-500 hover:shadow-glow"
  }
];

export const EnhancedQuickActions = ({ onAction }: EnhancedQuickActionsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = Array.from(new Set(quickActions.map(action => action.category)));
  
  const filteredActions = selectedCategory 
    ? quickActions.filter(action => action.category === selectedCategory)
    : quickActions;

  const popularActions = quickActions.filter(action => action.isPopular);

  return (
    <div className="space-y-4">
      {/* Popular Actions (Always Visible) */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-gradient-primary rounded-full animate-pulse"></div>
          <h3 className="text-sm font-semibold text-foreground">Popular Right Now</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {popularActions.map((item, index) => (
            <Card
              key={index}
              className="group cursor-pointer transition-all duration-300 hover:scale-[1.02] glass-effect border-white/20 hover:shadow-float"
              onClick={() => onAction(item.action)}
            >
              <div className={`${item.color} text-white p-4 rounded-lg transition-all duration-300`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    {item.icon}
                  </div>
                  {item.badge && (
                    <Badge className="bg-white/20 text-white border-white/30 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-sm leading-tight mb-1">{item.label}</h4>
                  <p className="text-xs text-white/80 leading-relaxed">{item.category}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Browse by Category</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className="glass-effect hover:shadow-glow"
          >
            All Categories
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="glass-effect hover:shadow-glow"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* All Actions Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filteredActions.map((item, index) => (
          <Button
            key={index}
            variant="outline"
            className={`${item.color} text-white border-0 flex flex-col items-center gap-2 h-auto py-4 px-3 transition-all duration-300 hover:scale-105 hover:shadow-float group glass-effect animate-fade-in`}
            style={{ animationDelay: `${index * 50}ms` }}
            onClick={() => onAction(item.action)}
          >
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
              {item.icon}
            </div>
            <div className="text-center">
              <div className="text-xs font-medium leading-tight mb-1">
                {item.label}
              </div>
              {item.badge && (
                <Badge className="bg-white/20 text-white border-white/30 text-xs">
                  {item.badge}
                </Badge>
              )}
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};
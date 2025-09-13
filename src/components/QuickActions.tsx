import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Book, Utensils, Clock, HelpCircle } from 'lucide-react';

interface QuickActionsProps {
  onAction: (action: string) => void;
}

const quickActions = [
  {
    icon: Calendar,
    label: "Class Schedule",
    action: "Show me my class schedule for today",
    color: "bg-primary hover:bg-primary/90"
  },
  {
    icon: Utensils,
    label: "Dining Hours",
    action: "What are the dining hall hours and menu?",
    color: "bg-secondary hover:bg-secondary/90"
  },
  {
    icon: Book,
    label: "Library Info",
    action: "Library hours and study spaces",
    color: "bg-campus-blue hover:bg-campus-blue/90"
  },
  {
    icon: MapPin,
    label: "Campus Map",
    action: "Help me find campus facilities and buildings",
    color: "bg-campus-green hover:bg-campus-green/90"
  },
  {
    icon: Clock,
    label: "Office Hours",
    action: "Administrative office hours and contacts",
    color: "bg-muted-foreground hover:bg-muted-foreground/90"
  },
  {
    icon: HelpCircle,
    label: "General Help",
    action: "What can you help me with?",
    color: "bg-accent-foreground hover:bg-accent-foreground/90"
  }
];

export const QuickActions = ({ onAction }: QuickActionsProps) => {
  return (
    <div className="w-full">
      <h3 className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {quickActions.map((item, index) => {
          const Icon = item.icon;
          return (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className={`${item.color} text-white border-0 flex flex-col items-center gap-1 h-auto py-3 transition-all duration-200 hover:scale-105 hover:shadow-md`}
              onClick={() => onAction(item.action)}
            >
              <Icon className="w-4 h-4" />
              <span className="text-xs font-medium leading-tight text-center">
                {item.label}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
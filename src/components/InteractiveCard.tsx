import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Users, Calendar, ExternalLink } from 'lucide-react';

interface InteractiveCardProps {
  title: string;
  description: string;
  type: 'schedule' | 'dining' | 'event' | 'facility';
  data?: any;
  onAction?: (action: string, data: any) => void;
}

export const InteractiveCard = ({ title, description, type, data, onAction }: InteractiveCardProps) => {
  const getCardContent = () => {
    switch (type) {
      case 'schedule':
        return (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <Badge variant="outline" className="text-xs">
                {data?.day || 'Today'}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {data?.classes?.slice(0, 4).map((cls: any, index: number) => (
                <div key={index} className="glass-effect p-2 rounded-lg">
                  <div className="font-medium text-xs">{cls.time}</div>
                  <div className="text-muted-foreground text-xs truncate">{cls.name}</div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'dining':
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium">{data?.hours || 'Open Now'}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {data?.status || 'Open'}
              </Badge>
            </div>
            <div className="space-y-1">
              {data?.menu?.slice(0, 3).map((item: string, index: number) => (
                <div key={index} className="text-sm text-muted-foreground">
                  • {item}
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'event':
        return (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-campus-purple" />
              <span className="text-sm">{data?.attendees || '50+'} attending</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-campus-orange" />
              <span className="text-sm text-muted-foreground">{data?.location || 'Student Center'}</span>
            </div>
          </div>
        );
      
      case 'facility':
        return (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-campus-green" />
              <span className="text-sm">{data?.building || 'Main Campus'}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="glass-effect p-2 rounded">
                <div className="text-muted-foreground">Hours</div>
                <div className="font-medium">{data?.hours || '24/7'}</div>
              </div>
              <div className="glass-effect p-2 rounded">
                <div className="text-muted-foreground">Capacity</div>
                <div className="font-medium">{data?.capacity || 'Available'}</div>
              </div>
            </div>
          </div>
        );
      
      default:
        return <div className="text-sm text-muted-foreground">{description}</div>;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'schedule': return 'border-primary/20 hover:border-primary/40';
      case 'dining': return 'border-secondary/20 hover:border-secondary/40';
      case 'event': return 'border-campus-purple/20 hover:border-campus-purple/40';
      case 'facility': return 'border-campus-green/20 hover:border-campus-green/40';
      default: return 'border-border';
    }
  };

  return (
    <Card className={`p-4 glass-effect transition-all duration-300 hover:shadow-float hover:scale-[1.02] ${getTypeColor()} group cursor-pointer`}>
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h4 className="font-semibold text-sm leading-tight">{title}</h4>
          <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        
        {getCardContent()}
        
        <div className="flex gap-2 pt-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1 text-xs glass-effect hover:shadow-glow"
            onClick={() => onAction?.('view', { type, data })}
          >
            View Details
          </Button>
          <Button 
            size="sm" 
            className="flex-1 text-xs"
            onClick={() => onAction?.('quick', { type, data })}
          >
            Quick Action
          </Button>
        </div>
      </div>
    </Card>
  );
};
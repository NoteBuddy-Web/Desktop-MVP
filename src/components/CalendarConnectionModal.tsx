import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  Clock,
  Shield,
  Zap,
  Globe,
  Smartphone,
  ExternalLink
} from 'lucide-react';

interface CalendarConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (calendarType: string) => void;
}

export const CalendarConnectionModal: React.FC<CalendarConnectionModalProps> = ({ isOpen, onClose, onConnect }) => {
  const [connectingCalendar, setConnectingCalendar] = useState<string | null>(null);

  const handleConnect = async (calendarType: string) => {
    setConnectingCalendar(calendarType);
    try {
      // Simulate API call to connect to calendar
      await new Promise(resolve => setTimeout(resolve, 2000));
      onConnect(calendarType);
      onClose();
    } catch (error) {
      console.error(`Failed to connect to ${calendarType}:`, error);
      // Optionally show an error notification
    } finally {
      setConnectingCalendar(null);
    }
  };

  const calendars = [
    {
      id: 'apple',
      name: 'Apple Calendar',
      icon: <Calendar className="w-6 h-6 text-gray-600" />,
      color: 'bg-gray-600',
      features: ['iCloud sync', 'Siri integration', 'Apple devices', 'Privacy focused'],
      isPopular: true,
      description: 'Connect your Apple Calendar and iCloud'
    },
    {
      id: 'google',
      name: 'Google Calendar',
      icon: <Calendar className="w-6 h-6 text-blue-500" />,
      color: 'bg-blue-500',
      features: ['Real-time sync', 'Event creation', 'Availability sharing', 'Mobile access'],
      isPopular: false,
      description: 'Connect your Google Calendar for seamless integration'
    },
    {
      id: 'outlook',
      name: 'Microsoft Outlook',
      icon: <Calendar className="w-6 h-6 text-orange-500" />,
      color: 'bg-orange-500',
      features: ['Office 365 integration', 'Team scheduling', 'Meeting rooms', 'Enterprise features'],
      isPopular: false,
      description: 'Integrate with Microsoft Outlook and Office 365'
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient-primary">
            Connect Your Calendar
          </DialogTitle>
          <DialogDescription className="text-base">
            Choose your calendar platform to sync meetings and keep your schedule organized
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {calendars.map((calendar) => (
            <Card 
              key={calendar.id}
              className="relative cursor-pointer transition-all duration-200 hover:shadow-lg border-2 border-border hover:border-primary/50"
            >
              {calendar.isPopular && (
                <div className="absolute -top-2 -right-2 z-10">
                  <Badge className="bg-gradient-primary text-white">
                    Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 ${calendar.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  {calendar.icon}
                </div>
                <CardTitle className="text-xl font-semibold">{calendar.name}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {calendar.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">Key Features:</h4>
                  <ul className="space-y-1">
                    {calendar.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={() => handleConnect(calendar.id)}
                  disabled={connectingCalendar === calendar.id}
                  className={`w-full ${
                    connectingCalendar === calendar.id 
                      ? 'bg-gradient-primary shadow-glow' 
                      : 'bg-gradient-primary hover:shadow-glow'
                  }`}
                >
                  {connectingCalendar === calendar.id ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Connecting...
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Connect {calendar.name}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0">
              <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                What happens when you connect?
              </h4>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• Your calendar events will be automatically synced</li>
                <li>• Meeting notes will be linked to calendar events</li>
                <li>• Data stays up-to-date with real-time synchronization</li>
                <li>• You can disconnect anytime from the schedule page</li>
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarConnectionModal;

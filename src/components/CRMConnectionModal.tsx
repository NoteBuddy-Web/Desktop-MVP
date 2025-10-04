import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ExternalLink, Users, Building2, TrendingUp } from 'lucide-react';

interface CRMConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (crmType: string) => void;
}

const crmOptions = [
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'All-in-one CRM platform with marketing, sales, and service tools',
    features: ['Contact Management', 'Deal Tracking', 'Email Marketing', 'Analytics'],
    color: 'bg-orange-500',
    icon: '🟠',
    popular: true
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    description: 'Leading cloud-based CRM with extensive customization options',
    features: ['Lead Management', 'Opportunity Tracking', 'Custom Fields', 'Reports'],
    color: 'bg-blue-500',
    icon: '☁️',
    popular: true
  },
  {
    id: 'pipedrive',
    name: 'Pipedrive',
    description: 'Sales-focused CRM designed for small to medium businesses',
    features: ['Pipeline Management', 'Activity Tracking', 'Email Integration', 'Mobile App'],
    color: 'bg-green-500',
    icon: '📊',
    popular: false
  }
];

export const CRMConnectionModal: React.FC<CRMConnectionModalProps> = ({
  isOpen,
  onClose,
  onConnect
}) => {
  const [selectedCRM, setSelectedCRM] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async (crmType: string) => {
    setIsConnecting(true);
    setSelectedCRM(crmType);
    
    try {
      // Simulate connection process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onConnect(crmType);
      onClose();
    } catch (error) {
      console.error('Failed to connect to CRM:', error);
    } finally {
      setIsConnecting(false);
      setSelectedCRM(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient-primary">
            Connect Your CRM
          </DialogTitle>
          <DialogDescription className="text-base">
            Choose your CRM platform to sync client data and keep information up to date
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {crmOptions.map((crm) => (
            <Card 
              key={crm.id}
              className={`relative cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${
                selectedCRM === crm.id ? 'border-primary shadow-lg' : 'border-border hover:border-primary/50'
              }`}
            >
              {crm.popular && (
                <div className="absolute -top-2 -right-2 z-10">
                  <Badge className="bg-gradient-primary text-white">
                    Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 ${crm.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <span className="text-2xl">{crm.icon}</span>
                </div>
                <CardTitle className="text-xl font-semibold">{crm.name}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {crm.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">Key Features:</h4>
                  <ul className="space-y-1">
                    {crm.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={() => handleConnect(crm.id)}
                  disabled={isConnecting}
                  className={`w-full ${
                    selectedCRM === crm.id 
                      ? 'bg-gradient-primary shadow-glow' 
                      : 'bg-gradient-primary hover:shadow-glow'
                  }`}
                >
                  {isConnecting && selectedCRM === crm.id ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Connecting...
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Connect {crm.name}
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
              <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                What happens when you connect?
              </h4>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• Your client contacts will be automatically synced</li>
                <li>• Meeting notes will be linked to CRM records</li>
                <li>• Data stays up-to-date with real-time synchronization</li>
                <li>• You can disconnect anytime from the client page</li>
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

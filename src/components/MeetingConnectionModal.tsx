import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Video, 
  Copy, 
  Check, 
  ExternalLink,
  Link,
  Mic,
  MicOff,
  Bot,
  FileText,
  Clock,
  Users,
  Shield,
  Zap
} from 'lucide-react';

interface MeetingPlatform {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  color: string;
  isPopular?: boolean;
}

interface MeetingConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (platform: string, meetingLink: string) => void;
}

const meetingPlatforms: MeetingPlatform[] = [
  {
    id: 'zoom',
    name: 'Zoom',
    icon: <Video className="w-6 h-6" />,
    description: 'Connect your Zoom meetings for real-time recording and transcription',
    features: ['Real-time transcription', 'Automatic recording', 'AI-powered summaries', 'Action item extraction'],
    color: 'bg-blue-500',
    isPopular: true
  },
  {
    id: 'google-meet',
    name: 'Google Meet',
    icon: <Video className="w-6 h-6" />,
    description: 'Integrate with Google Meet for seamless meeting management',
    features: ['Live transcription', 'Smart recording', 'Meeting insights', 'Calendar integration'],
    color: 'bg-green-500'
  },
  {
    id: 'microsoft-teams',
    name: 'Microsoft Teams',
    icon: <Video className="w-6 h-6" />,
    description: 'Connect Microsoft Teams meetings for comprehensive note-taking',
    features: ['Enterprise security', 'Advanced transcription', 'Meeting analytics', 'Team collaboration'],
    color: 'bg-purple-500'
  },
  {
    id: 'webex',
    name: 'Cisco Webex',
    icon: <Video className="w-6 h-6" />,
    description: 'Link Webex meetings for professional meeting documentation',
    features: ['HD recording', 'AI transcription', 'Meeting highlights', 'Secure sharing'],
    color: 'bg-orange-500'
  },
  {
    id: 'gotomeeting',
    name: 'GoToMeeting',
    icon: <Video className="w-6 h-6" />,
    description: 'Connect GoToMeeting for reliable meeting recording and notes',
    features: ['Cloud recording', 'Smart transcription', 'Meeting reports', 'Mobile access'],
    color: 'bg-indigo-500'
  },
  {
    id: 'other',
    name: 'Other Platform',
    icon: <Link className="w-6 h-6" />,
    description: 'Connect any meeting platform using a custom meeting link',
    features: ['Universal compatibility', 'Custom integration', 'Flexible recording', 'Manual setup'],
    color: 'bg-gray-500'
  }
];

export const MeetingConnectionModal: React.FC<MeetingConnectionModalProps> = ({
  isOpen,
  onClose,
  onConnect
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [meetingLink, setMeetingLink] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handlePlatformSelect = (platformId: string) => {
    setSelectedPlatform(platformId);
    setMeetingLink('');
    setCopiedLink(false);
  };

  const handleCopyLink = async () => {
    if (meetingLink) {
      try {
        await navigator.clipboard.writeText(meetingLink);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    }
  };

  const handleConnect = async () => {
    if (selectedPlatform && meetingLink) {
      setIsConnecting(true);
      try {
        // Simulate connection process
        await new Promise(resolve => setTimeout(resolve, 1500));
        onConnect(selectedPlatform, meetingLink);
        handleClose();
      } catch (error) {
        console.error('Failed to connect meeting:', error);
      } finally {
        setIsConnecting(false);
      }
    }
  };

  const handleClose = () => {
    setSelectedPlatform(null);
    setMeetingLink('');
    setCopiedLink(false);
    setIsConnecting(false);
    onClose();
  };

  const selectedPlatformData = meetingPlatforms.find(p => p.id === selectedPlatform);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient-primary">
            Connect Online Meeting
          </DialogTitle>
          <DialogDescription className="text-base">
            Connect your meeting platform to enable real-time recording, transcription, and AI-powered insights
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          {!selectedPlatform ? (
            // Platform Selection
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {meetingPlatforms.map((platform) => (
                <Card 
                  key={platform.id}
                  className={`relative cursor-pointer transition-all duration-200 hover:shadow-lg border-2 border-border hover:border-primary/50 ${
                    platform.isPopular ? 'ring-2 ring-primary/20' : ''
                  }`}
                  onClick={() => handlePlatformSelect(platform.id)}
                >
                  {platform.isPopular && (
                    <div className="absolute -top-2 -right-2 bg-gradient-primary text-white text-xs px-2 py-1 rounded-full font-medium">
                      Popular
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-3">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${platform.color} text-white`}>
                      {platform.icon}
                    </div>
                    <CardTitle className="text-lg">{platform.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {platform.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-foreground mb-2">Key Features:</h4>
                      <ul className="space-y-1">
                        {platform.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            // Meeting Link Input
            <div className="space-y-6">
              {/* Selected Platform Info */}
              <Card className="bg-gradient-card border-border/50 shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${selectedPlatformData?.color} text-white`}>
                      {selectedPlatformData?.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{selectedPlatformData?.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedPlatformData?.description}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedPlatform(null)}
                      className="ml-auto"
                    >
                      Change Platform
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Meeting Link Input */}
              <Card className="bg-gradient-card border-border/50 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <Link className="w-5 h-5" />
                    <span>Meeting Link</span>
                  </CardTitle>
                  <CardDescription>
                    Paste your meeting link below to enable recording and transcription
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="meeting-link">Meeting URL</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="meeting-link"
                        placeholder="https://zoom.us/j/123456789 or https://meet.google.com/abc-defg-hij"
                        value={meetingLink}
                        onChange={(e) => setMeetingLink(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        onClick={handleCopyLink}
                        disabled={!meetingLink}
                        className="px-3"
                      >
                        {copiedLink ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Features Preview */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Mic className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Real-time Recording</p>
                        <p className="text-xs text-muted-foreground">Automatic meeting recording</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <FileText className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Live Transcription</p>
                        <p className="text-xs text-muted-foreground">AI-powered speech-to-text</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">AI Summaries</p>
                        <p className="text-xs text-muted-foreground">Automatic meeting summaries</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <Zap className="w-4 h-4 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Action Items</p>
                        <p className="text-xs text-muted-foreground">Extract tasks and decisions</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Connection Instructions */}
              <Card className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                        How it works
                      </h4>
                      <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                        <li>1. Copy your meeting link from {selectedPlatformData?.name}</li>
                        <li>2. Paste it above and click "Connect Meeting"</li>
                        <li>3. NoteBuddy will join as a recording bot</li>
                        <li>4. Get real-time transcription and AI insights</li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  disabled={isConnecting}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConnect}
                  disabled={!meetingLink || isConnecting}
                  className="bg-gradient-primary shadow-glow"
                >
                  {isConnecting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Link className="w-4 h-4 mr-2" />
                      Connect Meeting
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

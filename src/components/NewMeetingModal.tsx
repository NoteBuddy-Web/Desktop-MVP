import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  MessageSquare, 
  FileText, 
  Plus, 
  X,
  Search,
  Calendar,
  Clock,
  Users,
  Video,
  Phone,
  MapPin
} from 'lucide-react';

interface Meeting {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  participants: number;
  type: string;
  status: string;
  summary: string;
}

interface NewMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartNewMeeting: (meetingData: any) => void;
  onImportFromMeeting: (meetingData: any) => void;
  recentMeetings: Meeting[];
}

export const NewMeetingModal: React.FC<NewMeetingModalProps> = ({
  isOpen,
  onClose,
  onStartNewMeeting,
  onImportFromMeeting,
  recentMeetings
}) => {
  const [selectedOption, setSelectedOption] = useState<'new' | 'import' | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMeetingId, setSelectedMeetingId] = useState<number | null>(null);
  const [selectedMeetingType, setSelectedMeetingType] = useState<'zoom' | 'in-person' | 'call' | null>(null);
  const [meetingTitle, setMeetingTitle] = useState('');

  const filteredMeetings = recentMeetings.filter(meeting =>
    meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    meeting.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStartNew = () => {
    if (selectedMeetingType) {
      const meetingData = { 
        type: selectedMeetingType, 
        title: meetingTitle || `New ${selectedMeetingType} Meeting`
      };
      console.log('Starting new meeting:', meetingData);
      onStartNewMeeting(meetingData);
      handleClose();
    }
  };

  const handleImport = () => {
    if (selectedMeetingId && selectedMeetingType) {
      const selectedMeeting = recentMeetings.find(m => m.id === selectedMeetingId);
      const meetingData = { 
        meetingId: selectedMeetingId, 
        type: selectedMeetingType,
        title: selectedMeeting?.title || 'Imported Meeting'
      };
      console.log('Importing from meeting:', meetingData);
      onImportFromMeeting(meetingData);
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedOption(null);
    setSearchTerm('');
    setSelectedMeetingId(null);
    setSelectedMeetingType(null);
    setMeetingTitle('');
    onClose();
  };

  const getMeetingTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'phone': return <Phone className="w-4 h-4" />;
      case 'in-person': return <MapPin className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getNewMeetingTypeIcon = (type: string) => {
    switch (type) {
      case 'zoom': return <Video className="w-5 h-5" />;
      case 'call': return <Phone className="w-5 h-5" />;
      case 'in-person': return <MapPin className="w-5 h-5" />;
      default: return <MessageSquare className="w-5 h-5" />;
    }
  };

  const getNewMeetingTypeColor = (type: string) => {
    switch (type) {
      case 'zoom': return 'bg-blue-500';
      case 'call': return 'bg-green-500';
      case 'in-person': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] bg-gradient-card border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-foreground">
            <MessageSquare className="w-5 h-5 text-primary" />
            <span>Start New Meeting</span>
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Choose how you'd like to start your new meeting.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {!selectedOption ? (
            // Initial options
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setSelectedOption('new')}
                className="p-6 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all duration-200 text-left group"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Plus className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Start Fresh</h3>
                    <p className="text-sm text-muted-foreground">Begin a completely new meeting</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Create a new meeting from scratch with a blank agenda and notes.
                </p>
              </button>

              <button
                onClick={() => setSelectedOption('import')}
                className="p-6 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all duration-200 text-left group"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Import from Previous</h3>
                    <p className="text-sm text-muted-foreground">Use an existing meeting as template</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Import agenda, participants, and notes from a previous meeting.
                </p>
              </button>
            </div>
          ) : selectedOption === 'new' ? (
            // Start new meeting confirmation
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Plus className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Start New Meeting</h3>
                    <p className="text-sm text-muted-foreground">
                      Choose the meeting type and enter details
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-foreground font-medium">Meeting Title</Label>
                <Input
                  value={meetingTitle}
                  onChange={(e) => setMeetingTitle(e.target.value)}
                  placeholder="Enter meeting title (optional)"
                  className="bg-background border-border text-foreground placeholder-muted-foreground focus:border-primary focus:ring-primary"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-foreground font-medium">Meeting Type *</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { id: 'zoom', label: 'Zoom Meeting', description: 'Video conference call' },
                    { id: 'call', label: 'Phone Call', description: 'Audio-only call' },
                    { id: 'in-person', label: 'In-Person', description: 'Face-to-face meeting' }
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedMeetingType(type.id as 'zoom' | 'call' | 'in-person')}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                        selectedMeetingType === type.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50 hover:bg-muted/30'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg ${getNewMeetingTypeColor(type.id)} flex items-center justify-center`}>
                          {getNewMeetingTypeIcon(type.id)}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{type.label}</div>
                          <div className="text-xs text-muted-foreground">{type.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // Import from meeting selection
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Import from Previous Meeting</h3>
                    <p className="text-sm text-muted-foreground">
                      Select a meeting to use as a template and choose the new meeting type
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground font-medium">Search Meetings</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search by title or summary..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-background border-border text-foreground placeholder-muted-foreground focus:border-primary focus:ring-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground font-medium">Select Meeting</Label>
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {filteredMeetings.length > 0 ? (
                    filteredMeetings.map((meeting) => (
                      <button
                        key={meeting.id}
                        onClick={() => setSelectedMeetingId(meeting.id)}
                        className={`w-full p-3 rounded-lg border-2 text-left transition-all duration-200 ${
                          selectedMeetingId === meeting.id
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50 hover:bg-muted/30'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-foreground truncate">{meeting.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {meeting.summary}
                            </p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3" />
                                <span>{new Date(meeting.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{meeting.duration}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="w-3 h-3" />
                                <span>{meeting.participants} participants</span>
                              </div>
                            </div>
                          </div>
                          <div className="ml-3 flex-shrink-0">
                            {getMeetingTypeIcon(meeting.type)}
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      {searchTerm ? 'No meetings found matching your search.' : 'No recent meetings available.'}
                    </div>
                  )}
                </div>
              </div>

              {selectedMeetingId && (
                <div className="space-y-3">
                  <Label className="text-foreground font-medium">New Meeting Type *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { id: 'zoom', label: 'Zoom Meeting', description: 'Video conference call' },
                      { id: 'call', label: 'Phone Call', description: 'Audio-only call' },
                      { id: 'in-person', label: 'In-Person', description: 'Face-to-face meeting' }
                    ].map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedMeetingType(type.id as 'zoom' | 'call' | 'in-person')}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                          selectedMeetingType === type.id
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50 hover:bg-muted/30'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-lg ${getNewMeetingTypeColor(type.id)} flex items-center justify-center`}>
                            {getNewMeetingTypeIcon(type.id)}
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{type.label}</div>
                            <div className="text-xs text-muted-foreground">{type.description}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="flex gap-2">
          {selectedOption === 'new' && (
            <Button
              onClick={handleStartNew}
              disabled={!selectedMeetingType}
              className="flex-1 sm:flex-none bg-gradient-primary shadow-glow"
            >
              <Plus className="w-4 h-4 mr-2" />
              Start New Meeting
            </Button>
          )}
          
          {selectedOption === 'import' && (
            <Button
              onClick={handleImport}
              disabled={!selectedMeetingId || !selectedMeetingType}
              className="flex-1 sm:flex-none bg-gradient-primary shadow-glow"
            >
              <FileText className="w-4 h-4 mr-2" />
              Import & Start
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

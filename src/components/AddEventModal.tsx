import React, { useState } from 'react';
import { Plus, Clock, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: EventData) => void;
}

interface EventData {
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  tags: string[];
}

const predefinedTags = [
  { name: 'Work', color: 'bg-gray-600' },
  { name: 'Personal', color: 'bg-gray-600' },
  { name: 'Meeting', color: 'bg-blue-500' },
  { name: 'Task', color: 'bg-gray-600' },
  { name: 'Project', color: 'bg-purple-500' },
];

const colorOptions = [
  'bg-red-500',
  'bg-orange-500',
  'bg-yellow-500',
  'bg-green-500',
  'bg-blue-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-gray-500',
  'bg-indigo-500',
  'bg-teal-500',
];

export const AddEventModal = ({ isOpen, onClose, onAddEvent }: AddEventModalProps) => {
  const [formData, setFormData] = useState<EventData>({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    time: '12:30',
    duration: '1.0',
    tags: [],
  });

  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('bg-blue-500');

  const handleInputChange = (field: keyof EventData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTagToggle = (tagName: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tagName)
        ? prev.tags.filter(tag => tag !== tagName)
        : [...prev.tags, tagName]
    }));
  };

  const handleAddNewTag = () => {
    if (newTagName.trim()) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTagName.trim()]
      }));
      setNewTagName('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onAddEvent(formData);
      setFormData({
        title: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        time: '12:30',
        duration: '1.0',
        tags: [],
      });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border shadow-elegant">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">Add Event</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Event Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-foreground font-medium">
              Event Title
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter event title"
              className="bg-background border-border text-foreground placeholder-muted-foreground focus:border-primary focus:ring-primary"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Optional description"
              className="bg-background border-border text-foreground placeholder-muted-foreground focus:border-primary focus:ring-primary min-h-[80px]"
            />
          </div>

          {/* Date, Time, and Duration */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-foreground font-medium">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="bg-background border-primary text-foreground focus:border-primary focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="text-foreground font-medium">
                Time
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className="bg-background border-border text-foreground focus:border-primary focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration" className="text-foreground font-medium">
                Duration
              </Label>
              <div className="flex items-center">
                <Input
                  id="duration"
                  type="number"
                  step="0.5"
                  min="0.5"
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  className="bg-background border-border text-foreground focus:border-primary focus:ring-primary rounded-r-none"
                />
                <span className="bg-background border border-l-0 border-border text-foreground px-3 py-2 rounded-r-md">
                  h
                </span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <Label className="text-foreground font-medium">Tags</Label>
            
            {/* Predefined Tags */}
            <div className="flex flex-wrap gap-2">
              {predefinedTags.map((tag) => (
                <button
                  key={tag.name}
                  type="button"
                  onClick={() => handleTagToggle(tag.name)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    formData.tags.includes(tag.name)
                      ? `${tag.color} text-white`
                      : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>

            {/* Add New Tag */}
            <div className="space-y-3">
              <Input
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="New tag name"
                className="bg-background border-border text-foreground placeholder-muted-foreground focus:border-primary focus:ring-primary"
              />
              
              {/* Color Picker */}
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setNewTagColor(color)}
                      className={`w-6 h-6 rounded-full ${color} ${
                        newTagColor === color ? 'ring-2 ring-primary' : ''
                      }`}
                    />
                  ))}
                </div>
                <Button
                  type="button"
                  onClick={handleAddNewTag}
                  disabled={!newTagName.trim()}
                  className="bg-muted hover:bg-accent text-muted-foreground hover:text-accent-foreground text-sm px-3 py-1"
                >
                  Add Tag
                </Button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-primary hover:bg-gradient-primary/90 text-primary-foreground font-medium py-3 shadow-glow"
          >
            Add Event
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

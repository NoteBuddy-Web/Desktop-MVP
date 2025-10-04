import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, CheckSquare2, TrendingUp, MessageSquare, Users, RefreshCw, Activity, MoreVertical, Settings, Download, Share2, Layout, Grid3X3, List, BarChart3, Mail, ArrowRight, Flag, Plus, Zap, Target, Award, Star, Play, Pause, ChevronRight, Sparkles, Brain, Lightbulb, Rocket, Timer, CheckCircle, AlertCircle, Info, Bell, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';

const upcomingMeetings = [
  {
    id: 1,
    title: 'Project Phoenix Review',
    time: '10:00 AM',
    participants: 5,
    status: 'upcoming'
  },
  {
    id: 2,
    title: 'Sales Strategy Discussion',
    time: '2:30 PM',
    participants: 3,
    status: 'upcoming'
  },
  {
    id: 3,
    title: 'Weekly Team Standup',
    time: '4:00 PM',
    participants: 8,
    status: 'upcoming'
  }
];

const recentSummaries = [
  {
    id: 1,
    title: 'Q3 Sales Planning Meeting',
    summary: 'Discussed target goals, new client strategies, and resource allocation...',
    actionItems: 3,
    date: 'Yesterday',
    participants: 4
  },
  {
    id: 2,
    title: 'Product Development Sync',
    summary: 'Reviewed feature roadmap, discussed technical challenges and timeline...',
    actionItems: 5,
    date: '2 days ago',
    participants: 6
  }
];

const recentEmails = [
  {
    id: 1,
    from: 'Sarah Chen',
    subject: 'Q4 Budget Proposal',
    preview: 'I\'ve attached the preliminary budget...',
    time: '2h ago',
    unread: true,
    priority: 'high'
  },
  {
    id: 2,
    from: 'Mike Johnson',
    subject: 'Client Meeting Notes',
    preview: 'Here are the key points from our discussion...',
    time: '4h ago',
    unread: false,
    priority: 'medium'
  },
  {
    id: 3,
    from: 'Lisa Wang',
    subject: 'Project Timeline Update',
    preview: 'The development phase is ahead of schedule...',
    time: '6h ago',
    unread: true,
    priority: 'low'
  },
  {
    id: 4,
    from: 'David Kim',
    subject: 'Team Building Event',
    preview: 'Let\'s plan our quarterly team outing...',
    time: '1d ago',
    unread: false,
    priority: 'low'
  },
  {
    id: 5,
    from: 'Emma Davis',
    subject: 'Contract Renewal',
    preview: 'The client wants to extend our agreement...',
    time: '2d ago',
    unread: true,
    priority: 'high'
  },
  {
    id: 6,
    from: 'Alex Rodriguez',
    subject: 'Technical Documentation',
    preview: 'I\'ve updated the API documentation...',
    time: '3d ago',
    unread: false,
    priority: 'medium'
  },
  {
    id: 7,
    from: 'Maria Garcia',
    subject: 'Performance Review',
    preview: 'Your quarterly review is scheduled...',
    time: '4d ago',
    unread: false,
    priority: 'high'
  },
  {
    id: 8,
    from: 'John Smith',
    subject: 'System Maintenance',
    preview: 'Scheduled maintenance window this weekend...',
    time: '5d ago',
    unread: false,
    priority: 'medium'
  }
];

const tasks = [
  {
    id: 1,
    title: 'Review Q3 performance metrics',
    priority: 'high',
    completed: false,
    dueTime: '9:00 AM'
  },
  {
    id: 2,
    title: 'Schedule follow-up with Willamette Co',
    priority: 'high',
    completed: false,
    dueTime: '2:00 PM'
  },
  {
    id: 3,
    title: 'Update team meeting agenda',
    priority: 'medium',
    completed: true,
    dueTime: '10:30 AM'
  },
  {
    id: 4,
    title: 'Verify conversion rules fixes',
    priority: 'low',
    completed: true,
    dueTime: '11:00 AM'
  }
];

const stats = [
  { title: 'Meetings This Week', value: '12', icon: Calendar, change: '+3 from last week' },
  { title: 'Emails Today', value: '12', icon: Mail, change: '3 unread, 2 high priority' },
  { title: 'Action Items Completed', value: '24', icon: CheckSquare2, change: '85% completion rate' },
  { title: 'Hours Saved', value: '8.5', icon: Clock, change: 'Through AI assistance' },
];

export const Dashboard = () => {
  const navigate = useNavigate();
  const [tasksState, setTasksState] = useState(tasks);

  const toggleTask = (taskId: number) => {
    setTasksState(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleAskNoteBuddy = () => {
    navigate('/assistant');
  };

  const handleViewFullSchedule = () => {
    navigate('/schedule');
  };

  const handleViewAllTasks = () => {
    navigate('/tasks');
  };

  const handleViewAllActivity = () => {
    navigate('/meetings');
  };

  const handleViewAllEmails = () => {
    navigate('/analytics');
  };

  const handleViewAnalytics = () => {
    navigate('/settings?tab=analytics');
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Welcome back!</h1>
          <p className="text-muted-foreground">Here's what's happening with your meetings and tasks today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8"
              >
                <MoreVertical className="w-4 h-4 mr-2" />
                More
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/schedule')}>
                <Calendar className="w-4 h-4 mr-2" />
                View Schedule
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/tasks')}>
                <CheckSquare2 className="w-4 h-4 mr-2" />
                Manage Tasks
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button 
            size="sm"
            className="bg-gradient-primary shadow-glow hover:shadow-glow-lg transition-all duration-200 hover:scale-105 h-8" 
            onClick={handleAskNoteBuddy}
          >
            Ask NoteBuddy
          </Button>
        </div>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gradient-card border border-gradient-primary/20 shadow-soft rounded-lg p-2 pb-4 hover:border-gradient-primary/40 transition-all duration-200 h-24 flex flex-col">
            <div className="flex items-center justify-end mb-0.5">
              <Badge variant="secondary" className="text-xs px-1 py-0.5 bg-gradient-to-r from-primary/20 to-primary/10 text-gradient-primary border border-gradient-primary/30">
                <TrendingUp className="w-2 h-2 mr-1" />
                {stat.change}
              </Badge>
            </div>
            <div className="space-y-0.5 flex-1 flex flex-col justify-start pt-1 pl-2">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Left Column - Schedule & Tasks */}
        <div className="xl:col-span-2 space-y-4">
          {/* Upcoming Meetings - Timeline Style */}
          <div className="relative">
            <Card className="bg-gradient-card border border-gradient-primary/20 shadow-soft hover:border-gradient-primary/40 transition-all duration-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">
                  <span>Today's Schedule</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="relative">
                  {/* Timeline line - stops before button */}
                  <div className="absolute left-4 top-4 w-0.5 bg-blue-500" style={{ height: 'calc(100% - 3rem)' }}></div>
                  
                  <div className="space-y-3">
                    {upcomingMeetings.map((meeting, index) => (
                      <div key={meeting.id} className="relative">
                        <div className="flex items-start space-x-3 group hover:bg-muted/30 rounded-lg p-2 -m-2 transition-colors">
                          <div className="flex-1 min-w-0 ml-8">
                            <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                              {meeting.title}
                            </h3>
                            <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{meeting.time}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="w-3 h-3" />
                                <span>{meeting.participants} people</span>
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0">
                            <Play className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full mt-2 border-dashed border-2 border-gradient-primary/40 text-gradient-primary hover:border-gradient-primary hover:shadow-glow hover:bg-transparent hover:!bg-transparent hover:bg-opacity-0 h-8 transition-all duration-200"
                    style={{ backgroundColor: 'transparent' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.background = 'linear-gradient(135deg, #02a0d1, #dc3dcc)';
                      e.currentTarget.style.webkitBackgroundClip = 'text';
                      e.currentTarget.style.webkitTextFillColor = 'transparent';
                      e.currentTarget.style.backgroundClip = 'text';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #02a0d1, #dc3dcc)';
                      e.currentTarget.style.webkitBackgroundClip = 'text';
                      e.currentTarget.style.webkitTextFillColor = 'transparent';
                      e.currentTarget.style.backgroundClip = 'text';
                    }}
                    onClick={handleViewFullSchedule}
                  >
                    View Full Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Today's Focus - Tasks */}
          <div className="relative">
            <Card className="bg-gradient-card border border-gradient-primary/20 shadow-soft hover:border-gradient-primary/40 transition-all duration-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">
                  <span>Today's Focus</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {tasksState.slice(0, 4).map((task, index) => (
                    <div key={task.id} className={`group relative p-3 rounded-xl border transition-all duration-200 hover:shadow-md ${
                      task.completed 
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                        : 'bg-white dark:bg-gray-800 border border-gradient-primary/20 hover:border-gradient-primary/40'
                    }`}>
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-0.5">
                          <Checkbox
                            checked={task.completed}
                            onCheckedChange={() => toggleTask(task.id)}
                            className="h-4 w-4"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className={`text-sm font-semibold ${
                              task.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                            }`}>
                              {task.title}
                            </h3>
                            <div className="flex items-center space-x-1">
                              <Flag className={`w-3 h-3 ${
                                task.priority === 'high' ? 'text-red-500' : 
                                task.priority === 'medium' ? 'text-yellow-500' : 'text-gray-400'
                              }`} />
                              <Badge 
                                variant={task.priority === 'high' ? 'destructive' : 'secondary'} 
                                className="text-xs px-1.5 py-0.5"
                              >
                                {task.priority}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{task.dueTime}</span>
                              </div>
                              {task.completed && (
                                <div className="flex items-center space-x-1 text-green-600">
                                  <CheckCircle className="w-3 h-3" />
                                  <span>Done</span>
                                </div>
                              )}
                            </div>
                            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0">
                              <ChevronRight className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full mt-2 border-dashed border-2 border-gradient-primary/40 text-gradient-primary hover:border-gradient-primary hover:shadow-glow hover:bg-transparent hover:!bg-transparent hover:bg-opacity-0 h-8 transition-all duration-200"
                  style={{ backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.background = 'linear-gradient(135deg, #02a0d1, #dc3dcc)';
                    e.currentTarget.style.webkitBackgroundClip = 'text';
                    e.currentTarget.style.webkitTextFillColor = 'transparent';
                    e.currentTarget.style.backgroundClip = 'text';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #02a0d1, #dc3dcc)';
                    e.currentTarget.style.webkitBackgroundClip = 'text';
                    e.currentTarget.style.webkitTextFillColor = 'transparent';
                    e.currentTarget.style.backgroundClip = 'text';
                  }}
                  onClick={() => navigate('/tasks')}
                >
                  Add New Task
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column - Quick Actions & Activity */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <Card className="bg-gradient-card border border-gradient-primary/20 shadow-soft hover:border-gradient-primary/40 transition-all duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 text-xs border-2 border-gradient-primary/40 text-gradient-primary hover:border-gradient-primary hover:shadow-glow hover:bg-transparent hover:!bg-transparent hover:bg-opacity-0 transition-all duration-200"
                  style={{ backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.background = 'linear-gradient(135deg, #02a0d1, #dc3dcc)';
                    e.currentTarget.style.webkitBackgroundClip = 'text';
                    e.currentTarget.style.webkitTextFillColor = 'transparent';
                    e.currentTarget.style.backgroundClip = 'text';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #02a0d1, #dc3dcc)';
                    e.currentTarget.style.webkitBackgroundClip = 'text';
                    e.currentTarget.style.webkitTextFillColor = 'transparent';
                    e.currentTarget.style.backgroundClip = 'text';
                  }}
                  onClick={() => navigate('/meetings')}
                >
                  <MessageSquare className="w-3 h-3 mr-1 text-gradient-primary" />
                  New Meeting
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 text-xs border-2 border-gradient-primary/40 text-gradient-primary hover:border-gradient-primary hover:shadow-glow hover:bg-transparent hover:!bg-transparent hover:bg-opacity-0 transition-all duration-200"
                  style={{ backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.background = 'linear-gradient(135deg, #02a0d1, #dc3dcc)';
                    e.currentTarget.style.webkitBackgroundClip = 'text';
                    e.currentTarget.style.webkitTextFillColor = 'transparent';
                    e.currentTarget.style.backgroundClip = 'text';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #02a0d1, #dc3dcc)';
                    e.currentTarget.style.webkitBackgroundClip = 'text';
                    e.currentTarget.style.webkitTextFillColor = 'transparent';
                    e.currentTarget.style.backgroundClip = 'text';
                  }}
                  onClick={() => navigate('/tasks')}
                >
                  <Plus className="w-3 h-3 mr-1 text-gradient-primary" />
                  Add Task
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 text-xs border-2 border-gradient-primary/40 text-gradient-primary hover:border-gradient-primary hover:shadow-glow hover:bg-transparent hover:!bg-transparent hover:bg-opacity-0 transition-all duration-200"
                  style={{ backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.background = 'linear-gradient(135deg, #02a0d1, #dc3dcc)';
                    e.currentTarget.style.webkitBackgroundClip = 'text';
                    e.currentTarget.style.webkitTextFillColor = 'transparent';
                    e.currentTarget.style.backgroundClip = 'text';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #02a0d1, #dc3dcc)';
                    e.currentTarget.style.webkitBackgroundClip = 'text';
                    e.currentTarget.style.webkitTextFillColor = 'transparent';
                    e.currentTarget.style.backgroundClip = 'text';
                  }}
                  onClick={() => navigate('/clients')}
                >
                  <Users className="w-3 h-3 mr-1 text-gradient-primary" />
                  Add Client
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 text-xs border-2 border-gradient-primary/40 text-gradient-primary hover:border-gradient-primary hover:shadow-glow hover:bg-transparent hover:!bg-transparent hover:bg-opacity-0 transition-all duration-200"
                  style={{ backgroundColor: 'transparent' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.background = 'linear-gradient(135deg, #02a0d1, #dc3dcc)';
                    e.currentTarget.style.webkitBackgroundClip = 'text';
                    e.currentTarget.style.webkitTextFillColor = 'transparent';
                    e.currentTarget.style.backgroundClip = 'text';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #02a0d1, #dc3dcc)';
                    e.currentTarget.style.webkitBackgroundClip = 'text';
                    e.currentTarget.style.webkitTextFillColor = 'transparent';
                    e.currentTarget.style.backgroundClip = 'text';
                  }}
                  onClick={handleViewAnalytics}
                >
                  <BarChart3 className="w-3 h-3 mr-1 text-gradient-primary" />
                  View Analytics
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-gradient-card border border-gradient-primary/20 shadow-soft hover:border-gradient-primary/40 transition-all duration-200">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm">
                  <span>Recent Activity</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {recentSummaries.map((summary, index) => (
                  <div key={summary.id} className="group relative p-3 rounded-lg border border-gradient-primary/20 hover:bg-gradient-to-r hover:from-muted/30 hover:to-muted/20 hover:border-gradient-primary/40 transition-all duration-200">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                          {summary.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                          {summary.summary}
                        </p>
                        <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <CheckSquare2 className="w-3 h-3" />
                            <span>{summary.actionItems} items</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-3 h-3" />
                            <span>{summary.participants} people</span>
                          </div>
                          <span>{summary.date}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0">
                        <ChevronRight className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="w-full mt-2 border-dashed border-2 border-gradient-primary/40 text-gradient-primary hover:border-gradient-primary hover:shadow-glow hover:bg-transparent hover:!bg-transparent hover:bg-opacity-0 h-8 transition-all duration-200"
                style={{ backgroundColor: 'transparent' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.background = 'linear-gradient(135deg, #02a0d1, #dc3dcc)';
                  e.currentTarget.style.webkitBackgroundClip = 'text';
                  e.currentTarget.style.webkitTextFillColor = 'transparent';
                  e.currentTarget.style.backgroundClip = 'text';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #02a0d1, #dc3dcc)';
                  e.currentTarget.style.webkitBackgroundClip = 'text';
                  e.currentTarget.style.webkitTextFillColor = 'transparent';
                  e.currentTarget.style.backgroundClip = 'text';
                }}
                onClick={handleViewAllActivity}
              >
                View All Activity
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Row - Recent Emails */}
      <Card className="bg-gradient-card border border-gradient-primary/20 shadow-soft hover:border-gradient-primary/40 transition-all duration-200">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-foreground">Recent Emails</span>
            </div>
            <Badge variant="secondary" className="text-xs px-2 py-1 bg-gradient-to-r from-primary/20 to-primary/10 text-gradient-primary border border-gradient-primary/30">
              3 unread
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {recentEmails.slice(0, 8).map((email) => (
              <div key={email.id} className="group relative p-3 rounded-lg border border-gradient-primary/20 hover:bg-gradient-to-r hover:from-muted/30 hover:to-muted/20 hover:border-gradient-primary/40 transition-all duration-200">
                <div className="flex items-start space-x-2">
                  <div className="flex-shrink-0">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">
                        {email.from.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1 mb-1">
                      <h4 className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                        {email.from}
                      </h4>
                      {email.unread && (
                        <div className="w-2 h-2 bg-gradient-primary rounded-full"></div>
                      )}
                    </div>
                    <p className="text-xs font-medium text-foreground mb-1 line-clamp-1">
                      {email.subject}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                      {email.preview}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{email.time}</span>
                      <Badge 
                        variant={email.priority === 'high' ? 'destructive' : 'secondary'} 
                        className="text-xs px-1.5 py-0.5"
                      >
                        {email.priority}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="w-full mt-3 border-dashed border-2 border-gradient-primary/40 text-gradient-primary hover:border-gradient-primary hover:shadow-glow hover:bg-transparent hover:!bg-transparent hover:bg-opacity-0 h-8 transition-all duration-200"
            style={{ backgroundColor: 'transparent' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.background = 'linear-gradient(135deg, #02a0d1, #dc3dcc)';
              e.currentTarget.style.webkitBackgroundClip = 'text';
              e.currentTarget.style.webkitTextFillColor = 'transparent';
              e.currentTarget.style.backgroundClip = 'text';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #02a0d1, #dc3dcc)';
              e.currentTarget.style.webkitBackgroundClip = 'text';
              e.currentTarget.style.webkitTextFillColor = 'transparent';
              e.currentTarget.style.backgroundClip = 'text';
            }}
            onClick={handleViewAllEmails}
          >
            View All Emails
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
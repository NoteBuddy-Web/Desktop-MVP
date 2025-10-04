import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Calendar,
  MessageSquare,
  CheckSquare2,
  Bot,
  Mail,
  Settings,
  Home,
  Clock,
  Users,
  Plug,
  HelpCircle,
  Building2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  { to: '/', icon: Home, label: 'Dashboard', exact: true },
  { to: '/meetings', icon: MessageSquare, label: 'Meeting Notes' },
  { to: '/schedule', icon: Calendar, label: 'Schedule' },
  { to: '/tasks', icon: CheckSquare2, label: 'Tasks' },
  { to: '/clients', icon: Building2, label: 'Clients' },
  { to: '/analytics', icon: Mail, label: 'Email' },
  { to: '/integrations', icon: Plug, label: 'Integrations' },
];

const quickActions = [
  { to: '/feedback', icon: HelpCircle, label: 'Feedback & Questions' },
  { to: '/contacts', icon: Users, label: 'Contacts' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export const Sidebar = () => {
  return (
    <div className="w-16 hover:w-64 h-full bg-card border-r border-border flex flex-col shadow-soft transition-all duration-1000 ease-in-out group">

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-2 transition-all duration-1500 ease-in-out">
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                cn(
                  "flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-elegant"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )
              }
              title={item.label}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-1000 whitespace-nowrap">
                {item.label}
              </span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* AI Assistant - Centered in middle of sidebar */}
      <div className="flex-1 flex items-center justify-center p-2 transition-all duration-1500 ease-in-out">
        <NavLink
          to="/assistant"
          className={({ isActive }) =>
            cn(
              "flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group relative w-full",
              isActive
                ? "bg-primary text-primary-foreground shadow-elegant"
                : "text-foreground hover:bg-accent/50"
            )
          }
          title="AI Assistant"
        >
          <Bot className="w-5 h-5 flex-shrink-0 text-foreground" />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-1000 whitespace-nowrap">
            AI Assistant
          </span>
        </NavLink>
      </div>

      {/* Quick Access - Moved to bottom */}
      <div className="p-2 border-t border-border transition-all duration-1500 ease-in-out">
        <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 whitespace-nowrap">
          Quick Access
        </p>
        <div className="space-y-1">
          {quickActions.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )
              }
              title={item.label}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-1000 whitespace-nowrap">
                {item.label}
              </span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};
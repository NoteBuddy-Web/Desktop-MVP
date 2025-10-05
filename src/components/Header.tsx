import React, { useState } from 'react';
import { Bell, Search, Plus, User, Moon, Sun, Menu, LogOut } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const isMobile = useIsMobile();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="h-16 bg-card border-b border-border px-4 md:px-6 flex items-center shadow-soft relative">
      {/* Left Section - Mobile Menu + Logo */}
      <div className="flex items-center space-x-3">
        {/* Mobile Menu Button */}
        {isMobile && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="mr-2"
          >
            <Menu className="w-5 h-5" />
          </Button>
        )}

        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
            <img  
                src="/Desktop-MVP/images/logo-black.png" 
                alt="NoteBuddy Logo" 
                className="h-8 w-auto" // adjust size as needed
                theme === 'dark' ? 'brightness-0 invert' : ''
              }`} 
            />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-foreground">NoteBuddy</h1>
            <p className="text-xs text-muted-foreground">AI Meeting Assistant</p>
          </div>
        </div>
      </div>

      {/* Right Section - Search and Actions */}
      <div className="flex items-center space-x-2 md:space-x-3 ml-auto">
        {/* Search */}
        <div className={`transition-all duration-300 ease-in-out ${
          isSearchExpanded ? 'w-64' : 'w-12'
        }`}>
          <div className="relative">
            <button
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 z-10 ${
                isSearchExpanded 
                  ? 'text-muted-foreground hover:text-foreground hover:bg-muted/50' 
                  : 'text-muted-foreground hover:text-foreground bg-muted/30 hover:bg-muted/50 shadow-soft'
              }`}
            >
              <Search className="w-4 h-4" />
            </button>
            <Input
              placeholder="Search meetings, tasks, or notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-12 bg-muted/50 border-0 focus-visible:ring-0 transition-all duration-300 ${
                isSearchExpanded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                '--tw-ring-shadow': '0 0 0 1px transparent'
              } as React.CSSProperties}
              onFocus={(e) => {
                e.target.style.boxShadow = '0 0 0 1px #02a0d1, 0 0 0 1px #dc3dcc';
                e.target.style.background = 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #02a0d1, #dc3dcc) border-box';
                e.target.style.border = '1px solid transparent';
                setIsSearchExpanded(true);
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = '';
                e.target.style.background = '';
                e.target.style.border = '';
                if (!searchQuery) {
                  setIsSearchExpanded(false);
                }
              }}
            />
          </div>
        </div>

        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
        </Button>

        <Button variant="ghost" size="sm" onClick={toggleTheme}>
          {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-lg">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-gradient-primary text-white">
                  <div className="text-sm font-bold" style={{ 
                    fontFamily: 'serif',
                    fontWeight: 'bold',
                    letterSpacing: '-0.5px',
                    lineHeight: '1'
                  }}>NB</div>
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user?.displayName || 'User'}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email || 'user@example.com'}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>Integrations</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut} className="text-red-600">
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  PlusCircle, 
  Settings, 
  LogOut, 
  Trophy, 
  Clock, 
  Target,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
    { name: 'Leads', icon: Users, href: '/leads' },
    { name: 'Add Lead', icon: PlusCircle, href: '/add-lead' },
    { name: 'Analytics', icon: BarChart3, href: '/analytics' },
    { name: 'Settings', icon: Settings, href: '/settings' },
  ];

  return (
    <aside className="w-64 bg-sidebar border-r flex flex-col h-full">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-primary text-primary-foreground p-2 rounded-lg">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">SME Lead Pro</h1>
            <p className="text-xs text-muted-foreground">Management System</p>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                )
              }
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t">
        <div className="bg-muted/30 p-4 rounded-xl mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-semibold">Current Goal</span>
          </div>
          <p className="text-sm font-bold">15 Deals this month</p>
          <div className="w-full bg-muted h-2 rounded-full mt-2">
            <div className="bg-orange-500 h-full w-[60%] rounded-full" />
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start text-muted-foreground hover:text-destructive transition-colors"
          onClick={onLogout}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
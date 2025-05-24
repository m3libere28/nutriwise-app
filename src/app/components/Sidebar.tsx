'use client';

import { LayoutDashboard, Users, MessageSquare, Calendar, Settings, Utensils } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
  id: string;
  badge?: string;
}

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const navigation: NavigationItem[] = [
    {
      name: 'Dashboard',
      href: '#',
      icon: LayoutDashboard,
      id: 'dashboard',
    },
    {
      name: 'Clients',
      href: '#',
      icon: Users,
      id: 'clients',
    },
    {
      name: 'Meal Planner',
      href: '#',
      icon: Utensils,
      id: 'meal-planner',
    },
    {
      name: 'Messages',
      href: '#',
      icon: MessageSquare,
      id: 'messages',
      badge: '4',
    },
    {
      name: 'Calendar',
      href: '#',
      icon: Calendar,
      id: 'calendar',
    },
    {
      name: 'Settings',
      href: '#',
      icon: Settings,
      id: 'settings',
    },
  ];

  return (
    <aside className="hidden md:block w-64 bg-white border-r min-h-screen">
      <nav className="p-4 space-y-2">
        {navigation.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 ${activeTab === item.id ? 'text-emerald-600 bg-emerald-50' : 'text-gray-600'}`}
          >
            <item.icon size={20} />
            <span>{item.name}</span>
            {item.badge && (
              <span className="ml-auto bg-emerald-100 text-emerald-600 text-xs font-medium px-2 py-1 rounded-full">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
}

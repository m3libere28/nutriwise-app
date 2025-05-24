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

interface MobileNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function MobileNav({ activeTab, onTabChange }: MobileNavProps) {
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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t px-2 py-2">
      <div className="flex justify-around">
        {navigation.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className="flex flex-col items-center gap-1"
          >
            <div
              className={`p-1.5 rounded-lg ${
                activeTab === item.id ? 'bg-emerald-50 text-emerald-600' : 'text-gray-500'
              }`}
            >
              <item.icon size={20} />
              {item.badge && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-xs">{item.name}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

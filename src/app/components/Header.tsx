'use client';

import { Heart, Bell, User, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuClick}
              className="p-2 hover:bg-gray-100 rounded-lg md:hidden"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2">
              <Heart size={24} className="text-emerald-500" />
              <span className="text-xl font-bold">NutriWise</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
              <User size={16} className="text-emerald-600" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

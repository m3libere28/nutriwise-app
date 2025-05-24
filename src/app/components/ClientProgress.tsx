'use client';

import { TrendingUp, Users } from 'lucide-react';

export function ClientProgress() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Client Progress Overview</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">This Month</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-emerald-50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-emerald-600 mb-1">
            <TrendingUp size={20} />
            <span className="text-sm font-medium">Success Rate</span>
          </div>
          <p className="text-2xl font-bold text-emerald-700">85%</p>
          <p className="text-xs text-emerald-600 mt-1">+5% from last month</p>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <Users size={20} />
            <span className="text-sm font-medium">Active Goals</span>
          </div>
          <p className="text-2xl font-bold text-blue-700">24</p>
          <p className="text-xs text-blue-600 mt-1">Across 12 clients</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Weight Goals</span>
            <span className="font-medium text-emerald-600">90%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '90%' }} />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Nutrition Plans</span>
            <span className="font-medium text-emerald-600">75%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '75%' }} />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Exercise Goals</span>
            <span className="font-medium text-emerald-600">85%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

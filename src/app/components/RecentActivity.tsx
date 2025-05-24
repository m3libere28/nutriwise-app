'use client';

import { Clock, ArrowRight } from 'lucide-react';

const activities = [
  {
    client: 'Sarah Johnson',
    action: 'Completed meal plan review',
    time: '2 hours ago',
  },
  {
    client: 'Mike Smith',
    action: 'Scheduled appointment',
    time: '4 hours ago',
  },
  {
    client: 'Emma Davis',
    action: 'Updated progress metrics',
    time: '6 hours ago',
  },
  {
    client: 'John Wilson',
    action: 'Sent new message',
    time: 'Yesterday',
  },
];

export function RecentActivity() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
        <button className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center gap-1">
          View all <ArrowRight size={16} />
        </button>
      </div>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="mt-1">
              <Clock size={16} className="text-gray-400" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{activity.client}</p>
              <p className="text-sm text-gray-500">{activity.action}</p>
              <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

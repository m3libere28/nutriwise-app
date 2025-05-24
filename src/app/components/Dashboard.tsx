'use client';

import { Users, Calendar, TrendingUp, Bell } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-50 rounded-lg">
              <Users className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Clients</p>
              <p className="text-2xl font-semibold text-gray-900">24</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Appointments Today</p>
              <p className="text-2xl font-semibold text-gray-900">8</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Success Rate</p>
              <p className="text-2xl font-semibold text-gray-900">92%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-50 rounded-lg">
              <Bell className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Notifications</p>
              <p className="text-2xl font-semibold text-gray-900">5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
        <div className="space-y-6">
          {[
            {
              title: 'New Client Registration',
              description: 'Emma Thompson signed up for a nutrition plan',
              time: '2 hours ago',
              type: 'client',
            },
            {
              title: 'Meal Plan Updated',
              description: 'Updated meal plan for John Davis',
              time: '4 hours ago',
              type: 'meal',
            },
            {
              title: 'Goal Achieved',
              description: 'Sarah Johnson reached her weight goal',
              time: '1 day ago',
              type: 'achievement',
            },
            {
              title: 'Appointment Scheduled',
              description: 'Follow-up session with Mike Smith',
              time: '1 day ago',
              type: 'appointment',
            },
          ].map((activity, index) => (
            <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50">
              <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500" />
              <div>
                <p className="font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-500">{activity.description}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 text-left rounded-lg border hover:border-emerald-500 hover:bg-emerald-50 transition-colors">
            <h3 className="font-medium text-gray-900">Add New Client</h3>
            <p className="text-sm text-gray-500 mt-1">Register a new client</p>
          </button>
          <button className="p-4 text-left rounded-lg border hover:border-emerald-500 hover:bg-emerald-50 transition-colors">
            <h3 className="font-medium text-gray-900">Schedule Session</h3>
            <p className="text-sm text-gray-500 mt-1">Book a consultation</p>
          </button>
          <button className="p-4 text-left rounded-lg border hover:border-emerald-500 hover:bg-emerald-50 transition-colors">
            <h3 className="font-medium text-gray-900">Create Meal Plan</h3>
            <p className="text-sm text-gray-500 mt-1">Design a new meal plan</p>
          </button>
          <button className="p-4 text-left rounded-lg border hover:border-emerald-500 hover:bg-emerald-50 transition-colors">
            <h3 className="font-medium text-gray-900">Generate Report</h3>
            <p className="text-sm text-gray-500 mt-1">View client progress</p>
          </button>
        </div>
      </div>
    </div>
  );
}

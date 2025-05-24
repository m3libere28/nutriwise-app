'use client';

import { useState } from 'react';
import { X, Edit2, Calendar, MessageSquare, ChevronRight, Activity, Apple, Weight, Target } from 'lucide-react';

import { Client } from '../types';

interface ClientDetailsProps {
  client: Client;
}

export function ClientDetails({ client }: ClientDetailsProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const metrics = client.metrics || {
    weight: 70,
    height: 170,
    bmi: 24.2,
    targetWeight: 65
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-end">
      <div className="bg-white h-full w-full max-w-2xl overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 border-b">
          <div className="flex items-center justify-between p-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{client.name}</h2>
              <p className="text-sm text-gray-500">{client.email}</p>
            </div>
            <button
              className="p-2 text-gray-400 hover:text-gray-500 rounded-lg"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          <div className="flex gap-4 px-6 pb-4">
            {['overview', 'nutrition', 'progress', 'appointments'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={activeTab === tab ? 'px-3 py-2 text-sm rounded-lg bg-emerald-50 text-emerald-600 font-medium' : 'px-3 py-2 text-sm rounded-lg text-gray-600 hover:bg-gray-50'}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-emerald-600 mb-1">
                    <Weight size={20} />
                    <span className="text-sm font-medium">Current Weight</span>
                  </div>
                  <p className="text-2xl font-bold text-emerald-700">{metrics.weight} kg</p>
                </div>
                
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-blue-600 mb-1">
                    <Target size={20} />
                    <span className="text-sm font-medium">Target Weight</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-700">{metrics.targetWeight} kg</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border p-4">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-50 rounded-lg">
                        <Calendar size={20} className="text-emerald-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">Schedule Appointment</p>
                        <p className="text-sm text-gray-500">Next available: Tomorrow</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                  </button>

                  <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-50 rounded-lg">
                        <MessageSquare size={20} className="text-emerald-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">Send Message</p>
                        <p className="text-sm text-gray-500">Last contact: 2 days ago</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                  </button>

                  <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-50 rounded-lg">
                        <Apple size={20} className="text-emerald-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">Update Meal Plan</p>
                        <p className="text-sm text-gray-500">Last updated: 1 week ago</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Notes & Goals</h3>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Edit2 size={16} className="text-gray-500" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Goals</p>
                    <div className="flex flex-wrap gap-2">
                      {client.goals?.map((goal) => (
                        <span key={goal} className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-full text-sm">
                          {goal}
                        </span>
                      )) || <span className="text-sm text-gray-600">No goals set</span>}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Dietary Restrictions</p>
                    <div className="flex flex-wrap gap-2">
                      {client.dietaryRestrictions?.map((restriction) => (
                        <span key={restriction} className="px-2 py-1 bg-red-50 text-red-600 rounded-full text-sm">
                          {restriction}
                        </span>
                      )) || <span className="text-sm text-gray-600">None specified</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border p-4">
                <h3 className="text-lg font-semibold mb-4">Progress Overview</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Weight Goal Progress</span>
                      <span className="font-medium text-emerald-600">80%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '80%' }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Nutrition Plan Adherence</span>
                      <span className="font-medium text-emerald-600">90%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '90%' }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Exercise Goals</span>
                      <span className="font-medium text-emerald-600">75%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '75%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

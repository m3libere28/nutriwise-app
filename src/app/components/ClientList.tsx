'use client';

import { useState } from 'react';
import { Search, Plus, Filter, MoreHorizontal } from 'lucide-react';
import { Client } from '../types';

interface ClientListProps {
  onSelectClient: (client: Client) => void;
}

const mockClients: Client[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '555-0123',
    plan: 'Weight Management',
    status: 'Active',
    lastVisit: '2 days ago',
    goals: ['Weight Loss', 'Muscle Gain'],
    dietaryRestrictions: ['Gluten-Free'],
    metrics: {
      weight: 68,
      height: 165,
      bmi: 25,
      targetWeight: 62
    }
  },
  {
    id: '2',
    name: 'Mike Smith',
    email: 'mike.smith@example.com',
    phone: '555-0124',
    plan: 'Sports Nutrition',
    status: 'Active',
    lastVisit: 'Today',
    goals: ['Performance', 'Recovery'],
    dietaryRestrictions: [],
    metrics: {
      weight: 75,
      height: 180,
      bmi: 23.1,
      targetWeight: 78
    }
  },
  {
    id: '3',
    name: 'Emma Davis',
    email: 'emma.d@example.com',
    plan: 'Wellness Coaching',
    status: 'Pending',
    lastVisit: '1 week ago',
    goals: ['General Health', 'Energy'],
    dietaryRestrictions: ['Dairy-Free', 'Vegetarian'],
    metrics: {
      weight: 62,
      height: 170,
      bmi: 21.5,
      targetWeight: 62
    }
  },
  {
    id: '4',
    name: 'John Wilson',
    email: 'john.w@example.com',
    phone: '555-0125',
    plan: 'Medical Nutrition',
    status: 'Inactive',
    lastVisit: '1 month ago',
    goals: ['Weight Management', 'Blood Sugar Control'],
    dietaryRestrictions: ['Low-Sodium'],
    metrics: {
      weight: 88,
      height: 175,
      bmi: 28.7,
      targetWeight: 80
    }
  },
];

export function ClientList({ onSelectClient }: ClientListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || client.status.toLowerCase() === selectedStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-100 text-emerald-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Inactive':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search clients..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Filter size={20} className="text-gray-500" />
            </button>
          </div>
          <button
            onClick={() => {}}
            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"
          >
            <Plus size={20} />
            <span>Add Client</span>
          </button>
        </div>

        <div className="flex gap-2 mt-4">
          {['all', 'active', 'pending', 'inactive'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={selectedStatus === status ? 'px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-700' : 'px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600 hover:bg-gray-200'}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Name</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Email</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Plan</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Last Visit</th>
              <th className="py-4 px-6"></th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <tr
                key={client.id}
                className="border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => onSelectClient(client)}
              >
                <td className="py-4 px-6">
                  <div className="font-medium text-gray-900">{client.name}</div>
                </td>
                <td className="py-4 px-6 text-gray-500">{client.email}</td>
                <td className="py-4 px-6 text-gray-500">{client.plan}</td>
                <td className="py-4 px-6">
                  <span className={'inline-block px-2 py-1 rounded-full text-xs ' + getStatusColor(client.status)}>
                    {client.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-500">{client.lastVisit}</td>
                <td className="py-4 px-6">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <MoreHorizontal size={20} className="text-gray-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

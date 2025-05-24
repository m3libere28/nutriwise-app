'use client';

import { Calendar, Clock } from 'lucide-react';

const appointments = [
  {
    client: 'Sarah Johnson',
    type: 'Initial Consultation',
    date: 'Today',
    time: '2:00 PM',
  },
  {
    client: 'Mike Smith',
    type: 'Follow-up Session',
    date: 'Today',
    time: '4:30 PM',
  },
  {
    client: 'Emma Davis',
    type: 'Progress Review',
    date: 'Tomorrow',
    time: '10:00 AM',
  },
];

export function UpcomingAppointments() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Upcoming Appointments</h3>
      <div className="space-y-4">
        {appointments.map((appointment, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="bg-emerald-50 rounded-lg p-3">
              <Calendar size={20} className="text-emerald-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{appointment.client}</p>
              <p className="text-sm text-gray-500">{appointment.type}</p>
              <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                <Clock size={12} />
                <span>{appointment.date} at {appointment.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import axios from 'axios';

interface ScheduleItem {
  _id: string;
  title: string;
  schedule: Array<{
    day: string;
    sessions: Array<{
      subject: string;
      startTime: string;
      endTime: string;
      duration: number;
    }>;
  }>;
}

const Schedule: React.FC = () => {
  const { user } = useAuthStore();
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get(`/api/schedule/${user?.id}`);
        setSchedules(response.data);
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    };

    fetchSchedules();
  }, [user]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">📅 Study Schedule</h1>

      <div className="grid grid-cols-1 gap-6">
        {schedules.map((schedule) => (
          <div key={schedule._id} className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">{schedule.title}</h2>
            <div className="space-y-4">
              {schedule.schedule.map((day, idx) => (
                <div key={idx} className="border-l-4 border-indigo-600 pl-4">
                  <h3 className="font-bold text-lg">{day.day}</h3>
                  <div className="mt-2 space-y-2">
                    {day.sessions.map((session, sidx) => (
                      <div key={sidx} className="bg-indigo-50 p-3 rounded">
                        <p className="font-semibold">{session.subject}</p>
                        <p className="text-sm text-gray-600">
                          {session.startTime} - {session.endTime} ({session.duration} min)
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
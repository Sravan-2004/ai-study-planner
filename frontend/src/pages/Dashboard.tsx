import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import axios from 'axios';

interface DashboardStats {
  tasksToday: number;
  hoursStudied: number;
  currentStreak: number;
  nextTask: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<DashboardStats>({
    tasksToday: 0,
    hoursStudied: 0,
    currentStreak: 0,
    nextTask: '',
  });

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        const response = await axios.get(`/api/progress/${user?.id}`);
        setStats({
          tasksToday: response.data[0]?.tasksCompleted || 0,
          hoursStudied: response.data[0]?.totalStudyHours || 0,
          currentStreak: 5, // Calculate from data
          nextTask: 'Mathematics - Algebra',
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, [user]);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome, {user?.name}! 👋</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Tasks Today" value={stats.tasksToday} icon="✅" />
        <StatCard title="Hours Studied" value={stats.hoursStudied} icon="⏱️" />
        <StatCard title="Current Streak" value={stats.currentStreak} icon="🔥" />
        <StatCard title="Next Task" value={stats.nextTask} icon="🎯" />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700">
            📅 View Schedule
          </button>
          <button className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
            ➕ Add Task
          </button>
          <button className="bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700">
            💬 Chat with AI
          </button>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string | number; icon: string }> = ({
  title,
  value,
  icon,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
        <span className="text-4xl">{icon}</span>
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

interface ProgressData {
  subject: string;
  totalStudyHours: number;
  tasksCompleted: number;
  averageScore: number;
}

const Progress: React.FC = () => {
  const { user } = useAuthStore();
  const [progressData, setProgressData] = useState<ProgressData[]>([]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get(`/api/progress/${user?.id}`);
        setProgressData(response.data);
      } catch (error) {
        console.error('Error fetching progress:', error);
      }
    };

    fetchProgress();
  }, [user]);

  const chartData = progressData.map((p) => ({
    name: p.subject,
    hours: p.totalStudyHours,
    tasks: p.tasksCompleted,
    score: p.averageScore,
  }));

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">📊 Progress Tracking</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Study Hours by Subject</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Average Scores by Subject</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#4f46e5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {progressData.map((progress) => (
          <div key={progress.subject} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold mb-3">{progress.subject}</h3>
            <div className="space-y-2">
              <p>📚 <strong>{progress.totalStudyHours}</strong> hours studied</p>
              <p>✅ <strong>{progress.tasksCompleted}</strong> tasks completed</p>
              <p>⭐ <strong>{progress.averageScore.toFixed(1)}%</strong> average score</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Progress;
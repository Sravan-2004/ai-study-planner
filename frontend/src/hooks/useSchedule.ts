import { useState, useCallback } from 'react';
import { scheduleService } from '../services/scheduleService';
import { useAuthStore } from '../store/authStore';

export const useSchedule = () => {
  const { user } = useAuthStore();
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSchedules = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const response = await scheduleService.getSchedules(user.id);
      setSchedules(response.data);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const createSchedule = async (scheduleData: any) => {
    try {
      const response = await scheduleService.createSchedule({
        userId: user?.id,
        ...scheduleData,
      });
      setSchedules([...schedules, response.data]);
      return response.data;
    } catch (error) {
      console.error('Error creating schedule:', error);
      throw error;
    }
  };

  return { schedules, loading, fetchSchedules, createSchedule };
};
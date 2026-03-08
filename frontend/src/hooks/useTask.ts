import { useState, useCallback } from 'react';
import { taskService } from '../services/taskService';
import { useAuthStore } from '../store/authStore';

export const useTask = () => {
  const { user } = useAuthStore();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const response = await taskService.getTasks(user.id);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const addTask = async (taskData: any) => {
    try {
      const response = await taskService.createTask({
        userId: user?.id,
        ...taskData,
      });
      setTasks([...tasks, response.data]);
      return response.data;
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  };

  const updateTask = async (id: string, data: any) => {
    try {
      const response = await taskService.updateTask(id, data);
      setTasks(tasks.map((t: any) => (t._id === id ? response.data : t)));
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter((t: any) => t._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  };

  return { tasks, loading, fetchTasks, addTask, updateTask, deleteTask };
};
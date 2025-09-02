import { create } from 'zustand';

const useTaskStore = create((set) => ({
  tasks: [],
  loading: false,
  error: null,
  setTasks: (tasks) => set({ tasks }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  fetchTasks: async (userId) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`/api/tasks?userId=${encodeURIComponent(userId)}`);
      const data = await res.json();
      const tasks = data || [];
      set({ tasks, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  addTask: async (task) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });
      if (!res.ok) throw new Error('Failed to add task');
      set({ loading: false });
      return true;
    } catch (err) {
      set({ error: err.message, loading: false });
      return false;
    }
  },

  updateTask: async (task) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch('/api/tasks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });
      if (!res.ok) throw new Error('Failed to update task');
      set({ loading: false });
      return true;
    } catch (err) {
      set({ error: err.message, loading: false });
      return false;
    }
  },

  deleteTask: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch('/api/tasks', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (!res.ok) throw new Error('Failed to delete task');
      set({ loading: false });
      return true;
    } catch (err) {
      set({ error: err.message, loading: false });
      return false;
    }
  },
}));

export default useTaskStore;

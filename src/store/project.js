import { create } from 'zustand';

const useProjectStore = create((set) => ({
  projects: [],
  loading: false,
  error: null,
  setProjects: (projects) => set({ projects }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  fetchProjects: async (userId) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`/api/projects?userId=${encodeURIComponent(userId)}`);
      const data = await res.json();
      set({ projects: data || [], loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  addProject: async (project) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
      });
      if (!res.ok) throw new Error('Failed to add project');
      set({ loading: false });
      return true;
    } catch (err) {
      set({ error: err.message, loading: false });
      return false;
    }
  },
}));

export default useProjectStore;

import { create } from 'zustand';

const getInitialUser = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('user');
    if (stored) return JSON.parse(stored);
  }
  return null;
};

const useAuthStore = create((set) => ({
  user: getInitialUser(),
  loading: false,
  error: null,
  setUser: (user) => {
    set({ user });
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  },
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  logout: () => {
    set({ user: null });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  },
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      set({ user: data, loading: false });
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(data));
      }
      return data;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },
  register: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      set({ user: data, loading: false });
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(data));
      }
      return data;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },
}));

export default useAuthStore;

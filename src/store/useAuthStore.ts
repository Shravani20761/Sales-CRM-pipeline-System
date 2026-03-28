import { create } from 'zustand';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'sales';
  avatar?: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

// Mock users for demo
const mockUsers: Record<string, { password: string; user: AuthUser }> = {
  'admin@crm.com': { password: 'admin123', user: { id: '1', name: 'Admin User', email: 'admin@crm.com', role: 'admin' } },
  'manager@crm.com': { password: 'manager123', user: { id: '2', name: 'Manager User', email: 'manager@crm.com', role: 'manager' } },
  'sales@crm.com': { password: 'sales123', user: { id: '3', name: 'Sales Rep', email: 'sales@crm.com', role: 'sales' } },
};

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token'),
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const mockUser = mockUsers[email];
    if (mockUser && mockUser.password === password) {
      const token = 'mock-jwt-token-' + Date.now();
      localStorage.setItem('user', JSON.stringify(mockUser.user));
      localStorage.setItem('token', token);
      set({ user: mockUser.user, token, isLoading: false });
    } else {
      set({ error: 'Invalid email or password', isLoading: false });
      throw new Error('Invalid email or password');
    }
  },

  register: async (name: string, email: string, password: string, role: string) => {
    set({ isLoading: true, error: null });
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    if (mockUsers[email]) {
      set({ error: 'Email already exists', isLoading: false });
      throw new Error('Email already exists');
    }
    
    const newUser: AuthUser = {
      id: Date.now().toString(),
      name,
      email,
      role: role as AuthUser['role'],
    };
    
    const token = 'mock-jwt-token-' + Date.now();
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('token', token);
    set({ user: newUser, token, isLoading: false });
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },

  clearError: () => set({ error: null }),
}));

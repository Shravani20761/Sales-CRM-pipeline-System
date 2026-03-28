import { create } from 'zustand';

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  value: number;
  aiScore: number;
  status: 'lead' | 'warm' | 'negotiation' | 'closed';
  assignedTo: string;
  createdBy: string;
  createdAt: string;
}

export interface Deal {
  id: string;
  title: string;
  client: string;
  value: number;
  status: 'lead' | 'warm' | 'negotiation' | 'closed';
  assignedTo: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'sales';
  avatar?: string;
  status: 'active' | 'inactive';
}

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface Activity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note';
  description: string;
  leadId?: string;
  createdAt: string;
}

interface AppState {
  leads: Lead[];
  deals: Deal[];
  users: User[];
  notifications: Notification[];
  tasks: Task[];
  activities: Activity[];
  darkMode: boolean;
  sidebarOpen: boolean;
  
  setLeads: (leads: Lead[]) => void;
  addLead: (lead: Lead) => void;
  updateLead: (id: string, lead: Partial<Lead>) => void;
  assignLead: (id: string, userId: string) => Promise<void>;
  
  setDeals: (deals: Deal[]) => void;
  addDeal: (deal: Deal) => void;
  updateDeal: (id: string, deal: Partial<Deal>) => void;
  moveDeal: (id: string, status: Deal['status']) => void;
  assignDeal: (id: string, userId: string) => Promise<void>;
  
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  
  addNotification: (notification: { message: string; type: 'info' | 'success' | 'warning' | 'error' }) => void;
  markNotificationRead: (id: string) => void;
  
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  toggleTask: (id: string) => void;
  
  setActivities: (activities: Activity[]) => void;
  addActivity: (activity: Omit<Activity, 'id' | 'createdAt'>) => void;
  
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  leads: [],
  deals: [],
  users: [],
  notifications: [],
  tasks: [],
  activities: [],
  darkMode: false,
  sidebarOpen: true,

  setLeads: (leads) => set({ leads }),
  addLead: (lead) => set((state) => ({ leads: [...state.leads, lead] })),
  updateLead: (id, lead) => set((state) => ({
    leads: state.leads.map((l) => (l.id === id ? { ...l, ...lead } : l)),
  })),
  assignLead: async (id: string, userId: string) => {
    // Optimistic update
    const prevLead = get().leads.find(l => l.id === id);
    if (!prevLead) return;
    
    set((state) => ({
      leads: state.leads.map((l) => (l.id === id ? { ...l, assignedTo: userId } : l)),
    }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      // In real app: await axios.post('/api/leads/assign', { itemId: id, assignedToUserId: userId })
    } catch (error) {
      // Rollback on error
      set((state) => ({
        leads: state.leads.map((l) => (l.id === id ? prevLead : l)),
      }));
      throw error;
    }
  },

  setDeals: (deals) => set({ deals }),
  addDeal: (deal) => set((state) => ({ deals: [...state.deals, deal] })),
  updateDeal: (id, deal) => set((state) => ({
    deals: state.deals.map((d) => (d.id === id ? { ...d, ...deal } : d)),
  })),
  moveDeal: (id, status) => set((state) => ({
    deals: state.deals.map((d) => (d.id === id ? { ...d, status } : d)),
  })),
  assignDeal: async (id: string, userId: string) => {
    // Optimistic update
    const prevDeal = get().deals.find(d => d.id === id);
    if (!prevDeal) return;
    
    set((state) => ({
      deals: state.deals.map((d) => (d.id === id ? { ...d, assignedTo: userId } : d)),
    }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      // In real app: await axios.post('/api/deals/assign', { itemId: id, assignedToUserId: userId })
    } catch (error) {
      // Rollback on error
      set((state) => ({
        deals: state.deals.map((d) => (d.id === id ? prevDeal : d)),
      }));
      throw error;
    }
  },

  setUsers: (users) => set({ users }),
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  updateUser: (id, user) => set((state) => ({
    users: state.users.map((u) => (u.id === id ? { ...u, ...user } : u)),
  })),
  deleteUser: (id) => set((state) => ({
    users: state.users.filter((u) => u.id !== id),
  })),

  addNotification: (notification) => set((state) => ({
    notifications: [
      { ...notification, id: Date.now().toString(), createdAt: new Date().toISOString(), read: false },
      ...state.notifications,
    ],
  })),
  markNotificationRead: (id) => set((state) => ({
    notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
  })),

  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  toggleTask: (id) => set((state) => ({
    tasks: state.tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
  })),

  setActivities: (activities) => set({ activities }),
  addActivity: (activity) => set((state) => ({
    activities: [
      { ...activity, id: Date.now().toString(), createdAt: new Date().toISOString() },
      ...state.activities,
    ],
  })),

  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));

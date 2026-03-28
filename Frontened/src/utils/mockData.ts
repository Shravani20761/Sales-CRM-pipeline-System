import { Lead, Deal, User, Task, Activity, Notification } from '../store/useAppStore';

export const mockLeads: Lead[] = [
  { id: '1', name: 'John Smith', email: 'john@acme.com', company: 'Acme Corp', value: 50000, aiScore: 85, status: 'warm', assignedTo: '3', createdBy: '3', createdAt: '2024-01-15' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@tech.io', company: 'TechStart', value: 75000, aiScore: 92, status: 'negotiation', assignedTo: '3', createdBy: '3', createdAt: '2024-01-18' },
  { id: '3', name: 'Mike Wilson', email: 'mike@global.com', company: 'Global Inc', value: 30000, aiScore: 45, status: 'lead', assignedTo: '3', createdBy: '1', createdAt: '2024-01-20' },
  { id: '4', name: 'Emily Davis', email: 'emily@innovate.co', company: 'Innovate Co', value: 120000, aiScore: 78, status: 'warm', assignedTo: '4', createdBy: '2', createdAt: '2024-01-22' },
  { id: '5', name: 'Chris Brown', email: 'chris@enterprise.com', company: 'Enterprise Ltd', value: 95000, aiScore: 65, status: 'lead', assignedTo: '3', createdBy: '3', createdAt: '2024-01-25' },
];

export const mockDeals: Deal[] = [
  { id: '1', title: 'Enterprise Software License', client: 'Acme Corp', value: 50000, status: 'negotiation', assignedTo: '3', priority: 'high', createdAt: '2024-01-10' },
  { id: '2', title: 'Annual Support Contract', client: 'TechStart', value: 25000, status: 'warm', assignedTo: '3', priority: 'medium', createdAt: '2024-01-12' },
  { id: '3', title: 'CRM Implementation', client: 'Global Inc', value: 75000, status: 'lead', assignedTo: '3', priority: 'high', createdAt: '2024-01-15' },
  { id: '4', title: 'Data Analytics Package', client: 'Innovate Co', value: 40000, status: 'closed', assignedTo: '3', priority: 'low', createdAt: '2024-01-08' },
  { id: '5', title: 'Cloud Migration', client: 'Enterprise Ltd', value: 100000, status: 'warm', assignedTo: '3', priority: 'high', createdAt: '2024-01-20' },
  { id: '6', title: 'Security Audit', client: 'SafeBank', value: 35000, status: 'lead', assignedTo: '2', priority: 'medium', createdAt: '2024-01-22' },
  { id: '7', title: 'Training Program', client: 'EduTech', value: 15000, status: 'negotiation', assignedTo: '2', priority: 'low', createdAt: '2024-01-18' },
];

export const mockUsers: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@crm.com', role: 'admin', status: 'active' },
  { id: '2', name: 'Manager User', email: 'manager@crm.com', role: 'manager', status: 'active' },
  { id: '3', name: 'Sales Rep', email: 'sales@crm.com', role: 'sales', status: 'active' },
  { id: '4', name: 'Alice Cooper', email: 'alice@crm.com', role: 'sales', status: 'active' },
  { id: '5', name: 'Bob Martin', email: 'bob@crm.com', role: 'sales', status: 'inactive' },
];

export const mockTasks: Task[] = [
  { id: '1', title: 'Follow up with Acme Corp', description: 'Call to discuss proposal', dueDate: '2024-02-01', completed: false, priority: 'high' },
  { id: '2', title: 'Send contract to TechStart', description: 'Email the signed contract', dueDate: '2024-02-03', completed: false, priority: 'medium' },
  { id: '3', title: 'Prepare demo for Global Inc', description: 'Set up demo environment', dueDate: '2024-02-05', completed: true, priority: 'high' },
  { id: '4', title: 'Update CRM records', description: 'Add recent interactions', dueDate: '2024-02-02', completed: false, priority: 'low' },
];

export const mockActivities: Activity[] = [
  { id: '1', type: 'call', description: 'Called John Smith about proposal', leadId: '1', createdAt: '2024-01-28T10:30:00Z' },
  { id: '2', type: 'email', description: 'Sent pricing details to Sarah', leadId: '2', createdAt: '2024-01-27T14:15:00Z' },
  { id: '3', type: 'meeting', description: 'Demo meeting with Global Inc', leadId: '3', createdAt: '2024-01-26T09:00:00Z' },
  { id: '4', type: 'note', description: 'Client interested in premium plan', leadId: '4', createdAt: '2024-01-25T16:45:00Z' },
  { id: '5', type: 'call', description: 'Follow-up call with Mike', leadId: '5', createdAt: '2024-01-24T11:00:00Z' },
];

export const mockNotifications: Notification[] = [
  { id: '1', message: 'New lead assigned: John Smith', type: 'info', read: false, createdAt: '2024-01-28T10:00:00Z' },
  { id: '2', message: 'Deal closed: Data Analytics Package', type: 'success', read: false, createdAt: '2024-01-27T15:30:00Z' },
  { id: '3', message: 'Task due tomorrow: Follow up with Acme', type: 'warning', read: true, createdAt: '2024-01-26T09:00:00Z' },
];

export const getAIScoreColor = (score: number) => {
  if (score >= 70) return { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', ring: 'ring-green-500' };
  if (score >= 40) return { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', ring: 'ring-yellow-500' };
  return { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', ring: 'ring-red-500' };
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'lead': return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    case 'warm': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    case 'negotiation': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'closed': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
  }
};

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'text-red-500';
    case 'medium': return 'text-yellow-500';
    case 'low': return 'text-green-500';
    default: return 'text-gray-500';
  }
};

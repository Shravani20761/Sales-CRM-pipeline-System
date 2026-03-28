import { motion } from 'framer-motion';
import { Target, TrendingUp, CheckSquare, Clock, Phone, Mail, Calendar, AlertCircle } from 'lucide-react';
import { Card, StatCard, Badge, AIScoreBadge, Button } from '../../components/Shared';
import { useAppStore } from '../../store/useAppStore';
import { mockLeads, mockTasks, mockActivities } from '../../utils/mockData';
import { useState } from 'react';

export default function SalesDashboard() {
  const { leads, setLeads, tasks, setTasks, toggleTask } = useAppStore();
  
  useState(() => {
    if (leads.length === 0) setLeads(mockLeads);
    if (tasks.length === 0) setTasks(mockTasks);
  });

  const myLeads = leads.filter((l) => l.assignedTo === '3');
  const pendingTasks = tasks.filter((t) => !t.completed);
  const highScoreLeads = myLeads.filter((l) => l.aiScore >= 70);

  const stats = [
    { title: 'My Leads', value: myLeads.length.toString(), change: '+5 this week', icon: <Target className="w-6 h-6" />, trend: 'up' as const },
    { title: 'Pipeline Value', value: `$${(myLeads.reduce((sum, l) => sum + l.value, 0) / 1000).toFixed(0)}K`, change: '+12%', icon: <TrendingUp className="w-6 h-6" />, trend: 'up' as const },
    { title: 'Tasks Due', value: pendingTasks.length.toString(), change: '2 urgent', icon: <CheckSquare className="w-6 h-6" />, trend: 'neutral' as const },
    { title: 'Hot Leads', value: highScoreLeads.length.toString(), change: 'AI Score > 70', icon: <AlertCircle className="w-6 h-6" />, trend: 'up' as const },
  ];

  const activityIcons = {
    call: Phone,
    email: Mail,
    meeting: Calendar,
    note: AlertCircle,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sales Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">Your leads, tasks, and performance overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* AI Score Widget */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top AI Scored Leads</h3>
          <div className="space-y-4">
            {myLeads
              .sort((a, b) => b.aiScore - a.aiScore)
              .slice(0, 4)
              .map((lead, index) => (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{lead.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{lead.company}</p>
                  </div>
                  <AIScoreBadge score={lead.aiScore} showLabel={false} />
                </motion.div>
              ))}
          </div>
        </Card>

        {/* Tasks */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tasks & Reminders</h3>
            <Badge variant="warning">{pendingTasks.length} pending</Badge>
          </div>
          <div className="space-y-3">
            {tasks.slice(0, 5).map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-start gap-3 p-3 rounded-lg ${task.completed ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-slate-700/50'}`}
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300 dark:border-slate-600 hover:border-blue-500'
                  }`}
                >
                  {task.completed && <CheckSquare className="w-3 h-3 text-white" />}
                </button>
                <div className="flex-1">
                  <p className={`font-medium ${task.completed ? 'text-gray-500 dark:text-gray-400 line-through' : 'text-gray-900 dark:text-white'}`}>
                    {task.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <Badge variant={task.priority === 'high' ? 'danger' : task.priority === 'medium' ? 'warning' : 'info'}>
                  {task.priority}
                </Badge>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Activity Feed */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {mockActivities.slice(0, 5).map((activity, index) => {
              const Icon = activityIcons[activity.type];
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">{activity.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(activity.createdAt).toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

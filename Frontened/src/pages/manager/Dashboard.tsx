import { motion } from 'framer-motion';
import { Users, Target, TrendingUp, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Card, StatCard, Badge, Button } from '../../components/Shared';
import { mockDeals, mockUsers } from '../../utils/mockData';

export default function ManagerDashboard() {
  const teamMembers = mockUsers.filter((u) => u.role === 'sales');
  const pendingApprovals = mockDeals.filter((d) => d.status === 'negotiation').slice(0, 3);

  const stats = [
    { title: 'Team Members', value: '8', change: '+2', icon: <Users className="w-6 h-6" />, trend: 'up' as const },
    { title: 'Team Leads', value: '156', change: '+23%', icon: <Target className="w-6 h-6" />, trend: 'up' as const },
    { title: 'Pending Approvals', value: '5', change: 'Urgent', icon: <Clock className="w-6 h-6" />, trend: 'neutral' as const },
    { title: 'Team Revenue', value: '$450K', change: '+18%', icon: <TrendingUp className="w-6 h-6" />, trend: 'up' as const },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manager Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">Team overview and pending actions</p>
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

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pending Approvals */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pending Approvals</h3>
            <Badge variant="warning">{pendingApprovals.length} pending</Badge>
          </div>
          <div className="space-y-4">
            {pendingApprovals.map((deal, index) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{deal.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{deal.client} • ${deal.value.toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Reject</Button>
                  <Button size="sm">Approve</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Team Overview */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Team Overview</h3>
          <div className="space-y-4">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-slate-700/30 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{member.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{member.email}</p>
                  </div>
                </div>
                <Badge variant={member.status === 'active' ? 'success' : 'default'}>{member.status}</Badge>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Team Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'Deal closed', detail: 'Alice closed Data Analytics Package - $40,000', time: '2 hours ago', icon: CheckCircle, color: 'text-green-500' },
            { action: 'New lead assigned', detail: 'Bob received new lead: Enterprise Ltd', time: '4 hours ago', icon: Target, color: 'text-blue-500' },
            { action: 'Approval requested', detail: 'Charlie requested approval for Cloud Migration deal', time: '5 hours ago', icon: AlertCircle, color: 'text-yellow-500' },
          ].map((activity, index) => {
            const Icon = activity.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-slate-700/30 rounded-lg transition-colors"
              >
                <Icon className={`w-5 h-5 ${activity.color} mt-0.5`} />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{activity.action}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{activity.detail}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

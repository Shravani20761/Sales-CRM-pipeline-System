import { motion } from 'framer-motion';
import { Users, Target, DollarSign, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';
import { Card, StatCard } from '../../components/Shared';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const revenueData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue',
      data: [65000, 78000, 92000, 85000, 110000, 125000],
      borderColor: 'rgb(37, 99, 235)',
      backgroundColor: 'rgba(37, 99, 235, 0.1)',
      fill: true,
      tension: 0.4,
    },
  ],
};

const pipelineData = {
  labels: ['Lead', 'Warm', 'Negotiation', 'Closed'],
  datasets: [
    {
      data: [45, 28, 18, 12],
      backgroundColor: [
        'rgba(107, 114, 128, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(234, 179, 8, 0.8)',
        'rgba(34, 197, 94, 0.8)',
      ],
      borderWidth: 0,
    },
  ],
};

const teamData = {
  labels: ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'],
  datasets: [
    {
      label: 'Deals Closed',
      data: [12, 8, 15, 10, 6],
      backgroundColor: 'rgba(37, 99, 235, 0.8)',
      borderRadius: 8,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: { grid: { display: false } },
    y: { grid: { color: 'rgba(0,0,0,0.05)' } },
  },
};

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Leads', value: '2,847', change: '+12.5%', icon: <Target className="w-6 h-6" />, trend: 'up' as const },
    { title: 'Active Deals', value: '423', change: '+8.2%', icon: <TrendingUp className="w-6 h-6" />, trend: 'up' as const },
    { title: 'Revenue', value: '$1.2M', change: '+23.1%', icon: <DollarSign className="w-6 h-6" />, trend: 'up' as const },
    { title: 'Team Members', value: '24', change: '+2', icon: <Users className="w-6 h-6" />, trend: 'up' as const },
  ];

  const recentDeals = [
    { client: 'Acme Corp', value: '$50,000', status: 'Closed', rep: 'Alice' },
    { client: 'TechStart', value: '$75,000', status: 'Negotiation', rep: 'Bob' },
    { client: 'Global Inc', value: '$30,000', status: 'Warm', rep: 'Charlie' },
    { client: 'Innovate Co', value: '$120,000', status: 'Lead', rep: 'Diana' },
    { client: 'Enterprise Ltd', value: '$95,000', status: 'Warm', rep: 'Eve' },
  ];

  const statusColors: Record<string, string> = {
    Closed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    Negotiation: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    Warm: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    Lead: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">Overview of your sales organization</p>
      </div>

      {/* Stats Grid */}
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

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue Overview</h3>
          <div className="h-[300px]">
            <Line data={revenueData} options={chartOptions} />
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Pipeline Status</h3>
          <div className="h-[300px] flex items-center justify-center">
            <Doughnut
              data={pipelineData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'bottom' },
                },
              }}
            />
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Team Performance</h3>
          <div className="h-[250px]">
            <Bar data={teamData} options={chartOptions} />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Deals</h3>
          <div className="space-y-3">
            {recentDeals.map((deal, index) => (
              <motion.div
                key={deal.client}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{deal.client}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Rep: {deal.rep}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">{deal.value}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${statusColors[deal.status]}`}>
                    {deal.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

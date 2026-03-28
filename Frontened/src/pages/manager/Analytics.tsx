import { motion } from 'framer-motion';
import { Users, Target, TrendingUp, Award } from 'lucide-react';
import { Card, StatCard } from '../../components/Shared';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

const teamPerformance = {
  labels: ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'],
  datasets: [
    { label: 'Revenue', data: [85000, 62000, 94000, 71000, 48000], backgroundColor: 'rgba(37, 99, 235, 0.8)', borderRadius: 8 },
  ],
};

const weeklyTrend = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    { label: 'Leads', data: [12, 19, 15, 25, 22, 8, 5], borderColor: 'rgb(59, 130, 246)', backgroundColor: 'rgba(59, 130, 246, 0.1)', fill: true, tension: 0.4 },
  ],
};

const dealStatus = {
  labels: ['Lead', 'Warm', 'Negotiation', 'Closed'],
  datasets: [{ data: [35, 28, 15, 22], backgroundColor: ['rgba(107, 114, 128, 0.8)', 'rgba(59, 130, 246, 0.8)', 'rgba(234, 179, 8, 0.8)', 'rgba(34, 197, 94, 0.8)'] }],
};

export default function ManagerAnalytics() {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: { grid: { display: false } }, y: { grid: { color: 'rgba(0,0,0,0.05)' } } },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Team Analytics</h1>
        <p className="text-gray-500 dark:text-gray-400">Performance metrics for your team</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Team Size" value="8" change="+2 this month" icon={<Users className="w-6 h-6" />} trend="up" />
        <StatCard title="Total Leads" value="247" change="+18%" icon={<Target className="w-6 h-6" />} trend="up" />
        <StatCard title="Conversion Rate" value="34%" change="+5%" icon={<TrendingUp className="w-6 h-6" />} trend="up" />
        <StatCard title="Top Performer" value="Charlie" change="94K revenue" icon={<Award className="w-6 h-6" />} trend="up" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Team Performance</h3>
          <div className="h-[300px]">
            <Bar data={teamPerformance} options={chartOptions} />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Lead Trend</h3>
          <div className="h-[300px]">
            <Line data={weeklyTrend} options={chartOptions} />
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Team Leaderboard</h3>
        <div className="space-y-4">
          {[
            { name: 'Charlie', revenue: 94000, deals: 15, rank: 1 },
            { name: 'Alice', revenue: 85000, deals: 12, rank: 2 },
            { name: 'Diana', revenue: 71000, deals: 10, rank: 3 },
            { name: 'Bob', revenue: 62000, deals: 8, rank: 4 },
            { name: 'Eve', revenue: 48000, deals: 6, rank: 5 },
          ].map((rep, index) => (
            <motion.div
              key={rep.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  rep.rank === 1 ? 'bg-yellow-100 text-yellow-700' : rep.rank === 2 ? 'bg-gray-200 text-gray-700' : rep.rank === 3 ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-500'
                }`}>
                  #{rep.rank}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{rep.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{rep.deals} deals closed</p>
                </div>
              </div>
              <p className="font-semibold text-blue-600 dark:text-blue-400">${(rep.revenue / 1000).toFixed(0)}K</p>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}

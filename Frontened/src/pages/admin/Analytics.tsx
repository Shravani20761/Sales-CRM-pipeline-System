import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Target, Users, Clock } from 'lucide-react';
import { Card, StatCard } from '../../components/Shared';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
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

const conversionData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Conversion Rate',
      data: [24, 28, 32, 29, 35, 38],
      borderColor: 'rgb(34, 197, 94)',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      fill: true,
      tension: 0.4,
    },
  ],
};

const sourceData = {
  labels: ['Website', 'Referral', 'Social', 'Email', 'Cold Call'],
  datasets: [
    {
      data: [35, 25, 20, 12, 8],
      backgroundColor: [
        'rgba(37, 99, 235, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(234, 179, 8, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(107, 114, 128, 0.8)',
      ],
    },
  ],
};

const monthlyDeals = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    { label: 'New', data: [45, 52, 38, 65, 48, 72], backgroundColor: 'rgba(59, 130, 246, 0.8)' },
    { label: 'Closed', data: [12, 18, 15, 22, 19, 28], backgroundColor: 'rgba(34, 197, 94, 0.8)' },
  ],
};

export default function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <p className="text-gray-500 dark:text-gray-400">System-wide insights and performance metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Conversion Rate" value="38%" change="+5.2%" icon={<TrendingUp className="w-6 h-6" />} trend="up" />
        <StatCard title="Avg Deal Size" value="$67K" change="+12%" icon={<DollarSign className="w-6 h-6" />} trend="up" />
        <StatCard title="Sales Cycle" value="24 days" change="-3 days" icon={<Clock className="w-6 h-6" />} trend="up" />
        <StatCard title="Win Rate" value="42%" change="+8%" icon={<Target className="w-6 h-6" />} trend="up" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Conversion Trend</h3>
          <div className="h-[300px]">
            <Line
              data={conversionData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  x: { grid: { display: false } },
                  y: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { callback: (v) => v + '%' } },
                },
              }}
            />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Lead Sources</h3>
          <div className="h-[300px] flex items-center justify-center">
            <Doughnut
              data={sourceData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'right' } },
              }}
            />
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Deals</h3>
        <div className="h-[300px]">
          <Bar
            data={monthlyDeals}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { position: 'top' } },
              scales: {
                x: { grid: { display: false } },
                y: { grid: { color: 'rgba(0,0,0,0.05)' } },
              },
            }}
          />
        </div>
      </Card>
    </div>
  );
}

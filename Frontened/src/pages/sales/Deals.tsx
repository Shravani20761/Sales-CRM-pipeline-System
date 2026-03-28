import { useState } from 'react';
import { motion } from 'framer-motion';
import KanbanBoard from '../../components/KanbanBoard';
import { useAppStore } from '../../store/useAppStore';
import { useAuthStore } from '../../store/useAuthStore';
import { mockDeals } from '../../utils/mockData';
import { DollarSign, Target, TrendingUp } from 'lucide-react';
import { Card } from '../../components/Shared';

export default function SalesDeals() {
  const { deals, setDeals, moveDeal } = useAppStore();
  const { user } = useAuthStore();

  useState(() => {
    if (deals.length === 0) setDeals(mockDeals);
  });

  const myDeals = deals.filter((d) => d.assignedTo === user?.id);
  const totalValue = myDeals.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Deals</h1>
        <p className="text-gray-500 dark:text-gray-400">Drag and drop to update deal status</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Deals', value: myDeals.length, icon: Target, color: 'text-blue-600' },
          { label: 'Pipeline Value', value: `$${(totalValue / 1000).toFixed(0)}K`, icon: DollarSign, color: 'text-green-600' },
          { label: 'In Negotiation', value: myDeals.filter((d) => d.status === 'negotiation').length, icon: TrendingUp, color: 'text-yellow-600' },
          { label: 'Closed Won', value: myDeals.filter((d) => d.status === 'closed').length, icon: Target, color: 'text-purple-600' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Card className="p-6">
        <KanbanBoard deals={myDeals} onMoveDeal={moveDeal} />
      </Card>
    </div>
  );
}

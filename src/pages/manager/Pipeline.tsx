import { useState } from 'react';
import { motion } from 'framer-motion';
import KanbanBoard from '../../components/KanbanBoard';
import { useAppStore, Deal } from '../../store/useAppStore';
import { mockDeals } from '../../utils/mockData';
import { Filter, Users } from 'lucide-react';
import { Button, Select, Card } from '../../components/Shared';

export default function ManagerPipeline() {
  const { deals, setDeals, moveDeal } = useAppStore();
  const [filterRep, setFilterRep] = useState('all');

  useState(() => {
    if (deals.length === 0) setDeals(mockDeals);
  });

  const filteredDeals = filterRep === 'all' ? deals : deals.filter((d) => d.assignedTo === filterRep);
  const totalValue = filteredDeals.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Team Pipeline</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage and track all team deals</p>
        </div>
        <div className="flex items-center gap-3">
          <Select
            value={filterRep}
            onChange={setFilterRep}
            options={[
              { value: 'all', label: 'All Reps' },
              { value: '3', label: 'Sales Rep' },
              { value: '4', label: 'Alice Cooper' },
              { value: '5', label: 'Bob Martin' },
            ]}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Deals', value: filteredDeals.length, color: 'text-blue-600' },
          { label: 'Pipeline Value', value: `$${(totalValue / 1000).toFixed(0)}K`, color: 'text-green-600' },
          { label: 'In Negotiation', value: filteredDeals.filter((d) => d.status === 'negotiation').length, color: 'text-yellow-600' },
          { label: 'Closed', value: filteredDeals.filter((d) => d.status === 'closed').length, color: 'text-purple-600' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="p-6">
        <KanbanBoard deals={filteredDeals} onMoveDeal={moveDeal} />
      </Card>
    </div>
  );
}

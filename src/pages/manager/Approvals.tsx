import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Eye, Clock, DollarSign, User } from 'lucide-react';
import { Card, Button, Badge, Modal } from '../../components/Shared';
import { useAppStore, Deal } from '../../store/useAppStore';
import { mockDeals } from '../../utils/mockData';

export default function ManagerApprovals() {
  const { deals, setDeals, updateDeal, addNotification } = useAppStore();
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  useState(() => {
    if (deals.length === 0) setDeals(mockDeals);
  });

  const pendingDeals = deals.filter((d) => d.status === 'negotiation');

  const handleApprove = (deal: Deal) => {
    updateDeal(deal.id, { status: 'closed' });
    addNotification({ message: `Deal approved: ${deal.title}`, type: 'success' });
  };

  const handleReject = (deal: Deal) => {
    updateDeal(deal.id, { status: 'warm' });
    addNotification({ message: `Deal rejected: ${deal.title}`, type: 'warning' });
  };

  const priorityColors: Record<string, 'danger' | 'warning' | 'info'> = {
    high: 'danger',
    medium: 'warning',
    low: 'info',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Deal Approvals</h1>
        <p className="text-gray-500 dark:text-gray-400">Review and approve pending deals</p>
      </div>

      {pendingDeals.length === 0 ? (
        <Card className="p-12 text-center">
          <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">All caught up!</h3>
          <p className="text-gray-500 dark:text-gray-400">No pending approvals at the moment.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {pendingDeals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{deal.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {deal.client}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          ${deal.value.toLocaleString()}
                        </span>
                        <Badge variant={priorityColors[deal.priority]}>{deal.priority}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" onClick={() => setSelectedDeal(deal)}>
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" onClick={() => handleReject(deal)}>
                      <X className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                    <Button onClick={() => handleApprove(deal)}>
                      <Check className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <Modal
        isOpen={!!selectedDeal}
        onClose={() => setSelectedDeal(null)}
        title="Deal Details"
      >
        {selectedDeal && (
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400">Deal Title</label>
              <p className="font-medium text-gray-900 dark:text-white">{selectedDeal.title}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400">Client</label>
              <p className="font-medium text-gray-900 dark:text-white">{selectedDeal.client}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400">Value</label>
              <p className="font-medium text-gray-900 dark:text-white">${selectedDeal.value.toLocaleString()}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400">Priority</label>
              <Badge variant={priorityColors[selectedDeal.priority]}>{selectedDeal.priority}</Badge>
            </div>
            <div>
              <label className="text-sm text-gray-500 dark:text-gray-400">Created</label>
              <p className="font-medium text-gray-900 dark:text-white">{new Date(selectedDeal.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => { handleReject(selectedDeal); setSelectedDeal(null); }} className="flex-1">
                <X className="w-4 h-4 mr-2" />
                Reject
              </Button>
              <Button onClick={() => { handleApprove(selectedDeal); setSelectedDeal(null); }} className="flex-1">
                <Check className="w-4 h-4 mr-2" />
                Approve
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

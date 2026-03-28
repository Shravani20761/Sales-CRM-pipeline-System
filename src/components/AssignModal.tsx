import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, CheckCircle2 } from 'lucide-react';
import { Modal, Button, Badge } from './Shared';
import { useAppStore } from '../store/useAppStore';
import { useAuthStore } from '../store/useAuthStore';

interface AssignModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemId: string;
  itemType: 'lead' | 'deal';
  currentAssignee?: string;
  onAssigned?: () => void;
}

export default function AssignModal({ isOpen, onClose, itemId, itemType, currentAssignee, onAssigned }: AssignModalProps) {
  const { users, assignLead, assignDeal, addNotification } = useAppStore();
  const { user } = useAuthStore();
  const [selectedUserId, setSelectedUserId] = useState(currentAssignee || '');
  const [isAssigning, setIsAssigning] = useState(false);

  // Filter users based on role - Admin sees all sales users, Manager sees their team
  const availableUsers = users.filter((u) => {
    if (u.role !== 'sales' || u.status !== 'active') return false;
    // In real app, manager would see only their team members
    // For now, all managers see all sales users
    return true;
  });

  const handleAssign = async () => {
    if (!selectedUserId) return;

    setIsAssigning(true);
    try {
      if (itemType === 'lead') {
        await assignLead(itemId, selectedUserId);
      } else {
        await assignDeal(itemId, selectedUserId);
      }

      const assignedUser = users.find((u) => u.id === selectedUserId);
      addNotification({
        message: `${itemType === 'lead' ? 'Lead' : 'Deal'} assigned to ${assignedUser?.name} successfully!`,
        type: 'success',
      });

      onAssigned?.();
      onClose();
    } catch (error) {
      addNotification({
        message: 'Failed to assign. Please try again.',
        type: 'error',
      });
    } finally {
      setIsAssigning(false);
    }
  };

  const handleUnassign = async () => {
    setIsAssigning(true);
    try {
      if (itemType === 'lead') {
        await assignLead(itemId, '');
      } else {
        await assignDeal(itemId, '');
      }

      addNotification({
        message: `${itemType === 'lead' ? 'Lead' : 'Deal'} unassigned successfully!`,
        type: 'info',
      });

      onAssigned?.();
      onClose();
    } catch (error) {
      addNotification({
        message: 'Failed to unassign. Please try again.',
        type: 'error',
      });
    } finally {
      setIsAssigning(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Assign ${itemType === 'lead' ? 'Lead' : 'Deal'}`}>
      <div className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Select a sales representative to assign this {itemType} to. They will be able to view and manage it from their dashboard.
        </p>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {availableUsers.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <User className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No active sales representatives found</p>
            </div>
          ) : (
            availableUsers.map((salesUser) => (
              <motion.button
                key={salesUser.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setSelectedUserId(salesUser.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                  selectedUserId === salesUser.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500 bg-white dark:bg-slate-800'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {salesUser.name.charAt(0)}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900 dark:text-white">{salesUser.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{salesUser.email}</p>
                </div>
                {selectedUserId === salesUser.id && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  </motion.div>
                )}
              </motion.button>
            ))
          )}
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-slate-700">
          {currentAssignee && (
            <Button variant="outline" onClick={handleUnassign} disabled={isAssigning} className="flex-1">
              Unassign
            </Button>
          )}
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isAssigning}
            className={currentAssignee ? '' : 'flex-1'}
          >
            Cancel
          </Button>
          <Button onClick={handleAssign} disabled={!selectedUserId || isAssigning || selectedUserId === currentAssignee} isLoading={isAssigning} className="flex-1">
            {isAssigning ? 'Assigning...' : 'Assign'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

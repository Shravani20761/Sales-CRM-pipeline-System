import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Calendar, FileText, Plus, Filter } from 'lucide-react';
import { Card, Button, Badge, Modal, Input, Select } from '../../components/Shared';
import { useAppStore, Activity as ActivityType } from '../../store/useAppStore';
import { mockActivities } from '../../utils/mockData';

export default function SalesActivity() {
  const { activities, setActivities, addActivity } = useAppStore();
  const [filterType, setFilterType] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ type: 'call' as ActivityType['type'], description: '', leadId: '' });

  useState(() => {
    if (activities.length === 0) setActivities(mockActivities);
  });

  const filteredActivities = filterType === 'all' ? activities : activities.filter((a) => a.type === filterType);

  const activityIcons = {
    call: Phone,
    email: Mail,
    meeting: Calendar,
    note: FileText,
  };

  const activityColors = {
    call: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    email: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    meeting: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    note: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
  };

  const handleCreate = () => {
    addActivity({ type: formData.type, description: formData.description, leadId: formData.leadId || undefined });
    setShowModal(false);
    setFormData({ type: 'call', description: '', leadId: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Activity Log</h1>
          <p className="text-gray-500 dark:text-gray-400">Track your calls, emails, and meetings</p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Log Activity
        </Button>
      </div>

      <div className="flex gap-4">
        {['all', 'call', 'email', 'meeting', 'note'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterType === type
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-600'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <Card className="divide-y divide-gray-200 dark:divide-slate-700">
        {filteredActivities.map((activity, index) => {
          const Icon = activityIcons[activity.type];
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors"
            >
              <div className={`p-3 rounded-xl ${activityColors[activity.type]}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">{activity.description}</p>
                <div className="flex items-center gap-3 mt-1">
                  <Badge variant="default">{activity.type}</Badge>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(activity.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
        {filteredActivities.length === 0 && (
          <div className="p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No activities logged</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Start tracking your sales activities</p>
            <Button onClick={() => setShowModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Log Activity
            </Button>
          </div>
        )}
      </Card>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Log Activity">
        <div className="space-y-4">
          <Select
            label="Activity Type"
            value={formData.type}
            onChange={(v) => setFormData({ ...formData, type: v as ActivityType['type'] })}
            options={[
              { value: 'call', label: 'Phone Call' },
              { value: 'email', label: 'Email' },
              { value: 'meeting', label: 'Meeting' },
              { value: 'note', label: 'Note' },
            ]}
          />
          <Input label="Description" value={formData.description} onChange={(v) => setFormData({ ...formData, description: v })} />
          <Input label="Lead ID (optional)" value={formData.leadId} onChange={(v) => setFormData({ ...formData, leadId: v })} />
          <div className="flex gap-3 pt-4">
            <Button variant="secondary" onClick={() => setShowModal(false)} className="flex-1">Cancel</Button>
            <Button onClick={handleCreate} className="flex-1">Log Activity</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

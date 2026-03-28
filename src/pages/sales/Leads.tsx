import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Target, Phone, Mail, Building, DollarSign } from 'lucide-react';
import { Card, Button, Input, Modal, Select, AIScoreBadge } from '../../components/Shared';
import { useAppStore, Lead } from '../../store/useAppStore';
import { mockLeads, getStatusColor } from '../../utils/mockData';

import { useAuthStore } from '../../store/useAuthStore';

export default function SalesLeads() {
  const { leads, setLeads, addLead, users, setUsers } = useAppStore();
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', value: '', status: 'lead' as Lead['status']
  });

  useState(() => {
    if (leads.length === 0) setLeads(mockLeads);
    if (users.length === 0) setUsers(require('../../utils/mockData').mockUsers);
  });

  const myLeads = leads.filter((l) => l.assignedTo === user?.id);
  const filteredLeads = myLeads
    .filter((l) => filterStatus === 'all' || l.status === filterStatus)
    .filter((l) => l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.company.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleCreateLead = () => {
    if (!user) return;
    
    const newLead: Lead = {
      id: Date.now().toString(),
      ...formData,
      value: Number(formData.value),
      aiScore: Math.floor(Math.random() * 60) + 40,
      assignedTo: user.id,
      createdBy: user.id,
      createdAt: new Date().toISOString().split('T')[0],
    };
    addLead(newLead);
    setShowModal(false);
    setFormData({ name: '', email: '', company: '', value: '', status: 'lead' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Leads</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage and track your leads</p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Lead
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search leads..."
            value={searchQuery}
            onChange={setSearchQuery}
            icon={<Search className="w-5 h-5" />}
          />
        </div>
        <Select
          value={filterStatus}
          onChange={setFilterStatus}
          options={[
            { value: 'all', label: 'All Status' },
            { value: 'lead', label: 'Lead' },
            { value: 'warm', label: 'Warm' },
            { value: 'negotiation', label: 'Negotiation' },
            { value: 'closed', label: 'Closed' },
          ]}
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLeads.map((lead, index) => (
          <motion.div
            key={lead.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="p-5 hover:shadow-lg transition-shadow" hover>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{lead.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Building className="w-3 h-3" />
                    {lead.company}
                  </p>
                </div>
                <AIScoreBadge score={lead.aiScore} showLabel={false} />
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {lead.email}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  ${lead.value.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(lead.status)}`}>
                    {lead.status}
                  </span>
                  {lead.createdBy !== lead.assignedTo && (
                    <span className="text-xs text-gray-400 dark:text-slate-500">
                      • Created by {users.find(u => u.id === lead.createdBy)?.name || 'Unknown'}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredLeads.length === 0 && (
        <Card className="p-12 text-center">
          <Target className="w-16 h-16 text-gray-300 dark:text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No leads yet 🚀</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Create your first lead to get started</p>
          <Button onClick={() => setShowModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Lead
          </Button>
        </Card>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create New Lead">
        <div className="space-y-4">
          <Input label="Name" value={formData.name} onChange={(v) => setFormData({ ...formData, name: v })} />
          <Input label="Email" type="email" value={formData.email} onChange={(v) => setFormData({ ...formData, email: v })} />
          <Input label="Company" value={formData.company} onChange={(v) => setFormData({ ...formData, company: v })} />
          <Input label="Value ($)" type="number" value={formData.value} onChange={(v) => setFormData({ ...formData, value: v })} />
          <Select
            label="Status"
            value={formData.status}
            onChange={(v) => setFormData({ ...formData, status: v as Lead['status'] })}
            options={[
              { value: 'lead', label: 'Lead' },
              { value: 'warm', label: 'Warm' },
              { value: 'negotiation', label: 'Negotiation' },
            ]}
          />
          <div className="flex gap-3 pt-4">
            <Button variant="secondary" onClick={() => setShowModal(false)} className="flex-1">Cancel</Button>
            <Button onClick={handleCreateLead} className="flex-1">Create Lead</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

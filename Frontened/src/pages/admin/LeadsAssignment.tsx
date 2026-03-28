import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, UserPlus, AlertCircle, CheckCircle, User as UserIcon } from 'lucide-react';
import { Card, Button, Input, Badge, Select } from '../../components/Shared';
import AssignModal from '../../components/AssignModal';
import { useAppStore, Lead } from '../../store/useAppStore';
import { mockLeads, mockUsers, getStatusColor } from '../../utils/mockData';

export default function AdminLeadsAssignment() {
  const { leads, setLeads, users, setUsers } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterAssignment, setFilterAssignment] = useState('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);

  useEffect(() => {
    if (leads.length === 0) setLeads(mockLeads);
    if (users.length === 0) setUsers(mockUsers);
  }, [leads.length, users.length, setLeads, setUsers]);

  const getAssignedUser = (userId: string) => users.find((u) => u.id === userId);

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
    const matchesAssignment =
      filterAssignment === 'all' ||
      (filterAssignment === 'unassigned' && !lead.assignedTo) ||
      (filterAssignment === 'assigned' && lead.assignedTo);
    return matchesSearch && matchesStatus && matchesAssignment;
  });

  const unassignedCount = leads.filter((l) => !l.assignedTo).length;
  const assignedCount = leads.filter((l) => l.assignedTo).length;

  const handleAssignClick = (lead: Lead) => {
    setSelectedLead(lead);
    setShowAssignModal(true);
  };

  const totalValue = filteredLeads.reduce((sum, l) => sum + l.value, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Lead Assignment</h1>
          <p className="text-gray-500 dark:text-gray-400">Assign leads to sales representatives</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Leads</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{leads.length}</p>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Unassigned</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-amber-600">{unassignedCount}</p>
              <AlertCircle className="w-5 h-5 text-amber-500" />
            </div>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Assigned</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-green-600">{assignedCount}</p>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Value</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">${(totalValue / 1000).toFixed(0)}K</p>
          </Card>
        </motion.div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input placeholder="Search leads..." value={searchQuery} onChange={setSearchQuery} icon={<Search className="w-5 h-5" />} />
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
          <Select
            value={filterAssignment}
            onChange={setFilterAssignment}
            options={[
              { value: 'all', label: 'All Leads' },
              { value: 'unassigned', label: 'Unassigned Only' },
              { value: 'assigned', label: 'Assigned Only' },
            ]}
          />
        </div>
      </Card>

      {/* Leads Table */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Lead</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Value</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Created By</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">AI Score</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Assigned To</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead, index) => {
                const assignedUser = lead.assignedTo ? getAssignedUser(lead.assignedTo) : null;
                const createdUser = getAssignedUser(lead.createdBy);
                return (
                  <motion.tr
                    key={lead.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="border-b border-gray-100 dark:border-slate-700/50 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{lead.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{lead.company}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getStatusColor(lead.status)}`}>{lead.status}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-gray-900 dark:text-white">${lead.value.toLocaleString()}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {createdUser?.name || 'Unknown'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className={`inline-flex items-center gap-1 text-sm font-medium ${lead.aiScore >= 70 ? 'text-green-600' : lead.aiScore >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>
                        <div className={`w-2 h-2 rounded-full ${lead.aiScore >= 70 ? 'bg-green-500' : lead.aiScore >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                        {lead.aiScore}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {assignedUser ? (
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
                            {assignedUser.name.charAt(0)}
                          </div>
                          <span className="text-sm text-gray-900 dark:text-white">{assignedUser.name}</span>
                        </div>
                      ) : (
                        <Badge variant="warning" className="flex items-center gap-1 w-fit">
                          <AlertCircle className="w-3 h-3" />
                          Unassigned
                        </Badge>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Button variant={assignedUser ? 'ghost' : 'primary'} size="sm" onClick={() => handleAssignClick(lead)}>
                        <UserPlus className="w-4 h-4 mr-1.5" />
                        {assignedUser ? 'Reassign' : 'Assign'}
                      </Button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>

          {filteredLeads.length === 0 && (
            <div className="text-center py-12">
              <UserIcon className="w-16 h-16 text-gray-300 dark:text-slate-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No leads found</p>
            </div>
          )}
        </div>
      </Card>

      {selectedLead && (
        <AssignModal
          isOpen={showAssignModal}
          onClose={() => {
            setShowAssignModal(false);
            setSelectedLead(null);
          }}
          itemId={selectedLead.id}
          itemType="lead"
          currentAssignee={selectedLead.assignedTo}
        />
      )}
    </div>
  );
}

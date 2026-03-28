import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, UserPlus, AlertCircle, CheckCircle, Users, Target } from 'lucide-react';
import { Card, Button, Input, Badge, Select } from '../../components/Shared';
import AssignModal from '../../components/AssignModal';
import { useAppStore, Lead } from '../../store/useAppStore';
import { mockLeads, mockUsers, getStatusColor } from '../../utils/mockData';

export default function ManagerLeadsAssignment() {
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

  // In a real app, managers would only see leads from their team
  // For demo, showing all leads
  const teamLeads = leads;

  const filteredLeads = teamLeads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
    const matchesAssignment =
      filterAssignment === 'all' ||
      (filterAssignment === 'unassigned' && !lead.assignedTo) ||
      (filterAssignment === 'assigned' && lead.assignedTo);
    return matchesSearch && matchesStatus && matchesAssignment;
  });

  const unassignedCount = teamLeads.filter((l) => !l.assignedTo).length;
  const myTeamCount = users.filter((u) => u.role === 'sales' && u.status === 'active').length;

  const handleAssignClick = (lead: Lead) => {
    setSelectedLead(lead);
    setShowAssignModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Assign Team Leads</h1>
          <p className="text-gray-500 dark:text-gray-400">Distribute leads to your sales team</p>
        </div>
      </div>

      {/* Team Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Team Leads</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{teamLeads.length}</p>
              </div>
              <Target className="w-8 h-8 text-blue-500" />
            </div>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Need Assignment</p>
                <p className="text-2xl font-bold text-amber-600">{unassignedCount}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-amber-500" />
            </div>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Active Reps</p>
                <p className="text-2xl font-bold text-green-600">{myTeamCount}</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </Card>
        </motion.div>
      </div>

      {unassignedCount > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="p-4 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-amber-900 dark:text-amber-100">Action Required</p>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                  You have {unassignedCount} unassigned lead{unassignedCount !== 1 ? 's' : ''} that need to be assigned to your team members.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input placeholder="Search leads..." value={searchQuery} onChange={setSearchQuery} icon={<Search className="w-5 h-5" />} />
          <Select
            value={filterStatus}
            onChange={setFilterStatus}
            options={[
              { value: 'all', label: 'All Status' },
              { value: 'lead', label: 'New Leads' },
              { value: 'warm', label: 'Warm' },
              { value: 'negotiation', label: 'In Negotiation' },
            ]}
          />
          <Select
            value={filterAssignment}
            onChange={setFilterAssignment}
            options={[
              { value: 'all', label: 'All Leads' },
              { value: 'unassigned', label: 'Unassigned First' },
              { value: 'assigned', label: 'Already Assigned' },
            ]}
          />
        </div>
      </Card>

      {/* Leads Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLeads
          .sort((a, b) => {
            if (filterAssignment === 'unassigned') {
              return (!a.assignedTo ? 0 : 1) - (!b.assignedTo ? 0 : 1);
            }
            return 0;
          })
          .map((lead, index) => {
            const assignedUser = lead.assignedTo ? getAssignedUser(lead.assignedTo) : null;
            const isUnassigned = !assignedUser;
            
            return (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`p-5 ${isUnassigned ? 'ring-2 ring-amber-200 dark:ring-amber-800' : ''}`} hover>
                  {isUnassigned && (
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="warning" className="flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Needs Assignment
                      </Badge>
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{lead.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{lead.company}</p>
                      {lead.createdBy !== lead.assignedTo && (
                        <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">
                          Created by {users.find(u => u.id === lead.createdBy)?.name || 'Unknown'}
                        </p>
                      )}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(lead.status)}`}>{lead.status}</span>
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Value: <span className="font-semibold text-gray-900 dark:text-white">${lead.value.toLocaleString()}</span></span>
                    <div className={`flex items-center gap-1 ${lead.aiScore >= 70 ? 'text-green-600' : lead.aiScore >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>
                      <div className={`w-2 h-2 rounded-full ${lead.aiScore >= 70 ? 'bg-green-500' : lead.aiScore >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                      Score: {lead.aiScore}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 dark:border-slate-700">
                    {assignedUser ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
                            {assignedUser.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{assignedUser.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Assigned</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleAssignClick(lead)}>
                          Change
                        </Button>
                      </div>
                    ) : (
                      <Button onClick={() => handleAssignClick(lead)} className="w-full" variant="primary">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Assign to Team Member
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
      </div>

      {filteredLeads.length === 0 && (
        <Card className="p-12 text-center">
          <Target className="w-16 h-16 text-gray-300 dark:text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No leads found</h3>
          <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters</p>
        </Card>
      )}

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

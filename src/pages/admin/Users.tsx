import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, MoreVertical, Shield, Users as UsersIcon, Target } from 'lucide-react';
import { Card, Button, Input, Badge, Modal, Select } from '../../components/Shared';
import { useAppStore, User } from '../../store/useAppStore';
import { mockUsers } from '../../utils/mockData';

export default function AdminUsers() {
  const { users, setUsers, addUser, updateUser, deleteUser } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'sales' as User['role'], status: 'active' as User['status'] });

  useState(() => {
    if (users.length === 0) setUsers(mockUsers);
  });

  const filteredUsers = users.filter(
    (u) => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setFormData({ name: user.name, email: user.email, role: user.role, status: user.status });
    } else {
      setEditingUser(null);
      setFormData({ name: '', email: '', role: 'sales', status: 'active' });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingUser) {
      updateUser(editingUser.id, formData);
    } else {
      addUser({ ...formData, id: Date.now().toString() });
    }
    setShowModal(false);
  };

  const roleColors: Record<string, 'danger' | 'warning' | 'info'> = {
    admin: 'danger',
    manager: 'warning',
    sales: 'info',
  };

  const roleIcons: Record<string, typeof Shield> = {
    admin: Shield,
    manager: UsersIcon,
    sales: Target,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage team members and their roles</p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={setSearchQuery}
            icon={<Search className="w-5 h-5" />}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">User</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Role</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => {
                const RoleIcon = roleIcons[user.role];
                return (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-100 dark:border-slate-700/50 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={roleColors[user.role]}>
                        <RoleIcon className="w-3 h-3 mr-1" />
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={user.status === 'active' ? 'success' : 'default'}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleOpenModal(user)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteUser(user.id)}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingUser ? 'Edit User' : 'Add New User'}
      >
        <div className="space-y-4">
          <Input label="Name" value={formData.name} onChange={(v) => setFormData({ ...formData, name: v })} />
          <Input label="Email" type="email" value={formData.email} onChange={(v) => setFormData({ ...formData, email: v })} />
          <Select
            label="Role"
            value={formData.role}
            onChange={(v) => setFormData({ ...formData, role: v as User['role'] })}
            options={[
              { value: 'admin', label: 'Administrator' },
              { value: 'manager', label: 'Manager' },
              { value: 'sales', label: 'Sales Representative' },
            ]}
          />
          <Select
            label="Status"
            value={formData.status}
            onChange={(v) => setFormData({ ...formData, status: v as User['status'] })}
            options={[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ]}
          />
          <div className="flex gap-3 pt-4">
            <Button variant="secondary" onClick={() => setShowModal(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              {editingUser ? 'Save Changes' : 'Add User'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

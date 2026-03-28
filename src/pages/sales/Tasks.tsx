import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, CheckSquare, Square, Clock, AlertCircle, Calendar } from 'lucide-react';
import { Card, Button, Badge, Modal, Input, Select } from '../../components/Shared';
import { useAppStore, Task } from '../../store/useAppStore';
import { mockTasks } from '../../utils/mockData';

export default function SalesTasks() {
  const { tasks, setTasks, addTask, toggleTask } = useAppStore();
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '', description: '', dueDate: '', priority: 'medium' as Task['priority']
  });

  useState(() => {
    if (tasks.length === 0) setTasks(mockTasks);
  });

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'pending') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const handleCreate = () => {
    addTask({
      id: Date.now().toString(),
      ...formData,
      completed: false,
    });
    setShowModal(false);
    setFormData({ title: '', description: '', dueDate: '', priority: 'medium' });
  };

  const priorityColors = {
    high: 'danger' as const,
    medium: 'warning' as const,
    low: 'info' as const,
  };

  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tasks & Reminders</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your to-dos and deadlines</p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      <div className="flex gap-4">
        {[
          { value: 'all', label: `All (${tasks.length})` },
          { value: 'pending', label: `Pending (${pendingCount})` },
          { value: 'completed', label: `Completed (${completedCount})` },
        ].map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === option.value
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-600'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <Card className="divide-y divide-gray-200 dark:divide-slate-700">
        {filteredTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors ${
              task.completed ? 'opacity-60' : ''
            }`}
          >
            <button
              onClick={() => toggleTask(task.id)}
              className={`mt-1 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                task.completed
                  ? 'bg-green-500 border-green-500 scale-110'
                  : 'border-gray-300 dark:border-slate-600 hover:border-blue-500 hover:scale-110'
              }`}
            >
              {task.completed && (
                <motion.svg
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </motion.svg>
              )}
            </button>
            <div className="flex-1">
              <p className={`font-medium ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                {task.title}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{task.description}</p>
              <div className="flex items-center gap-3 mt-2">
                <Badge variant={priorityColors[task.priority]}>{task.priority}</Badge>
                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
        {filteredTasks.length === 0 && (
          <div className="p-12 text-center">
            <CheckSquare className="w-16 h-16 text-gray-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {filter === 'completed' ? 'No completed tasks yet' : 'All tasks done! 🎉'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {filter === 'completed' ? 'Complete some tasks to see them here' : 'Add new tasks to stay on track'}
            </p>
          </div>
        )}
      </Card>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Task">
        <div className="space-y-4">
          <Input label="Title" value={formData.title} onChange={(v) => setFormData({ ...formData, title: v })} />
          <Input label="Description" value={formData.description} onChange={(v) => setFormData({ ...formData, description: v })} />
          <Input label="Due Date" type="date" value={formData.dueDate} onChange={(v) => setFormData({ ...formData, dueDate: v })} />
          <Select
            label="Priority"
            value={formData.priority}
            onChange={(v) => setFormData({ ...formData, priority: v as Task['priority'] })}
            options={[
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High' },
            ]}
          />
          <div className="flex gap-3 pt-4">
            <Button variant="secondary" onClick={() => setShowModal(false)} className="flex-1">Cancel</Button>
            <Button onClick={handleCreate} className="flex-1">Add Task</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

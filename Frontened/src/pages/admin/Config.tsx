import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Settings, Bell, Shield, Zap, Users } from 'lucide-react';
import { Card, Button, Input, Select } from '../../components/Shared';

export default function AdminConfig() {
  const [settings, setSettings] = useState({
    companyName: 'SalesCRM',
    defaultCurrency: 'USD',
    leadAutoAssign: 'round-robin',
    emailNotifications: true,
    slackIntegration: false,
    aiScoringEnabled: true,
    minAIScore: '40',
    maxLeadsPerRep: '50',
    dealApprovalRequired: true,
  });

  const handleSave = () => {
    // Save settings logic
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">System Configuration</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your CRM settings and preferences</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">General Settings</h3>
          </div>
          <div className="space-y-4">
            <Input
              label="Company Name"
              value={settings.companyName}
              onChange={(v) => setSettings({ ...settings, companyName: v })}
            />
            <Select
              label="Default Currency"
              value={settings.defaultCurrency}
              onChange={(v) => setSettings({ ...settings, defaultCurrency: v })}
              options={[
                { value: 'USD', label: 'USD ($)' },
                { value: 'EUR', label: 'EUR (€)' },
                { value: 'GBP', label: 'GBP (£)' },
              ]}
            />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Lead Assignment</h3>
          </div>
          <div className="space-y-4">
            <Select
              label="Auto-Assignment Rule"
              value={settings.leadAutoAssign}
              onChange={(v) => setSettings({ ...settings, leadAutoAssign: v })}
              options={[
                { value: 'round-robin', label: 'Round Robin' },
                { value: 'random', label: 'Random' },
                { value: 'manual', label: 'Manual Only' },
              ]}
            />
            <Input
              label="Max Leads per Rep"
              type="number"
              value={settings.maxLeadsPerRep}
              onChange={(v) => setSettings({ ...settings, maxLeadsPerRep: v })}
            />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Configuration</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">AI Lead Scoring</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Enable automatic lead scoring</p>
              </div>
              <button
                onClick={() => setSettings({ ...settings, aiScoringEnabled: !settings.aiScoringEnabled })}
                className={`relative w-11 h-6 rounded-full transition-colors ${settings.aiScoringEnabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-slate-600'}`}
              >
                <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.aiScoringEnabled ? 'translate-x-5' : ''}`} />
              </button>
            </div>
            <Input
              label="Minimum AI Score"
              type="number"
              value={settings.minAIScore}
              onChange={(v) => setSettings({ ...settings, minAIScore: v })}
            />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Bell className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Email Notifications</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Send email alerts for important events</p>
              </div>
              <button
                onClick={() => setSettings({ ...settings, emailNotifications: !settings.emailNotifications })}
                className={`relative w-11 h-6 rounded-full transition-colors ${settings.emailNotifications ? 'bg-blue-600' : 'bg-gray-300 dark:bg-slate-600'}`}
              >
                <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.emailNotifications ? 'translate-x-5' : ''}`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Slack Integration</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Post updates to Slack channel</p>
              </div>
              <button
                onClick={() => setSettings({ ...settings, slackIntegration: !settings.slackIntegration })}
                className={`relative w-11 h-6 rounded-full transition-colors ${settings.slackIntegration ? 'bg-blue-600' : 'bg-gray-300 dark:bg-slate-600'}`}
              >
                <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.slackIntegration ? 'translate-x-5' : ''}`} />
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

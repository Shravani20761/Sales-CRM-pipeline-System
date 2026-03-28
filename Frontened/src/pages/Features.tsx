import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, BarChart3, Brain, Users, Zap, Shield, Kanban, Bell, Globe, ArrowRight, Check, Moon, Sun } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

const mainFeatures = [
  {
    icon: Kanban,
    title: 'Kanban Pipeline',
    description: 'Visual drag-and-drop pipeline to track deals through every stage. Move leads from initial contact to closed deal with intuitive controls.',
    benefits: ['Visual deal tracking', 'Drag & drop interface', 'Stage customization', 'Pipeline analytics'],
  },
  {
    icon: Brain,
    title: 'AI Lead Scoring',
    description: 'Machine learning algorithms analyze lead behavior and characteristics to predict conversion probability, helping you focus on the best opportunities.',
    benefits: ['Predictive scoring', 'Behavior analysis', 'Priority recommendations', 'Conversion insights'],
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Real-time dashboards and comprehensive reports give you visibility into every aspect of your sales performance.',
    benefits: ['Real-time metrics', 'Custom reports', 'Team performance', 'Revenue forecasting'],
  },
  {
    icon: Users,
    title: 'Team Management',
    description: 'Role-based access control ensures everyone sees exactly what they need. Manage admins, managers, and sales reps with ease.',
    benefits: ['Role-based access', 'Team assignments', 'Activity tracking', 'Performance reviews'],
  },
];

const allFeatures = [
  { icon: Target, title: 'Lead Management', desc: 'Capture and organize leads efficiently' },
  { icon: Kanban, title: 'Deal Pipeline', desc: 'Visual pipeline management' },
  { icon: Brain, title: 'AI Scoring', desc: 'Smart lead prioritization' },
  { icon: BarChart3, title: 'Analytics', desc: 'Comprehensive sales insights' },
  { icon: Users, title: 'Team Roles', desc: 'Admin, Manager, Sales access' },
  { icon: Bell, title: 'Notifications', desc: 'Real-time updates and alerts' },
  { icon: Zap, title: 'Automation', desc: 'Workflow automation tools' },
  { icon: Shield, title: 'Security', desc: 'Enterprise-grade security' },
  { icon: Globe, title: 'Multi-language', desc: 'Support for global teams' },
];

export default function Features() {
  const { darkMode, toggleDarkMode } = useAppStore();

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-slate-900 transition-colors duration-300">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl text-gray-900 dark:text-white">SalesCRM</span>
              </Link>
              <div className="hidden md:flex items-center gap-8">
                <Link to="/features" className="text-blue-600 dark:text-blue-400 font-medium">Features</Link>
                <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</Link>
                <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</Link>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={toggleDarkMode} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                  {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-500" />}
                </button>
                <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Sign In</Link>
                <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Get Started</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Powerful Features for{' '}
              <span className="text-blue-600">Modern Sales Teams</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            >
              Everything you need to manage leads, track deals, and close more business. Built with AI-powered insights and beautiful design.
            </motion.p>
          </div>
        </section>

        {/* Main Features */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-32">
            {mainFeatures.map((feature, index) => {
              const Icon = feature.icon;
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`grid md:grid-cols-2 gap-12 items-center ${!isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className={isEven ? '' : 'md:order-2'}>
                    <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">{feature.description}</p>
                    <ul className="space-y-3">
                      {feature.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`${!isEven ? 'md:order-1' : ''}`}>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8">
                      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
                        <div className="h-48 bg-gray-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                          <Icon className="w-16 h-16 text-gray-300 dark:text-slate-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* All Features Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-slate-800/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">All Features</h2>
              <p className="text-gray-600 dark:text-gray-400">Everything you need in one platform</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {allFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700"
                  >
                    <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-blue-100 mb-8">Try all features free for 14 days. No credit card required.</p>
            <Link to="/register" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium">
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-900 dark:bg-slate-950 text-center text-gray-400">
          <p>&copy; 2024 SalesCRM. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

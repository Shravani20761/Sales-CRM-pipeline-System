import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Users, Globe, Award, ArrowRight, Moon, Sun } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

const team = [
  { name: 'Alex Thompson', role: 'CEO & Founder', image: 'A' },
  { name: 'Sarah Chen', role: 'CTO', image: 'S' },
  { name: 'Michael Roberts', role: 'Head of Product', image: 'M' },
  { name: 'Emily Davis', role: 'Head of Sales', image: 'E' },
];

const stats = [
  { value: '10,000+', label: 'Active Users' },
  { value: '50M+', label: 'Deals Closed' },
  { value: '99.9%', label: 'Uptime' },
  { value: '24/7', label: 'Support' },
];

export default function About() {
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
                <Link to="/features" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</Link>
                <Link to="/about" className="text-blue-600 dark:text-blue-400 font-medium">About</Link>
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
              About SalesCRM
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            >
              We're on a mission to help sales teams work smarter, close faster, and grow revenue with the power of AI and modern design.
            </motion.p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-4xl font-bold text-white mb-2">{stat.value}</p>
                  <p className="text-blue-100">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-400">
                  <p>
                    SalesCRM was born out of frustration with existing CRM solutions that were either too complex or too limited for modern sales teams.
                  </p>
                  <p>
                    Founded in 2020, we set out to build a CRM that salespeople actually love to use. One that combines powerful features with intuitive design and AI-powered insights.
                  </p>
                  <p>
                    Today, SalesCRM is trusted by thousands of sales teams worldwide, from startups to enterprise organizations, helping them close more deals and grow their business.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { icon: Users, title: 'Customer First', desc: 'Everything we build starts with our customers needs.' },
                  { icon: Globe, title: 'Global Scale', desc: 'Supporting teams across 50+ countries worldwide.' },
                  { icon: Award, title: 'Award Winning', desc: 'Recognized as a leader in CRM innovation.' },
                  { icon: Target, title: 'Results Driven', desc: 'Focused on helping you achieve your goals.' },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6">
                      <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-slate-800/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Meet Our Team</h2>
              <p className="text-gray-600 dark:text-gray-400">The people behind SalesCRM</p>
            </motion.div>
            <div className="grid md:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                    {member.image}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Join Our Journey</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Be part of the CRM revolution. Start your free trial today.</p>
            <Link to="/register" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Get Started <ArrowRight className="w-5 h-5" />
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

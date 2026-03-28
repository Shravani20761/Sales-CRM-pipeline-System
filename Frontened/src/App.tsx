import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { Toaster } from 'sonner';
import './index.css';

// Public Pages
import Landing from './pages/Landing';
import About from './pages/About';
import Features from './pages/Features';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Unauthorized from './pages/Unauthorized';

// Layout
import Layout from './components/Layout';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminAnalytics from './pages/admin/Analytics';
import AdminConfig from './pages/admin/Config';
import AdminLeadsAssignment from './pages/admin/LeadsAssignment';

// Manager Pages
import ManagerDashboard from './pages/manager/Dashboard';
import ManagerPipeline from './pages/manager/Pipeline';
import ManagerApprovals from './pages/manager/Approvals';
import ManagerAnalytics from './pages/manager/Analytics';
import ManagerLeadsAssignment from './pages/manager/LeadsAssignment';

// Sales Pages
import SalesDashboard from './pages/sales/Dashboard';
import SalesLeads from './pages/sales/Leads';
import SalesDeals from './pages/sales/Deals';
import SalesActivity from './pages/sales/Activity';
import SalesTasks from './pages/sales/Tasks';

// Protected Route Component
function ProtectedRoute({ children, roles }: { children: React.ReactNode; roles?: string[] }) {
  const { user } = useAuthStore();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return <Layout>{children}</Layout>;
}

// Redirect authenticated users
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  
  if (user) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }
  
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors closeButton />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute roles={['admin']}><AdminUsers /></ProtectedRoute>} />
        <Route path="/admin/leads" element={<ProtectedRoute roles={['admin']}><AdminLeadsAssignment /></ProtectedRoute>} />
        <Route path="/admin/analytics" element={<ProtectedRoute roles={['admin']}><AdminAnalytics /></ProtectedRoute>} />
        <Route path="/admin/config" element={<ProtectedRoute roles={['admin']}><AdminConfig /></ProtectedRoute>} />

        {/* Manager Routes */}
        <Route path="/manager/dashboard" element={<ProtectedRoute roles={['manager', 'admin']}><ManagerDashboard /></ProtectedRoute>} />
        <Route path="/manager/pipeline" element={<ProtectedRoute roles={['manager', 'admin']}><ManagerPipeline /></ProtectedRoute>} />
        <Route path="/manager/leads" element={<ProtectedRoute roles={['manager', 'admin']}><ManagerLeadsAssignment /></ProtectedRoute>} />
        <Route path="/manager/approvals" element={<ProtectedRoute roles={['manager', 'admin']}><ManagerApprovals /></ProtectedRoute>} />
        <Route path="/manager/analytics" element={<ProtectedRoute roles={['manager', 'admin']}><ManagerAnalytics /></ProtectedRoute>} />

        {/* Sales Routes */}
        <Route path="/sales/dashboard" element={<ProtectedRoute roles={['sales']}><SalesDashboard /></ProtectedRoute>} />
        <Route path="/sales/leads" element={<ProtectedRoute roles={['sales']}><SalesLeads /></ProtectedRoute>} />
        <Route path="/sales/deals" element={<ProtectedRoute roles={['sales']}><SalesDeals /></ProtectedRoute>} />
        <Route path="/sales/activity" element={<ProtectedRoute roles={['sales']}><SalesActivity /></ProtectedRoute>} />
        <Route path="/sales/tasks" element={<ProtectedRoute roles={['sales']}><SalesTasks /></ProtectedRoute>} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import LeadsPage from './pages/LeadsPage';
import LeadDetailPage from './pages/LeadDetailPage';
import AddLeadPage from './pages/AddLeadPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Routes (Simulation) */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="leads" element={<LeadsPage />} />
          <Route path="leads/:id" element={<LeadDetailPage />} />
          <Route path="add-lead" element={<AddLeadPage />} />
          <Route path="settings" element={<div className="p-8">Settings Page (Coming Soon)</div>} />
          <Route path="analytics" element={<div className="p-8">Analytics Page (Coming Soon)</div>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
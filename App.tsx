import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { VehicleProvider } from './context/VehicleContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import VehicleDetail from './pages/VehicleDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import WhatsAppButton from './components/WhatsAppButton';
import SalesBanner from './components/SalesBanner';

// Admin Imports
import AdminLayout from './pages/admin/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import VehicleForm from './pages/admin/VehicleForm';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Layout for public pages
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-white font-sans">
      <Navbar />
      <main className="flex-grow pb-32">
        {children}
      </main>
      <WhatsAppButton />
      <SalesBanner />
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <VehicleProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/vehiculos" element={<PublicLayout><Inventory /></PublicLayout>} />
          <Route path="/vehiculos/:slug" element={<PublicLayout><VehicleDetail /></PublicLayout>} />
          <Route path="/nosotros" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/contacto" element={<PublicLayout><Contact /></PublicLayout>} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="new" element={<VehicleForm />} />
            <Route path="edit/:id" element={<VehicleForm />} />
          </Route>
        </Routes>
      </Router>
    </VehicleProvider>
  );
};

export default App;
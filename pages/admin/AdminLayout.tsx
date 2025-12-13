import React, { useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, LogOut, Car } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-800 flex items-center gap-2">
          <Car className="h-6 w-6 text-gray-400" />
          <span className="font-bold text-lg tracking-wider">NEURA ADMIN</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/admin/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin/dashboard') ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            to="/admin/new"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin/new') ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <PlusCircle className="h-5 w-5" />
            Nuevo Vehículo
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10 p-4 md:hidden flex justify-between items-center">
          <span className="font-bold text-gray-900">Neura Admin</span>
          <button onClick={handleLogout} className="text-gray-500">
            <LogOut className="h-5 w-5" />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div >
  );
};

export default AdminLayout;
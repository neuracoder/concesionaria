import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-red-600 font-bold border-b-2 border-red-600 pb-1' : 'text-gray-400 hover:text-red-500 font-semibold';
  };

  return (
    <header className="bg-black shadow-2xl shadow-red-900/20 sticky top-0 z-50 border-b border-red-900/30">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-white hover:text-red-500 transition-colors">
            <div className="bg-red-600 p-2 rounded-lg border border-red-500">
              <Car className="h-6 w-6" />
            </div>
            <span className="uppercase tracking-tight">Tu Concesionaria</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className={`${isActive('/')} uppercase tracking-wide transition-all`}>Inicio</Link>
            <Link to="/vehiculos" className={`${isActive('/vehiculos')} uppercase tracking-wide transition-all`}>Vehículos</Link>
            <Link to="/nosotros" className={`${isActive('/nosotros')} uppercase tracking-wide transition-all`}>Nosotros</Link>
            <Link to="/contacto" className={`${isActive('/contacto')} uppercase tracking-wide transition-all`}>Contacto</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white bg-red-600 p-2 rounded-lg border border-red-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 border-t border-red-900/30 pt-4">
            <Link to="/" className="block py-2 text-gray-400 hover:text-red-500 font-semibold uppercase" onClick={() => setIsOpen(false)}>Inicio</Link>
            <Link to="/vehiculos" className="block py-2 text-gray-400 hover:text-red-500 font-semibold uppercase" onClick={() => setIsOpen(false)}>Vehículos</Link>
            <Link to="/nosotros" className="block py-2 text-gray-400 hover:text-red-500 font-semibold uppercase" onClick={() => setIsOpen(false)}>Nosotros</Link>
            <Link to="/contacto" className="block py-2 text-gray-400 hover:text-red-500 font-semibold uppercase" onClick={() => setIsOpen(false)}>Contacto</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
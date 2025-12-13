import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Car, ArrowLeft } from 'lucide-react';

const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock authentication
    if (password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Contraseña incorrecta');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 relative">
      {/* Back to Home Button */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 text-gray-500 hover:text-white flex items-center gap-2 transition-colors font-medium text-sm group"
      >
        <div className="bg-gray-800 p-2 rounded-full group-hover:bg-gray-700 transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </div>
        <span className="hidden sm:inline">Volver a Autos-Neura</span>
      </Link>

      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-700 mb-4">
              <Car className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Autos-Neura Admin</h2>
            <p className="text-gray-400 mt-2">Ingrese sus credenciales de acceso</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 bg-gray-900 border border-gray-600 rounded-lg py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center bg-red-900/20 py-2 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              Ingresar al Dashboard
            </button>
          </form>
        </div>
        <div className="px-8 py-4 bg-gray-900 border-t border-gray-700 text-center">
          <p className="text-xs text-gray-500">
            &copy; 2024 Autos-Neura System
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
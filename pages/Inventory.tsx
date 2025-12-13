import React, { useState, useMemo } from 'react';
import { useVehicles } from '../context/VehicleContext';
import { FilterState, Condicion } from '../types';
import VehicleCard from '../components/VehicleCard';
import { Filter, X } from 'lucide-react';

const Inventory: React.FC = () => {
  const { vehicles, marcas, modelos } = useVehicles();

  const [filters, setFilters] = useState<FilterState>({
    marca: '',
    modelo: '',
    año: '',
    condicion: '',
    combustible: '',
    precioMin: '',
    precioMax: '',
  });

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const availableModels = useMemo(() => {
    if (!filters.marca) return [];
    return modelos.filter(m => m.marcaId === parseInt(filters.marca));
  }, [filters.marca, modelos]);

  const years = Array.from({length: 15}, (_, i) => (new Date().getFullYear() - i).toString());

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'marca' ? { modelo: '' } : {})
    }));
  };

  const clearFilters = () => {
    setFilters({
      marca: '',
      modelo: '',
      año: '',
      condicion: '',
      combustible: '',
      precioMin: '',
      precioMax: '',
    });
  };

  const filteredVehiculos = useMemo(() => {
    return vehicles.filter(v => {
      if (filters.marca && v.marca.id.toString() !== filters.marca) return false;
      if (filters.modelo && v.modelo.id.toString() !== filters.modelo) return false;
      if (filters.año && v.año.toString() !== filters.año) return false;
      if (filters.condicion && v.condicion !== filters.condicion) return false;
      if (filters.combustible && v.combustible !== filters.combustible) return false;
      if (filters.precioMin && v.precio < parseFloat(filters.precioMin)) return false;
      if (filters.precioMax && v.precio > parseFloat(filters.precioMax)) return false;
      return true;
    });
  }, [filters, vehicles]);

  return (
    <div className="container mx-auto px-4 py-12 bg-zinc-950 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-lg font-bold shadow-2xl shadow-red-900/50 border border-red-500 uppercase tracking-wide"
          >
            <Filter className="h-4 w-4" />
            {showMobileFilters ? 'Ocultar Filtros' : 'Filtrar Vehículos'}
          </button>
        </div>

        {/* Filters Sidebar */}
        <aside className={`lg:w-1/4 ${showMobileFilters ? 'block' : 'hidden'} lg:block`}>
          <div className="bg-zinc-900 rounded-xl shadow-2xl shadow-red-900/50 border border-red-900/30 p-6 sticky top-24">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-red-900/30">
              <h3 className="text-xl font-bold text-white uppercase tracking-tight">Filtros</h3>
              {(Object.values(filters).some(x => x !== '')) && (
                 <button onClick={clearFilters} className="text-xs text-red-600 hover:text-red-500 flex items-center gap-1 font-bold transition-colors uppercase">
                   <X className="h-3 w-3" /> Limpiar
                 </button>
              )}
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-red-600 mb-2 uppercase tracking-wide">Marca</label>
                <select
                  name="marca"
                  value={filters.marca}
                  onChange={handleChange}
                  className="w-full border border-red-900/30 rounded-lg shadow-sm focus:ring-2 focus:ring-red-600 focus:border-red-600 text-sm p-3 bg-black text-white font-semibold transition-all"
                >
                  <option value="">TODAS LAS MARCAS</option>
                  {marcas.map(m => (
                    <option key={m.id} value={m.id}>{m.nombre.toUpperCase()}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-red-600 mb-2 uppercase tracking-wide">Modelo</label>
                <select
                  name="modelo"
                  value={filters.modelo}
                  onChange={handleChange}
                  disabled={!filters.marca}
                  className="w-full border border-red-900/30 rounded-lg shadow-sm focus:ring-2 focus:ring-red-600 focus:border-red-600 text-sm p-3 bg-black text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <option value="">TODOS LOS MODELOS</option>
                  {availableModels.map(m => (
                    <option key={m.id} value={m.id}>{m.nombre.toUpperCase()}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-red-600 mb-2 uppercase tracking-wide">Año</label>
                <select
                  name="año"
                  value={filters.año}
                  onChange={handleChange}
                  className="w-full border border-red-900/30 rounded-lg shadow-sm focus:ring-2 focus:ring-red-600 focus:border-red-600 text-sm p-3 bg-black text-white font-semibold transition-all"
                >
                  <option value="">TODOS</option>
                  {years.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-red-600 mb-2 uppercase tracking-wide">Condición</label>
                <select
                  name="condicion"
                  value={filters.condicion}
                  onChange={handleChange}
                  className="w-full border border-red-900/30 rounded-lg shadow-sm focus:ring-2 focus:ring-red-600 focus:border-red-600 text-sm p-3 bg-black text-white font-semibold transition-all"
                >
                  <option value="">CUALQUIERA</option>
                  {Object.values(Condicion).map(c => (
                    <option key={c} value={c}>{c.toUpperCase()}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-red-600 mb-2 uppercase tracking-wide">Precio (USD)</label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    name="precioMin"
                    placeholder="MÍNIMO"
                    value={filters.precioMin}
                    onChange={handleChange}
                    className="w-full border border-red-900/30 rounded-lg shadow-sm focus:ring-2 focus:ring-red-600 focus:border-red-600 text-sm p-3 bg-black text-white font-semibold placeholder-gray-600 transition-all"
                  />
                  <input
                    type="number"
                    name="precioMax"
                    placeholder="MÁXIMO"
                    value={filters.precioMax}
                    onChange={handleChange}
                    className="w-full border border-red-900/30 rounded-lg shadow-sm focus:ring-2 focus:ring-red-600 focus:border-red-600 text-sm p-3 bg-black text-white font-semibold placeholder-gray-600 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Results Grid */}
        <main className="lg:w-3/4">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Inventario</h2>
            <span className="text-white font-bold bg-red-600 px-4 py-2 rounded-lg border border-red-500 shadow-lg shadow-red-900/50 uppercase text-sm">
              {filteredVehiculos.length} VEHÍCULOS
            </span>
          </div>

          {filteredVehiculos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredVehiculos.map(v => (
                <VehicleCard key={v.id} vehiculo={v} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-zinc-900 rounded-xl border border-red-900/30 shadow-2xl shadow-red-900/50">
              <div className="inline-block p-4 bg-red-600 rounded-lg mb-4 border border-red-500">
                 <Filter className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wide">No encontramos resultados</h3>
              <p className="text-gray-400 mt-2 mb-6 font-semibold">Intentá cambiar los filtros de búsqueda.</p>
              <button onClick={clearFilters} className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-900/50 border border-red-500 uppercase">
                Ver todos los vehículos
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Inventory;
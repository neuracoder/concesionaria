import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Vehiculo, Marca, Modelo } from '../types';
import { VEHICULOS, MARCAS, MODELOS } from '../services/mockData';

interface VehicleContextType {
  vehicles: Vehiculo[];
  marcas: Marca[];
  modelos: Modelo[];
  addVehicle: (vehicle: Vehiculo) => void;
  updateVehicle: (id: number, vehicle: Vehiculo) => void;
  deleteVehicle: (id: number) => void;
  getVehicleBySlug: (slug: string) => Vehiculo | undefined;
  getDestacados: () => Vehiculo[];
  getRelacionados: (vehicle: Vehiculo) => Vehiculo[];
  // New methods for custom data
  addCustomMarca: (nombre: string) => Promise<Marca>;
  addCustomModelo: (nombre: string, marcaId: number) => Promise<Modelo>;
  isLoading: boolean;
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

const API_URL = 'http://localhost:3001/api';

export const VehicleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [vehicles, setVehicles] = useState<Vehiculo[]>([]);
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [modelos, setModelos] = useState<Modelo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vRes, mRes, moRes] = await Promise.all([
          fetch(`${API_URL}/vehicles`).catch(() => null),
          fetch(`${API_URL}/marcas`).catch(() => null),
          fetch(`${API_URL}/modelos`).catch(() => null)
        ]);

        if (vRes && vRes.ok) setVehicles(await vRes.json());
        else setVehicles(VEHICULOS); // Fallback to mock if server not running

        if (mRes && mRes.ok) setMarcas(await mRes.json());
        else setMarcas(MARCAS);

        if (moRes && moRes.ok) setModelos(await moRes.json());
        else setModelos(MODELOS);

      } catch (error) {
        console.error("Error fetching data:", error);
        // Fallback
        setVehicles(VEHICULOS);
        setMarcas(MARCAS);
        setModelos(MODELOS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const addVehicle = async (vehicle: Vehiculo) => {
    try {
      const res = await fetch(`${API_URL}/vehicles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vehicle)
      });
      if (res.ok) {
        const savedVehicle = await res.json();
        setVehicles(prev => [savedVehicle, ...prev]);
      }
    } catch (e) {
      console.error("Error saving vehicle", e);
      // Optimistic update fallback
      setVehicles(prev => [vehicle, ...prev]);
    }
  };

  const updateVehicle = async (id: number, updatedVehicle: Vehiculo) => {
    try {
      const res = await fetch(`${API_URL}/vehicles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedVehicle)
      });

      if (res.ok) {
        const savedVehicle = await res.json();
        // Use the vehicle returned by the server (with processed images)
        setVehicles(prev => prev.map(v => v.id === id ? savedVehicle : v));
      } else {
        // Fallback to optimistic update if server fails
        setVehicles(prev => prev.map(v => v.id === id ? updatedVehicle : v));
      }
    } catch (e) {
      console.error("Error updating vehicle", e);
      setVehicles(prev => prev.map(v => v.id === id ? updatedVehicle : v));
    }
  };

  const deleteVehicle = async (id: number) => {
    try {
      await fetch(`${API_URL}/vehicles/${id}`, { method: 'DELETE' });
      setVehicles(prev => prev.filter(v => v.id !== id));
    } catch (e) {
      console.error("Error deleting vehicle", e);
      setVehicles(prev => prev.filter(v => v.id !== id));
    }
  };

  const getVehicleBySlug = (slug: string) => {
    return vehicles.find(v => v.slug === slug);
  };

  const getDestacados = () => {
    // If we have API data, filter it. 
    return vehicles.filter(v => v.destacado && v.disponible);
  };

  const getRelacionados = (vehicle: Vehiculo) => {
    return vehicles
      .filter(v => v.marca.id === vehicle.marca.id && v.id !== vehicle.id)
      .slice(0, 4);
  };

  const addCustomMarca = async (nombre: string): Promise<Marca> => {
    const existing = marcas.find(m => m.nombre.toLowerCase() === nombre.toLowerCase());
    if (existing) return existing;

    const newMarca: Marca = {
      id: Math.max(...marcas.map(m => m.id), 0) + 1,
      nombre,
      slug: nombre.toLowerCase().replace(/\s+/g, '-')
    };

    try {
      const res = await fetch(`${API_URL}/marcas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMarca)
      });
      if (res.ok) {
        setMarcas(prev => [...prev, newMarca]);
        return newMarca;
      }
    } catch (e) { console.error(e); }

    setMarcas(prev => [...prev, newMarca]);
    return newMarca;
  };

  const addCustomModelo = async (nombre: string, marcaId: number): Promise<Modelo> => {
    const existing = modelos.find(m => m.marcaId === marcaId && m.nombre.toLowerCase() === nombre.toLowerCase());
    if (existing) return existing;

    const newModelo: Modelo = {
      id: Math.max(...modelos.map(m => m.id), 0) + 1,
      marcaId,
      nombre
    };

    try {
      const res = await fetch(`${API_URL}/modelos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newModelo)
      });
      if (res.ok) {
        setModelos(prev => [...prev, newModelo]);
        return newModelo;
      }
    } catch (e) { console.error(e); }

    setModelos(prev => [...prev, newModelo]);
    return newModelo;
  };

  return (
    <VehicleContext.Provider value={{
      vehicles,
      marcas,
      modelos,
      addVehicle,
      updateVehicle,
      deleteVehicle,
      getVehicleBySlug,
      getDestacados,
      getRelacionados,
      addCustomMarca,
      addCustomModelo,
      isLoading
    }}>
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicles = () => {
  const context = useContext(VehicleContext);
  if (context === undefined) {
    throw new Error('useVehicles must be used within a VehicleProvider');
  }
  return context;
};
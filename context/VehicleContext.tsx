import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Vehiculo, Marca, Modelo } from '../types';
import { VEHICULOS, MARCAS, MODELOS } from '../services/mockData';
import { supabase } from '../lib/supabase';

interface VehicleContextType {
  vehicles: Vehiculo[];
  marcas: Marca[];
  modelos: Modelo[];
  addVehicle: (vehicle: Vehiculo) => Promise<void>;
  updateVehicle: (id: number, vehicle: Vehiculo) => Promise<void>;
  deleteVehicle: (id: number) => Promise<void>;
  getVehicleBySlug: (slug: string) => Vehiculo | undefined;
  getDestacados: () => Vehiculo[];
  getRelacionados: (vehicle: Vehiculo) => Vehiculo[];
  addCustomMarca: (nombre: string) => Promise<Marca>;
  addCustomModelo: (nombre: string, marcaId: number) => Promise<Modelo>;
  uploadImage: (file: Blob, filename: string) => Promise<string>;
  isLoading: boolean;
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export const VehicleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [vehicles, setVehicles] = useState<Vehiculo[]>([]);
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [modelos, setModelos] = useState<Modelo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial data from Supabase
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      // Fetch Marcas
      const { data: marcasData, error: marcasError } = await supabase
        .from('marcas')
        .select('*')
        .order('nombre');

      if (marcasError) throw marcasError;
      setMarcas(marcasData || []);

      // Fetch Modelos
      const { data: modelosData, error: modelosError } = await supabase
        .from('modelos')
        .select('*')
        .order('nombre');

      if (modelosError) throw modelosError;

      // Transform to match frontend type (marcaId instead of marca_id)
      const transformedModelos = (modelosData || []).map(m => ({
        id: m.id,
        marcaId: m.marca_id,
        nombre: m.nombre
      }));
      setModelos(transformedModelos);

      // Fetch Vehiculos with their images
      const { data: vehiculosData, error: vehiculosError } = await supabase
        .from('vehiculos')
        .select(`
          *,
          vehiculo_imagenes (id, url, orden)
        `)
        .order('created_at', { ascending: false });

      if (vehiculosError) throw vehiculosError;

      // Transform to match frontend Vehiculo type
      const transformedVehiculos = (vehiculosData || []).map(v => {
        const marca = marcasData?.find(m => m.id === v.marca_id);
        const modelo = transformedModelos.find(m => m.id === v.modelo_id);

        return {
          id: v.id,
          marca: marca || { id: v.marca_id, nombre: 'Unknown', slug: 'unknown' },
          modelo: modelo || { id: v.modelo_id, marcaId: v.marca_id, nombre: 'Unknown' },
          año: v.año,
          condicion: v.condicion,
          combustible: v.combustible,
          transmision: v.transmision,
          kilometraje: v.kilometraje,
          motor: v.motor || '',
          puertas: v.puertas || 4,
          color: v.color,
          precio: Number(v.precio),
          precioVisible: v.precio_visible,
          disponible: v.disponible,
          destacado: v.destacado,
          descripcion: v.descripcion || '',
          slug: v.slug,
          imagenes: (v.vehiculo_imagenes || [])
            .sort((a: any, b: any) => a.orden - b.orden)
            .map((img: any) => ({
              url: img.url,
              orden: img.orden
            })),
          vistas: v.vistas || 0
        } as Vehiculo;
      });

      setVehicles(transformedVehiculos);

    } catch (error) {
      console.error('Error fetching data from Supabase:', error);
      // Fallback to mock data
      setVehicles(VEHICULOS);
      setMarcas(MARCAS);
      setModelos(MODELOS);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImage = async (file: Blob, filename: string): Promise<string> => {
    try {
      const { data, error } = await supabase.storage
        .from('vehicle-images')
        .upload(filename, file, {
          contentType: 'image/webp',
          upsert: true
        });

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('vehicle-images')
        .getPublicUrl(data.path);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image to Supabase Storage:', error);
      throw error;
    }
  };

  const addVehicle = async (vehicle: Vehiculo) => {
    try {
      // Upload images to Supabase Storage if they are base64 data URLs
      const uploadedImageUrls = await Promise.all(
        vehicle.imagenes.map(async (img, index) => {
          if (img.url.startsWith('data:')) {
            // Convert base64 to blob
            const response = await fetch(img.url);
            const blob = await response.blob();
            const filename = `${vehicle.slug}-${Date.now()}-${index}.webp`;
            const publicUrl = await uploadImage(blob, filename);
            return { ...img, url: publicUrl };
          }
          return img;
        })
      );

      // Insert vehicle
      const { data: vehiculoData, error: vehiculoError } = await supabase
        .from('vehiculos')
        .insert({
          id: vehicle.id,
          marca_id: vehicle.marca.id,
          modelo_id: vehicle.modelo.id,
          año: vehicle.año,
          precio: vehicle.precio,
          precio_visible: vehicle.precioVisible,
          kilometraje: vehicle.kilometraje,
          combustible: vehicle.combustible,
          transmision: vehicle.transmision,
          condicion: vehicle.condicion,
          color: vehicle.color,
          descripcion: vehicle.descripcion,
          slug: vehicle.slug,
          destacado: vehicle.destacado,
          disponible: vehicle.disponible,
          motor: vehicle.motor,
          puertas: vehicle.puertas
        })
        .select()
        .single();

      if (vehiculoError) throw vehiculoError;

      // Insert images
      const imagesToInsert = uploadedImageUrls.map(img => ({
        vehiculo_id: vehicle.id,
        url: img.url,
        orden: img.orden
      }));

      const { error: imagenesError } = await supabase
        .from('vehiculo_imagenes')
        .insert(imagesToInsert);

      if (imagenesError) throw imagenesError;

      // Refresh data
      await fetchAllData();

    } catch (error) {
      console.error('Error adding vehicle to Supabase:', error);
      // Optimistic update fallback
      setVehicles(prev => [vehicle, ...prev]);
    }
  };

  const updateVehicle = async (id: number, updatedVehicle: Vehiculo) => {
    try {
      // Upload new images to Supabase Storage if they are base64 data URLs
      const uploadedImageUrls = await Promise.all(
        updatedVehicle.imagenes.map(async (img, index) => {
          if (img.url.startsWith('data:')) {
            const response = await fetch(img.url);
            const blob = await response.blob();
            const filename = `${updatedVehicle.slug}-${Date.now()}-${index}.webp`;
            const publicUrl = await uploadImage(blob, filename);
            return { ...img, url: publicUrl };
          }
          return img;
        })
      );

      // Update vehicle
      const { error: vehiculoError } = await supabase
        .from('vehiculos')
        .update({
          marca_id: updatedVehicle.marca.id,
          modelo_id: updatedVehicle.modelo.id,
          año: updatedVehicle.año,
          precio: updatedVehicle.precio,
          precio_visible: updatedVehicle.precioVisible,
          kilometraje: updatedVehicle.kilometraje,
          combustible: updatedVehicle.combustible,
          transmision: updatedVehicle.transmision,
          condicion: updatedVehicle.condicion,
          color: updatedVehicle.color,
          descripcion: updatedVehicle.descripcion,
          slug: updatedVehicle.slug,
          destacado: updatedVehicle.destacado,
          disponible: updatedVehicle.disponible,
          motor: updatedVehicle.motor,
          puertas: updatedVehicle.puertas
        })
        .eq('id', id);

      if (vehiculoError) throw vehiculoError;

      // Delete old images
      const { error: deleteError } = await supabase
        .from('vehiculo_imagenes')
        .delete()
        .eq('vehiculo_id', id);

      if (deleteError) throw deleteError;

      // Insert new images
      const imagesToInsert = uploadedImageUrls.map(img => ({
        vehiculo_id: id,
        url: img.url,
        orden: img.orden
      }));

      const { error: imagenesError } = await supabase
        .from('vehiculo_imagenes')
        .insert(imagesToInsert);

      if (imagenesError) throw imagenesError;

      // Refresh data
      await fetchAllData();

    } catch (error) {
      console.error('Error updating vehicle in Supabase:', error);
      // Optimistic update fallback
      setVehicles(prev => prev.map(v => v.id === id ? updatedVehicle : v));
    }
  };

  const deleteVehicle = async (id: number) => {
    try {
      // Delete vehicle (cascade will delete images)
      const { error } = await supabase
        .from('vehiculos')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Update local state
      setVehicles(prev => prev.filter(v => v.id !== id));

    } catch (error) {
      console.error('Error deleting vehicle from Supabase:', error);
      // Optimistic delete fallback
      setVehicles(prev => prev.filter(v => v.id !== id));
    }
  };

  const getVehicleBySlug = (slug: string) => {
    return vehicles.find(v => v.slug === slug);
  };

  const getDestacados = () => {
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
      const { data, error } = await supabase
        .from('marcas')
        .insert(newMarca)
        .select()
        .single();

      if (error) throw error;

      setMarcas(prev => [...prev, data]);
      return data;
    } catch (error) {
      console.error('Error adding marca to Supabase:', error);
      // Fallback
      setMarcas(prev => [...prev, newMarca]);
      return newMarca;
    }
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
      const { data, error } = await supabase
        .from('modelos')
        .insert({
          id: newModelo.id,
          marca_id: marcaId,
          nombre
        })
        .select()
        .single();

      if (error) throw error;

      const transformedModelo = {
        id: data.id,
        marcaId: data.marca_id,
        nombre: data.nombre
      };

      setModelos(prev => [...prev, transformedModelo]);
      return transformedModelo;
    } catch (error) {
      console.error('Error adding modelo to Supabase:', error);
      // Fallback
      setModelos(prev => [...prev, newModelo]);
      return newModelo;
    }
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
      uploadImage,
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

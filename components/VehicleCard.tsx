import React from 'react';
import { Link } from 'react-router-dom';
import { Vehiculo } from '../types';
import { Fuel, Gauge, GitFork, ArrowRight } from 'lucide-react';

interface Props {
  vehiculo: Vehiculo;
}

const VehicleCard: React.FC<Props> = ({ vehiculo }) => {
  const formatter = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });

  return (
    <div className="group bg-zinc-900 rounded-xl overflow-hidden flex flex-col h-full border border-red-900/30 hover:border-red-600 hover:shadow-2xl hover:shadow-red-900/50 transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-56 overflow-hidden bg-black">
        <img
          src={vehiculo.imagenes[0].url}
          alt={`${vehiculo.marca.nombre} ${vehiculo.modelo.nombre}`}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-red-950/80 via-black/30 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>

        {vehiculo.destacado && (
          <span className="absolute top-3 right-3 bg-red-600 backdrop-blur text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-900/50 border border-red-500">
            Destacado
          </span>
        )}
        <span className="absolute top-3 left-3 bg-black/80 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg border border-red-900/50 uppercase tracking-wide">
          {vehiculo.condicion}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-grow bg-gradient-to-b from-zinc-900 to-zinc-950">
        <div className="mb-4">
          <h3 className="text-xl font-black text-white mb-1 group-hover:text-red-500 transition-colors uppercase tracking-tight">
            {vehiculo.marca.nombre} {vehiculo.modelo.nombre}
          </h3>
          <p className="text-sm text-red-600 font-bold">{vehiculo.año}</p>
        </div>

        <div className="flex justify-between items-center text-gray-400 text-xs mb-6 gap-2">
           <div className="flex flex-col items-center justify-center bg-black p-2.5 rounded-lg w-full border border-red-900/30 group-hover:border-red-600/50 transition-colors">
             <Gauge className="w-4 h-4 mb-1 text-red-600" />
             <span className="font-semibold">{vehiculo.kilometraje === 0 ? '0' : Math.floor(vehiculo.kilometraje / 1000)}k km</span>
           </div>
           <div className="flex flex-col items-center justify-center bg-black p-2.5 rounded-lg w-full border border-red-900/30 group-hover:border-red-600/50 transition-colors">
             <Fuel className="w-4 h-4 mb-1 text-red-600" />
             <span className="truncate max-w-[60px] font-semibold">{vehiculo.combustible}</span>
           </div>
           <div className="flex flex-col items-center justify-center bg-black p-2.5 rounded-lg w-full border border-red-900/30 group-hover:border-red-600/50 transition-colors">
             <GitFork className="w-4 h-4 mb-1 text-red-600" />
             <span className="truncate max-w-[60px] font-semibold">{vehiculo.transmision}</span>
           </div>
        </div>

        <div className="mt-auto pt-4 border-t border-red-900/30 flex items-center justify-between">
          <div>
            <p className="text-xs text-red-600 uppercase tracking-wide mb-0.5 font-bold">Precio</p>
            <span className="text-2xl font-bold text-white">
              {vehiculo.precioVisible ? formatter.format(vehiculo.precio) : 'Consultar'}
            </span>
          </div>

          <Link
            to={`/vehiculos/${vehiculo.slug}`}
            className="bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition-all shadow-lg shadow-red-900/50 hover:shadow-red-600/50 border border-red-500 hover:scale-110 transform"
          >
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
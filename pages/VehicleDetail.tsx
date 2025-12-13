import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useVehicles } from '../context/VehicleContext';
import VehicleCard from '../components/VehicleCard';
import { ArrowLeft, Check, Phone, MessageCircle } from 'lucide-react';

const VehicleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getVehicleBySlug, getRelacionados } = useVehicles();
  const [activeImage, setActiveImage] = useState(0);
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');

  const vehiculo = getVehicleBySlug(slug || '');

  if (!vehiculo) {
    return (
      <div className="container mx-auto px-4 py-20 text-center bg-zinc-950 min-h-screen">
        <h2 className="text-2xl font-black mb-4 text-white uppercase">Vehículo no encontrado</h2>
        <Link to="/vehiculos" className="text-red-600 hover:text-red-500 font-bold uppercase">Volver al listado</Link>
      </div>
    );
  }

  const relacionados = getRelacionados(vehiculo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('success');
    setTimeout(() => setFormStatus('idle'), 3000);
  };

  const formatter = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });

  return (
    <div className="container mx-auto px-4 py-10 bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Link to="/vehiculos" className="inline-flex items-center text-red-600 hover:text-red-500 mb-8 transition-colors font-black uppercase tracking-wide">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver al inventario
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Images Gallery */}
          <div className="lg:col-span-8 space-y-4">
            <div className="aspect-[16/9] rounded-none overflow-hidden bg-black shadow-2xl shadow-red-900/50 relative border-4 border-red-900/30">
               <img
                 src={vehiculo.imagenes[activeImage]?.url || 'https://via.placeholder.com/800x600?text=No+Image'}
                 alt={vehiculo.modelo.nombre}
                 className="w-full h-full object-cover"
               />
               <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-none text-xs font-black uppercase tracking-widest border-2 border-red-500">
                 {vehiculo.condicion}
               </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {vehiculo.imagenes.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-[4/3] rounded-none overflow-hidden border-4 transition-all ${activeImage === idx ? 'border-red-600 opacity-100 shadow-lg shadow-red-900/50' : 'border-red-900/30 opacity-70 hover:opacity-100 hover:border-red-600/50'}`}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="bg-zinc-900 rounded-none p-8 shadow-2xl border-2 border-red-900/30 mt-8 hidden lg:block">
              <h2 className="text-2xl font-black mb-6 text-red-600 uppercase tracking-tight">Descripción</h2>
              <p className="text-gray-300 leading-8 whitespace-pre-line text-lg font-medium">
                {vehiculo.descripcion}
              </p>
            </div>
          </div>

          {/* Info & Form Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-zinc-900 rounded-none p-6 shadow-2xl shadow-red-900/50 border-4 border-red-900/30">
              <div className="mb-2">
                 <span className="text-red-600 text-sm uppercase tracking-widest font-black">{vehiculo.marca.nombre}</span>
                 <h1 className="text-3xl font-black text-white leading-tight uppercase tracking-tight">
                   {vehiculo.modelo.nombre}
                 </h1>
              </div>
              <p className="text-gray-400 mb-6 font-bold text-lg">{vehiculo.año} • {Math.floor(vehiculo.kilometraje / 1000)}k km</p>

              <div className="flex flex-col gap-1 mb-8 pb-8 border-b-4 border-red-900/30">
                <span className="text-sm text-red-600 font-black uppercase tracking-widest">Precio Contado</span>
                <div className="text-4xl font-black text-white">
                   {vehiculo.precioVisible ? formatter.format(vehiculo.precio) : 'CONSULTAR'}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm mb-6">
                <div className="flex flex-col bg-black p-3 border-2 border-red-900/30">
                  <span className="text-red-600 text-xs uppercase font-black">Combustible</span>
                  <span className="font-bold text-white">{vehiculo.combustible}</span>
                </div>
                <div className="flex flex-col bg-black p-3 border-2 border-red-900/30">
                  <span className="text-red-600 text-xs uppercase font-black">Transmisión</span>
                  <span className="font-bold text-white">{vehiculo.transmision}</span>
                </div>
                <div className="flex flex-col bg-black p-3 border-2 border-red-900/30">
                  <span className="text-red-600 text-xs uppercase font-black">Motor</span>
                  <span className="font-bold text-white">{vehiculo.motor}</span>
                </div>
                <div className="flex flex-col bg-black p-3 border-2 border-red-900/30">
                  <span className="text-red-600 text-xs uppercase font-black">Color</span>
                  <span className="font-bold text-white">{vehiculo.color}</span>
                </div>
              </div>

              {/* Form */}
              <div className="mt-6">
                <h3 className="font-black text-white mb-4 flex items-center gap-2 uppercase tracking-wide">
                   <MessageCircle className="h-5 w-5 text-red-600" />
                   Contactar Vendedor
                </h3>

                {formStatus === 'success' ? (
                  <div className="bg-red-600 text-white p-4 rounded-none flex items-center gap-3 border-2 border-red-500">
                    <Check className="h-6 w-6" />
                    <div>
                      <p className="font-black uppercase">¡Mensaje enviado!</p>
                      <p className="text-sm font-bold">Te responderemos a la brevedad.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="text"
                      placeholder="NOMBRE Y APELLIDO"
                      required
                      className="w-full bg-black border-2 border-red-900/30 rounded-none px-4 py-3 focus:ring-2 focus:ring-red-600 focus:border-red-600 focus:outline-none transition-all placeholder-gray-600 text-sm text-white font-bold"
                    />
                    <input
                      type="text"
                      placeholder="TELÉFONO DE CONTACTO"
                      required
                      className="w-full bg-black border-2 border-red-900/30 rounded-none px-4 py-3 focus:ring-2 focus:ring-red-600 focus:border-red-600 focus:outline-none transition-all placeholder-gray-600 text-sm text-white font-bold"
                    />
                    <textarea
                      rows={3}
                      placeholder="MENSAJE..."
                      defaultValue={`Hola, me interesa el ${vehiculo.marca.nombre} ${vehiculo.modelo.nombre}.`}
                      className="w-full bg-black border-2 border-red-900/30 rounded-none px-4 py-3 focus:ring-2 focus:ring-red-600 focus:border-red-600 focus:outline-none transition-all resize-none placeholder-gray-600 text-sm text-white font-bold"
                    />
                    <button type="submit" className="w-full bg-red-600 text-white font-black py-3.5 rounded-none hover:bg-red-700 transition-all shadow-lg shadow-red-900/50 hover:shadow-red-600/50 border-2 border-red-500 uppercase tracking-wide">
                      Enviar Mensaje
                    </button>
                  </form>
                )}

                <div className="mt-4 pt-4 border-t-2 border-red-900/30 text-center">
                  <a href="https://wa.me/5491147885555" target="_blank" rel="noreferrer" className="inline-flex items-center text-white font-black hover:text-red-500 gap-2 bg-[#25D366] px-4 py-2 rounded-none transition-colors border-2 border-black uppercase">
                     <Phone className="h-4 w-4" /> WhatsApp Directo
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:hidden bg-zinc-900 rounded-none p-6 shadow-2xl border-2 border-red-900/30">
              <h2 className="text-xl font-black mb-4 text-red-600 uppercase">Descripción</h2>
              <p className="text-gray-300 leading-7 whitespace-pre-line font-medium">
                {vehiculo.descripcion}
              </p>
            </div>
          </div>
        </div>

        {/* Related Vehicles */}
        {relacionados.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl font-black mb-8 text-white uppercase tracking-tight">Similares a este vehículo</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {relacionados.map(v => (
                <VehicleCard key={v.id} vehiculo={v} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleDetail;
import React from 'react';
import { Link } from 'react-router-dom';
import { useVehicles } from '../context/VehicleContext';
import VehicleCard from '../components/VehicleCard';
import { ArrowRight, CheckCircle, Shield, Clock } from 'lucide-react';
import QuoteModal from '../components/QuoteModal';

const Home: React.FC = () => {
  const { getDestacados, vehicles } = useVehicles();
  const destacados = getDestacados();
  const totalVehiculos = vehicles.length;
  const [isQuoteModalOpen, setIsQuoteModalOpen] = React.useState(false);

  return (
    <div className="space-y-16 pb-12 bg-zinc-950">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-24 px-4 overflow-hidden min-h-[600px]">
        {/* Background Image - Smaller and positioned right */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-contain bg-right bg-no-repeat opacity-60 z-0" style={{backgroundImage: "url('/bmw-rojo.webp')"}}></div>
        {/* Background Overlay with RED gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent z-10"></div>
        {/* Animated red glow effect */}
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-pulse z-[5]"></div>

        <div className="container mx-auto relative z-20 flex flex-col md:flex-row items-center">
          <div className="md:w-3/5 space-y-8">
            <div className="inline-block bg-red-600/20 backdrop-blur-md px-5 py-2 rounded-lg text-sm font-semibold border border-red-600/50 text-red-400 shadow-lg shadow-red-900/50">
              NUEVA COLECCIÓN 2026
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
              TU PRÓXIMO AUTO <br />
              <span className="text-red-600 drop-shadow-[0_0_30px_rgba(220,38,38,0.5)]">ESTÁ AQUÍ.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-lg leading-relaxed font-normal">
              En <strong className="text-red-500">Tu Concesionaria</strong> seleccionamos los mejores vehículos de Argentina.
              Más de {totalVehiculos} unidades verificadas con financiación exclusiva.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link
                to="/vehiculos"
                className="inline-flex justify-center items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-all shadow-2xl shadow-red-900/50 hover:shadow-red-600/50 hover:scale-105 transform duration-300 border border-red-500"
              >
                VER CATÁLOGO
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="https://wa.me/5491147885555?text=Hola!%20Estoy%20interesado%20en%20un%20vehículo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-lg font-bold text-lg text-white border border-red-600 hover:border-red-500 hover:bg-red-600/20 transition-all backdrop-blur-sm"
              >
                CONTACTAR ASESOR
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 -mt-10 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900 p-8 rounded-xl shadow-2xl border border-red-900/50 flex items-start gap-5 hover:-translate-y-2 hover:border-red-600 transition-all duration-300 hover:shadow-red-900/50">
            <div className="bg-red-600 p-4 rounded-lg text-white border border-red-500">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white mb-2 uppercase">Verificados 100%</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Inspección mecánica rigurosa de 200 puntos en todos nuestros ingresos.</p>
            </div>
          </div>
          <div className="bg-zinc-900 p-8 rounded-xl shadow-2xl border border-red-900/50 flex items-start gap-5 hover:-translate-y-2 hover:border-red-600 transition-all duration-300 hover:shadow-red-900/50">
            <div className="bg-red-600 p-4 rounded-lg text-white border border-red-500">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white mb-2 uppercase">Garantía Escrita</h3>
              <p className="text-gray-400 text-sm leading-relaxed">3 meses de garantía de motor y caja en usados seleccionados.</p>
            </div>
          </div>
          <div className="bg-zinc-900 p-8 rounded-xl shadow-2xl border border-red-900/50 flex items-start gap-5 hover:-translate-y-2 hover:border-red-600 transition-all duration-300 hover:shadow-red-900/50">
            <div className="bg-red-600 p-4 rounded-lg text-white border border-red-500">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white mb-2 uppercase">Entrega Inmediata</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Gestoría propia. Te llevas el auto transferido en el día.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Destacados */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-4xl font-bold text-white tracking-tight uppercase">Destacados de la Semana</h2>
            <p className="text-red-500 mt-3 text-lg font-semibold">Oportunidades únicas seleccionadas por nuestros expertos.</p>
          </div>
          <Link to="/vehiculos" className="group flex items-center gap-2 text-red-600 font-bold border-b-2 border-red-600 pb-1 hover:text-red-500 hover:border-red-500 transition-all uppercase">
            Ver inventario completo
            <ArrowRight className="h-5 w-5 transform group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destacados.map(v => (
            <VehicleCard key={v.id} vehiculo={v} />
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 mb-12">
        <div className="bg-black rounded-xl p-12 text-center text-white relative overflow-hidden border-2 border-red-600 shadow-2xl shadow-red-900/50">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-950/50 to-transparent"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-red-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight">¿Querés vender tu auto?</h2>
            <p className="text-gray-300 text-lg font-normal">Tomamos tu usado al mejor precio del mercado. Cotización inmediata y pago en el acto.</p>
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="bg-red-600 text-white px-10 py-4 rounded-lg font-bold hover:bg-red-700 transition-all shadow-2xl shadow-red-900/50 hover:shadow-red-600/50 hover:scale-105 transform duration-300 border border-red-500 uppercase text-lg"
            >
              Cotizar mi auto
            </button>
          </div>
        </div>
      </section>

      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
    </div>
  );
};

export default Home;
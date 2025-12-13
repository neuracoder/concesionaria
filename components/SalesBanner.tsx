import React, { useState } from 'react';
import { X, Rocket } from 'lucide-react';

const SalesBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      {/* Banner principal */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 border-t-4 border-blue-400 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Contenido de texto */}
            <div className="flex items-start gap-3 text-center md:text-left flex-1">
              <Rocket className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-1 hidden md:block" />
              <div>
                <p className="text-white text-sm md:text-base leading-relaxed">
                  <span className="font-semibold">¿Tenés una Agencia de Autos?</span>
                  <br className="md:hidden" />
                  <span className="hidden md:inline"> </span>
                  Tené tu propio sitio web profesional igual a este por{' '}
                  <span className="font-bold text-yellow-300 text-lg md:text-xl">
                    $350.000
                  </span>{' '}
                  <span className="text-blue-200 text-sm">(Pago único)</span>
                </p>
              </div>
            </div>

            {/* Botón de acción */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              {/* Botón principal - Email */}
              <a
                href="mailto:contact@neuracoder.com?subject=Quiero mi sitio web para mi agencia&body=Hola, me interesa tener un sitio web como autos-neura para mi agencia de autos. Me gustaría recibir más información."
                className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2 group"
              >
                <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>¡Quiero esto!</span>
              </a>
            </div>

            {/* Botón cerrar */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-2 right-2 md:relative md:top-0 md:right-0 text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all duration-200 group"
              aria-label="Cerrar banner"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Barra de resplandor sutil en la parte superior del banner */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-300 to-transparent opacity-50"></div>
    </div>
  );
};

export default SalesBanner;

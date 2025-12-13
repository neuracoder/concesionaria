import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Lock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8 mt-auto border-t-2 border-red-600 mb-28 md:mb-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-2xl font-bold mb-6 uppercase tracking-tight text-red-600">Tu Concesionaria</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-normal">
              Tu concesionaria de confianza en Argentina. Especialistas en vehículos seleccionados de alta gama y utilitarios.
              Garantía, financiación y el mejor servicio post-venta.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-wide">Contacto</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3 group hover:text-red-500 transition-colors cursor-pointer">
                <div className="bg-red-600 p-2 rounded-lg group-hover:bg-red-700 border border-red-500">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="font-semibold">Av. Libertador 4500, Buenos Aires</span>
              </li>
              <li className="flex items-center gap-3 group hover:text-red-500 transition-colors cursor-pointer">
                <div className="bg-red-600 p-2 rounded-lg group-hover:bg-red-700 border border-red-500">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="font-semibold">(011) 4788-5555</span>
              </li>
              <li className="flex items-center gap-3 group hover:text-red-500 transition-colors cursor-pointer">
                <div className="bg-red-600 p-2 rounded-lg group-hover:bg-red-700 border border-red-500">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="font-semibold">ventas@tuconcesionaria.com.ar</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-wide">Horarios de Atención</h3>
            <ul className="space-y-3 text-gray-400 text-sm font-semibold">
              <li className="flex justify-between border-b border-red-900/30 pb-2">
                <span>Lunes a Viernes</span>
                <span className="font-bold text-red-500">9:00 - 19:00</span>
              </li>
              <li className="flex justify-between border-b border-red-900/30 pb-2">
                <span>Sábados</span>
                <span className="font-bold text-red-500">10:00 - 14:00</span>
              </li>
              <li className="flex justify-between pt-1">
                <span>Domingos y Feriados</span>
                <span className="text-gray-600 font-bold">CERRADO</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-red-900/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          {/* Copyright & Hidden Admin Access */}
          <div className="flex items-center gap-2 order-2 md:order-1 mt-4 md:mt-0">
             <p className="font-semibold">&copy; 2024 Autos-Neura S.A. Todos los derechos reservados.</p>
             <Link
               to="/admin/login"
               className="opacity-10 hover:opacity-100 transition-opacity p-2 text-red-600"
               title="Acceso Administrativo"
             >
               <Lock className="h-3 w-3" />
             </Link>
          </div>

          {/* Legal Links - Right Side */}
          <div className="flex gap-4 items-center order-1 md:order-2 font-semibold">
             <a href="#" className="hover:text-red-500 transition-colors uppercase">Privacidad</a>
             <a href="#" className="hover:text-red-500 transition-colors uppercase">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
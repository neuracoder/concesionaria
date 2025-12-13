import React from 'react';
import { Shield, Users, Award, Clock } from 'lucide-react';

const About: React.FC = () => {
    return (
        <div className="bg-zinc-950 min-h-screen pb-12">
            {/* Hero Section */}
            <div className="bg-black text-white py-20 border-b-4 border-red-600">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tighter">Sobre Nosotros</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto font-bold">
                        Más de 10 años brindando confianza, seguridad y los mejores vehículos seleccionados del mercado.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-zinc-900 p-6 rounded-none shadow-2xl shadow-red-900/50 border-2 border-red-900/30 flex flex-col items-center text-center hover:transform hover:-translate-y-2 hover:border-red-600 transition-all duration-300">
                        <div className="bg-red-600 p-4 rounded-none mb-4 border-2 border-red-500">
                            <Shield className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-black mb-2 text-white uppercase">Seguridad Total</h3>
                        <p className="text-gray-400 text-sm font-medium">
                            Todos nuestros vehículos pasan por una rigurosa inspección mecánica y legal antes de salir a la venta.
                        </p>
                    </div>

                    <div className="bg-zinc-900 p-6 rounded-none shadow-2xl shadow-red-900/50 border-2 border-red-900/30 flex flex-col items-center text-center hover:transform hover:-translate-y-2 hover:border-red-600 transition-all duration-300">
                        <div className="bg-red-600 p-4 rounded-none mb-4 border-2 border-red-500">
                            <Users className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-black mb-2 text-white uppercase">Atención Personalizada</h3>
                        <p className="text-gray-400 text-sm font-medium">
                            Nuestro equipo de asesores te acompañará en cada paso para encontrar el auto que se adapta a tus necesidades.
                        </p>
                    </div>

                    <div className="bg-zinc-900 p-6 rounded-none shadow-2xl shadow-red-900/50 border-2 border-red-900/30 flex flex-col items-center text-center hover:transform hover:-translate-y-2 hover:border-red-600 transition-all duration-300">
                        <div className="bg-red-600 p-4 rounded-none mb-4 border-2 border-red-500">
                            <Award className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-black mb-2 text-white uppercase">Calidad Garantizada</h3>
                        <p className="text-gray-400 text-sm font-medium">
                            Trabajamos solo con las mejores marcas y modelos, asegurando que te lleves un vehículo en excelentes condiciones.
                        </p>
                    </div>

                    <div className="bg-zinc-900 p-6 rounded-none shadow-2xl shadow-red-900/50 border-2 border-red-900/30 flex flex-col items-center text-center hover:transform hover:-translate-y-2 hover:border-red-600 transition-all duration-300">
                        <div className="bg-red-600 p-4 rounded-none mb-4 border-2 border-red-500">
                            <Clock className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-black mb-2 text-white uppercase">Rapidez en Trámites</h3>
                        <p className="text-gray-400 text-sm font-medium">
                            Nos encargamos de toda la gestión de papeles y transferencias para que disfrutes de tu auto cuanto antes.
                        </p>
                    </div>
                </div>
            </div>

            {/* Compromiso Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="w-full md:w-1/2">
                        <img
                            src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                            alt="Oficina de Autos-Neura"
                            className="rounded-none shadow-2xl shadow-red-900/50 border-4 border-red-900/30"
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <h2 className="text-3xl font-black mb-6 text-white uppercase tracking-tight">Nuestro Compromiso</h2>
                        <p className="text-gray-300 mb-6 leading-relaxed font-medium">
                            En <strong className="text-red-500">Tu Concesionaria</strong>, entendemos que comprar un auto es una decisión importante. Por eso, nos dedicamos a construir relaciones duraderas con nuestros clientes basadas en la transparencia y la honestidad.
                        </p>
                        <p className="text-gray-300 mb-6 leading-relaxed font-medium">
                            No somos solo una concesionaria, somos tu socio de confianza en el camino. Ya sea que busques tu primer auto, necesites renovar tu vehículo familiar o quieras darte un gusto con un modelo deportivo, estamos aquí para hacerlo realidad.
                        </p>
                        <div className="bg-zinc-900 p-4 rounded-none border-l-4 border-red-600 shadow-lg shadow-red-900/30">
                            <p className="italic text-white font-bold">
                                "La calidad no es un acto, es un hábito. En Tu Concesionaria, la excelencia es nuestro motor diario."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
    const contactInfo = {
        email: 'contacto@tu-concesionaria.com.ar',
        phone: '(011) 5555-1234',
        address: 'Av. del Libertador 4500, Buenos Aires, Argentina',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3286.186626182054!2d-58.44522668477138!3d-34.54882998047385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb436efe79dbd%3A0xfb39ce2697b83d1b!2sAv.%20del%20Libertador%204500%2C%20C1426BXD%20CABA!5e0!3m2!1ses!2sar!4v1625686000000!5m2!1ses!2sar'
    };

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate sending email
        const subject = encodeURIComponent(`Consulta de ${formData.name}`);
        const body = encodeURIComponent(`${formData.message}\n\nContacto: ${formData.email}`);
        window.open(`mailto:${contactInfo.email}?subject=${subject}&body=${body}`);
    };

    return (
        <div className="bg-zinc-950 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-12 text-white uppercase tracking-tight">Contáctanos</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Contact Info & Map */}
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-zinc-900 p-6 rounded-xl shadow-2xl shadow-red-900/50 border border-red-900/30">
                                <div className="bg-red-600 w-10 h-10 rounded-lg flex items-center justify-center mb-4 border border-red-500">
                                    <Phone className="h-5 w-5 text-white" />
                                </div>
                                <h3 className="font-bold text-white mb-1 uppercase">Teléfono</h3>
                                <p className="text-gray-400 text-sm font-semibold">{contactInfo.phone}</p>
                            </div>
                            <div className="bg-zinc-900 p-6 rounded-xl shadow-2xl shadow-red-900/50 border border-red-900/30">
                                <div className="bg-red-600 w-10 h-10 rounded-lg flex items-center justify-center mb-4 border border-red-500">
                                    <Mail className="h-5 w-5 text-white" />
                                </div>
                                <h3 className="font-bold text-white mb-1 uppercase">Email</h3>
                                <p className="text-gray-400 text-sm break-all font-semibold">{contactInfo.email}</p>
                            </div>
                        </div>

                        <div className="bg-zinc-900 p-6 rounded-xl shadow-2xl shadow-red-900/50 border border-red-900/30 h-[400px] flex flex-col">
                            <div className="flex items-center gap-2 mb-4">
                                <MapPin className="h-5 w-5 text-red-600" />
                                <h3 className="font-bold text-white uppercase tracking-wide">Nuestra Ubicación</h3>
                            </div>
                            <div className="flex-grow bg-black rounded-lg overflow-hidden border border-red-900/30">
                                <iframe
                                    src={contactInfo.mapUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Ubicación"
                                ></iframe>
                            </div>
                            <p className="mt-4 text-sm text-gray-400 font-semibold">{contactInfo.address}</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-zinc-900 p-8 rounded-xl shadow-2xl shadow-red-900/50 border border-red-900/30">
                        <h2 className="text-2xl font-bold mb-6 text-white uppercase tracking-tight">Envíanos un mensaje</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-red-600 mb-2 uppercase tracking-wide">Nombre Completo</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-red-900/30 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition-all bg-black text-white font-semibold placeholder-gray-600"
                                    placeholder="TU NOMBRE"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-red-600 mb-2 uppercase tracking-wide">Correo Electrónico</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-red-900/30 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition-all bg-black text-white font-semibold placeholder-gray-600"
                                    placeholder="TUCORREO@EJEMPLO.COM"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-red-600 mb-2 uppercase tracking-wide">Mensaje</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-lg border border-red-900/30 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition-all resize-none bg-black text-white font-semibold placeholder-gray-600"
                                    placeholder="¿EN QUÉ PODEMOS AYUDARTE?"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-red-600 text-white py-4 rounded-lg font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-red-900/50 hover:shadow-red-600/50 border border-red-500 uppercase tracking-wide"
                            >
                                <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                Enviar Mensaje
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;

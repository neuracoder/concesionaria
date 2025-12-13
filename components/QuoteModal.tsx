import React, { useState, useEffect, useRef } from 'react';
import { X, Upload, CheckCircle, AlertCircle, Loader, Camera } from 'lucide-react';

interface QuoteModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Marca {
    id: number;
    nombre: string;
}

interface Modelo {
    id: number;
    marcaId: number;
    nombre: string;
}

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
    const [marcas, setMarcas] = useState<Marca[]>([]);
    const [modelos, setModelos] = useState<Modelo[]>([]);
    const [filteredModelos, setFilteredModelos] = useState<Modelo[]>([]);

    const [formData, setFormData] = useState({
        marcaId: '',
        modeloId: '',
        ano: new Date().getFullYear(),
        kilometraje: '',
        combustible: 'Nafta',
        transmision: 'Manual',
        color: '',
        descripcion: '',
        telefono: '',
        email: '',
        nombre: ''
    });

    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Fetch brands and models
        Promise.all([
            fetch('http://localhost:3001/api/marcas').then(res => res.json()),
            fetch('http://localhost:3001/api/modelos').then(res => res.json())
        ]).then(([brandsData, modelsData]) => {
            setMarcas(brandsData);
            setModelos(modelsData);
        }).catch(err => console.error("Error fetching data:", err));
    }, []);

    useEffect(() => {
        if (formData.marcaId) {
            setFilteredModelos(modelos.filter(m => m.marcaId === parseInt(formData.marcaId)));
        } else {
            setFilteredModelos([]);
        }
    }, [formData.marcaId, modelos]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newImages: string[] = [];
            const files = Array.from(e.target.files);

            if (images.length + files.length > 5) {
                setError("Máximo 5 fotos permitidas.");
                return;
            }

            files.forEach((file: any) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (typeof reader.result === 'string') {
                        setImages(prev => [...prev, reader.result as string]);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const payload = {
            ...formData,
            imagenes: images
        };

        try {
            const response = await fetch('http://localhost:3001/api/quote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => {
                    onClose();
                    setSuccess(false);
                    setImages([]);
                    setFormData({
                        marcaId: '',
                        modeloId: '',
                        ano: new Date().getFullYear(),
                        kilometraje: '',
                        combustible: 'Nafta',
                        transmision: 'Manual',
                        color: '',
                        descripcion: '',
                        telefono: '',
                        email: '',
                        nombre: ''
                    });
                }, 3000);
            } else {
                throw new Error('Error al enviar la cotización');
            }
        } catch (err) {
            console.error(err);
            setError("Hubo un problema al enviar tu solicitud. Intenta nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <div className="bg-zinc-900 rounded-xl shadow-2xl shadow-red-900/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-red-900/30">
                <div className="p-6 border-b border-red-900/30 flex justify-between items-center sticky top-0 bg-zinc-900 z-10">
                    <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Cotizar mi Auto</h2>
                    <button onClick={onClose} className="p-2 hover:bg-red-600 rounded-lg transition-colors border border-red-900/30 hover:border-red-500">
                        <X className="h-6 w-6 text-white" />
                    </button>
                </div>

                {success ? (
                    <div className="p-12 text-center flex flex-col items-center justify-center space-y-4">
                        <div className="bg-red-600 p-4 rounded-xl border border-red-500">
                            <CheckCircle className="h-16 w-16 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white uppercase">¡Solicitud Enviada!</h3>
                        <p className="text-gray-300 font-semibold">Recibimos los datos de tu vehículo. Te contactaremos a la brevedad con una cotización.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">

                        {/* Contact Info */}
                        <div className="bg-black p-4 rounded-lg space-y-4 border border-red-900/30">
                            <h3 className="font-bold text-white flex items-center gap-2 uppercase tracking-wide">
                                <span className="bg-red-600 text-white w-6 h-6 rounded-md flex items-center justify-center text-xs border border-red-500">1</span>
                                Tus Datos
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input required name="nombre" placeholder="NOMBRE COMPLETO" value={formData.nombre} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-red-900/30 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none bg-zinc-900 text-white font-semibold placeholder-gray-600" />
                                <input required name="telefono" type="tel" placeholder="TELÉFONO / WHATSAPP" value={formData.telefono} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-red-900/30 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none bg-zinc-900 text-white font-semibold placeholder-gray-600" />
                                <input required name="email" type="email" placeholder="CORREO ELECTRÓNICO" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-red-900/30 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none md:col-span-2 bg-zinc-900 text-white font-semibold placeholder-gray-600" />
                            </div>
                        </div>

                        {/* Vehicle Info */}
                        <div className="bg-black p-4 rounded-lg space-y-4 border border-red-900/30">
                            <h3 className="font-bold text-white flex items-center gap-2 uppercase tracking-wide">
                                <span className="bg-red-600 text-white w-6 h-6 rounded-md flex items-center justify-center text-xs border border-red-500">2</span>
                                Datos del Vehículo
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <select required name="marcaId" value={formData.marcaId} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-red-900/30 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none bg-zinc-900 text-white font-semibold">
                                    <option value="">SELECCIONAR MARCA</option>
                                    {marcas.map(m => <option key={m.id} value={m.id}>{m.nombre.toUpperCase()}</option>)}
                                </select>
                                <select required name="modeloId" value={formData.modeloId} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-red-900/30 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none bg-zinc-900 text-white font-semibold disabled:opacity-50" disabled={!formData.marcaId}>
                                    <option value="">SELECCIONAR MODELO</option>
                                    {filteredModelos.map(m => <option key={m.id} value={m.id}>{m.nombre.toUpperCase()}</option>)}
                                </select>
                                <input required name="ano" type="number" placeholder="AÑO" value={formData.ano} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-red-900/30 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none bg-zinc-900 text-white font-semibold placeholder-gray-600" />
                                <input required name="kilometraje" type="number" placeholder="KILOMETRAJE" value={formData.kilometraje} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-red-900/30 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none bg-zinc-900 text-white font-semibold placeholder-gray-600" />
                                <select name="combustible" value={formData.combustible} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-red-900/30 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none bg-zinc-900 text-white font-semibold">
                                    <option>NAFTA</option>
                                    <option>DIESEL</option>
                                    <option>GNC</option>
                                    <option>HÍBRIDO</option>
                                </select>
                                <select name="transmision" value={formData.transmision} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-red-900/30 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none bg-zinc-900 text-white font-semibold">
                                    <option>MANUAL</option>
                                    <option>AUTOMÁTICA</option>
                                </select>
                                <input name="color" placeholder="COLOR" value={formData.color} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-red-900/30 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none bg-zinc-900 text-white font-semibold placeholder-gray-600" />
                                <textarea name="descripcion" placeholder="DETALLES ADICIONALES (OPCIONAL)" value={formData.descripcion} onChange={handleInputChange} rows={2} className="w-full px-4 py-2 rounded-lg border border-red-900/30 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none md:col-span-2 bg-zinc-900 text-white font-semibold placeholder-gray-600" />
                            </div>
                        </div>

                        {/* Photos */}
                        <div className="bg-black p-4 rounded-lg space-y-4 border border-red-900/30">
                            <h3 className="font-bold text-white flex items-center gap-2 uppercase tracking-wide">
                                <span className="bg-red-600 text-white w-6 h-6 rounded-md flex items-center justify-center text-xs border border-red-500">3</span>
                                Fotos (Máx 5)
                            </h3>
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                                {images.map((img, idx) => (
                                    <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-red-900/30">
                                        <img src={img} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
                                        <button type="button" onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity border border-red-500">
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}

                                {images.length < 5 && (
                                    <button type="button" onClick={() => fileInputRef.current?.click()} className="aspect-square rounded-lg border border-dashed border-red-600 hover:border-red-500 flex flex-col items-center justify-center text-red-600 hover:text-red-500 transition-colors bg-zinc-900">
                                        <Camera className="h-6 w-6 mb-1" />
                                        <span className="text-xs font-bold uppercase">Agregar</span>
                                    </button>
                                )}
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                            />
                        </div>

                        {error && (
                            <div className="bg-red-600 text-white p-4 rounded-lg flex items-center gap-2 text-sm font-semibold border border-red-500">
                                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-red-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-2xl shadow-red-900/50 hover:shadow-red-600/50 hover:scale-105 transform border border-red-500 uppercase tracking-wide"
                        >
                            {loading ? (
                                <>
                                    <Loader className="h-5 w-5 animate-spin" />
                                    ENVIANDO...
                                </>
                            ) : (
                                "ENVIAR COTIZACIÓN"
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default QuoteModal;

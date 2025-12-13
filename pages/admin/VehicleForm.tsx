import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useVehicles } from '../../context/VehicleContext';
import { Condicion, Combustible, Transmision, Vehiculo } from '../../types';
import { ArrowLeft, Save, Plus, X, Upload, Image as ImageIcon, Type, List, Loader2 } from 'lucide-react';
import { optimizeImage } from '../../services/imageOptimizer';

const VehicleForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { addVehicle, updateVehicle, vehicles, marcas, modelos, addCustomMarca, addCustomModelo } = useVehicles();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  // Toggle states for custom inputs
  const [isCustomMarca, setIsCustomMarca] = useState(false);
  const [isCustomModelo, setIsCustomModelo] = useState(false);

  // Separate states for text inputs vs select inputs
  const [customMarcaName, setCustomMarcaName] = useState('');
  const [customModeloName, setCustomModeloName] = useState('');

  const [formData, setFormData] = useState({
    marcaId: '',
    modeloId: '',
    año: new Date().getFullYear(),
    condicion: Condicion.USADO,
    combustible: Combustible.NAFTA,
    transmision: Transmision.MANUAL,
    kilometraje: 0,
    motor: '',
    puertas: 4,
    color: '',
    precio: 0,
    precioVisible: true,
    disponible: true,
    destacado: false,
    descripcion: '',
    imagenes: [] as string[] // Array of strings (URLs or Base64)
  });

  useEffect(() => {
    if (id) {
      const vehicleToEdit = vehicles.find(v => v.id === parseInt(id));
      if (vehicleToEdit) {
        setFormData({
          marcaId: vehicleToEdit.marca.id.toString(),
          modeloId: vehicleToEdit.modelo.id.toString(),
          año: vehicleToEdit.año,
          condicion: vehicleToEdit.condicion,
          combustible: vehicleToEdit.combustible,
          transmision: vehicleToEdit.transmision,
          kilometraje: vehicleToEdit.kilometraje,
          motor: vehicleToEdit.motor,
          puertas: vehicleToEdit.puertas,
          color: vehicleToEdit.color,
          precio: vehicleToEdit.precio,
          precioVisible: vehicleToEdit.precioVisible,
          disponible: vehicleToEdit.disponible,
          destacado: vehicleToEdit.destacado,
          descripcion: vehicleToEdit.descripcion,
          imagenes: vehicleToEdit.imagenes.map(img => img.url)
        });
      }
    }
  }, [id, vehicles]);

  const availableModels = modelos.filter(m => m.marcaId === parseInt(formData.marcaId));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: val,
      // If changing brand via select, reset model (only if not loading initial data)
      ...(name === 'marcaId' && !id ? { modeloId: '' } : {})
    }));
  };

  // --- Image Handling ---

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsOptimizing(true);
      const files = Array.from(e.target.files);

      try {
        const optimizedPromises = files.map(file => optimizeImage(file));
        const optimizedImages = await Promise.all(optimizedPromises);

        setFormData(prev => ({
          ...prev,
          imagenes: [...prev.imagenes, ...optimizedImages]
        }));
      } catch (error) {
        console.error("Error optimizing images:", error);
        alert("Hubo un error al procesar las imágenes.");
      } finally {
        setIsOptimizing(false);
      }
    }
  };

  const handleAddUrl = () => {
    const url = prompt("Ingrese la URL de la imagen:");
    if (url) {
      setFormData(prev => ({ ...prev, imagenes: [...prev.imagenes, url] }));
    }
  };

  const removeImage = (index: number) => {
    const newImages = formData.imagenes.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, imagenes: newImages }));
  };

  // --- Submit Handling ---

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let finalMarca;
    let finalModelo;

    // Resolve Marca
    if (isCustomMarca) {
      if (!customMarcaName.trim()) {
        alert("Por favor escriba el nombre de la marca");
        return;
      }
      finalMarca = await addCustomMarca(customMarcaName);
    } else {
      finalMarca = marcas.find(m => m.id === parseInt(formData.marcaId));
    }

    if (!finalMarca) {
      alert("Error al seleccionar la marca");
      return;
    }

    // Resolve Modelo
    if (isCustomModelo || isCustomMarca) {
      // If brand is custom, model MUST be custom input
      if (!customModeloName.trim()) {
        alert("Por favor escriba el nombre del modelo");
        return;
      }
      finalModelo = await addCustomModelo(customModeloName, finalMarca.id);
    } else {
      finalModelo = modelos.find(m => m.id === parseInt(formData.modeloId));
    }

    if (!finalModelo) {
      alert("Error al seleccionar el modelo");
      return;
    }

    if (formData.imagenes.length === 0) {
      alert("Debe agregar al menos una imagen");
      return;
    }

    const vehicleData: Vehiculo = {
      id: id ? parseInt(id) : Date.now(),
      marca: finalMarca,
      modelo: finalModelo,
      año: Number(formData.año),
      condicion: formData.condicion,
      combustible: formData.combustible,
      transmision: formData.transmision,
      kilometraje: Number(formData.kilometraje),
      motor: formData.motor,
      puertas: Number(formData.puertas),
      color: formData.color,
      precio: Number(formData.precio),
      precioVisible: formData.precioVisible,
      disponible: formData.disponible,
      destacado: formData.destacado,
      descripcion: formData.descripcion,
      slug: id ? vehicles.find(v => v.id === parseInt(id))?.slug || `${finalMarca.slug}-${finalModelo.nombre.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}` : `${finalMarca.slug}-${finalModelo.nombre.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      imagenes: formData.imagenes.map((url, index) => ({ url, orden: index + 1 })),
      vistas: id ? vehicles.find(v => v.id === parseInt(id))?.vistas || 0 : 0
    };

    if (id) {
      updateVehicle(parseInt(id), vehicleData);
    } else {
      addVehicle(vehicleData);
    }
    navigate('/admin/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/admin/dashboard')} className="text-gray-500 hover:text-gray-900">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">{id ? 'Editar Vehículo' : 'Nuevo Vehículo'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Images Upload Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
            <ImageIcon className="h-5 w-5" /> Imágenes del Vehículo
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-4">
            {formData.imagenes.map((url, index) => (
              <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}

            {/* Upload Button */}
            <div
              onClick={() => !isOptimizing && fileInputRef.current?.click()}
              className={`aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer transition-colors ${isOptimizing ? 'bg-gray-50 cursor-not-allowed opacity-75' : 'hover:border-blue-500 hover:bg-blue-50 text-gray-400 hover:text-blue-500'
                }`}
            >
              {isOptimizing ? (
                <>
                  <Loader2 className="h-8 w-8 mb-2 animate-spin text-blue-600" />
                  <span className="text-xs font-medium text-center px-2 text-blue-600">Optimizando...</span>
                </>
              ) : (
                <>
                  <Upload className="h-8 w-8 mb-2" />
                  <span className="text-xs font-medium text-center px-2">Subir Fotos</span>
                </>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              multiple
              className="hidden"
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 italic">{formData.imagenes.length} imágenes seleccionadas</span>
            <button type="button" onClick={handleAddUrl} className="text-blue-600 hover:underline">
              Agregar por URL externa
            </button>
          </div>
        </div>

        {/* Basic Info */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold mb-4 text-gray-800">Información Principal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* MARCA SELECTOR */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">Marca</label>
                <button
                  type="button"
                  onClick={() => {
                    setIsCustomMarca(!isCustomMarca);
                    setIsCustomModelo(true); // If brand is custom, model must be custom
                  }}
                  className="text-xs text-blue-600 font-medium flex items-center gap-1 hover:text-blue-800"
                >
                  {isCustomMarca ? <><List className="h-3 w-3" /> Elegir de lista</> : <><Type className="h-3 w-3" /> Ingresar manual</>}
                </button>
              </div>

              {isCustomMarca ? (
                <input
                  type="text"
                  value={customMarcaName}
                  onChange={(e) => setCustomMarcaName(e.target.value)}
                  placeholder="Ej: Ferrari"
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-900 focus:border-gray-900 px-3 py-2 bg-white border"
                />
              ) : (
                <select
                  name="marcaId"
                  value={formData.marcaId}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-900 focus:border-gray-900 px-3 py-2 bg-gray-50 border"
                >
                  <option value="">Seleccionar Marca</option>
                  {marcas.map(m => (
                    <option key={m.id} value={m.id}>{m.nombre}</option>
                  ))}
                </select>
              )}
            </div>

            {/* MODELO SELECTOR */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">Modelo</label>
                {!isCustomMarca && (
                  <button
                    type="button"
                    onClick={() => setIsCustomModelo(!isCustomModelo)}
                    className="text-xs text-blue-600 font-medium flex items-center gap-1 hover:text-blue-800"
                  >
                    {isCustomModelo ? <><List className="h-3 w-3" /> Elegir de lista</> : <><Type className="h-3 w-3" /> Ingresar manual</>}
                  </button>
                )}
              </div>

              {isCustomModelo || isCustomMarca ? (
                <input
                  type="text"
                  value={customModeloName}
                  onChange={(e) => setCustomModeloName(e.target.value)}
                  placeholder="Ej: F50 Spider"
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-900 focus:border-gray-900 px-3 py-2 bg-white border"
                />
              ) : (
                <select
                  name="modeloId"
                  value={formData.modeloId}
                  onChange={handleChange}
                  disabled={!formData.marcaId}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-900 focus:border-gray-900 px-3 py-2 bg-gray-50 border disabled:opacity-50"
                >
                  <option value="">Seleccionar Modelo</option>
                  {availableModels.map(m => (
                    <option key={m.id} value={m.id}>{m.nombre}</option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Año</label>
              <input
                type="number"
                name="año"
                value={formData.año}
                onChange={handleChange}
                required
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-900 focus:border-gray-900 px-3 py-2 bg-gray-50 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Condición</label>
              <select
                name="condicion"
                value={formData.condicion}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-900 focus:border-gray-900 px-3 py-2 bg-gray-50 border"
              >
                {Object.values(Condicion).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Tech Specs */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold mb-4 text-gray-800">Especificaciones Técnicas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kilometraje</label>
              <input
                type="number"
                name="kilometraje"
                value={formData.kilometraje}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-900 focus:border-gray-900 px-3 py-2 bg-gray-50 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Motor</label>
              <input
                type="text"
                name="motor"
                value={formData.motor}
                onChange={handleChange}
                placeholder="Ej: 1.4 Turbo"
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-900 focus:border-gray-900 px-3 py-2 bg-gray-50 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-900 focus:border-gray-900 px-3 py-2 bg-gray-50 border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Combustible</label>
              <select name="combustible" value={formData.combustible} onChange={handleChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-900 focus:border-gray-900 px-3 py-2 bg-gray-50 border">
                {Object.values(Combustible).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Transmisión</label>
              <select name="transmision" value={formData.transmision} onChange={handleChange} className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-900 focus:border-gray-900 px-3 py-2 bg-gray-50 border">
                {Object.values(Transmision).map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Puertas</label>
              <input
                type="number"
                name="puertas"
                value={formData.puertas}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-900 focus:border-gray-900 px-3 py-2 bg-gray-50 border"
              />
            </div>
          </div>
        </div>

        {/* Price & State */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold mb-4 text-gray-800">Precio y Estado</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Precio (USD)</label>
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                required
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-900 focus:border-gray-900 px-3 py-2 bg-gray-50 border"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="precioVisible"
                checked={formData.precioVisible}
                onChange={handleChange}
                className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
              />
              <span className="text-sm text-gray-700">Precio Visible</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="disponible"
                checked={formData.disponible}
                onChange={handleChange}
                className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
              />
              <span className="text-sm text-gray-700">Disponible</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="destacado"
                checked={formData.destacado}
                onChange={handleChange}
                className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
              />
              <span className="text-sm text-gray-700">Destacado</span>
            </label>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold mb-4 text-gray-800">Descripción</h2>
          <textarea
            name="descripcion"
            rows={5}
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Descripción detallada del vehículo..."
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-gray-900 focus:border-gray-900 px-3 py-2 bg-gray-50 border"
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/admin/dashboard')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-gray-900 text-white rounded-lg font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200 flex items-center gap-2"
          >
            <Save className="h-5 w-5" /> {id ? 'Actualizar Vehículo' : 'Guardar Vehículo'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VehicleForm;
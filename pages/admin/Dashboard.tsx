import React from 'react';
import { Link } from 'react-router-dom';
import { useVehicles } from '../../context/VehicleContext';
import { Edit, Trash2, Plus, Eye } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { vehicles, deleteVehicle } = useVehicles();

  const handleDelete = (id: number) => {
    if (window.confirm('¿Está seguro que desea eliminar este vehículo? Esta acción no se puede deshacer.')) {
      deleteVehicle(id);
    }
  };

  const formatter = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventario de Vehículos</h1>
          <p className="text-gray-500">Administrá el stock de Autos-Neura</p>
        </div>
        <Link
          to="/admin/new"
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200"
        >
          <Plus className="h-4 w-4" />
          Agregar Vehículo
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehículo
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vistas
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-md object-cover" src={vehicle.imagenes[0].url} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {vehicle.marca.nombre} {vehicle.modelo.nombre}
                        </div>
                        <div className="text-sm text-gray-500">
                          {vehicle.año} • {vehicle.condicion}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">
                      {vehicle.precioVisible ? formatter.format(vehicle.precio) : 'Consultar'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${vehicle.disponible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {vehicle.disponible ? 'Disponible' : 'Vendido'}
                    </span>
                    {vehicle.destacado && (
                      <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Destacado
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vehicle.vistas}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-3">
                      <Link to={`/vehiculos/${vehicle.slug}`} target="_blank" className="text-gray-400 hover:text-gray-600">
                        <Eye className="h-5 w-5" />
                      </Link>
                      <Link
                        to={`/admin/edit/${vehicle.id}`}
                        className="text-blue-600 hover:text-blue-900"
                        title="Editar"
                      >
                        <Edit className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(vehicle.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
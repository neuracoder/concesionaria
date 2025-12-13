export enum Condicion {
  NUEVO = 'Nuevo',
  USADO = 'Usado'
}

export enum Combustible {
  NAFTA = 'Nafta',
  DIESEL = 'Diésel',
  HIBRIDO = 'Híbrido',
  ELECTRICO = 'Eléctrico'
}

export enum Transmision {
  MANUAL = 'Manual',
  AUTOMATICA = 'Automática'
}

export interface Marca {
  id: number;
  nombre: string;
  slug: string;
}

export interface Modelo {
  id: number;
  marcaId: number;
  nombre: string;
}

export interface ImagenVehiculo {
  url: string;
  orden: number;
}

export interface Vehiculo {
  id: number;
  marca: Marca;
  modelo: Modelo;
  año: number;
  condicion: Condicion;
  combustible: Combustible;
  transmision: Transmision;
  kilometraje: number;
  motor: string;
  puertas: number;
  color: string;
  precio: number;
  precioVisible: boolean;
  disponible: boolean;
  destacado: boolean;
  descripcion: string;
  slug: string;
  imagenes: ImagenVehiculo[];
  vistas: number;
}

export interface FilterState {
  marca: string;
  modelo: string;
  año: string;
  condicion: string;
  combustible: string;
  precioMin: string;
  precioMax: string;
}
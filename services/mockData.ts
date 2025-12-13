import { Vehiculo, Marca, Modelo, Condicion, Combustible, Transmision } from '../types';

export const MARCAS: Marca[] = [
  { id: 1, nombre: 'Volkswagen', slug: 'volkswagen' },
  { id: 2, nombre: 'Ford', slug: 'ford' },
  { id: 3, nombre: 'Renault', slug: 'renault' },
  { id: 4, nombre: 'Chevrolet', slug: 'chevrolet' },
  { id: 5, nombre: 'Toyota', slug: 'toyota' },
  { id: 6, nombre: 'Honda', slug: 'honda' },
  { id: 7, nombre: 'Fiat', slug: 'fiat' },
  { id: 8, nombre: 'Peugeot', slug: 'peugeot' },
  { id: 9, nombre: 'Jeep', slug: 'jeep' },
  { id: 10, nombre: 'Nissan', slug: 'nissan' },
  { id: 11, nombre: 'RAM', slug: 'ram' },
  { id: 12, nombre: 'Audi', slug: 'audi' },
  { id: 13, nombre: 'Citroën', slug: 'citroen' },
  { id: 14, nombre: 'Mercedes-Benz', slug: 'mercedes-benz' },
  { id: 15, nombre: 'BMW', slug: 'bmw' },
  { id: 16, nombre: 'Hyundai', slug: 'hyundai' },
  { id: 17, nombre: 'Kia', slug: 'kia' },
];

export const MODELOS: Modelo[] = [
  // VW
  { id: 1, marcaId: 1, nombre: 'Gol Trend' },
  { id: 2, marcaId: 1, nombre: 'Amarok' },
  { id: 3, marcaId: 1, nombre: 'Vento' },
  { id: 4, marcaId: 1, nombre: 'Polo' },
  { id: 5, marcaId: 1, nombre: 'Virtus' },
  { id: 6, marcaId: 1, nombre: 'T-Cross' },
  { id: 7, marcaId: 1, nombre: 'Nivus' },
  { id: 8, marcaId: 1, nombre: 'Taos' },
  { id: 9, marcaId: 1, nombre: 'Tiguan' },
  { id: 10, marcaId: 1, nombre: 'Saveiro' },

  // Ford
  { id: 11, marcaId: 2, nombre: 'Ranger' },
  { id: 12, marcaId: 2, nombre: 'Focus' },
  { id: 13, marcaId: 2, nombre: 'Territory' },
  { id: 14, marcaId: 2, nombre: 'Maverick' },
  { id: 15, marcaId: 2, nombre: 'Bronco Sport' },
  { id: 16, marcaId: 2, nombre: 'Mustang' },
  { id: 17, marcaId: 2, nombre: 'Kuga' },
  { id: 18, marcaId: 2, nombre: 'EcoSport' },
  { id: 19, marcaId: 2, nombre: 'Fiesta' },

  // Renault
  { id: 20, marcaId: 3, nombre: 'Clio' },
  { id: 21, marcaId: 3, nombre: 'Duster' },
  { id: 22, marcaId: 3, nombre: 'Kangoo' },
  { id: 23, marcaId: 3, nombre: 'Sandero' },
  { id: 24, marcaId: 3, nombre: 'Logan' },
  { id: 25, marcaId: 3, nombre: 'Alaskan' },
  { id: 26, marcaId: 3, nombre: 'Oroch' },
  { id: 27, marcaId: 3, nombre: 'Kwid' },
  { id: 28, marcaId: 3, nombre: 'Captur' },

  // Chevrolet
  { id: 30, marcaId: 4, nombre: 'Cruze' },
  { id: 31, marcaId: 4, nombre: 'Onix' },
  { id: 32, marcaId: 4, nombre: 'Tracker' },
  { id: 33, marcaId: 4, nombre: 'S10' },
  { id: 34, marcaId: 4, nombre: 'Spin' },
  { id: 35, marcaId: 4, nombre: 'Trailblazer' },
  { id: 36, marcaId: 4, nombre: 'Equinox' },
  { id: 37, marcaId: 4, nombre: 'Prisma' },

  // Toyota
  { id: 40, marcaId: 5, nombre: 'Hilux' },
  { id: 41, marcaId: 5, nombre: 'Corolla' },
  { id: 42, marcaId: 5, nombre: 'Etios' },
  { id: 43, marcaId: 5, nombre: 'Yaris' },
  { id: 44, marcaId: 5, nombre: 'Corolla Cross' },
  { id: 45, marcaId: 5, nombre: 'SW4' },
  { id: 46, marcaId: 5, nombre: 'RAV4' },
  { id: 47, marcaId: 5, nombre: 'Camry' },

  // Honda
  { id: 50, marcaId: 6, nombre: 'Civic' },
  { id: 51, marcaId: 6, nombre: 'HR-V' },
  { id: 52, marcaId: 6, nombre: 'CR-V' },
  { id: 53, marcaId: 6, nombre: 'Fit' },
  { id: 54, marcaId: 6, nombre: 'WR-V' },
  { id: 55, marcaId: 6, nombre: 'ZR-V' },

  // Fiat
  { id: 60, marcaId: 7, nombre: 'Cronos' },
  { id: 61, marcaId: 7, nombre: 'Argo' },
  { id: 62, marcaId: 7, nombre: 'Toro' },
  { id: 63, marcaId: 7, nombre: 'Pulse' },
  { id: 64, marcaId: 7, nombre: 'Fastback' },
  { id: 65, marcaId: 7, nombre: 'Strada' },
  { id: 66, marcaId: 7, nombre: 'Fiorino' },
  { id: 67, marcaId: 7, nombre: 'Mobi' },

  // Peugeot
  { id: 70, marcaId: 8, nombre: '208' },
  { id: 71, marcaId: 8, nombre: '2008' },
  { id: 72, marcaId: 8, nombre: '3008' },
  { id: 73, marcaId: 8, nombre: 'Partner' },
  { id: 74, marcaId: 8, nombre: '408' },

  // Jeep
  { id: 80, marcaId: 9, nombre: 'Renegade' },
  { id: 81, marcaId: 9, nombre: 'Compass' },
  { id: 82, marcaId: 9, nombre: 'Commander' },
  { id: 83, marcaId: 9, nombre: 'Wrangler' },

  // Nissan
  { id: 90, marcaId: 10, nombre: 'Versa' },
  { id: 91, marcaId: 10, nombre: 'Sentra' },
  { id: 92, marcaId: 10, nombre: 'Kicks' },
  { id: 93, marcaId: 10, nombre: 'Frontier' },
  { id: 94, marcaId: 10, nombre: 'March' },
  { id: 95, marcaId: 10, nombre: 'X-Trail' },

  // RAM
  { id: 100, marcaId: 11, nombre: '1500' },
  { id: 101, marcaId: 11, nombre: '2500' },
  { id: 102, marcaId: 11, nombre: 'Rampage' },

  // Audi
  { id: 110, marcaId: 12, nombre: 'A1' },
  { id: 111, marcaId: 12, nombre: 'A3' },
  { id: 112, marcaId: 12, nombre: 'A4' },
  { id: 113, marcaId: 12, nombre: 'Q3' },
  { id: 114, marcaId: 12, nombre: 'Q5' },

  // Citroen
  { id: 120, marcaId: 13, nombre: 'C3' },
  { id: 121, marcaId: 13, nombre: 'C4 Cactus' },
  { id: 122, marcaId: 13, nombre: 'Berlingo' },
  { id: 123, marcaId: 13, nombre: 'C5 Aircross' },

  // Mercedes-Benz
  { id: 130, marcaId: 14, nombre: 'Clase A' },
  { id: 131, marcaId: 14, nombre: 'Clase C' },
  { id: 132, marcaId: 14, nombre: 'GLA' },
  { id: 133, marcaId: 14, nombre: 'Sprinter' },

  // BMW
  { id: 140, marcaId: 15, nombre: 'Serie 1' },
  { id: 141, marcaId: 15, nombre: 'Serie 3' },
  { id: 142, marcaId: 15, nombre: 'X1' },
  { id: 143, marcaId: 15, nombre: 'X3' },

  // Hyundai
  { id: 150, marcaId: 16, nombre: 'Creta' },
  { id: 151, marcaId: 16, nombre: 'Tucson' },
  { id: 152, marcaId: 16, nombre: 'Santa Fe' },

  // Kia
  { id: 160, marcaId: 17, nombre: 'Seltos' },
  { id: 161, marcaId: 17, nombre: 'Sportage' },
  { id: 162, marcaId: 17, nombre: 'Carnival' },
];

// Helper to provide realistic Unsplash car images
// Note: Unsplash Source is deprecated, using direct image IDs from Unsplash for cars.
const CAR_IMAGES = [
  'https://images.unsplash.com/photo-1541899481-c7e28324e5bc?auto=format&fit=crop&w=800&q=80', // Hatch/Sporty
  'https://images.unsplash.com/photo-1605893477704-4d7534d28743?auto=format&fit=crop&w=800&q=80', // Pickup red
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80', // Sedan dark
  'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80', // SUV/Car
  'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80', // Compact grey
  'https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&w=800&q=80', // Hatch dark
  'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80', // Luxury dark
  'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80', // Red car
  'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80', // Interior/Car
  'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80', // Mustang/Muscle
];

const getImages = (index: number): { url: string, orden: number }[] => {
  const mainImage = CAR_IMAGES[index % CAR_IMAGES.length];
  // Just reusing the list for gallery diversity
  const secondImage = CAR_IMAGES[(index + 1) % CAR_IMAGES.length];
  const thirdImage = CAR_IMAGES[(index + 2) % CAR_IMAGES.length];

  return [
    { url: mainImage, orden: 1 },
    { url: secondImage, orden: 2 },
    { url: thirdImage, orden: 3 },
  ];
};

export const VEHICULOS: Vehiculo[] = [
  {
    id: 1,
    marca: MARCAS[0], // VW
    modelo: MODELOS[1], // Amarok
    año: 2023,
    condicion: Condicion.NUEVO,
    combustible: Combustible.DIESEL,
    transmision: Transmision.AUTOMATICA,
    kilometraje: 0,
    motor: '3.0 V6 TDI',
    puertas: 4,
    color: 'Gris Indio',
    precio: 52000,
    precioVisible: true,
    disponible: true,
    destacado: true,
    descripcion: 'La pickup más potente del segmento. Volkswagen Amarok V6 Highline con tracción integral 4Motion y caja automática de 8 velocidades. Confort de SUV en una pickup.',
    slug: 'vw-amarok-v6-2023',
    imagenes: getImages(1),
    vistas: 450
  },
  {
    id: 2,
    marca: MARCAS[1], // Ford
    modelo: MODELOS[4], // Ranger
    año: 2021,
    condicion: Condicion.USADO,
    combustible: Combustible.DIESEL,
    transmision: Transmision.AUTOMATICA,
    kilometraje: 42000,
    motor: '3.2 Puma',
    puertas: 4,
    color: 'Azul Beluga',
    precio: 38500,
    precioVisible: true,
    disponible: true,
    destacado: true,
    descripcion: 'Ford Ranger Limited. Tecnología Ford Co-Pilot 360, asistente de pre-colisión y mantenimiento de carril. Único dueño, impecable estado.',
    slug: 'ford-ranger-ltd-2021',
    imagenes: getImages(7), // Using a different index for variety
    vistas: 320
  },
  {
    id: 3,
    marca: MARCAS[4], // Audi
    modelo: MODELOS[12], // A3
    año: 2022,
    condicion: Condicion.USADO,
    combustible: Combustible.NAFTA,
    transmision: Transmision.AUTOMATICA,
    kilometraje: 15000,
    motor: '1.4 TFSI',
    puertas: 5,
    color: 'Negro Mito',
    precio: 41000,
    precioVisible: true,
    disponible: true,
    destacado: true,
    descripcion: 'Audi A3 Sportback. Elegancia y deportividad en un solo vehículo. Virtual Cockpit, techo solar y llantas de aleación de 17".',
    slug: 'audi-a3-2022',
    imagenes: getImages(6),
    vistas: 210
  },
  {
    id: 4,
    marca: MARCAS[3], // Chevrolet
    modelo: MODELOS[9], // Cruze
    año: 2019,
    condicion: Condicion.USADO,
    combustible: Combustible.NAFTA,
    transmision: Transmision.MANUAL,
    kilometraje: 58000,
    motor: '1.4 Turbo',
    puertas: 4,
    color: 'Blanco Summit',
    precio: 18500,
    precioVisible: true,
    disponible: true,
    destacado: false,
    descripcion: 'Chevrolet Cruze LT. Motor turbo eficiente y potente. WiFi a bordo, sistema MyLink y cámara de retroceso. Ideal para la familia.',
    slug: 'chevrolet-cruze-2019',
    imagenes: getImages(2),
    vistas: 180
  },
  {
    id: 5,
    marca: MARCAS[2], // Renault
    modelo: MODELOS[7], // Duster
    año: 2023,
    condicion: Condicion.NUEVO,
    combustible: Combustible.NAFTA,
    transmision: Transmision.MANUAL,
    kilometraje: 0,
    motor: '1.3 TCe',
    puertas: 5,
    color: 'Marrón Visión',
    precio: 26000,
    precioVisible: true,
    disponible: true,
    destacado: false,
    descripcion: 'Nueva Renault Duster Iconic. Motor turbo de última generación. Diseño robusto, pantalla de 8" y tracción 4x2.',
    slug: 'renault-duster-2023',
    imagenes: getImages(3),
    vistas: 150
  },
  {
    id: 6,
    marca: MARCAS[5], // Citroen
    modelo: MODELOS[15], // C3
    año: 2024,
    condicion: Condicion.NUEVO,
    combustible: Combustible.NAFTA,
    transmision: Transmision.AUTOMATICA,
    kilometraje: 0,
    motor: '1.6 VTi',
    puertas: 5,
    color: 'Gris Artense',
    precio: 19900,
    precioVisible: false,
    disponible: true,
    destacado: true,
    descripcion: 'Nuevo Citroën C3. Actitud SUV en un compacto urbano. Despeje del suelo elevado, posición de manejo alta y gran espacio interior.',
    slug: 'citroen-c3-2024',
    imagenes: getImages(4),
    vistas: 280
  },
  {
    id: 7,
    marca: MARCAS[0], // VW
    modelo: MODELOS[0], // Gol Trend
    año: 2018,
    condicion: Condicion.USADO,
    combustible: Combustible.NAFTA,
    transmision: Transmision.MANUAL,
    kilometraje: 85000,
    motor: '1.6 MSI',
    puertas: 5,
    color: 'Rojo Flash',
    precio: 11500,
    precioVisible: true,
    disponible: true,
    destacado: false,
    descripcion: 'El clásico argentino. VW Gol Trend Trendline. Confiable, económico de mantener y con excelente valor de reventa.',
    slug: 'vw-gol-trend-2018',
    imagenes: getImages(0),
    vistas: 410
  }
];

export const getDestacados = () => VEHICULOS.filter(v => v.destacado && v.disponible);
export const getAllVehiculos = () => VEHICULOS;
export const getVehiculoBySlug = (slug: string) => VEHICULOS.find(v => v.slug === slug);
export const getRelacionados = (vehiculo: Vehiculo) =>
  VEHICULOS.filter(v => v.marca.id === vehiculo.marca.id && v.id !== vehiculo.id).slice(0, 4);
-- ========================================
-- SCHEMA PARA AUTOS-NEURA CONCESIONARIA
-- ========================================

-- Tabla de Marcas
CREATE TABLE IF NOT EXISTS marcas (
  id BIGSERIAL PRIMARY KEY,
  nombre TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Modelos
CREATE TABLE IF NOT EXISTS modelos (
  id BIGSERIAL PRIMARY KEY,
  marca_id BIGINT NOT NULL REFERENCES marcas(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(marca_id, nombre)
);

-- Tabla de Vehículos
CREATE TABLE IF NOT EXISTS vehiculos (
  id BIGSERIAL PRIMARY KEY,
  marca_id BIGINT NOT NULL REFERENCES marcas(id),
  modelo_id BIGINT NOT NULL REFERENCES modelos(id),
  año INTEGER NOT NULL,
  precio NUMERIC(12, 2) NOT NULL,
  precio_visible BOOLEAN DEFAULT true,
  kilometraje INTEGER DEFAULT 0,
  combustible TEXT NOT NULL,
  transmision TEXT NOT NULL,
  condicion TEXT NOT NULL CHECK (condicion IN ('Nuevo', 'Usado')),
  color TEXT NOT NULL,
  descripcion TEXT,
  slug TEXT NOT NULL UNIQUE,
  destacado BOOLEAN DEFAULT false,
  disponible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de Imágenes de Vehículos
CREATE TABLE IF NOT EXISTS vehiculo_imagenes (
  id BIGSERIAL PRIMARY KEY,
  vehiculo_id BIGINT NOT NULL REFERENCES vehiculos(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  orden INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para mejorar performance
CREATE INDEX IF NOT EXISTS idx_modelos_marca_id ON modelos(marca_id);
CREATE INDEX IF NOT EXISTS idx_vehiculos_marca_id ON vehiculos(marca_id);
CREATE INDEX IF NOT EXISTS idx_vehiculos_modelo_id ON vehiculos(modelo_id);
CREATE INDEX IF NOT EXISTS idx_vehiculos_slug ON vehiculos(slug);
CREATE INDEX IF NOT EXISTS idx_vehiculos_destacado ON vehiculos(destacado);
CREATE INDEX IF NOT EXISTS idx_vehiculos_disponible ON vehiculos(disponible);
CREATE INDEX IF NOT EXISTS idx_vehiculo_imagenes_vehiculo_id ON vehiculo_imagenes(vehiculo_id);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at en vehiculos
DROP TRIGGER IF EXISTS update_vehiculos_updated_at ON vehiculos;
CREATE TRIGGER update_vehiculos_updated_at
  BEFORE UPDATE ON vehiculos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================

-- Habilitar RLS en todas las tablas
ALTER TABLE marcas ENABLE ROW LEVEL SECURITY;
ALTER TABLE modelos ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehiculos ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehiculo_imagenes ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura pública para todas las tablas
CREATE POLICY "Marcas son públicas" ON marcas FOR SELECT USING (true);
CREATE POLICY "Modelos son públicos" ON modelos FOR SELECT USING (true);
CREATE POLICY "Vehículos son públicos" ON vehiculos FOR SELECT USING (true);
CREATE POLICY "Imágenes son públicas" ON vehiculo_imagenes FOR SELECT USING (true);

-- Políticas de escritura (INSERT, UPDATE, DELETE) permitidas para usuarios autenticados
-- Para este caso, permitimos operaciones anónimas ya que no hay autenticación
CREATE POLICY "Permitir insertar marcas" ON marcas FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir actualizar marcas" ON marcas FOR UPDATE USING (true);
CREATE POLICY "Permitir eliminar marcas" ON marcas FOR DELETE USING (true);

CREATE POLICY "Permitir insertar modelos" ON modelos FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir actualizar modelos" ON modelos FOR UPDATE USING (true);
CREATE POLICY "Permitir eliminar modelos" ON modelos FOR DELETE USING (true);

CREATE POLICY "Permitir insertar vehículos" ON vehiculos FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir actualizar vehículos" ON vehiculos FOR UPDATE USING (true);
CREATE POLICY "Permitir eliminar vehículos" ON vehiculos FOR DELETE USING (true);

CREATE POLICY "Permitir insertar imágenes" ON vehiculo_imagenes FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir actualizar imágenes" ON vehiculo_imagenes FOR UPDATE USING (true);
CREATE POLICY "Permitir eliminar imágenes" ON vehiculo_imagenes FOR DELETE USING (true);

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase configuration
const supabaseUrl = 'https://rfwahweevepijnejcqwb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmd2Fod2VldmVwaWpuZWpjcXdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3NjcwNjksImV4cCI6MjA4MTM0MzA2OX0.4iR27NnLzAql_JB_rCvfe5S7M2cRthF1asIPBOk9Oro';

const supabase = createClient(supabaseUrl, supabaseKey);

interface Marca {
  id: number;
  nombre: string;
  slug: string;
}

interface Modelo {
  id: number;
  marcaId: number;
  nombre: string;
}

interface Vehiculo {
  id: number;
  marca: Marca;
  modelo: Modelo;
  año: number;
  condicion: string;
  combustible: string;
  transmision: string;
  kilometraje: number;
  color: string;
  precio: number;
  precioVisible: boolean;
  disponible: boolean;
  destacado: boolean;
  descripcion: string;
  slug: string;
  imagenes: { url: string; orden: number }[];
}

async function migrateData() {
  try {
    console.log('🚀 Iniciando migración a Supabase...\n');

    // Leer db.json
    const dbPath = path.join(__dirname, '..', 'db.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    // 1. Migrar Marcas
    console.log('📦 Migrando marcas...');
    const marcas: Marca[] = dbData.marcas;

    for (const marca of marcas) {
      const { error } = await supabase
        .from('marcas')
        .upsert({
          id: marca.id,
          nombre: marca.nombre,
          slug: marca.slug
        }, { onConflict: 'id' });

      if (error) {
        console.error(`❌ Error insertando marca ${marca.nombre}:`, error);
      } else {
        console.log(`✅ Marca ${marca.nombre} migrada`);
      }
    }

    // 2. Migrar Modelos
    console.log('\n🚗 Migrando modelos...');
    const modelos: Modelo[] = dbData.modelos;

    for (const modelo of modelos) {
      const { error } = await supabase
        .from('modelos')
        .upsert({
          id: modelo.id,
          marca_id: modelo.marcaId,
          nombre: modelo.nombre
        }, { onConflict: 'id' });

      if (error) {
        console.error(`❌ Error insertando modelo ${modelo.nombre}:`, error);
      } else {
        console.log(`✅ Modelo ${modelo.nombre} migrado`);
      }
    }

    // 3. Migrar Vehículos
    console.log('\n🚙 Migrando vehículos...');
    const vehiculos: Vehiculo[] = dbData.vehicles;

    for (const vehiculo of vehiculos) {
      const { data: vehiculoData, error: vehiculoError } = await supabase
        .from('vehiculos')
        .upsert({
          id: vehiculo.id,
          marca_id: vehiculo.marca.id,
          modelo_id: vehiculo.modelo.id,
          año: vehiculo.año,
          precio: vehiculo.precio,
          precio_visible: vehiculo.precioVisible,
          kilometraje: vehiculo.kilometraje,
          combustible: vehiculo.combustible,
          transmision: vehiculo.transmision,
          condicion: vehiculo.condicion,
          color: vehiculo.color,
          descripcion: vehiculo.descripcion || '',
          slug: vehiculo.slug,
          destacado: vehiculo.destacado,
          disponible: vehiculo.disponible
        }, { onConflict: 'id' })
        .select()
        .single();

      if (vehiculoError) {
        console.error(`❌ Error insertando vehículo ${vehiculo.slug}:`, vehiculoError);
        continue;
      }

      console.log(`✅ Vehículo ${vehiculo.marca.nombre} ${vehiculo.modelo.nombre} migrado`);

      // 4. Migrar Imágenes del Vehículo
      for (const imagen of vehiculo.imagenes) {
        const { error: imagenError } = await supabase
          .from('vehiculo_imagenes')
          .insert({
            vehiculo_id: vehiculo.id,
            url: imagen.url,
            orden: imagen.orden
          });

        if (imagenError) {
          console.error(`❌ Error insertando imagen:`, imagenError);
        } else {
          console.log(`  📷 Imagen migrada: ${imagen.url}`);
        }
      }
    }

    console.log('\n✨ ¡Migración completada exitosamente!');
    console.log(`\n📊 Resumen:`);
    console.log(`  - ${marcas.length} marcas migradas`);
    console.log(`  - ${modelos.length} modelos migrados`);
    console.log(`  - ${vehiculos.length} vehículos migrados`);

  } catch (error) {
    console.error('❌ Error durante la migración:', error);
    process.exit(1);
  }
}

// Ejecutar migración
migrateData();

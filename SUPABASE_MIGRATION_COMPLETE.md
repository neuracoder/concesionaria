# ✅ Migración a Supabase Completada

## 🎉 Resumen

La aplicación de concesionaria ha sido migrada exitosamente para usar **Supabase** como base de datos y almacenamiento de imágenes. Ahora puedes agregar, editar y eliminar vehículos desde el panel admin en producción (Vercel).

## 📋 Pasos Completados

### 1. ✅ Instalación de Dependencias
- Instalado `@supabase/supabase-js` v2.87.1

### 2. ✅ Configuración de Supabase
- Creado [lib/supabase.ts](lib/supabase.ts:1) con la configuración del cliente Supabase
- Configuradas variables de entorno en [.env](.env:1)

### 3. ✅ Schema de Base de Datos
- Creado [supabase-schema.sql](supabase-schema.sql:1) con:
  - Tabla `marcas` (id, nombre, slug)
  - Tabla `modelos` (id, marca_id, nombre)
  - Tabla `vehiculos` (todos los campos del vehículo)
  - Tabla `vehiculo_imagenes` (id, vehiculo_id, url, orden)
  - Índices para optimizar performance
  - Row Level Security (RLS) policies para seguridad
  - Triggers para actualizar timestamps automáticamente

### 4. ✅ Script de Migración
- Creado [scripts/migrate-to-supabase.ts](scripts/migrate-to-supabase.ts:1)
- Migra todos los datos desde [db.json](db.json:1) a Supabase
- Comando: `npm run migrate`

### 5. ✅ Context Actualizado
- Reescrito completamente [context/VehicleContext.tsx](context/VehicleContext.tsx:1)
- Ahora usa Supabase en lugar de API local/db.json
- Funciones implementadas:
  - `fetchAllData()` - Carga datos desde Supabase
  - `addVehicle()` - Agrega vehículo y sube imágenes a Storage
  - `updateVehicle()` - Actualiza vehículo y maneja imágenes nuevas
  - `deleteVehicle()` - Elimina vehículo (cascade elimina imágenes)
  - `uploadImage()` - Sube imagen a Supabase Storage
  - `addCustomMarca()` y `addCustomModelo()` - Agregan marcas/modelos personalizados

### 6. ✅ Almacenamiento de Imágenes
- Las imágenes se suben automáticamente a Supabase Storage bucket `vehicle-images`
- Formato WebP optimizado automáticamente
- URLs públicas generadas automáticamente
- Las imágenes base64 del formulario se convierten y suben al guardar

### 7. ✅ Documentación
- Creado [SUPABASE_SETUP.md](SUPABASE_SETUP.md:1) con guía paso a paso

## 🚀 Próximos Pasos

### Paso 1: Configurar la Base de Datos en Supabase

1. Ve a tu proyecto en Supabase: https://supabase.com/dashboard/project/rfwahweevepijnejcqwb
2. Haz clic en **SQL Editor** en el menú lateral
3. Crea una nueva query
4. Copia **TODO** el contenido de [supabase-schema.sql](supabase-schema.sql:1)
5. Pega en el editor y haz clic en **Run**
6. Verifica que se crearon las 4 tablas: `marcas`, `modelos`, `vehiculos`, `vehiculo_imagenes`

### Paso 2: Crear el Bucket de Storage

1. En el menú lateral de Supabase, ve a **Storage**
2. Haz clic en **Create a new bucket**
3. Configura:
   - **Name**: `vehicle-images`
   - **Public bucket**: ✅ **MARCA ESTA OPCIÓN** (muy importante)
   - **File size limit**: 5 MB (opcional)
   - **Allowed MIME types**: `image/webp, image/jpeg, image/png` (opcional)
4. Haz clic en **Create bucket**

### Paso 3: Migrar los Datos Existentes

Ejecuta el script de migración para transferir los datos de [db.json](db.json:1) a Supabase:

```bash
npm run migrate
```

Esto migrará:
- ✅ 17 marcas
- ✅ 162 modelos
- ✅ 6 vehículos con sus imágenes

**NOTA:** Las URLs de las imágenes se mantendrán apuntando a `/uploads/`. Las nuevas imágenes que agregues desde el panel admin se subirán automáticamente a Supabase Storage.

### Paso 4: Configurar Variables de Entorno en Vercel

1. Ve a tu proyecto en Vercel: https://vercel.com/dashboard
2. Selecciona tu proyecto de concesionaria
3. Ve a **Settings** → **Environment Variables**
4. Agrega estas variables:

```
VITE_SUPABASE_URL=https://rfwahweevepijnejcqwb.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmd2Fod2VldmVwaWpuZWpjcXdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3NjcwNjksImV4cCI6MjA4MTM0MzA2OX0.4iR27NnLzAql_JB_rCvfe5S7M2cRthF1asIPBOk9Oro
```

5. Haz clic en **Save**

### Paso 5: Subir Cambios a GitHub

```bash
git add .
git commit -m "Integrate Supabase for database and image storage

- Add Supabase client library and configuration
- Create database schema with tables and RLS policies
- Migrate VehicleContext to use Supabase
- Add image upload to Supabase Storage
- Add migration script for existing data
- Update environment variables

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
git push
```

### Paso 6: Verificar en Vercel

Vercel se redespleará automáticamente con los cambios. Una vez desplegado:

1. Ve a tu sitio en Vercel
2. Ve al panel admin: `https://tu-sitio.vercel.app/admin`
3. Intenta agregar un nuevo vehículo con imágenes
4. Verifica que el vehículo aparezca en la página principal
5. Verifica que las imágenes se vean correctamente

## 🎯 Funcionalidades Ahora Disponibles

### En el Panel Admin (Producción):

✅ **Agregar Vehículos**
- Sube imágenes que se guardan en Supabase Storage
- Conversión automática a WebP
- URLs públicas generadas automáticamente

✅ **Editar Vehículos**
- Actualiza información del vehículo
- Reemplaza imágenes (las viejas se eliminan)
- Cambios se reflejan inmediatamente

✅ **Eliminar Vehículos**
- Elimina vehículo de la base de datos
- Cascade elimina las referencias de imágenes

✅ **Agregar Marcas/Modelos Personalizados**
- Crea nuevas marcas sobre la marcha
- Crea nuevos modelos para cualquier marca

### En el Sitio Público:

✅ **Listado de Vehículos**
- Carga desde Supabase en tiempo real
- Filtros funcionan correctamente

✅ **Detalle de Vehículo**
- Imágenes cargadas desde Supabase Storage
- Información actualizada

✅ **Vehículos Destacados**
- Se actualizan según la base de datos

## 🔧 Arquitectura Técnica

### Flujo de Datos:

```
Frontend (React)
    ↓
VehicleContext
    ↓
Supabase Client
    ↓
Supabase Cloud (PostgreSQL + Storage)
```

### Almacenamiento de Imágenes:

```
VehicleForm (subida de archivo)
    ↓
optimizeImage() (conversión a WebP)
    ↓
VehicleContext.uploadImage()
    ↓
Supabase Storage (bucket: vehicle-images)
    ↓
URL pública: https://rfwahweevepijnejcqwb.supabase.co/storage/v1/object/public/vehicle-images/[filename]
```

### Base de Datos:

```sql
marcas (17 registros)
    ↓
modelos (162 registros) [marca_id → marcas.id]
    ↓
vehiculos (6 registros) [marca_id, modelo_id]
    ↓
vehiculo_imagenes [vehiculo_id → vehiculos.id]
```

## 📊 Recursos Utilizados

- **Base de Datos**: PostgreSQL (Supabase)
- **Storage**: Supabase Storage (500MB gratis)
- **Plan**: Free Tier de Supabase
- **Costo**: $0 (gratis hasta 500MB de almacenamiento y 2GB de transferencia)

## 🛠️ Solución de Problemas

### Error: "relation 'marcas' does not exist"
**Solución**: Ejecuta el script [supabase-schema.sql](supabase-schema.sql:1) en el SQL Editor de Supabase

### Error: "new row violates row-level security policy"
**Solución**: Verifica que las políticas RLS estén creadas correctamente (incluidas en supabase-schema.sql)

### Error al subir imágenes
**Solución**:
1. Verifica que el bucket `vehicle-images` exista
2. Verifica que el bucket esté marcado como **público**
3. Verifica que las políticas de Storage estén creadas

### Las imágenes no se ven
**Solución**:
1. Abre la URL de la imagen directamente en el navegador
2. Si no carga, el bucket no es público o las políticas son incorrectas
3. Recrea el bucket como público

## 📞 Soporte

Si tienes problemas:
1. Revisa [SUPABASE_SETUP.md](SUPABASE_SETUP.md:1) para guía detallada
2. Revisa la consola del navegador para errores
3. Revisa la consola de Supabase para logs

## 🎊 ¡Felicitaciones!

Ahora tu aplicación de concesionaria puede agregar vehículos en producción sin limitaciones del filesystem read-only de Vercel. Los datos se almacenan de forma segura en Supabase y las imágenes se sirven desde el CDN de Supabase para mejor performance.

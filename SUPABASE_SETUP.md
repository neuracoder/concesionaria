# Guía de Configuración de Supabase

Esta guía te ayudará a configurar Supabase para tu aplicación de concesionaria.

## 1. Crear el Schema de la Base de Datos

1. Ve a tu proyecto en Supabase: https://supabase.com/dashboard/project/rfwahweevepijnejcqwb
2. En el menú lateral, haz clic en **SQL Editor**
3. Crea una nueva query
4. Copia y pega **todo el contenido** del archivo `supabase-schema.sql`
5. Haz clic en **Run** para ejecutar el script

Esto creará:
- ✅ Tablas: `marcas`, `modelos`, `vehiculos`, `vehiculo_imagenes`
- ✅ Índices para mejorar performance
- ✅ Row Level Security (RLS) policies
- ✅ Triggers para actualizar timestamps

## 2. Configurar Supabase Storage para Imágenes

1. En el menú lateral de Supabase, ve a **Storage**
2. Haz clic en **Create a new bucket**
3. Configura el bucket:
   - **Name**: `vehicle-images`
   - **Public bucket**: ✅ Marca esta opción (para que las imágenes sean accesibles públicamente)
   - **File size limit**: 5 MB (opcional)
   - **Allowed MIME types**: `image/webp, image/jpeg, image/png` (opcional)
4. Haz clic en **Create bucket**

### Configurar políticas del bucket (opcional, si no se crean automáticamente):

Si el bucket no es público por defecto, ve a la pestaña **Policies** del bucket `vehicle-images` y crea estas políticas:

**Política de lectura pública:**
```sql
CREATE POLICY "Las imágenes son públicas"
ON storage.objects FOR SELECT
USING (bucket_id = 'vehicle-images');
```

**Política de escritura (permitir uploads):**
```sql
CREATE POLICY "Permitir subir imágenes"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'vehicle-images');
```

**Política de actualización:**
```sql
CREATE POLICY "Permitir actualizar imágenes"
ON storage.objects FOR UPDATE
USING (bucket_id = 'vehicle-images');
```

**Política de eliminación:**
```sql
CREATE POLICY "Permitir eliminar imágenes"
ON storage.objects FOR DELETE
USING (bucket_id = 'vehicle-images');
```

## 3. Migrar Datos Existentes

Una vez que hayas creado el schema y el storage bucket, ejecuta la migración:

```bash
npm run migrate
```

Este comando:
- ✅ Migrará todas las marcas desde db.json
- ✅ Migrará todos los modelos desde db.json
- ✅ Migrará todos los vehículos desde db.json
- ✅ Migrará las referencias de imágenes

**NOTA:** Las imágenes físicas en la carpeta `uploads/` se subirán automáticamente cuando edites un vehículo desde el panel admin, o puedes subirlas manualmente al bucket `vehicle-images` en Supabase.

## 4. Configurar Variables de Entorno en Vercel

1. Ve a tu proyecto en Vercel: https://vercel.com/dashboard
2. Selecciona tu proyecto de concesionaria
3. Ve a **Settings** → **Environment Variables**
4. Agrega las siguientes variables:

```
VITE_SUPABASE_URL=https://rfwahweevepijnejcqwb.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmd2Fod2VldmVwaWpuZWpjcXdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3NjcwNjksImV4cCI6MjA4MTM0MzA2OX0.4iR27NnLzAql_JB_rCvfe5S7M2cRthF1asIPBOk9Oro
```

5. Haz clic en **Save**
6. Redeploy tu proyecto para que tome las nuevas variables

## 5. Verificar la Configuración

Para verificar que todo está funcionando:

1. Ejecuta la aplicación localmente: `npm run dev`
2. Ve al panel admin: http://localhost:5173/admin
3. Intenta agregar un nuevo vehículo con una imagen
4. Verifica que el vehículo aparezca en la lista principal
5. Verifica que la imagen se haya subido correctamente a Supabase Storage

## Estructura de URLs de Imágenes en Supabase

Las imágenes se almacenarán con URLs como:
```
https://rfwahweevepijnejcqwb.supabase.co/storage/v1/object/public/vehicle-images/[filename].webp
```

## Troubleshooting

### Error: "relation 'marcas' does not exist"
- Asegúrate de haber ejecutado el script `supabase-schema.sql` en el SQL Editor

### Error: "new row violates row-level security policy"
- Verifica que las políticas RLS estén creadas correctamente en todas las tablas

### Error al subir imágenes: "new row violates row-level security policy for storage.objects"
- Verifica que el bucket `vehicle-images` esté configurado como público
- Verifica que las políticas de Storage estén creadas correctamente

### Las imágenes no se ven en el sitio
- Verifica que el bucket sea público
- Verifica que las URLs en la base de datos apunten correctamente a Supabase Storage
- Abre la URL de una imagen en el navegador para verificar acceso

## Contacto y Soporte

Si tienes problemas con la configuración, revisa la documentación oficial de Supabase:
- https://supabase.com/docs/guides/storage
- https://supabase.com/docs/guides/database

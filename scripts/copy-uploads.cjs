const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, '..', 'uploads');
const publicUploadsDir = path.join(__dirname, '..', 'public', 'uploads');
const dbJsonSrc = path.join(__dirname, '..', 'db.json');
const dbJsonDest = path.join(__dirname, '..', 'public', 'db.json');

// Crear directorio public/uploads si no existe
if (!fs.existsSync(publicUploadsDir)) {
  fs.mkdirSync(publicUploadsDir, { recursive: true });
  console.log('Created public/uploads directory');
}

// Copiar archivos de uploads a public/uploads
if (fs.existsSync(uploadsDir)) {
  const files = fs.readdirSync(uploadsDir);

  files.forEach(file => {
    const srcPath = path.join(uploadsDir, file);
    const destPath = path.join(publicUploadsDir, file);

    // Solo copiar archivos, no directorios
    if (fs.statSync(srcPath).isFile()) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied image: ${file}`);
    }
  });

  console.log(`✅ Successfully copied ${files.length} images to public/uploads`);
} else {
  console.log('⚠️  uploads directory not found');
}

// Copiar db.json a public/
if (fs.existsSync(dbJsonSrc)) {
  fs.copyFileSync(dbJsonSrc, dbJsonDest);
  console.log('✅ Successfully copied db.json to public/');
} else {
  console.log('⚠️  db.json not found');
}

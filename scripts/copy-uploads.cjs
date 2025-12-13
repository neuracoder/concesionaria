const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, '..', 'uploads');
const publicUploadsDir = path.join(__dirname, '..', 'public', 'uploads');

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
      console.log(`Copied: ${file}`);
    }
  });

  console.log(`✅ Successfully copied ${files.length} files to public/uploads`);
} else {
  console.log('⚠️  uploads directory not found');
}

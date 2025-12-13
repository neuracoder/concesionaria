import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_FILE = path.join(__dirname, 'db.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Ensure uploads directory exists
fs.ensureDirSync(UPLOADS_DIR);

async function migrateImages() {
    console.log('\n🔄 Starting image migration from Base64 to files...\n');

    const db = await fs.readJson(DB_FILE);
    let totalImages = 0;
    let migratedImages = 0;

    for (const vehicle of db.vehicles) {
        if (!vehicle.imagenes || vehicle.imagenes.length === 0) continue;

        console.log(`📦 Processing vehicle: ${vehicle.titulo || vehicle.id}`);

        for (let i = 0; i < vehicle.imagenes.length; i++) {
            const imgObj = vehicle.imagenes[i];
            totalImages++;

            // Skip if already a file path
            if (imgObj.url.startsWith('/uploads') || imgObj.url.startsWith('http')) {
                console.log(`   ⏭️  Image ${i + 1} already migrated: ${imgObj.url.substring(0, 50)}...`);
                continue;
            }

            // Process Base64
            const match = imgObj.url.match(/^data:image\/(\w+);base64,(.+)$/);
            if (!match) {
                console.log(`   ⚠️  Image ${i + 1} invalid format, skipping`);
                continue;
            }

            const ext = match[1] === 'jpeg' ? 'jpg' : match[1];
            const buffer = Buffer.from(match[2], 'base64');

            const safeSlug = (vehicle.slug || 'vehicle').replace(/[^a-z0-9]/gi, '-').toLowerCase();
            const filename = `${safeSlug}-${Date.now()}-${i}.${ext}`;
            const filePath = path.join(UPLOADS_DIR, filename);

            // Save file
            await fs.writeFile(filePath, buffer);

            // Update URL in vehicle object
            vehicle.imagenes[i] = { ...imgObj, url: `/uploads/${filename}` };

            migratedImages++;
            console.log(`   ✅ Image ${i + 1} migrated: ${filename} (${Math.round(buffer.length / 1024)}kb)`);

            // Small delay to ensure unique timestamps
            await new Promise(resolve => setTimeout(resolve, 10));
        }
    }

    // Save updated database
    await fs.writeJson(DB_FILE, db, { spaces: 2 });

    console.log('\n✅ Migration complete!');
    console.log(`   Total images found: ${totalImages}`);
    console.log(`   Images migrated: ${migratedImages}`);
    console.log(`   Images already migrated: ${totalImages - migratedImages}`);

    const dbSize = (await fs.stat(DB_FILE)).size;
    console.log(`\n📊 New db.json size: ${Math.round(dbSize / 1024)}kb\n`);
}

migrateImages().catch(err => {
    console.error('❌ Migration failed:', err);
    process.exit(1);
});

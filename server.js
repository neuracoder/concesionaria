import express from 'express';
import cors from 'cors';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// 1. Configuration
dotenv.config({ override: true }); // Forzar override de variables de entorno del sistema
const app = express();
const PORT = 3001;

// Debug: Mostrar configuración cargada
console.log("\n🔧 Configuration loaded from .env:");
console.log(`   SMTP_HOST: ${process.env.SMTP_HOST}`);
console.log(`   SMTP_USER: ${process.env.SMTP_USER}`);
console.log(`   CONTACT_EMAIL: ${process.env.CONTACT_EMAIL}\n`);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_FILE = path.join(__dirname, 'db.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const QUOTES_DIR = path.join(__dirname, 'quotes'); // Carpeta separada para cotizaciones

// 2. Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Limit for Base64 images
app.use('/uploads', express.static(UPLOADS_DIR));
app.use('/quotes', express.static(QUOTES_DIR)); // Servir archivos de cotizaciones

// Ensure storage exists
fs.ensureDirSync(UPLOADS_DIR);
fs.ensureDirSync(QUOTES_DIR);
if (!fs.existsSync(DB_FILE)) {
    fs.writeJsonSync(DB_FILE, {
        vehicles: [],
        marcas: [],
        modelos: [],
        contactInfo: {}
    });
}

// 3. Email Transporter (Simple)
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

// 4. Helper: Process Images (Base64 -> File)
const processVehicleImages = async (vehicle) => {
    if (!vehicle.imagenes) return vehicle;

    const processedImages = await Promise.all(vehicle.imagenes.map(async (imgObj, index) => {
        // Skip if already a URL
        if (imgObj.url.startsWith('http') || imgObj.url.startsWith('/uploads')) {
            return imgObj;
        }

        // Process Base64
        const match = imgObj.url.match(/^data:image\/(\w+);base64,(.+)$/);
        if (!match) return imgObj;

        const ext = match[1] === 'jpeg' ? 'jpg' : match[1];
        const buffer = Buffer.from(match[2], 'base64');

        const safeSlug = (vehicle.slug || 'temp').replace(/[^a-z0-9]/gi, '-').toLowerCase();
        const filename = `${safeSlug}-${Date.now()}-${index}.${ext}`;
        const filePath = path.join(UPLOADS_DIR, filename);

        await fs.writeFile(filePath, buffer);

        return { ...imgObj, url: `/uploads/${filename}` };
    }));

    return { ...vehicle, imagenes: processedImages };
};

// 5. Routes

// Quote Endpoint (Email + Save)
app.post('/api/quote', async (req, res) => {
    try {
        console.log("📨 Receiving quote request...");
        const formData = req.body;
        const db = await fs.readJson(DB_FILE);
        const contactEmail = db.contactInfo?.email || process.env.CONTACT_EMAIL || 'info@neuracoder.com';

        // Obtener nombres de marca y modelo
        const marca = db.marcas?.find(m => m.id === parseInt(formData.marcaId));
        const modelo = db.modelos?.find(m => m.id === parseInt(formData.modeloId));
        const marcaNombre = marca?.nombre || formData.marcaId;
        const modeloNombre = modelo?.nombre || formData.modeloId;

        // Save uploaded images (en carpeta separada para cotizaciones)
        const attachments = [];
        if (formData.imagenes && formData.imagenes.length > 0) {
            console.log(`📎 Processing ${formData.imagenes.length} image(s)...`);
            for (let i = 0; i < formData.imagenes.length; i++) {
                const imgStr = formData.imagenes[i];
                if (imgStr.startsWith('data:image')) {
                    const match = imgStr.match(/^data:image\/(\w+);base64,(.+)$/);
                    if (match) {
                        const buffer = Buffer.from(match[2], 'base64');
                        const timestamp = Date.now();
                        const filename = `cotizacion-${timestamp}-${i}.${match[1] === 'jpeg' ? 'jpg' : match[1]}`;
                        const filePath = path.join(QUOTES_DIR, filename);
                        await fs.writeFile(filePath, buffer);
                        attachments.push({ filename, path: filePath });
                        console.log(`   ✓ Image ${i + 1} saved: ${filename}`);
                    }
                }
            }
        }

        // Send Email - IMPORTANTE: Usar el email autenticado como remitente
        const mailOptions = {
            from: `"Autos Neura - Cotizaciones" <${process.env.SMTP_USER}>`,
            to: contactEmail,
            replyTo: formData.email, // Para que puedas responder directo al cliente
            subject: `Nueva Cotización: ${marcaNombre} ${modeloNombre} ${formData.ano}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">📋 Nueva Solicitud de Cotización</h2>

                    <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <h3 style="color: #555; margin-top: 0;">👤 Datos del Cliente</h3>
                        <p><strong>Nombre:</strong> ${formData.nombre}</p>
                        <p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
                        <p><strong>Teléfono:</strong> <a href="tel:${formData.telefono}">${formData.telefono}</a></p>
                    </div>

                    <div style="background-color: #e8f4f8; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <h3 style="color: #555; margin-top: 0;">🚗 Datos del Vehículo</h3>
                        <p><strong>Marca:</strong> ${marcaNombre}</p>
                        <p><strong>Modelo:</strong> ${modeloNombre}</p>
                        <p><strong>Año:</strong> ${formData.ano}</p>
                        <p><strong>Kilometraje:</strong> ${formData.kilometraje} km</p>
                        <p><strong>Combustible:</strong> ${formData.combustible}</p>
                        <p><strong>Transmisión:</strong> ${formData.transmision}</p>
                        ${formData.color ? `<p><strong>Color:</strong> ${formData.color}</p>` : ''}
                        ${formData.descripcion ? `<p><strong>Descripción:</strong><br>${formData.descripcion}</p>` : ''}
                    </div>

                    ${attachments.length > 0 ? `<p style="color: #666;">📸 Se adjuntan <strong>${attachments.length} foto(s)</strong> del vehículo.</p>` : ''}

                    <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
                    <p style="color: #999; font-size: 12px; text-align: center;">
                        Este correo fue generado automáticamente desde el sitio web de Autos Neura
                    </p>
                </div>
            `,
            attachments: attachments
        };

        // Intentar enviar email si está configurado
        const isConfigured = process.env.SMTP_USER &&
                            process.env.SMTP_PASS &&
                            !process.env.SMTP_USER.includes('tu-email') &&
                            !process.env.SMTP_PASS.includes('tu-contraseña');

        console.log(`\n📧 Email Configuration:`);
        console.log(`   SMTP Host: ${process.env.SMTP_HOST}`);
        console.log(`   SMTP Port: ${process.env.SMTP_PORT}`);
        console.log(`   SMTP User: ${process.env.SMTP_USER}`);
        console.log(`   From: ${mailOptions.from}`);
        console.log(`   To: ${mailOptions.to}`);
        console.log(`   Subject: ${mailOptions.subject}`);
        console.log(`   Attachments: ${attachments.length}`);

        if (isConfigured) {
            console.log(`\n🚀 Attempting to send email...`);
            try {
                const info = await transporter.sendMail(mailOptions);
                console.log("✅ Email sent successfully!");
                console.log(`   Message ID: ${info.messageId}`);
                console.log(`   Response: ${info.response}`);
                console.log(`   To: ${contactEmail}\n`);
            } catch (emailError) {
                console.error("❌ Email sending failed!");
                console.error(`   Error: ${emailError.message}`);
                console.error(`   Code: ${emailError.code || 'N/A'}`);
                if (emailError.command) {
                    console.error(`   SMTP Command: ${emailError.command}`);
                }
                console.log("⚠️ Continuing anyway - quote data saved locally.\n");
            }
        } else {
            console.log("📧 Mock Email (SMTP not configured - check .env file)");
            console.log("Quote Data:", JSON.stringify(formData, null, 2));
        }

        res.json({ success: true });
    } catch (error) {
        console.error("Quote Error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Vehicle CRUD
app.get('/api/vehicles', async (req, res) => {
    const db = await fs.readJson(DB_FILE);
    res.json(db.vehicles || []);
});

app.post('/api/vehicles', async (req, res) => {
    try {
        console.log("📝 Creating new vehicle...");
        const db = await fs.readJson(DB_FILE);
        const newVehicle = await processVehicleImages(req.body);
        db.vehicles.unshift(newVehicle);
        await fs.writeJson(DB_FILE, db);
        console.log(`✅ Vehicle created: ${newVehicle.titulo}`);
        res.json(newVehicle);
    } catch (error) {
        console.error("❌ Error creating vehicle:", error);
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/vehicles/:id', async (req, res) => {
    try {
        console.log(`\n📝 PUT /api/vehicles/${req.params.id}`);
        console.log(`   Received data:`, {
            marca: req.body.marca?.nombre,
            modelo: req.body.modelo?.nombre,
            imagenes: req.body.imagenes?.length || 0
        });

        const db = await fs.readJson(DB_FILE);
        const index = db.vehicles.findIndex(v => v.id === parseInt(req.params.id));

        if (index === -1) {
            console.log(`   ❌ Vehicle not found with ID: ${req.params.id}`);
            return res.status(404).json({ error: 'Vehicle not found' });
        }

        console.log(`   Processing images...`);
        const updatedVehicle = await processVehicleImages(req.body);

        console.log(`   Processed images:`, updatedVehicle.imagenes?.map(img => img.url));

        db.vehicles[index] = updatedVehicle;
        await fs.writeJson(DB_FILE, db, { spaces: 2 });

        console.log(`   ✅ Vehicle updated and saved to db.json`);
        console.log(`   Returning vehicle with ${updatedVehicle.imagenes?.length || 0} images\n`);

        res.json(updatedVehicle);
    } catch (error) {
        console.error("❌ Error updating vehicle:", error);
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/vehicles/:id', async (req, res) => {
    const db = await fs.readJson(DB_FILE);
    db.vehicles = db.vehicles.filter(v => v.id !== parseInt(req.params.id));
    await fs.writeJson(DB_FILE, db);
    res.json({ success: true });
});

// Resources
app.get('/api/marcas', async (req, res) => {
    const db = await fs.readJson(DB_FILE);
    res.json(db.marcas || []);
});
app.get('/api/modelos', async (req, res) => {
    const db = await fs.readJson(DB_FILE);
    res.json(db.modelos || []);
});
app.get('/api/contact-info', async (req, res) => {
    const db = await fs.readJson(DB_FILE);
    res.json(db.contactInfo || {});
});

// 6. Start Server
const server = app.listen(PORT, () => {
    console.log(`SIMPLE Server running on http://localhost:${PORT}`);
    console.log(`SMTP User: ${process.env.SMTP_USER || 'Not Configured'}`);
});

// FORCE KEEP-ALIVE: Prevent process from exiting if event loop drains
setInterval(() => {
    // Heartbeat to keep process alive
}, 1000 * 60 * 60); // Every hour


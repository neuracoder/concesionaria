const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'db.json');

try {
    const dbData = fs.readFileSync(dbPath, 'utf8');
    const db = JSON.parse(dbData);

    if (!db.contactInfo) {
        db.contactInfo = {
            email: "ventas@tuconcesionaria.com.ar",
            phone: "(011) 4788-5555",
            address: "Av. Libertador 4500, Buenos Aires",
            mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3286.186626182054!2d-58.44522668477138!3d-34.54882998047385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb436efe79dbd%3A0xfb39ce2697b83d1b!2sAv.%20del%20Libertador%204500%2C%20C1426BXD%20CABA!5e0!3m2!1ses!2sar!4v1625686000000!5m2!1ses!2sar"
        };
        fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
        console.log("Updated db.json with contactInfo");
    } else {
        console.log("contactInfo already exists in db.json");
    }
} catch (error) {
    console.error("Error updating db.json:", error);
    process.exit(1);
}

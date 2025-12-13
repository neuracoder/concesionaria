import { GoogleGenAI } from "@google/genai";
import { Vehiculo } from "../types";

let ai: GoogleGenAI | null = null;

if (process.env.API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
}

// Updated to accept the current list of vehicles from the context
export const sendMessageToGemini = async (message: string, currentVehicles: Vehiculo[] = []): Promise<string> => {
  if (!ai) {
    return "Lo siento, el asistente de IA no está configurado (falta API Key).";
  }

  try {
    // Create a context string with the available inventory
    const inventoryContext = currentVehicles.map(v => 
      `- ${v.marca.nombre} ${v.modelo.nombre} (${v.año}): ${v.condicion}, $${v.precio}, ${v.kilometraje}km, ${v.descripcion}`
    ).join('\n');

    const systemInstruction = `Eres un experto vendedor de autos para 'Autos-Neura', una concesionaria premium en Argentina.
    Tu objetivo es ayudar a los clientes a encontrar su próximo auto de nuestro stock.
    
    Tono: Profesional, directo y amable (Voseo argentino: "Hola, ¿cómo estás?", "Mirá este modelo...").
    
    Nuestro Inventario Actual (SOLO recomienda estos autos):
    ${inventoryContext}
    
    Instrucciones:
    1. Si el cliente busca un tipo de auto (ej. "camioneta"), recomienda las opciones del inventario (ej. VW Amarok o Ford Ranger).
    2. Si preguntan precio, dalo en formato USD o "a consultar" si corresponde.
    3. Resalta características clave como "motor V6", "caja automática", "poco kilometraje".
    4. Si preguntan por una marca/modelo que no tenemos, di amablemente que no está en stock y ofrece una alternativa similar del inventario.
    5. No inventes autos.`;

    const model = ai.models;
    const response = await model.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "Disculpá, no entendí bien. ¿Podrías repetir?";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "Hubo un error al conectar con el sistema. Por favor intentá en unos momentos.";
  }
};
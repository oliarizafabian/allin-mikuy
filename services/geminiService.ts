import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

async function callGemini(prompt: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });
  return response.text;
}

export const generateRecipeAndNutritionInfo = async (ingredients: string, portions: number, occasion: string): Promise<{ recipe: string, nutrition: string }> => {
  const recipePrompt = `
    Actúa como un chef experto en cocina saludable. Tu tarea es crear una receta deliciosa y saludable.

    **Reglas estrictas:**
    1.  Utiliza **únicamente** los ingredientes proporcionados por el usuario. No añadas ningún ingrediente extra, ni siquiera sal, pimienta o aceite, a menos que esté en la lista del usuario.
    2.  La receta debe ser apropiada para la siguiente ocasión: **${occasion}**.
    3.  La receta debe estar calculada para **${portions} porciones**.
    4.  El formato de la respuesta debe ser **Markdown**.

    **Ingredientes disponibles:**
    ${ingredients}

    **Formato de Salida Requerido:**
    # [Nombre Creativo de la Receta para ${occasion}]

    ## Ingredientes
    - [Lista de ingredientes con cantidades para ${portions} porciones]

    ## Preparación
    ### Paso 1: [Descripción del paso]
    ### Paso 2: [Descripción del paso]
    ... y así sucesivamente.
  `;

  const nutritionPrompt = `
    Actúa como un nutricionista. Basado en la siguiente lista de ingredientes, proporciona un resumen del valor nutricional general.

    **Ingredientes:**
    ${ingredients}

    **Formato de Salida Requerido (Markdown):**
    ## Valor Nutricional Estimado
    - **Calorías:** [Estimación]
    - **Proteínas:** [Estimación]
    - **Carbohidratos:** [Estimación]
    - **Grasas:** [Estimación]
    - **Puntos Clave:** [Breve descripción de los beneficios para la salud, como 'Alto en fibra' o 'Buena fuente de vitamina C'.]
  `;

  // Se ejecutan en paralelo para mayor eficiencia
  const [recipe, nutrition] = await Promise.all([
    callGemini(recipePrompt),
    callGemini(nutritionPrompt)
  ]);

  return { recipe, nutrition };
};
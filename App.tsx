import React, { useState, useCallback } from 'react';
import RecipeForm from './components/RecipeForm';
import RecipeDisplay from './components/RecipeDisplay';
import FooterInfo from './components/FooterInfo';
import { generateRecipeAndNutritionInfo } from './services/geminiService';

const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<string>('1 pechuga de pollo, 2 papas, 1 choclo, 1/2 lechuga, 1 tomate, 1/4 cebolla');
  const [portions, setPortions] = useState<string>('2');
  const [occasion, setOccasion] = useState<string>('almuerzo');
  const [recipe, setRecipe] = useState<string | null>(null);
  const [nutritionalInfo, setNutritionalInfo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredients || !portions || !occasion) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setRecipe(null);
    setNutritionalInfo(null);

    try {
      const numPortions = parseInt(portions, 10);
      if (isNaN(numPortions) || numPortions <= 0) {
        setError('El número de porciones debe ser un número válido y mayor a cero.');
        setIsLoading(false);
        return;
      }
      
      const result = await generateRecipeAndNutritionInfo(ingredients, numPortions, occasion);
      setRecipe(result.recipe);
      setNutritionalInfo(result.nutrition);

    } catch (err) {
      console.error(err);
      setError('Hubo un error al generar la receta. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }, [ingredients, portions, occasion]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-green-600">allin mikuy</h1>
          <p className="text-lg text-gray-600 mt-2">Tu asistente de recetas saludables con IA</p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <RecipeForm
              ingredients={ingredients}
              setIngredients={setIngredients}
              portions={portions}
              setPortions={setPortions}
              occasion={occasion}
              setOccasion={setOccasion}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <RecipeDisplay recipe={recipe} isLoading={isLoading} error={error} />
          </div>
        </main>
        
        <FooterInfo nutritionalInfo={nutritionalInfo} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default App;
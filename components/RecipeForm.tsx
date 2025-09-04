import React from 'react';
import type { RecipeFormProps } from '../types';

const RecipeForm: React.FC<RecipeFormProps> = ({
  ingredients,
  setIngredients,
  portions,
  setPortions,
  occasion,
  setOccasion,
  onSubmit,
  isLoading,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label htmlFor="ingredients" className="block text-md font-medium text-gray-700 mb-2">
          ¿Qué ingredientes tienes?
        </label>
        <textarea
          id="ingredients"
          name="ingredients"
          rows={6}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out"
          placeholder="ej: papa, choclo, pollo, lechuga..."
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="portions" className="block text-md font-medium text-gray-700 mb-2">
          ¿Cuántas porciones?
        </label>
        <input
          type="number"
          id="portions"
          name="portions"
          min="1"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out"
          value={portions}
          onChange={(e) => setPortions(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="occasion" className="block text-md font-medium text-gray-700 mb-2">
          ¿Para qué ocasión?
        </label>
        <select
          id="occasion"
          name="occasion"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out bg-white"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
        >
          <option value="desayuno">Desayuno</option>
          <option value="almuerzo">Almuerzo</option>
          <option value="cena">Cena</option>
        </select>
      </div>
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center gap-x-2 py-3 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generando...
            </>
          ) : (
            '✨ Generar mi Receta'
          )}
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;
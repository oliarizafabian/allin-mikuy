
import React from 'react';
import type { RecipeDisplayProps } from '../types';
import LoadingSpinner from './LoadingSpinner';
import SimpleMarkdownRenderer from './SimpleMarkdownRenderer';

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, isLoading, error }) => {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Tu Receta</h2>
      <div className="flex-grow overflow-y-auto pr-2">
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <LoadingSpinner />
            <p className="text-gray-600 mt-4">Generando tu receta personalizada...</p>
          </div>
        )}
        {error && <div className="text-red-600 bg-red-100 p-4 rounded-lg">{error}</div>}
        {!isLoading && !error && !recipe && (
          <div className="flex items-center justify-center h-full text-center text-gray-500">
            <p>Tu receta aparecerá aquí...</p>
          </div>
        )}
        {recipe && <SimpleMarkdownRenderer content={recipe} />}
      </div>
    </div>
  );
};

export default RecipeDisplay;

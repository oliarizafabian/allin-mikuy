export interface RecipeFormProps {
  ingredients: string;
  setIngredients: (value: string) => void;
  portions: string;
  setPortions: (value: string) => void;
  occasion: string;
  setOccasion: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export interface RecipeDisplayProps {
  recipe: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface FooterInfoProps {
    nutritionalInfo: string | null;
    isLoading: boolean;
}

export interface SimpleMarkdownRendererProps {
  content: string;
}
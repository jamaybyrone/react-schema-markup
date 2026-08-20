import { ElementType } from "react";

export interface RecipeType {
  name: string;
  image: string | string[];
  authorName: string;
  description?: string;
  datePublished?: string;
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  recipeYield?: string;
  recipeCategory?: string;
  recipeCuisine?: string;
  keywords?: string;
  recipeIngredient: string[];
  recipeInstructions: string[];
  calories?: string;
  ratingValue?: number;
  ratingCount?: number;
}

export interface RichRecipeProps {
  recipe: RecipeType;
  ScriptWrap?: ElementType;
}

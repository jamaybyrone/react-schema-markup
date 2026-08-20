import { Recipe, WithContext } from "schema-dts";
import React, { FC } from "react";
import { RichRecipeProps } from "@/types/recipe";
import JsonLd from "./JsonLd";

const RichRecipe: FC<RichRecipeProps> = ({ recipe, ScriptWrap }) => {
  const {
    name,
    image,
    authorName,
    description,
    datePublished,
    prepTime,
    cookTime,
    totalTime,
    recipeYield,
    recipeCategory,
    recipeCuisine,
    keywords,
    recipeIngredient,
    recipeInstructions,
    calories,
    ratingValue,
    ratingCount,
  } = recipe;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name,
    image,
    description,
    datePublished,
    author: {
      "@type": "Person",
      name: authorName,
    },
    prepTime,
    cookTime,
    totalTime,
    recipeYield,
    recipeCategory,
    recipeCuisine,
    keywords,
    recipeIngredient,
    recipeInstructions,
    nutrition: calories && {
      "@type": "NutritionInformation",
      calories,
    },
    aggregateRating: ratingValue &&
      ratingCount && {
        "@type": "AggregateRating",
        ratingValue,
        ratingCount,
      },
  } as WithContext<Recipe>;

  return <JsonLd data={jsonLd} ScriptWrap={ScriptWrap} />;
};

export default RichRecipe;

import "@testing-library/jest-dom";

import React from "react";
import { render } from "@testing-library/react";

import RichRecipe from "../src/RichRecipe";
import { RichRecipeProps } from "../src/types/recipe";

interface TestCase {
  scenario: string;
  props: RichRecipeProps;
  expectedJsonLd: object;
}

const testCases: TestCase[] = [
  {
    scenario: "renders JSON-LD for a recipe with ratings and nutrition",
    props: {
      recipe: {
        name: "Casa Bonita Sopapillas",
        image: "https://casabonita.com/recipes/sopapillas.jpg",
        authorName: "Chip McElroy",
        description: "Fried dough, drenched in honey.",
        datePublished: "2026-01-10",
        prepTime: "PT15M",
        cookTime: "PT10M",
        totalTime: "PT25M",
        recipeYield: "4 servings",
        recipeCategory: "Dessert",
        recipeCuisine: "Mexican",
        recipeIngredient: ["2 cups flour", "1 tbsp honey"],
        recipeInstructions: ["Mix the dough.", "Fry until golden."],
        calories: "310 calories",
        ratingValue: 4.5,
        ratingCount: 120,
      },
    },
    expectedJsonLd: {
      "@context": "https://schema.org",
      "@type": "Recipe",
      name: "Casa Bonita Sopapillas",
      image: "https://casabonita.com/recipes/sopapillas.jpg",
      author: {
        "@type": "Person",
        name: "Chip McElroy",
      },
      recipeIngredient: ["2 cups flour", "1 tbsp honey"],
      recipeInstructions: ["Mix the dough.", "Fry until golden."],
      nutrition: {
        "@type": "NutritionInformation",
        calories: "310 calories",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: 4.5,
        ratingCount: 120,
      },
    },
  },
];

const setup = (props: RichRecipeProps) => {
  return render(<RichRecipe {...props} />);
};

describe("RichRecipe", () => {
  it.each(testCases)("$scenario", ({ props, expectedJsonLd }) => {
    const { container } = setup(props);
    const scriptTag = container.querySelector("script");

    const jsonLd = JSON.parse(scriptTag?.textContent || "{}");
    expect(jsonLd).toEqual(expect.objectContaining(expectedJsonLd));
  });
});

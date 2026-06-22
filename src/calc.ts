import type { AvailableRecipe } from "./recipesData";

const GRAMS_PER_PIZZA = 125;

export interface CalcValues {
  readonly mehl: number;
  readonly wasser: number;
  readonly salz: number;
  readonly oel: number;
  readonly hefe: number;
}

export const calculateIngredients = (
  recipe: AvailableRecipe,
  pizzen: number,
): CalcValues => {
  const mehl = pizzen * GRAMS_PER_PIZZA;
  const wasser = Math.round(mehl * recipe.hydratation);
  const salz = Math.round(mehl * recipe.salzProzent);
  const oel = Math.round(mehl * recipe.oelProzent);
  const hefe = Math.round(mehl * recipe.hefeProzent * 10) / 10;

  return { mehl, wasser, salz, oel, hefe };
};

export const formatGrams = (value: number): string => `${value}g`;

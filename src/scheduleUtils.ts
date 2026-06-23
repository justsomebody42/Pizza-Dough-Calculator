import type { StepProgressEntry } from "./progressStore";
import type { RecipeStep } from "./recipesData";

export const getEffectiveWaitMinutes = (
  step: RecipeStep,
  index: number,
  recipeProgress: Record<number, StepProgressEntry> | undefined,
): number | undefined => {
  if (step.waitMinutes === undefined) {
    return undefined;
  }

  return recipeProgress?.[index]?.waitMinutesOverride ?? step.waitMinutes;
};

export const getTotalWaitMinutes = (
  steps: readonly RecipeStep[],
  recipeProgress: Record<number, StepProgressEntry> | undefined,
): number =>
  steps.reduce(
    (sum, step, index) => sum + (getEffectiveWaitMinutes(step, index, recipeProgress) ?? 0),
    0,
  );

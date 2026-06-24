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

// Walks the steps to find the earliest realistic ready time from now: steps
// already marked done contribute nothing further (their wait already
// happened), a running timer finishes at its own startedAt + wait, and only
// steps that haven't started yet are chained forward from the current time.
// This avoids re-adding wait time that has already elapsed.
export const getEarliestReadyAt = (
  steps: readonly RecipeStep[],
  recipeProgress: Record<number, StepProgressEntry> | undefined,
  now: number,
): number => {
  let cursor = now;

  steps.forEach((step, index) => {
    const entry = recipeProgress?.[index];
    if (entry?.done && entry.doneAt !== undefined) {
      cursor = entry.doneAt;
      return;
    }

    const waitMs = (getEffectiveWaitMinutes(step, index, recipeProgress) ?? 0) * 60_000;
    const start = entry?.startedAt ?? Math.max(cursor, now);
    cursor = start + waitMs;
  });

  return cursor;
};

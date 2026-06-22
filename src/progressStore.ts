import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface StepProgressEntry {
  readonly done: boolean;
  readonly doneAt?: number;
  readonly startedAt?: number;
  readonly notified?: boolean;
}

interface ProgressState {
  readonly progress: Record<string, Record<number, StepProgressEntry>>;
  readonly toggleStep: (recipeKey: string, stepIndex: number) => void;
  readonly startTimer: (recipeKey: string, stepIndex: number) => void;
  readonly markNotified: (recipeKey: string, stepIndex: number) => void;
  readonly resetRecipe: (recipeKey: string) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      progress: {},
      toggleStep: (recipeKey, stepIndex) =>
        set((state) => {
          const recipeProgress = state.progress[recipeKey] ?? {};
          const entry = recipeProgress[stepIndex];
          const done = !entry?.done;

          return {
            progress: {
              ...state.progress,
              [recipeKey]: {
                ...recipeProgress,
                [stepIndex]: { ...entry, done, doneAt: done ? Date.now() : undefined },
              },
            },
          };
        }),
      startTimer: (recipeKey, stepIndex) =>
        set((state) => {
          const recipeProgress = state.progress[recipeKey] ?? {};
          const entry = recipeProgress[stepIndex];

          return {
            progress: {
              ...state.progress,
              [recipeKey]: {
                ...recipeProgress,
                [stepIndex]: { ...entry, done: entry?.done ?? false, startedAt: Date.now() },
              },
            },
          };
        }),
      markNotified: (recipeKey, stepIndex) =>
        set((state) => {
          const recipeProgress = state.progress[recipeKey] ?? {};
          const entry = recipeProgress[stepIndex];
          if (!entry) {
            return state;
          }

          return {
            progress: {
              ...state.progress,
              [recipeKey]: {
                ...recipeProgress,
                [stepIndex]: { ...entry, notified: true },
              },
            },
          };
        }),
      resetRecipe: (recipeKey) =>
        set((state) => {
          const { [recipeKey]: _removed, ...rest } = state.progress;

          return { progress: rest };
        }),
    }),
    { name: "teig-rechner.progress" },
  ),
);

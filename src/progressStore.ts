import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface StepProgressEntry {
  readonly done: boolean;
  readonly doneAt?: number;
  readonly startedAt?: number;
  readonly notified?: boolean;
  readonly waitMinutesOverride?: number;
}

interface ProgressState {
  readonly progress: Record<string, Record<number, StepProgressEntry>>;
  readonly bakeAt: Record<string, number>;
  readonly toggleStep: (recipeKey: string, stepIndex: number) => void;
  readonly startTimer: (recipeKey: string, stepIndex: number) => void;
  readonly markNotified: (recipeKey: string, stepIndex: number) => void;
  readonly setWaitMinutesOverride: (recipeKey: string, stepIndex: number, minutes: number) => void;
  readonly setBakeAt: (recipeKey: string, timestamp: number) => void;
  readonly clearBakeAt: (recipeKey: string) => void;
  readonly resetRecipe: (recipeKey: string) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      progress: {},
      bakeAt: {},
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
      setWaitMinutesOverride: (recipeKey, stepIndex, minutes) =>
        set((state) => {
          const recipeProgress = state.progress[recipeKey] ?? {};
          const entry = recipeProgress[stepIndex];

          return {
            progress: {
              ...state.progress,
              [recipeKey]: {
                ...recipeProgress,
                [stepIndex]: {
                  ...entry,
                  done: entry?.done ?? false,
                  waitMinutesOverride: minutes,
                },
              },
            },
          };
        }),
      setBakeAt: (recipeKey, timestamp) =>
        set((state) => ({
          bakeAt: { ...state.bakeAt, [recipeKey]: timestamp },
        })),
      clearBakeAt: (recipeKey) =>
        set((state) => {
          const { [recipeKey]: _removed, ...restBakeAt } = state.bakeAt;

          return { bakeAt: restBakeAt };
        }),
      resetRecipe: (recipeKey) =>
        set((state) => {
          const { [recipeKey]: _removedProgress, ...restProgress } = state.progress;
          const { [recipeKey]: _removedBakeAt, ...restBakeAt } = state.bakeAt;

          return { progress: restProgress, bakeAt: restBakeAt };
        }),
    }),
    { name: "teig-rechner.progress" },
  ),
);

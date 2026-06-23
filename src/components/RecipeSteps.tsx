import { Box, Button, Card, CardContent, Checkbox, IconButton, Tooltip, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import type { CalcValues } from "../calc";
import { formatGrams } from "../calc";
import { formatClockLabel } from "../dateFormat";
import { getDurationLabel } from "../durationLabel";
import { useProgressStore } from "../progressStore";
import type { RecipeStep } from "../recipesData";
import { getEffectiveWaitMinutes, getTotalWaitMinutes } from "../scheduleUtils";
import { useConfigStore } from "../store";
import { CompletedAt } from "./CompletedAt";
import { ConfirmDialog } from "./ConfirmDialog";
import { RiseTimeStepper } from "./RiseTimeStepper";
import { StepTimer } from "./StepTimer";

// Scales the +/- increment (and floor) to the step's own default wait time,
// so adjusting a 5-minute step moves in small increments while a 24h cold
// ferment moves in hour-sized jumps.
const stepGranularity = (baseMinutes: number): { readonly stepMinutes: number; readonly minMinutes: number } => {
  if (baseMinutes <= 30) {
    return { stepMinutes: 5, minMinutes: 5 };
  }
  if (baseMinutes <= 180) {
    return { stepMinutes: 15, minMinutes: 15 };
  }
  if (baseMinutes <= 720) {
    return { stepMinutes: 30, minMinutes: 30 };
  }
  return { stepMinutes: 60, minMinutes: 60 };
};

export const RecipeSteps: React.FC<{
  readonly steps: readonly RecipeStep[];
  readonly calcValues: CalcValues;
  readonly recipeKey: string;
}> = ({ steps, calcValues, recipeKey }) => {
  const { formatMessage } = useIntl();
  const locale = useConfigStore((state) => state.locale);
  const recipeProgress = useProgressStore((state) => state.progress[recipeKey]);
  const toggleStep = useProgressStore((state) => state.toggleStep);
  const startTimer = useProgressStore((state) => state.startTimer);
  const stopTimer = useProgressStore((state) => state.stopTimer);
  const markNotified = useProgressStore((state) => state.markNotified);
  const setWaitMinutesOverride = useProgressStore((state) => state.setWaitMinutesOverride);
  const resetWaitMinutesOverride = useProgressStore((state) => state.resetWaitMinutesOverride);
  const bakeAt = useProgressStore((state) => state.bakeAt[recipeKey]);
  const resetRecipe = useProgressStore((state) => state.resetRecipe);
  const [resetOpen, setResetOpen] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const interval = setInterval(tick, 30_000);
    document.addEventListener("visibilitychange", tick);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", tick);
    };
  }, []);

  const amounts = {
    waterAmount: formatGrams(calcValues.wasser),
    saltAmount: formatGrams(calcValues.salz),
    yeastAmount: formatGrams(calcValues.hefe),
    oilAmount: formatGrams(calcValues.oel),
    flourAmount: formatGrams(calcValues.mehl),
  };

  const effectiveWaitMinutes = (step: RecipeStep, index: number): number | undefined =>
    getEffectiveWaitMinutes(step, index, recipeProgress);

  const totalWaitMinutes = getTotalWaitMinutes(steps, recipeProgress);

  // Walks the steps in order, carrying a cursor forward so that starting a
  // step late (or finishing one ahead of/behind plan) shifts every
  // subsequent step's projected start/end instead of just the static plan.
  // Before anything has actually started, the cursor begins at the planned
  // start time (derived from the target bake time), so adjusting any step's
  // timer reschedules the first step's start to still hit that target.
  const plannedStartAt = bakeAt === undefined ? undefined : bakeAt - totalWaitMinutes * 60_000;
  const stepSchedule: Array<{ readonly start: number; readonly end: number }> = [];
  let cursor = plannedStartAt ?? now;
  steps.forEach((step, index) => {
    const entry = recipeProgress?.[index];
    if (entry?.done && entry.doneAt !== undefined) {
      cursor = entry.doneAt;
      stepSchedule.push({ start: entry.doneAt, end: entry.doneAt });
      return;
    }

    const waitMs = (effectiveWaitMinutes(step, index) ?? 0) * 60_000;
    const start = entry?.startedAt ?? cursor;
    const end = start + waitMs;
    cursor = end;
    stepSchedule.push({ start, end });
  });

  const anyStepStarted = steps.some((_, index) => recipeProgress?.[index]?.startedAt !== undefined);
  const projectedReadyAt = anyStepStarted ? stepSchedule.at(-1)?.end : undefined;
  const firstStepDone = recipeProgress?.[0]?.done ?? false;

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 1,
            mb: 1,
          }}
        >
          <Box sx={{ order: { xs: 1, md: 1 } }}>
            {projectedReadyAt !== undefined && (
              <Typography
                variant="caption"
                sx={{
                  color:
                    bakeAt !== undefined && projectedReadyAt > bakeAt + 60_000
                      ? "primary.main"
                      : "text.secondary",
                }}
              >
                {formatMessage(
                  { id: "progress.projectedReadyAt" },
                  { time: formatClockLabel(new Date(projectedReadyAt), locale, now) },
                )}
              </Typography>
            )}
          </Box>
          {firstStepDone && (
            <Button
              size="small"
              startIcon={<RestartAltIcon />}
              onClick={() => setResetOpen(true)}
              sx={{ color: "text.secondary", order: { xs: 0, md: 2 } }}
            >
              <FormattedMessage id="progress.newDough" defaultMessage="Start new dough" />
            </Button>
          )}
        </Box>
        <Box>
          {steps.map((step, index) => {
            const entry = recipeProgress?.[index];
            const done = entry?.done ?? false;
            const previousDone = index === 0 || (recipeProgress?.[index - 1]?.done ?? false);
            const nextDone = recipeProgress?.[index + 1]?.done ?? false;
            const checkboxDisabled = done ? nextDone : !previousDone;
            const waitMinutes = effectiveWaitMinutes(step, index);
            const hasWaitMinutes = waitMinutes !== undefined;
            const textParams = hasWaitMinutes
              ? { ...amounts, duration: getDurationLabel(waitMinutes, locale, formatMessage) }
              : amounts;
            const canAdjustInline = hasWaitMinutes && !done && entry?.startedAt === undefined;

            return (
              <Box
                key={step.titleId}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  opacity: done ? 0.5 : 1,
                  bgcolor: "custom.panel",
                  p: "12px 16px",
                  borderRadius: "8px",
                  mb: "12px",
                  borderLeft: "4px solid",
                  borderLeftColor: "primary.main",
                }}
              >
                <Checkbox
                  checked={done}
                  disabled={checkboxDisabled}
                  onChange={() => toggleStep(recipeKey, index)}
                  sx={{ color: "text.secondary", p: 0.5, mt: -0.25 }}
                />
                <Box sx={{ flex: 1, pt: 0.5 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: "bold",
                      color: "custom.heading",
                      textDecoration: done ? "line-through" : "none",
                    }}
                  >
                    {index + 1}. {formatMessage({ id: step.titleId })}
                  </Typography>
                  {done ? (
                    entry?.doneAt !== undefined && <CompletedAt doneAt={entry.doneAt} />
                  ) : (
                    <>
                      <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                        {formatMessage(
                          { id: "progress.stepStartAt" },
                          { time: formatClockLabel(new Date(stepSchedule[index].start), locale, now) },
                        )}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
                        {formatMessage({ id: step.textId }, textParams)}
                      </Typography>
                      {canAdjustInline && waitMinutes !== undefined && (
                        <Box sx={{ mt: 0.5, display: "flex", gap: 1 }}>
                          <Box sx={{ maxWidth: 220 }}>
                            <RiseTimeStepper
                              value={waitMinutes}
                              {...stepGranularity(step.waitMinutes ?? waitMinutes)}
                              onChange={(minutes) => setWaitMinutesOverride(recipeKey, index, minutes)}
                            />
                          </Box>
                          {entry?.waitMinutesOverride !== undefined && (
                            <Tooltip title={formatMessage({ id: "progress.resetWaitMinutes" })}>
                              <IconButton
                                size="small"
                                onClick={() => resetWaitMinutesOverride(recipeKey, index)}
                                aria-label={formatMessage({ id: "progress.resetWaitMinutes" })}
                                sx={{ color: "text.secondary", p: 0.5 }}
                              >
                                <RestartAltIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}
                          {previousDone && (
                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<PlayArrowIcon />}
                              onClick={() => {
                                if (
                                  typeof Notification !== "undefined" &&
                                  Notification.permission === "default"
                                ) {
                                  void Notification.requestPermission();
                                }
                                startTimer(recipeKey, index);
                              }}
                              sx={{ color: "primary.main", borderColor: "primary.main" }}
                            >
                              {formatMessage({ id: "progress.start" })}
                            </Button>
                          )}
                        </Box>
                      )}
                      {waitMinutes !== undefined && entry?.startedAt !== undefined && (
                        <StepTimer
                          waitMinutes={waitMinutes}
                          startedAt={entry.startedAt}
                          notified={entry?.notified ?? false}
                          stepTitle={formatMessage({ id: step.titleId })}
                          onStop={() => stopTimer(recipeKey, index)}
                          onNotified={() => markNotified(recipeKey, index)}
                        />
                      )}
                    </>
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>
      </CardContent>
      <ConfirmDialog
        open={resetOpen}
        titleId="progress.resetTitle"
        bodyId="progress.resetBody"
        confirmId="progress.resetConfirm"
        onClose={() => setResetOpen(false)}
        onConfirm={() => resetRecipe(recipeKey)}
      />
    </Card>
  );
};

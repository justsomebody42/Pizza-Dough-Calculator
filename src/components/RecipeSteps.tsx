import { Box, Button, Card, CardContent, Checkbox, Typography } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import type { CalcValues } from "../calc";
import { formatGrams } from "../calc";
import { useProgressStore } from "../progressStore";
import type { RecipeStep } from "../recipesData";
import { cardSx, colors } from "../styles";
import { CompletedAt } from "./CompletedAt";
import { ConfirmDialog } from "./ConfirmDialog";
import { StepTimer } from "./StepTimer";

export const RecipeSteps: React.FC<{
  readonly steps: readonly RecipeStep[];
  readonly calcValues: CalcValues;
  readonly recipeKey: string;
}> = ({ steps, calcValues, recipeKey }) => {
  const { formatMessage } = useIntl();
  const recipeProgress = useProgressStore((state) => state.progress[recipeKey]);
  const toggleStep = useProgressStore((state) => state.toggleStep);
  const startTimer = useProgressStore((state) => state.startTimer);
  const markNotified = useProgressStore((state) => state.markNotified);
  const resetRecipe = useProgressStore((state) => state.resetRecipe);
  const [resetOpen, setResetOpen] = useState(false);

  const amounts = {
    waterAmount: formatGrams(calcValues.wasser),
    saltAmount: formatGrams(calcValues.salz),
    yeastAmount: formatGrams(calcValues.hefe),
    oilAmount: formatGrams(calcValues.oel),
    flourAmount: formatGrams(calcValues.mehl),
  };

  return (
    <Card sx={cardSx}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
          <Button
            size="small"
            startIcon={<RestartAltIcon />}
            onClick={() => setResetOpen(true)}
            sx={{ color: colors.textMuted }}
          >
            <FormattedMessage id="progress.newDough" defaultMessage="Start new dough" />
          </Button>
        </Box>
        <Box>
          {steps.map((step, index) => {
            const entry = recipeProgress?.[index];
            const done = entry?.done ?? false;
            const previousDone = index === 0 || (recipeProgress?.[index - 1]?.done ?? false);
            const nextDone = recipeProgress?.[index + 1]?.done ?? false;
            const checkboxDisabled = done ? nextDone : !previousDone;

            return (
              <Box
                key={step.titleId}
                className="step-box"
                sx={{ display: "flex", alignItems: "flex-start", opacity: done ? 0.5 : 1 }}
              >
                <Checkbox
                  checked={done}
                  disabled={checkboxDisabled}
                  onChange={() => toggleStep(recipeKey, index)}
                  sx={{ color: colors.textMuted, p: 0.5, mt: -0.25 }}
                />
                <Box sx={{ flex: 1, pt: 0.5 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: "bold",
                      color: colors.heading,
                      textDecoration: done ? "line-through" : "none",
                    }}
                  >
                    {index + 1}. {formatMessage({ id: step.titleId })}
                  </Typography>
                  {done ? (
                    entry?.doneAt !== undefined && <CompletedAt doneAt={entry.doneAt} />
                  ) : (
                    <>
                      <Typography variant="body2" sx={{ color: colors.textMuted, mt: 0.5 }}>
                        {formatMessage({ id: step.textId }, amounts)}
                      </Typography>
                      {step.waitMinutes !== undefined && previousDone && (
                        <StepTimer
                          waitMinutes={step.waitMinutes}
                          startedAt={entry?.startedAt}
                          notified={entry?.notified ?? false}
                          stepTitle={formatMessage({ id: step.titleId })}
                          onStart={() => startTimer(recipeKey, index)}
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

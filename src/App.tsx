import { Box, Container, Paper, Typography } from "@mui/material";
import { useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { calculateIngredients } from "./calc";
import { FlourTips } from "./components/FlourTips";
import { Footer } from "./components/Footer";
import { IngredientStats } from "./components/IngredientStats";
import { LanguageSelect } from "./components/LanguageSelect";
import { RecipeConfigForm } from "./components/RecipeConfigForm";
import { RecipeSteps } from "./components/RecipeSteps";
import { UnavailableAlert } from "./components/UnavailableAlert";
import { useProgressStore } from "./progressStore";
import { getAdjustableStepIndex, recipesData } from "./recipesData";
import { useConfigStore } from "./store";
import { colors } from "./styles";

export const App = () => {
  const {
    locale,
    mehlart,
    gehzeit,
    pizzen,
    setLocale,
    setMehlart,
    setGehzeit,
    setPizzen,
  } = useConfigStore();

  const recipe = recipesData[mehlart][gehzeit];
  const recipeKey = `${mehlart}-${gehzeit}`;

  const adjustableStepIndex = recipe.available
    ? getAdjustableStepIndex(recipe.steps)
    : undefined;
  const adjustableBaseMinutes =
    recipe.available && adjustableStepIndex !== undefined
      ? recipe.steps[adjustableStepIndex].waitMinutes ?? 0
      : undefined;

  const riseMinutesOverride = useProgressStore((state) =>
    adjustableStepIndex === undefined
      ? undefined
      : state.progress[recipeKey]?.[adjustableStepIndex]?.waitMinutesOverride,
  );
  const setWaitMinutesOverride = useProgressStore((state) => state.setWaitMinutesOverride);
  const bakeAt = useProgressStore((state) => state.bakeAt[recipeKey]);
  const adjustableStepProgress = useProgressStore((state) =>
    adjustableStepIndex === undefined ? undefined : state.progress[recipeKey]?.[adjustableStepIndex],
  );
  const longRiseStarted =
    adjustableStepProgress?.startedAt !== undefined || adjustableStepProgress?.done === true;

  const riseMinutes =
    adjustableBaseMinutes === undefined ? undefined : riseMinutesOverride ?? adjustableBaseMinutes;

  const calcValues = useMemo(
    () => (recipe.available ? calculateIngredients(recipe, pizzen) : null),
    [recipe, pizzen],
  );

  return (
    <Container maxWidth="xl">
      <Paper
        elevation={3}
        sx={{
          mt: 4,
          p: { xs: 2, sm: 4 },
          bgcolor: colors.panelBg,
          color: colors.text,
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box />
          <Typography
            variant="h4"
            component="h1"
            sx={{
              color: colors.accent,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            <FormattedMessage
              id="app.title"
              defaultMessage="Pizza Teig Rechner"
            />
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <LanguageSelect value={locale} onChange={setLocale} />
          </Box>
        </Box>

        <RecipeConfigForm
          mehlart={mehlart}
          gehzeit={gehzeit}
          pizzen={pizzen}
          riseMinutes={riseMinutes}
          riseMinutesDisabled={bakeAt !== undefined && longRiseStarted}
          onMehlartChange={setMehlart}
          onGehzeitChange={setGehzeit}
          onPizzenChange={setPizzen}
          onRiseMinutesChange={(minutes) => {
            if (adjustableStepIndex !== undefined) {
              setWaitMinutesOverride(recipeKey, adjustableStepIndex, minutes);
            }
          }}
        />

        {recipe.available && calcValues ? (
          <Box>
            <IngredientStats calcValues={calcValues} />
            <FlourTips tips={recipe.mehlTipp} />
            <RecipeSteps
              steps={recipe.steps}
              calcValues={calcValues}
              recipeKey={recipeKey}
            />
          </Box>
        ) : (
          <UnavailableAlert reason={recipe.mehlTipp[0]} />
        )}
      </Paper>

      <Footer />
    </Container>
  );
};

import { Box, Container, Paper, Typography } from "@mui/material";
import { useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { calculateIngredients } from "./calc";
import { Footer } from "./components/Footer";
import { IngredientStats } from "./components/IngredientStats";
import { LanguageSelect } from "./components/LanguageSelect";
import { RecipeConfigForm } from "./components/RecipeConfigForm";
import { RecipeSteps } from "./components/RecipeSteps";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { UnavailableAlert } from "./components/UnavailableAlert";
import { recipesData } from "./recipesData";
import { useConfigStore } from "./store";

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
          bgcolor: "custom.panel",
          color: "text.primary",
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
              color: "primary.main",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            <FormattedMessage
              id="app.title"
              defaultMessage="Pizza Teig Rechner"
            />
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 0.5 }}>
            <LanguageSelect value={locale} onChange={setLocale} />
            <ThemeSwitcher />
          </Box>
        </Box>

        <RecipeConfigForm
          mehlart={mehlart}
          gehzeit={gehzeit}
          pizzen={pizzen}
          flourTips={recipe.mehlTipp}
          steps={recipe.available ? recipe.steps : undefined}
          onMehlartChange={setMehlart}
          onGehzeitChange={setGehzeit}
          onPizzenChange={setPizzen}
        />

        {recipe.available && calcValues ? (
          <Box>
            <IngredientStats calcValues={calcValues} />
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

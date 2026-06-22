import { Box, Card, CardContent, Typography } from "@mui/material";
import { useIntl } from "react-intl";
import type { CalcValues } from "../calc";
import { formatGrams } from "../calc";
import type { RecipeStep } from "../recipesData";
import { cardSx, colors } from "../styles";

export const RecipeSteps: React.FC<{
  readonly steps: readonly RecipeStep[];
  readonly calcValues: CalcValues;
}> = ({ steps, calcValues }) => {
  const { formatMessage } = useIntl();
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
        <Box>
          {steps.map((step, index) => (
            <Box key={step.titleId} className="step-box">
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold", color: colors.heading }}
              >
                {index + 1}. {formatMessage({ id: step.titleId })}
              </Typography>
              <Typography variant="body2" sx={{ color: colors.textMuted, mt: 0.5 }}>
                {formatMessage({ id: step.textId }, amounts)}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

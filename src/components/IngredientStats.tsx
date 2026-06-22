import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import type { CalcValues } from "../calc";
import type { MessageKey } from "../i18n/messages";
import { cardSx, colors } from "../styles";

const STATS: ReadonlyArray<{
  readonly key: keyof CalcValues;
  readonly messageId: MessageKey;
  readonly color: string;
}> = [
  { key: "mehl", messageId: "stats.mehl", color: colors.text },
  { key: "wasser", messageId: "stats.wasser", color: colors.water },
  { key: "salz", messageId: "stats.salz", color: colors.text },
  { key: "oel", messageId: "stats.oel", color: colors.text },
  { key: "hefe", messageId: "stats.hefe", color: colors.accent },
];

export const IngredientStats: React.FC<{
  readonly calcValues: CalcValues;
}> = ({ calcValues }) => {
  const { formatMessage } = useIntl();

  return (
    <Card sx={cardSx}>
      <CardContent>
        <Grid container spacing={2}>
          {STATS.map((stat) => (
            <Grid size={{ lg: 2, md: 4, sm: 6, xs: 12 }} key={stat.key}>
              <Box
                sx={{
                  bgcolor: colors.panelBg,
                  border: `1px solid ${colors.border}`,
                  p: 1.5,
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: colors.textMuted,
                    display: "block",
                    textTransform: "uppercase",
                  }}
                >
                  <FormattedMessage id={stat.messageId} />
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: stat.color, mt: 0.5 }}
                >
                  {formatMessage(
                    { id: "stats.unit.gram" },
                    { value: calcValues[stat.key] },
                  )}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

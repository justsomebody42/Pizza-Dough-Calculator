import { Box, Card, CardContent, Typography } from "@mui/material";
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
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {STATS.map((stat) => (
            <Box
              key={stat.key}
              sx={{
                flex: "1 1 0",
                minWidth: { xs: "100%", sm: "36%", md: "26%", lg: "14%" },
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
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

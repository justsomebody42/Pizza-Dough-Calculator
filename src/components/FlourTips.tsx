import { Alert, List, ListItem, ListItemText, Typography } from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { colors } from "../styles";

export const FlourTips: React.FC<{ readonly tips: readonly string[] }> = ({
  tips,
}) => {
  const { formatMessage } = useIntl();

  return (
    <Alert
      severity="info"
      icon={false}
      sx={{
        bgcolor: colors.tipBg,
        color: colors.tipText,
        border: `1px solid ${colors.tipBorder}`,
        borderRadius: 2,
        mb: 2,
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{ color: colors.accent, fontWeight: "bold", mb: 1 }}
      >
        <FormattedMessage
          id="tips.heading"
          defaultMessage="Empfohlene Mehlsorten:"
        />
      </Typography>
      <List dense sx={{ p: 0 }}>
        {tips.map((tip) => (
          <ListItem key={tip} sx={{ p: "2px 0" }}>
            <ListItemText
              primary={formatMessage({ id: "tips.item" }, { tip })}
            />
          </ListItem>
        ))}
      </List>
    </Alert>
  );
};

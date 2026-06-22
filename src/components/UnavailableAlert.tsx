import { Alert } from "@mui/material";
import { useIntl } from "react-intl";

export const UnavailableAlert: React.FC<{ readonly reason: string }> = ({
  reason,
}) => {
  const { formatMessage } = useIntl();

  return (
    <Alert severity="error" sx={{ borderRadius: 2 }}>
      {formatMessage({ id: "error.unavailable" }, { reason })}
    </Alert>
  );
};

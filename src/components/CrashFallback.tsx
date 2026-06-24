import { Alert, Button, Container, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";

export const CrashFallback: React.FC<{ readonly error: Error }> = ({ error }) => (
  <Container maxWidth="sm" sx={{ mt: 4 }}>
    <Alert severity="error" sx={{ borderRadius: 2, flexDirection: "column" }}>
      <Typography sx={{ mb: 1 }}>
        <FormattedMessage id="error.crashBody" defaultMessage="Something went wrong. Please reload the page." />
      </Typography>
      <Typography variant="caption" sx={{ fontFamily: "monospace", wordBreak: "break-word", display: "block" }}>
        {error.message}
      </Typography>
      <Button variant="contained" sx={{ mt: 2 }} onClick={() => globalThis.location.reload()}>
        <FormattedMessage id="error.reload" defaultMessage="Reload page" />
      </Button>
    </Alert>
  </Container>
);

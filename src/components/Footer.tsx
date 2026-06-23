import { Box, Link, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { FormattedMessage } from "react-intl";
const repoUrl = "https://github.com/justsomebody42/Pizza-Dough-Calculator";

export const Footer = () => (
  <Box component="footer" sx={{ mt: 3, textAlign: "center" }}>
    <Typography
      variant="caption"
      sx={{
        color: "text.secondary",
        display: "inline-flex",
        alignItems: "center",
        gap: 0.75,
      }}
    >
      <Link
        href={repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          color: "text.secondary",
          display: "inline-flex",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        <GitHubIcon fontSize="inherit" />
        GitHub
        <OpenInNewIcon fontSize="inherit" />
      </Link>
      <span>·</span>
      {__APP_COMMIT__ === "" ? (
        <FormattedMessage
          id="footer.version"
          defaultMessage="⭐ v{version}"
          values={{ version: __APP_VERSION__ }}
        />
      ) : (
        <FormattedMessage
          id="footer.versionWithCommit"
          defaultMessage="⭐ v{version} ({commit})"
          values={{ version: __APP_VERSION__, commit: __APP_COMMIT__ }}
        />
      )}
    </Typography>
  </Box>
);

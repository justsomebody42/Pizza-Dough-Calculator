import type { ReactNode } from "react";
import { Typography } from "@mui/material";
import { colors } from "../styles";

export const ConfigLabel: React.FC<{ readonly children: ReactNode }> = ({
  children,
}) => (
  <Typography
    variant="caption"
    sx={{
      color: colors.textMuted,
      display: "block",
      mb: 1,
      textTransform: "uppercase",
    }}
  >
    {children}
  </Typography>
);

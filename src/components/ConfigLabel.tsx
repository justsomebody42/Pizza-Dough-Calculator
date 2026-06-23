import type { ReactNode } from "react";
import { Typography } from "@mui/material";
export const ConfigLabel: React.FC<{ readonly children: ReactNode }> = ({
  children,
}) => (
  <Typography
    variant="caption"
    sx={{
      color: "text.secondary",
      display: "block",
      mb: 1,
      textTransform: "uppercase",
    }}
  >
    {children}
  </Typography>
);

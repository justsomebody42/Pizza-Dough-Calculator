import { IconButton, Tooltip } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useIntl } from "react-intl";
import { useConfigStore } from "../store";

export const ThemeSwitcher: React.FC = () => {
  const { formatMessage } = useIntl();
  const colorMode = useConfigStore((state) => state.colorMode);
  const toggleColorMode = useConfigStore((state) => state.toggleColorMode);
  const labelId = colorMode === "dark" ? "theme.switchToLight" : "theme.switchToDark";

  return (
    <Tooltip title={formatMessage({ id: labelId })}>
      <IconButton
        size="small"
        onClick={toggleColorMode}
        aria-label={formatMessage({ id: labelId })}
        sx={{ color: "text.secondary" }}
      >
        {colorMode === "dark" ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
      </IconButton>
    </Tooltip>
  );
};

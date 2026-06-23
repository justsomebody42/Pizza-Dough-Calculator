import { Button, ButtonGroup } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useIntl } from "react-intl";
import { getDurationLabel } from "../durationLabel";
import { useConfigStore } from "../store";

const DEFAULT_STEP_MINUTES = 60;
const DEFAULT_MIN_MINUTES = 30;

export const RiseTimeStepper: React.FC<{
  readonly value: number;
  readonly onChange: (value: number) => void;
  readonly stepMinutes?: number;
  readonly minMinutes?: number;
}> = ({ value, onChange, stepMinutes = DEFAULT_STEP_MINUTES, minMinutes = DEFAULT_MIN_MINUTES }) => {
  const locale = useConfigStore((state) => state.locale);
  const { formatMessage } = useIntl();
  const theme = useTheme();

  return (
    <ButtonGroup
      fullWidth
      size="small"
      sx={{ bgcolor: "custom.panel", overflow: "hidden" }}
    >
      <Button
        onClick={() => onChange(Math.max(minMinutes, value - stepMinutes))}
        sx={{ color: "text.secondary", height: theme.inputHeight, borderColor: "custom.inputBorder" }}
      >
        -
      </Button>
      <Button
        disabled
        sx={{
          "&.Mui-disabled": { color: "text.primary", borderColor: "custom.inputBorder" },
          width: "60%",
          height: theme.inputHeight,
        }}
      >
        {getDurationLabel(value, locale, formatMessage)}
      </Button>
      <Button
        onClick={() => onChange(value + stepMinutes)}
        sx={{ color: "text.secondary", height: theme.inputHeight, borderColor: "custom.inputBorder" }}
      >
        +
      </Button>
    </ButtonGroup>
  );
};

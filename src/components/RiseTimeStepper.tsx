import { Button, ButtonGroup } from "@mui/material";
import { useIntl } from "react-intl";
import { getDurationLabel } from "../durationLabel";
import { useConfigStore } from "../store";
import { colors, inputHeight } from "../styles";

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

  return (
    <ButtonGroup
      fullWidth
      size="small"
      sx={{ bgcolor: colors.panelBg, overflow: "hidden" }}
    >
      <Button
        onClick={() => onChange(Math.max(minMinutes, value - stepMinutes))}
        sx={{ color: colors.textMuted, height: inputHeight, borderColor: colors.inputBorder }}
      >
        -
      </Button>
      <Button
        disabled
        sx={{
          "&.Mui-disabled": { color: colors.text, borderColor: colors.inputBorder },
          width: "60%",
          height: inputHeight,
        }}
      >
        {getDurationLabel(value, locale, formatMessage)}
      </Button>
      <Button
        onClick={() => onChange(value + stepMinutes)}
        sx={{ color: colors.textMuted, height: inputHeight, borderColor: colors.inputBorder }}
      >
        +
      </Button>
    </ButtonGroup>
  );
};

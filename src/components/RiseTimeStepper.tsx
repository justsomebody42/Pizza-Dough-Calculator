import { Button, ButtonGroup } from "@mui/material";
import { formatHoursLabel } from "../dateFormat";
import { useConfigStore } from "../store";
import { colors, inputHeight } from "../styles";

const STEP_MINUTES = 60;
const MIN_MINUTES = 30;

export const RiseTimeStepper: React.FC<{
  readonly value: number;
  readonly onChange: (value: number) => void;
  readonly disabled?: boolean;
}> = ({ value, onChange, disabled = false }) => {
  const locale = useConfigStore((state) => state.locale);

  return (
    <ButtonGroup
      fullWidth
      size="small"
      sx={{ bgcolor: colors.panelBg, overflow: "hidden" }}
    >
      <Button
        disabled={disabled}
        onClick={() => onChange(Math.max(MIN_MINUTES, value - STEP_MINUTES))}
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
        {formatHoursLabel(value, locale)}
      </Button>
      <Button
        disabled={disabled}
        onClick={() => onChange(value + STEP_MINUTES)}
        sx={{ color: colors.textMuted, height: inputHeight, borderColor: colors.inputBorder }}
      >
        +
      </Button>
    </ButtonGroup>
  );
};

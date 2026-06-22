import { Button, ButtonGroup } from "@mui/material";
import { colors, inputHeight } from "../styles";

export const PizzenStepper: React.FC<{
  readonly value: number;
  readonly onChange: (value: number) => void;
}> = ({ value, onChange }) => (
  <ButtonGroup
    fullWidth
    size="small"
    sx={{ bgcolor: colors.panelBg, overflow: "hidden" }}
  >
    <Button
      onClick={() => onChange(Math.max(1, value - 1))}
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
      {value}
    </Button>
    <Button
      onClick={() => onChange(value + 1)}
      sx={{ color: colors.textMuted, height: inputHeight, borderColor: colors.inputBorder }}
    >
      +
    </Button>
  </ButtonGroup>
);

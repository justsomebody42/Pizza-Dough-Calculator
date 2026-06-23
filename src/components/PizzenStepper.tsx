import { Button, ButtonGroup } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const PizzenStepper: React.FC<{
  readonly value: number;
  readonly onChange: (value: number) => void;
}> = ({ value, onChange }) => {
  const theme = useTheme();

  return (
    <ButtonGroup
      fullWidth
      size="small"
      sx={{ bgcolor: "custom.panel", overflow: "hidden" }}
    >
      <Button
        onClick={() => onChange(Math.max(1, value - 1))}
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
        {value}
      </Button>
      <Button
        onClick={() => onChange(value + 1)}
        sx={{ color: "text.secondary", height: theme.inputHeight, borderColor: "custom.inputBorder" }}
      >
        +
      </Button>
    </ButtonGroup>
  );
};

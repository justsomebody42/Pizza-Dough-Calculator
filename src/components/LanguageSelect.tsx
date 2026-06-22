import { MenuItem, Select } from "@mui/material";
import type { Locale } from "../i18n/messages";
import { colors, inputHeight } from "../styles";

const LANGUAGE_OPTIONS: ReadonlyArray<{ readonly value: Locale; readonly label: string }> = [
  { value: "de", label: "Deutsch" },
  { value: "en", label: "English" },
];

export const LanguageSelect: React.FC<{
  readonly value: Locale;
  readonly onChange: (value: Locale) => void;
}> = ({ value, onChange }) => (
  <Select
    value={value}
    onChange={(event) => onChange(event.target.value as Locale)}
    size="small"
    sx={{
      color: colors.text,
      bgcolor: colors.panelBg,
      height: inputHeight,
      ".MuiOutlinedInput-notchedOutline": {
        borderColor: colors.inputBorder,
      },
    }}
  >
    {LANGUAGE_OPTIONS.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </Select>
);

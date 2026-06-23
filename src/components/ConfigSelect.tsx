import { FormControl, MenuItem, Select } from "@mui/material";
import { useIntl } from "react-intl";
import type { MessageKey } from "../i18n/messages";

export const ConfigSelect: React.FC<{
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly options: ReadonlyArray<{
    readonly value: string;
    readonly messageId: MessageKey;
  }>;
}> = ({ value, onChange, options }) => {
  const { formatMessage } = useIntl();

  return (
    <FormControl fullWidth size="small">
      <Select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        sx={{
          color: "text.primary",
          bgcolor: "custom.panel",
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: "custom.inputBorder",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {formatMessage({ id: option.messageId })}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

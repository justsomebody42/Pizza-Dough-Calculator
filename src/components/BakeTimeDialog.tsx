import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import type { StepProgressEntry } from "../progressStore";
import type { RecipeStep } from "../recipesData";
import { getEarliestReadyAt } from "../scheduleUtils";

const toLocalInputValue = (date: Date): string => {
  const pad = (value: number) => String(value).padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours(),
  )}:${pad(date.getMinutes())}`;
};

export const BakeTimeDialog: React.FC<{
  readonly open: boolean;
  readonly initialValue: number | undefined;
  readonly steps: readonly RecipeStep[];
  readonly recipeProgress: Record<number, StepProgressEntry> | undefined;
  readonly onClose: () => void;
  readonly onConfirm: (timestamp: number) => void;
}> = ({ open, initialValue, steps, recipeProgress, onClose, onConfirm }) => {
  const [value, setValue] = useState("");
  const [earliestBakeAt, setEarliestBakeAt] = useState(() => Date.now());

  useEffect(() => {
    if (open) {
      setValue(initialValue === undefined ? "" : toLocalInputValue(new Date(initialValue)));
      setEarliestBakeAt(getEarliestReadyAt(steps, recipeProgress, Date.now()));
    }
  }, [open, initialValue, steps, recipeProgress]);

  const timestamp = value === "" ? undefined : new Date(value).getTime();
  const isTooSoon = timestamp !== undefined && timestamp < earliestBakeAt;
  const isValid = timestamp !== undefined && !Number.isNaN(timestamp) && !isTooSoon;

  const handleConfirm = () => {
    if (!isValid) {
      return;
    }

    onConfirm(timestamp);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} disableEnforceFocus>
      <DialogTitle>
        <FormattedMessage id="progress.bakeAt" defaultMessage="Bake pizza at …" />
      </DialogTitle>
      <DialogContent>
        <TextField
          type="datetime-local"
          fullWidth
          value={value}
          onChange={(event) => setValue(event.target.value)}
          error={isTooSoon}
          helperText={
            isTooSoon ? (
              <FormattedMessage
                id="progress.bakeAtTooSoon"
                defaultMessage="Not enough time for this dough – choose a later time."
              />
            ) : undefined
          }
          slotProps={{
            inputLabel: { shrink: true },
            htmlInput: {
              min: toLocalInputValue(new Date(earliestBakeAt)),
              style: { minWidth: 220 },
            },
          }}
          sx={{ mt: 1 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          <FormattedMessage id="progress.cancel" defaultMessage="Cancel" />
        </Button>
        <Button onClick={handleConfirm} variant="contained" disabled={!isValid}>
          <FormattedMessage id="progress.bakeAtConfirm" defaultMessage="Set" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

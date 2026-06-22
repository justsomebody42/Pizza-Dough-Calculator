import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import EventIcon from "@mui/icons-material/Event";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { formatClockLabel } from "../dateFormat";
import { useConfigStore } from "../store";
import { colors } from "../styles";
import { BakeTimeDialog } from "./BakeTimeDialog";
import { ConfirmDialog } from "./ConfirmDialog";

export const BakeSchedule: React.FC<{
  readonly totalWaitMinutes: number;
  readonly bakeAt: number | undefined;
  readonly onSetBakeAt: (timestamp: number) => void;
  readonly onClearBakeAt: () => void;
}> = ({ totalWaitMinutes, bakeAt, onSetBakeAt, onClearBakeAt }) => {
  const { formatMessage } = useIntl();
  const locale = useConfigStore((state) => state.locale);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [clearOpen, setClearOpen] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (bakeAt === undefined) {
      return;
    }

    const tick = () => setNow(Date.now());
    tick();
    const interval = setInterval(tick, 1000);
    document.addEventListener("visibilitychange", tick);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", tick);
    };
  }, [bakeAt]);

  const totalDays = Math.floor(totalWaitMinutes / 1440);
  const totalHours = Math.floor((totalWaitMinutes % 1440) / 60);
  const totalMinutes = totalWaitMinutes % 60;

  const startAt = bakeAt === undefined ? undefined : bakeAt - totalWaitMinutes * 60_000;
  const remainingMs = startAt === undefined ? undefined : startAt - now;

  const buttonLabel =
    bakeAt === undefined
      ? formatMessage({ id: "progress.bakeAt" })
      : formatMessage(
          { id: "progress.bakeAtSet" },
          { time: formatClockLabel(new Date(bakeAt), locale, now) },
        );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Button
          size="small"
          variant="outlined"
          startIcon={<EventIcon />}
          onClick={() => setPickerOpen(true)}
          sx={{ color: colors.accent, borderColor: colors.accent }}
        >
          {buttonLabel}
        </Button>
        <Typography variant="caption" sx={{ color: colors.textMuted }}>
          {formatMessage(
            { id: "progress.totalDuration" },
            { days: totalDays, hours: totalHours, minutes: totalMinutes },
          )}
        </Typography>
      </Box>
      {startAt !== undefined && remainingMs !== undefined && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          <Typography variant="body2" sx={{ color: colors.water }}>
            {remainingMs <= 0
              ? formatMessage({ id: "progress.startNow" })
              : formatMessage(
                  { id: "progress.remaining" },
                  {
                    hours: Math.floor(Math.ceil(remainingMs / 60_000) / 60),
                    minutes: Math.ceil(remainingMs / 60_000) % 60,
                  },
                )}
          </Typography>
          <Typography variant="caption" sx={{ color: colors.textMuted }}>
            {formatMessage(
              { id: "progress.startBy" },
              { time: formatClockLabel(new Date(startAt), locale, now) },
            )}
          </Typography>
          <Tooltip title={formatMessage({ id: "progress.clearBakeAt" })}>
            <IconButton
              size="small"
              onClick={() => setClearOpen(true)}
              aria-label={formatMessage({ id: "progress.clearBakeAt" })}
              sx={{ color: colors.textMuted, p: 0.25 }}
            >
              <DeleteOutlineIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      <BakeTimeDialog
        open={pickerOpen}
        initialValue={bakeAt}
        totalWaitMinutes={totalWaitMinutes}
        onClose={() => setPickerOpen(false)}
        onConfirm={onSetBakeAt}
      />
      <ConfirmDialog
        open={clearOpen}
        titleId="progress.clearBakeAtTitle"
        bodyId="progress.clearBakeAtBody"
        confirmId="progress.clearBakeAtConfirm"
        onClose={() => setClearOpen(false)}
        onConfirm={onClearBakeAt}
      />
    </Box>
  );
};

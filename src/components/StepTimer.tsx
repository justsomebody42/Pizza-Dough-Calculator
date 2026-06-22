import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { formatClockLabel } from "../dateFormat";
import { useConfigStore } from "../store";
import { colors } from "../styles";
import { ConfirmDialog } from "./ConfirmDialog";

export const StepTimer: React.FC<{
  readonly waitMinutes: number;
  readonly startedAt: number | undefined;
  readonly notified: boolean;
  readonly stepTitle: string;
  readonly onStart: () => void;
  readonly onNotified: () => void;
}> = ({ waitMinutes, startedAt, notified, stepTitle, onStart, onNotified }) => {
  const { formatMessage } = useIntl();
  const locale = useConfigStore((state) => state.locale);
  const [now, setNow] = useState(() => Date.now());
  const [restartOpen, setRestartOpen] = useState(false);

  useEffect(() => {
    if (startedAt === undefined) {
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
  }, [startedAt]);

  const target = startedAt === undefined ? undefined : startedAt + waitMinutes * 60_000;
  const remainingMs = target === undefined ? undefined : target - now;

  useEffect(() => {
    if (remainingMs === undefined || remainingMs > 0 || notified) {
      return;
    }

    if (typeof Notification !== "undefined" && Notification.permission === "granted") {
      void new Notification(formatMessage({ id: "progress.notificationTitle" }), {
        body: formatMessage({ id: "progress.notificationBody" }, { stepTitle }),
      });
    }

    onNotified();
  }, [remainingMs, notified, stepTitle, formatMessage, onNotified]);

  const handleStart = () => {
    if (typeof Notification !== "undefined" && Notification.permission === "default") {
      void Notification.requestPermission();
    }

    onStart();
  };

  if (startedAt === undefined) {
    return (
      <Button
        size="small"
        variant="outlined"
        startIcon={<PlayArrowIcon />}
        onClick={handleStart}
        sx={{ mt: 0.5, color: colors.accent, borderColor: colors.accent }}
      >
        {formatMessage({ id: "progress.start" })}
      </Button>
    );
  }

  if (remainingMs !== undefined && remainingMs <= 0) {
    return (
      <Typography variant="body2" sx={{ color: colors.accent, fontWeight: "bold", mt: 0.5 }}>
        {formatMessage({ id: "progress.ready" })}
      </Typography>
    );
  }

  const targetDate = new Date(target as number);
  const timeLabel = formatClockLabel(targetDate, locale, now);

  const totalMinutesLeft = Math.max(0, Math.ceil((remainingMs as number) / 60_000));
  const hours = Math.floor(totalMinutesLeft / 60);
  const minutes = totalMinutesLeft % 60;

  return (
    <Box sx={{ mt: 0.5 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <Typography variant="body2" sx={{ color: colors.water }}>
          {formatMessage({ id: "progress.remaining" }, { hours, minutes })}
        </Typography>
        <Tooltip title={formatMessage({ id: "progress.restart" })}>
          <IconButton
            size="small"
            onClick={() => setRestartOpen(true)}
            aria-label={formatMessage({ id: "progress.restart" })}
            sx={{ color: colors.textMuted, p: 0.25 }}
          >
            <RestartAltIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Box>
      <Typography variant="caption" sx={{ color: colors.textMuted }}>
        {formatMessage({ id: "progress.readyAt" }, { time: timeLabel })}
      </Typography>
      <ConfirmDialog
        open={restartOpen}
        titleId="progress.restartTitle"
        bodyId="progress.restartBody"
        confirmId="progress.restartConfirm"
        onClose={() => setRestartOpen(false)}
        onConfirm={handleStart}
      />
    </Box>
  );
};

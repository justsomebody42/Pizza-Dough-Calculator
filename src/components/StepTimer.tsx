import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import StopIcon from "@mui/icons-material/Stop";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { formatClockLabel } from "../dateFormat";
import { useConfigStore } from "../store";
import { ConfirmDialog } from "./ConfirmDialog";

export const StepTimer: React.FC<{
  readonly waitMinutes: number;
  readonly startedAt: number;
  readonly notified: boolean;
  readonly stepTitle: string;
  readonly onStop: () => void;
  readonly onNotified: () => void;
}> = ({ waitMinutes, startedAt, notified, stepTitle, onStop, onNotified }) => {
  const { formatMessage } = useIntl();
  const locale = useConfigStore((state) => state.locale);
  const [now, setNow] = useState(() => Date.now());
  const [stopOpen, setStopOpen] = useState(false);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const interval = setInterval(tick, 1000);
    document.addEventListener("visibilitychange", tick);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", tick);
    };
  }, [startedAt]);

  const target = startedAt + waitMinutes * 60_000;
  const remainingMs = target - now;

  useEffect(() => {
    if (remainingMs > 0 || notified) {
      return;
    }

    if (typeof Notification !== "undefined" && Notification.permission === "granted") {
      const title = formatMessage({ id: "progress.notificationTitle" });
      const body = formatMessage({ id: "progress.notificationBody" }, { stepTitle });

      void (async () => {
        try {
          // Mobile browsers (notably Android Chrome) don't support `new
          // Notification()` and throw instead - they require showing
          // notifications through the service worker.
          const registration =
            typeof navigator !== "undefined" && "serviceWorker" in navigator
              ? await navigator.serviceWorker.getRegistration()
              : undefined;

          if (registration) {
            await registration.showNotification(title, { body });
          } else {
            new Notification(title, { body });
          }
        } catch {
          // Notifications are best-effort; never let a platform quirk crash the app.
        }
      })();
    }

    onNotified();
  }, [remainingMs, notified, stepTitle, formatMessage, onNotified]);

  if (remainingMs <= 0) {
    return (
      <Typography variant="body2" sx={{ color: "primary.main", fontWeight: "bold", mt: 0.5 }}>
        {formatMessage({ id: "progress.ready" })}
      </Typography>
    );
  }

  const timeLabel = formatClockLabel(new Date(target), locale, now);
  const totalSecondsLeft = Math.max(0, Math.ceil(remainingMs / 1000));
  const hours = Math.floor(totalSecondsLeft / 3600);
  const minutes = Math.floor((totalSecondsLeft % 3600) / 60);
  const seconds = totalSecondsLeft % 60;

  return (
    <Box sx={{ mt: 0.5 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <Typography variant="body2" sx={{ color: "custom.water" }}>
          {formatMessage({ id: "progress.remainingWithSeconds" }, { hours, minutes, seconds })}
        </Typography>
        <Tooltip title={formatMessage({ id: "progress.stop" })}>
          <IconButton
            size="small"
            onClick={() => setStopOpen(true)}
            aria-label={formatMessage({ id: "progress.stop" })}
            sx={{ color: "text.secondary", p: 0.25 }}
          >
            <StopIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Box>
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        {formatMessage({ id: "progress.readyAt" }, { time: timeLabel })}
      </Typography>
      <ConfirmDialog
        open={stopOpen}
        titleId="progress.stopTitle"
        bodyId="progress.stopBody"
        confirmId="progress.stopConfirm"
        onClose={() => setStopOpen(false)}
        onConfirm={onStop}
      />
    </Box>
  );
};

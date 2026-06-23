import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { formatClockLabel } from "../dateFormat";
import { useConfigStore } from "../store";
export const CompletedAt: React.FC<{ readonly doneAt: number }> = ({ doneAt }) => {
  const { formatMessage } = useIntl();
  const locale = useConfigStore((state) => state.locale);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const interval = setInterval(tick, 60_000);
    document.addEventListener("visibilitychange", tick);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", tick);
    };
  }, []);

  const timeLabel = formatClockLabel(new Date(doneAt), locale, now);

  const elapsedMinutes = Math.max(0, Math.floor((now - doneAt) / 60_000));
  const days = Math.floor(elapsedMinutes / 1440);
  const hours = Math.floor((elapsedMinutes % 1440) / 60);
  const minutes = elapsedMinutes % 60;

  const agoText =
    days > 0
      ? hours > 0
        ? formatMessage({ id: "progress.agoDaysHours" }, { days, hours })
        : formatMessage({ id: "progress.agoDays" }, { days })
      : elapsedMinutes >= 60
        ? formatMessage({ id: "progress.agoHours" }, { hours })
        : formatMessage({ id: "progress.agoMinutes" }, { minutes });

  return (
    <Typography variant="caption" sx={{ color: "text.secondary" }}>
      {formatMessage({ id: "progress.completedAt" }, { time: timeLabel })} ({agoText})
    </Typography>
  );
};

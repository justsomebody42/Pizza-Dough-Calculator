import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import EventIcon from "@mui/icons-material/Event";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { formatFullDateTimeParts } from "../dateFormat";
import { downloadIcsReminder } from "../ics";
import { useProgressStore } from "../progressStore";
import {
  GEHZEIT_OPTIONS,
  MEHLART_OPTIONS,
  type Gehzeit,
  type MehlArt,
  type RecipeStep,
} from "../recipesData";
import { getEarliestReadyAt, getTotalWaitMinutes } from "../scheduleUtils";
import { useConfigStore } from "../store";
import { BakeTimeDialog } from "./BakeTimeDialog";
import { ConfigLabel } from "./ConfigLabel";
import { ConfigSelect } from "./ConfigSelect";
import { ConfirmDialog } from "./ConfirmDialog";
import { FlourTipsDialog } from "./FlourTipsDialog";
import { PizzenStepper } from "./PizzenStepper";

type DateTimeParts = ReturnType<typeof formatFullDateTimeParts>;

const buildDurationCaption = (params: {
  readonly totalDays: number;
  readonly totalHours: number;
  readonly totalMinutes: number;
  readonly hasStarted: boolean;
  readonly projectedReadyParts: DateTimeParts | undefined;
  readonly remainingMs: number | undefined;
  readonly readyParts: DateTimeParts | undefined;
  readonly startParts: DateTimeParts | undefined;
  readonly renderHighlight: (chunks: ReactNode) => ReactNode;
}): ReactNode => {
  const {
    totalDays,
    totalHours,
    totalMinutes,
    hasStarted,
    projectedReadyParts,
    remainingMs,
    readyParts,
    startParts,
    renderHighlight,
  } = params;
  const durationValues = {
    days: totalDays,
    hours: totalHours,
    minutes: totalMinutes,
  };

  if (hasStarted && projectedReadyParts !== undefined) {
    return (
      <FormattedMessage
        id="progress.totalDurationRunning"
        values={{
          ...durationValues,
          readyWeekday: projectedReadyParts.weekday,
          readyDate: projectedReadyParts.date,
          readyTime: projectedReadyParts.time,
          highlightReady: renderHighlight,
        }}
      />
    );
  }

  if (remainingMs === undefined || readyParts === undefined) {
    return (
      <FormattedMessage
        id="progress.totalDurationOnly"
        values={durationValues}
      />
    );
  }

  if (remainingMs <= 0) {
    return (
      <FormattedMessage
        id="progress.totalDurationStartNow"
        values={{
          ...durationValues,
          readyWeekday: readyParts.weekday,
          readyDate: readyParts.date,
          readyTime: readyParts.time,
          highlightReady: renderHighlight,
        }}
      />
    );
  }

  return (
    <FormattedMessage
      id="progress.totalDurationStart"
      values={{
        ...durationValues,
        startWeekday: startParts?.weekday,
        startDate: startParts?.date,
        startTime: startParts?.time,
        readyWeekday: readyParts.weekday,
        readyDate: readyParts.date,
        readyTime: readyParts.time,
        highlightStart: renderHighlight,
        highlightReady: renderHighlight,
      }}
    />
  );
};

export const RecipeConfigForm: React.FC<{
  readonly mehlart: MehlArt;
  readonly gehzeit: Gehzeit;
  readonly pizzen: number;
  readonly flourTips: readonly string[];
  readonly steps: readonly RecipeStep[] | undefined;
  readonly onMehlartChange: (value: MehlArt) => void;
  readonly onGehzeitChange: (value: Gehzeit) => void;
  readonly onPizzenChange: (value: number) => void;
}> = ({
  mehlart,
  gehzeit,
  pizzen,
  flourTips,
  steps,
  onMehlartChange,
  onGehzeitChange,
  onPizzenChange,
}) => {
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const locale = useConfigStore((state) => state.locale);
  const recipeKey = `${mehlart}-${gehzeit}`;
  const recipeProgress = useProgressStore((state) => state.progress[recipeKey]);
  const bakeAt = useProgressStore((state) => state.bakeAt[recipeKey]);
  const setBakeAt = useProgressStore((state) => state.setBakeAt);
  const clearBakeAt = useProgressStore((state) => state.clearBakeAt);
  const [tipsOpen, setTipsOpen] = useState(false);
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

  const totalWaitMinutes =
    steps === undefined ? 0 : getTotalWaitMinutes(steps, recipeProgress);
  const totalDays = Math.floor(totalWaitMinutes / 1440);
  const totalHours = Math.floor((totalWaitMinutes % 1440) / 60);
  const totalMinutes = totalWaitMinutes % 60;

  const hasStarted =
    recipeProgress !== undefined &&
    Object.values(recipeProgress).some(
      (entry) => entry.done || entry.startedAt !== undefined,
    );

  const startAt =
    bakeAt === undefined ? undefined : bakeAt - totalWaitMinutes * 60_000;
  const remainingMs = startAt === undefined ? undefined : startAt - now;

  const startParts =
    startAt === undefined
      ? undefined
      : formatFullDateTimeParts(new Date(startAt), locale);
  const readyParts =
    bakeAt === undefined
      ? undefined
      : formatFullDateTimeParts(new Date(bakeAt), locale);
  const projectedReadyParts =
    !hasStarted || steps === undefined
      ? undefined
      : formatFullDateTimeParts(
          new Date(getEarliestReadyAt(steps, recipeProgress, now)),
          locale,
        );

  const renderHighlight = (chunks: ReactNode): ReactNode => (
    <Box component="span" sx={{ fontWeight: 700, color: "text.primary" }}>
      {chunks}
    </Box>
  );

  const bakeButtonLabel =
    readyParts === undefined
      ? formatMessage({ id: "progress.bakeAt" })
      : undefined;
  const bakeButtonWeekdayLabel =
    readyParts === undefined
      ? undefined
      : formatMessage({ id: "progress.bakeAtSetWeekday" }, readyParts);
  const bakeButtonTimeLabel =
    readyParts === undefined
      ? undefined
      : formatMessage({ id: "progress.bakeAtSetTime" }, readyParts);

  const durationCaption = buildDurationCaption({
    totalDays,
    totalHours,
    totalMinutes,
    hasStarted,
    projectedReadyParts,
    remainingMs,
    readyParts,
    startParts,
    renderHighlight,
  });

  const handleAddToCalendar = () => {
    if (startAt === undefined || readyParts === undefined) {
      return;
    }

    const mehlartLabel = formatMessage({
      id: MEHLART_OPTIONS.find((option) => option.value === mehlart)!
        .messageId,
    });
    const gehzeitLabel = formatMessage({
      id: GEHZEIT_OPTIONS.find((option) => option.value === gehzeit)!
        .messageId,
    });

    void downloadIcsReminder({
      filename: "pizza-teig-start.ics",
      title: formatMessage({ id: "progress.calendarEventTitle" }),
      description: formatMessage(
        { id: "progress.calendarEventDescription" },
        {
          mehlart: mehlartLabel,
          gehzeit: gehzeitLabel,
          ...readyParts,
        },
      ),
      start: new Date(startAt),
      durationMinutes: 15,
    });
  };

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <ConfigLabel>
              <FormattedMessage
                id="config.mehlart.label"
                defaultMessage="Mehlart"
              />
            </ConfigLabel>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <ConfigSelect
                  value={mehlart}
                  onChange={(value) => onMehlartChange(value as MehlArt)}
                  options={MEHLART_OPTIONS}
                />
              </Box>
              <IconButton
                size="small"
                onClick={() => setTipsOpen(true)}
                aria-label={formatMessage({ id: "tips.infoLabel" })}
                sx={{ color: "text.secondary" }}
              >
                <InfoOutlinedIcon fontSize="small" />
              </IconButton>
            </Box>
            <FlourTipsDialog
              open={tipsOpen}
              tips={flourTips}
              onClose={() => setTipsOpen(false)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <ConfigLabel>
              <FormattedMessage
                id="config.gehzeit.label"
                defaultMessage="Gehzeit"
              />
            </ConfigLabel>
            <ConfigSelect
              value={gehzeit}
              onChange={(value) => onGehzeitChange(value as Gehzeit)}
              options={GEHZEIT_OPTIONS}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <ConfigLabel>
              <FormattedMessage
                id="config.pizzen.label"
                defaultMessage="Anzahl Pizzen"
              />
            </ConfigLabel>
            <PizzenStepper value={pizzen} onChange={onPizzenChange} />
          </Grid>
          {steps !== undefined && (
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <ConfigLabel>
                <FormattedMessage
                  id="config.bakeAt.label"
                  defaultMessage="🍕 Pizza time!"
                />
              </ConfigLabel>
              <Button
                size="small"
                fullWidth
                variant="outlined"
                startIcon={<EventIcon />}
                onClick={() => setPickerOpen(true)}
                sx={{
                  color: "primary.main",
                  borderColor: "primary.main",
                  height: theme.inputHeight,
                  py: 0,
                }}
              >
                {readyParts === undefined ? (
                  bakeButtonLabel
                ) : (
                  <Box
                    component="span"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      lineHeight: 1.1,
                      fontSize: "0.75rem",
                    }}
                  >
                    <Box component="span">{bakeButtonWeekdayLabel}</Box>
                    <Box component="span">{bakeButtonTimeLabel}</Box>
                  </Box>
                )}
              </Button>
            </Grid>
          )}
        </Grid>
        {steps !== undefined && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.75,
              mt: 1.5,
              flexWrap: "wrap",
            }}
          >
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {durationCaption}
            </Typography>
            {!hasStarted && startAt !== undefined && remainingMs !== undefined && (
              <Tooltip title={formatMessage({ id: "progress.addToCalendar" })}>
                <IconButton
                  size="small"
                  onClick={handleAddToCalendar}
                  aria-label={formatMessage({ id: "progress.addToCalendar" })}
                  sx={{ color: "text.secondary", p: 0.25 }}
                >
                  <CalendarMonthOutlinedIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            )}
            {startAt !== undefined && remainingMs !== undefined && (
              <Tooltip title={formatMessage({ id: "progress.clearBakeAt" })}>
                <IconButton
                  size="small"
                  onClick={() => setClearOpen(true)}
                  aria-label={formatMessage({ id: "progress.clearBakeAt" })}
                  sx={{ color: "text.secondary", p: 0.25 }}
                >
                  <DeleteOutlineIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        )}
      </CardContent>
      {steps !== undefined && (
        <>
          <BakeTimeDialog
            open={pickerOpen}
            initialValue={bakeAt}
            steps={steps}
            recipeProgress={recipeProgress}
            onClose={() => setPickerOpen(false)}
            onConfirm={(timestamp) => setBakeAt(recipeKey, timestamp)}
          />
          <ConfirmDialog
            open={clearOpen}
            titleId="progress.clearBakeAtTitle"
            bodyId="progress.clearBakeAtBody"
            confirmId="progress.clearBakeAtConfirm"
            onClose={() => setClearOpen(false)}
            onConfirm={() => clearBakeAt(recipeKey)}
          />
        </>
      )}
    </Card>
  );
};

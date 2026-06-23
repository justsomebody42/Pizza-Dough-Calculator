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
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { formatClockLabel } from "../dateFormat";
import { useProgressStore } from "../progressStore";
import {
  GEHZEIT_OPTIONS,
  MEHLART_OPTIONS,
  type Gehzeit,
  type MehlArt,
  type RecipeStep,
} from "../recipesData";
import { getTotalWaitMinutes } from "../scheduleUtils";
import { useConfigStore } from "../store";
import { cardSx, colors, inputHeight } from "../styles";
import { BakeTimeDialog } from "./BakeTimeDialog";
import { ConfigLabel } from "./ConfigLabel";
import { ConfigSelect } from "./ConfigSelect";
import { ConfirmDialog } from "./ConfirmDialog";
import { FlourTipsDialog } from "./FlourTipsDialog";
import { PizzenStepper } from "./PizzenStepper";

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

  const startAt =
    bakeAt === undefined ? undefined : bakeAt - totalWaitMinutes * 60_000;
  const remainingMs = startAt === undefined ? undefined : startAt - now;

  const bakeButtonLabel =
    bakeAt === undefined
      ? formatMessage({ id: "progress.bakeAt" })
      : formatMessage(
          { id: "progress.bakeAtSet" },
          { time: formatClockLabel(new Date(bakeAt), locale, now) },
        );

  return (
    <Card sx={cardSx}>
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
                sx={{ color: colors.textMuted }}
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
                  color: colors.accent,
                  borderColor: colors.accent,
                  height: inputHeight,
                }}
              >
                {bakeButtonLabel}
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
            <Typography variant="caption" sx={{ color: colors.textMuted }}>
              {formatMessage(
                { id: "progress.totalDuration" },
                { days: totalDays, hours: totalHours, minutes: totalMinutes },
              )}
              {startAt !== undefined &&
                remainingMs !== undefined &&
                ` ${
                  remainingMs <= 0
                    ? formatMessage({ id: "progress.startNow" })
                    : formatMessage(
                        { id: "progress.remaining" },
                        {
                          hours: Math.floor(
                            Math.ceil(remainingMs / 60_000) / 60,
                          ),
                          minutes: Math.ceil(remainingMs / 60_000) % 60,
                          time: formatClockLabel(
                            new Date(startAt),
                            locale,
                            now,
                          ),
                        },
                      )
                }`}
            </Typography>
            {startAt !== undefined && remainingMs !== undefined && (
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
            )}
          </Box>
        )}
      </CardContent>
      {steps !== undefined && (
        <>
          <BakeTimeDialog
            open={pickerOpen}
            initialValue={bakeAt}
            totalWaitMinutes={totalWaitMinutes}
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

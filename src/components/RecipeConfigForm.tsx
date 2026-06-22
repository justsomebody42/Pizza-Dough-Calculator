import { Card, CardContent, Grid, Tooltip } from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import {
  GEHZEIT_OPTIONS,
  MEHLART_OPTIONS,
  type Gehzeit,
  type MehlArt,
} from "../recipesData";
import { cardSx } from "../styles";
import { ConfigLabel } from "./ConfigLabel";
import { ConfigSelect } from "./ConfigSelect";
import { PizzenStepper } from "./PizzenStepper";
import { RiseTimeStepper } from "./RiseTimeStepper";

export const RecipeConfigForm: React.FC<{
  readonly mehlart: MehlArt;
  readonly gehzeit: Gehzeit;
  readonly pizzen: number;
  readonly riseMinutes: number | undefined;
  readonly riseMinutesDisabled: boolean;
  readonly onMehlartChange: (value: MehlArt) => void;
  readonly onGehzeitChange: (value: Gehzeit) => void;
  readonly onPizzenChange: (value: number) => void;
  readonly onRiseMinutesChange: (value: number) => void;
}> = ({
  mehlart,
  gehzeit,
  pizzen,
  riseMinutes,
  riseMinutesDisabled,
  onMehlartChange,
  onGehzeitChange,
  onPizzenChange,
  onRiseMinutesChange,
}) => {
  const { formatMessage } = useIntl();

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
            <ConfigSelect
              value={mehlart}
              onChange={(value) => onMehlartChange(value as MehlArt)}
              options={MEHLART_OPTIONS}
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
          {riseMinutes !== undefined && (
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <ConfigLabel>
                <FormattedMessage
                  id="config.riseTime.label"
                  defaultMessage="Adjust rise time (h)"
                />
              </ConfigLabel>
              <Tooltip
                title={
                  riseMinutesDisabled
                    ? formatMessage({ id: "config.riseTime.disabledHint" })
                    : ""
                }
              >
                <span style={{ display: "block" }}>
                  <RiseTimeStepper
                    value={riseMinutes}
                    onChange={onRiseMinutesChange}
                    disabled={riseMinutesDisabled}
                  />
                </span>
              </Tooltip>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

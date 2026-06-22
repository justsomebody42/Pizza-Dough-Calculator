import { Card, CardContent, Grid } from "@mui/material";
import { FormattedMessage } from "react-intl";
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

export const RecipeConfigForm: React.FC<{
  readonly mehlart: MehlArt;
  readonly gehzeit: Gehzeit;
  readonly pizzen: number;
  readonly onMehlartChange: (value: MehlArt) => void;
  readonly onGehzeitChange: (value: Gehzeit) => void;
  readonly onPizzenChange: (value: number) => void;
}> = ({
  mehlart,
  gehzeit,
  pizzen,
  onMehlartChange,
  onGehzeitChange,
  onPizzenChange,
}) => (
  <Card sx={cardSx}>
    <CardContent>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
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
        <Grid size={{ xs: 12, md: 4 }}>
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
        <Grid size={{ xs: 12, md: 4 }}>
          <ConfigLabel>
            <FormattedMessage
              id="config.pizzen.label"
              defaultMessage="Anzahl Pizzen"
            />
          </ConfigLabel>
          <PizzenStepper value={pizzen} onChange={onPizzenChange} />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

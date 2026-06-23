import type { IntlShape } from "react-intl";
import { formatHoursLabel } from "./dateFormat";
import type { Locale } from "./i18n/messages";

export const getDurationLabel = (
  minutes: number,
  locale: Locale,
  formatMessage: IntlShape["formatMessage"],
): string => {
  if (minutes < 60) {
    return formatMessage({ id: "duration.minutes" }, { minutes });
  }

  return formatMessage(
    { id: "duration.hours" },
    { hours: minutes / 60, hoursLabel: formatHoursLabel(minutes, locale) },
  );
};

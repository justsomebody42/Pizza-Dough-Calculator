import type { Locale } from "./i18n/messages";

export const formatHoursLabel = (minutes: number, locale: Locale): string => {
  const hours = minutes / 60;

  return new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(hours);
};

export const formatClockLabel = (date: Date, locale: Locale, now: number = Date.now()): string => {
  const isToday = date.toDateString() === new Date(now).toDateString();

  if (isToday) {
    return new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit" }).format(date);
  }

  const weekday = new Intl.DateTimeFormat(locale, { weekday: "short" }).format(date);
  const time = new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit" }).format(date);

  return `${weekday} ${time}`;
};

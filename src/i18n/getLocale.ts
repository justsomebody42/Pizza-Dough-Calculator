import type { Locale } from "./messages";

export const getLocale = (): Locale =>
  navigator.language.toLowerCase().startsWith("en") ? "en" : "de";

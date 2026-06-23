import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getLocale } from "./i18n/getLocale";
import type { Locale } from "./i18n/messages";
import type { Gehzeit, MehlArt } from "./recipesData";

type ColorMode = "light" | "dark";

interface ConfigState {
  readonly locale: Locale;
  readonly mehlart: MehlArt;
  readonly gehzeit: Gehzeit;
  readonly pizzen: number;
  readonly colorMode: ColorMode;
  readonly setLocale: (locale: Locale) => void;
  readonly setMehlart: (mehlart: MehlArt) => void;
  readonly setGehzeit: (gehzeit: Gehzeit) => void;
  readonly setPizzen: (pizzen: number) => void;
  readonly toggleColorMode: () => void;
}

export const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      locale: getLocale(),
      mehlart: "weizen",
      gehzeit: "24",
      pizzen: 8,
      colorMode: "dark",
      setLocale: (locale) => set({ locale }),
      setMehlart: (mehlart) => set({ mehlart }),
      setGehzeit: (gehzeit) => set({ gehzeit }),
      setPizzen: (pizzen) => set({ pizzen }),
      toggleColorMode: () =>
        set((state) => ({ colorMode: state.colorMode === "dark" ? "light" : "dark" })),
    }),
    { name: "teig-rechner.settings" },
  ),
);

import type { MessageKey } from "./i18n/messages";

export type MehlArt = "weizen" | "dinkel" | "glutenfrei";
export type Gehzeit = "2-3" | "24" | "72";

export interface RecipeStep {
  readonly titleId: MessageKey;
  readonly textId: MessageKey;
  readonly waitMinutes?: number;
}

export interface AvailableRecipe {
  readonly available: true;
  readonly mehlTipp: readonly string[];
  readonly hydratation: number;
  readonly salzProzent: number;
  readonly oelProzent: number;
  readonly hefeProzent: number;
  readonly steps: readonly RecipeStep[];
}

export interface UnavailableRecipe {
  readonly available: false;
  readonly mehlTipp: readonly string[];
}

export type Recipe = AvailableRecipe | UnavailableRecipe;

export const MEHLART_OPTIONS: ReadonlyArray<{
  readonly value: MehlArt;
  readonly messageId: MessageKey;
}> = [
  { value: "weizen", messageId: "config.mehlart.weizen" },
  { value: "dinkel", messageId: "config.mehlart.dinkel" },
  { value: "glutenfrei", messageId: "config.mehlart.glutenfrei" },
];

export const GEHZEIT_OPTIONS: ReadonlyArray<{
  readonly value: Gehzeit;
  readonly messageId: MessageKey;
}> = [
  { value: "2-3", messageId: "config.gehzeit.express" },
  { value: "24", messageId: "config.gehzeit.24h" },
  { value: "72", messageId: "config.gehzeit.72h" },
];

export const recipesData: Record<MehlArt, Record<Gehzeit, Recipe>> = {
  weizen: {
    "2-3": {
      available: true,
      mehlTipp: [
        "Frießinger Mühle: 'Pizza Napoletana la Verace' (Blau)",
        "Caputo: 'Pizzeria' (Blau) oder 'Classica' (Blau)",
        "Alternative: Mühle Schlingemann 'Pizza-Mehl Tipo 00'",
      ],
      hydratation: 0.6,
      salzProzent: 0.03,
      oelProzent: 0.02,
      hefeProzent: 0.017,
      steps: [
        {
          titleId: "steps.weizen.express.0.title",
          textId: "steps.weizen.express.0.text",
          waitMinutes: 5,
        },
        {
          titleId: "steps.weizen.express.1.title",
          textId: "steps.weizen.express.1.text",
        },
        {
          titleId: "steps.weizen.express.2.title",
          textId: "steps.weizen.express.2.text",
          waitMinutes: 20,
        },
        {
          titleId: "steps.weizen.express.3.title",
          textId: "steps.weizen.express.3.text",
          waitMinutes: 120,
        },
        {
          titleId: "steps.weizen.express.4.title",
          textId: "steps.weizen.express.4.text",
          waitMinutes: 120,
        },
      ],
    },
    24: {
      available: true,
      mehlTipp: [
        "Frießinger Mühle: 'Pizza Napoletana la Verace' (Blau)",
        "Caputo: 'Nuvola' (Hellblau) oder 'Cuoco' (Rot)",
        "Alternative: Spielberger Bio: 'Pizzamehl Tipo 00'",
      ],
      hydratation: 0.6,
      salzProzent: 0.03,
      oelProzent: 0.02,
      hefeProzent: 0.0035,
      steps: [
        {
          titleId: "steps.weizen.24h.0.title",
          textId: "steps.weizen.24h.0.text",
          waitMinutes: 5,
        },
        {
          titleId: "steps.weizen.24h.1.title",
          textId: "steps.weizen.24h.1.text",
        },
        {
          titleId: "steps.weizen.24h.2.title",
          textId: "steps.weizen.24h.2.text",
          waitMinutes: 30,
        },
        {
          titleId: "steps.weizen.24h.3.title",
          textId: "steps.weizen.24h.3.text",
          waitMinutes: 1440,
        },
        {
          titleId: "steps.weizen.24h.4.title",
          textId: "steps.weizen.24h.4.text",
          waitMinutes: 180,
        },
      ],
    },
    72: {
      available: true,
      mehlTipp: [
        "Frießinger Mühle: 'la farina FÜR PIZZA TIPO 00 14' (Gelb/Weiß)",
        "Caputo: 'Cuoco' (Rote Packung)",
        "Alternative: Mühle Schlingemann: 'Superiore Tipo 00'",
      ],
      hydratation: 0.64,
      salzProzent: 0.03,
      oelProzent: 0.02,
      hefeProzent: 0.0018,
      steps: [
        {
          titleId: "steps.weizen.72h.0.title",
          textId: "steps.weizen.72h.0.text",
        },
        {
          titleId: "steps.weizen.72h.1.title",
          textId: "steps.weizen.72h.1.text",
        },
        {
          titleId: "steps.weizen.72h.2.title",
          textId: "steps.weizen.72h.2.text",
          waitMinutes: 30,
        },
        {
          titleId: "steps.weizen.72h.3.title",
          textId: "steps.weizen.72h.3.text",
          waitMinutes: 20,
        },
        {
          titleId: "steps.weizen.72h.4.title",
          textId: "steps.weizen.72h.4.text",
          waitMinutes: 4320,
        },
        {
          titleId: "steps.weizen.72h.5.title",
          textId: "steps.weizen.72h.5.text",
          waitMinutes: 240,
        },
      ],
    },
  },
  dinkel: {
    "2-3": {
      available: true,
      mehlTipp: [
        "Frießinger Mühle: 'Spezialmehl für Dinkel Pizza'",
        "Alternative: Baula Bio: 'Dinkelmehl Type 630'",
      ],
      hydratation: 0.57,
      salzProzent: 0.03,
      oelProzent: 0.02,
      hefeProzent: 0.015,
      steps: [
        {
          titleId: "steps.dinkel.express.0.title",
          textId: "steps.dinkel.express.0.text",
        },
        {
          titleId: "steps.dinkel.express.1.title",
          textId: "steps.dinkel.express.1.text",
          waitMinutes: 20,
        },
        {
          titleId: "steps.dinkel.express.2.title",
          textId: "steps.dinkel.express.2.text",
          waitMinutes: 120,
        },
      ],
    },
    24: {
      available: true,
      mehlTipp: [
        "Frießinger Mühle: 'Spezialmehl für Dinkel Pizza' (Grün)",
        "Alternative: Spielberger Bio: 'Dinkelmehl Type 812'",
      ],
      hydratation: 0.57,
      salzProzent: 0.03,
      oelProzent: 0.02,
      hefeProzent: 0.003,
      steps: [
        {
          titleId: "steps.dinkel.24h.0.title",
          textId: "steps.dinkel.24h.0.text",
        },
        {
          titleId: "steps.dinkel.24h.1.title",
          textId: "steps.dinkel.24h.1.text",
          waitMinutes: 30,
        },
        {
          titleId: "steps.dinkel.24h.2.title",
          textId: "steps.dinkel.24h.2.text",
          waitMinutes: 20,
        },
        {
          titleId: "steps.dinkel.24h.3.title",
          textId: "steps.dinkel.24h.3.text",
          waitMinutes: 1440,
        },
      ],
    },
    72: {
      available: false,
      mehlTipp: [
        "Nicht empfohlen! Reines Dinkelmehl kollabiert nach 72 Stunden kalter Führung.",
      ],
    },
  },
  glutenfrei: {
    "2-3": {
      available: true,
      mehlTipp: [
        "Caputo: 'Fioreglut' (Glutenfrei)",
        "Alternative: Schär: 'Mix B' (Brotmix)",
      ],
      hydratation: 0.8,
      salzProzent: 0.03,
      oelProzent: 0.03,
      hefeProzent: 0.015,
      steps: [
        {
          titleId: "steps.glutenfrei.express.0.title",
          textId: "steps.glutenfrei.express.0.text",
        },
        {
          titleId: "steps.glutenfrei.express.1.title",
          textId: "steps.glutenfrei.express.1.text",
          waitMinutes: 90,
        },
      ],
    },
    24: {
      available: true,
      mehlTipp: [
        "Caputo: 'Fioreglut' (Glutenfrei)",
        "Alternative: Hammermühle: 'Mehl-Mix wie Tipo 00'",
      ],
      hydratation: 0.8,
      salzProzent: 0.03,
      oelProzent: 0.035,
      hefeProzent: 0.015,
      steps: [
        {
          titleId: "steps.glutenfrei.24h.0.title",
          textId: "steps.glutenfrei.24h.0.text",
        },
        {
          titleId: "steps.glutenfrei.24h.1.title",
          textId: "steps.glutenfrei.24h.1.text",
          waitMinutes: 60,
        },
        {
          titleId: "steps.glutenfrei.24h.2.title",
          textId: "steps.glutenfrei.24h.2.text",
          waitMinutes: 1440,
        },
        {
          titleId: "steps.glutenfrei.24h.3.title",
          textId: "steps.glutenfrei.24h.3.text",
        },
      ],
    },
    72: {
      available: false,
      mehlTipp: [
        "Nicht sinnvoll. Glutenfreie Stärkemischungen werden nach 72 Stunden flüssig.",
      ],
    },
  },
};

import { createTheme, type Theme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    inputHeight: number;
  }
  interface ThemeOptions {
    inputHeight?: number;
  }
  interface Palette {
    custom: {
      panel: string;
      inputBorder: string;
      heading: string;
      water: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      panel?: string;
      inputBorder?: string;
      heading?: string;
      water?: string;
    };
  }
}

const accent = "#f97316";
const inputHeight = 40;

export const createAppTheme = (mode: "light" | "dark"): Theme =>
  createTheme({
    palette:
      mode === "dark"
        ? {
            mode,
            primary: { main: accent },
            background: { default: "#121212", paper: "#111827" },
            divider: "#374151",
            text: { primary: "#fff", secondary: "#9ca3af" },
            custom: {
              panel: "#1f2937",
              inputBorder: "#4b5563",
              heading: "#e5e7eb",
              water: "#60a5fa",
            },
          }
        : {
            mode,
            primary: { main: accent },
            background: { default: "#f9fafb", paper: "#ffffff" },
            divider: "#e5e7eb",
            text: { primary: "#111827", secondary: "#6b7280" },
            custom: {
              panel: "#f3f4f6",
              inputBorder: "#d1d5db",
              heading: "#1f2937",
              water: "#2563eb",
            },
          },
    inputHeight,
    components: {
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: (theme.shape.borderRadius as number) * 3,
            padding: theme.spacing(1),
            marginBottom: theme.spacing(2),
          }),
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            height: inputHeight,
          },
        },
      },
    },
  });

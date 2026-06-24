import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { StrictMode, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { IntlProvider } from "react-intl";
import "@fontsource/roboto/latin-300.css";
import "@fontsource/roboto/latin-400.css";
import "@fontsource/roboto/latin-500.css";
import "@fontsource/roboto/latin-700.css";
import { App } from "./App";
import { CrashFallback } from "./components/CrashFallback";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { messages } from "./i18n/messages";
import { useConfigStore } from "./store";
import { createAppTheme } from "./theme";
import "./index.css";

const renderCrashFallback = (error: Error) => <CrashFallback error={error} />;

const Root = () => {
  const locale = useConfigStore((state) => state.locale);
  const colorMode = useConfigStore((state) => state.colorMode);
  const theme = useMemo(() => createAppTheme(colorMode), [colorMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <IntlProvider locale={locale} defaultLocale="de" messages={messages[locale]}>
        <ErrorBoundary fallback={renderCrashFallback}>
          <App />
        </ErrorBoundary>
      </IntlProvider>
    </ThemeProvider>
  );
};

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { IntlProvider } from "react-intl";
import "@fontsource/roboto/latin-300.css";
import "@fontsource/roboto/latin-400.css";
import "@fontsource/roboto/latin-500.css";
import "@fontsource/roboto/latin-700.css";
import { App } from "./App";
import { messages } from "./i18n/messages";
import { useConfigStore } from "./store";
import "./index.css";

const Root = () => {
  const locale = useConfigStore((state) => state.locale);

  return (
    <IntlProvider locale={locale} defaultLocale="de" messages={messages[locale]}>
      <App />
    </IntlProvider>
  );
};

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);

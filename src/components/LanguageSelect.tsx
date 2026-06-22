import { Box, IconButton, Tooltip } from "@mui/material";
import { useIntl } from "react-intl";
import type { Locale, MessageKey } from "../i18n/messages";

const FlagDe: React.FC = () => (
  <svg width="20" height="14" viewBox="0 0 5 3" aria-hidden="true">
    <rect width="5" height="1" fill="#000000" />
    <rect width="5" height="1" y="1" fill="#DD0000" />
    <rect width="5" height="1" y="2" fill="#FFCE00" />
  </svg>
);

const FlagGb: React.FC = () => (
  <svg width="20" height="14" viewBox="0 0 60 30" aria-hidden="true">
    <rect width="60" height="30" fill="#012169" />
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth="6" />
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
    <path d="M30,0 V30 M0,15 H60" stroke="#FFFFFF" strokeWidth="10" />
    <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
  </svg>
);

const FLAGS: Record<Locale, React.FC> = { de: FlagDe, en: FlagGb };
const SWITCH_TOOLTIP_ID: Record<Locale, MessageKey> = {
  de: "language.switchToDe",
  en: "language.switchToEn",
};
const LOCALES: readonly Locale[] = ["de", "en"];

export const LanguageSelect: React.FC<{
  readonly value: Locale;
  readonly onChange: (value: Locale) => void;
}> = ({ value, onChange }) => {
  const { formatMessage } = useIntl();

  return (
    <Box sx={{ display: "flex", gap: 0.5 }}>
      {LOCALES.map((locale) => {
        const isActive = locale === value;
        const Flag = FLAGS[locale];
        const button = (
          <IconButton
            size="small"
            onClick={() => onChange(locale)}
            sx={{
              p: 0.5,
              borderRadius: 1,
              lineHeight: 0,
              filter: isActive ? "none" : "grayscale(1)",
              opacity: isActive ? 1 : 0.5,
            }}
          >
            <Flag />
          </IconButton>
        );

        if (isActive) {
          return <Box key={locale}>{button}</Box>;
        }

        return (
          <Tooltip key={locale} title={formatMessage({ id: SWITCH_TOOLTIP_ID[locale] })}>
            {button}
          </Tooltip>
        );
      })}
    </Box>
  );
};

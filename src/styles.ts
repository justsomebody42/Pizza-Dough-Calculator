export const colors = {
  panelBg: "#1f2937",
  cardBg: "#111827",
  border: "#374151",
  textMuted: "#9ca3af",
  text: "#fff",
  accent: "#f97316",
  water: "#60a5fa",
  inputBorder: "#4b5563",
  heading: "#e5e7eb",
  tipBg: "rgba(249, 115, 22, 0.15)",
  tipText: "#ffedd5",
  tipBorder: "rgba(249, 115, 22, 0.3)",
} as const;

export const inputHeight = 40;

export const cardSx = {
  bgcolor: colors.cardBg,
  color: colors.text,
  border: `1px solid ${colors.border}`,
  borderRadius: 3,
  p: 1,
  mb: 2,
} as const;

const escapeIcsText = (value: string): string =>
  value
    .replaceAll("\\", String.raw`\\`)
    .replaceAll(";", String.raw`\;`)
    .replaceAll(",", String.raw`\,`)
    .replaceAll("\n", String.raw`\n`);

const toIcsDateTime = (date: Date): string => `${date.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`;

const buildIcsContent = (params: {
  readonly title: string;
  readonly description: string;
  readonly start: Date;
  readonly durationMinutes: number;
}): string => {
  const { title, description, start, durationMinutes } = params;
  const end = new Date(start.getTime() + durationMinutes * 60_000);
  const uid = `${start.getTime()}-${Math.random().toString(36).slice(2)}@teig-rechner`;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//teig-rechner//start-reminder//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${toIcsDateTime(new Date())}`,
    `DTSTART:${toIcsDateTime(start)}`,
    `DTEND:${toIcsDateTime(end)}`,
    `SUMMARY:${escapeIcsText(title)}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapeIcsText(title)}`,
    "TRIGGER:-PT15M",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.join("\r\n");
};

const isAbortError = (error: unknown): boolean =>
  error instanceof DOMException && error.name === "AbortError";

const downloadIcsFile = (filename: string, icsContent: string): void => {
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

export const downloadIcsReminder = async (params: {
  readonly filename: string;
  readonly title: string;
  readonly description: string;
  readonly start: Date;
  readonly durationMinutes: number;
}): Promise<void> => {
  const { filename, title, description } = params;
  const icsContent = buildIcsContent(params);
  const file = new File([icsContent], filename, { type: "text/calendar" });

  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title, text: description });
      return;
    } catch (error) {
      if (isAbortError(error)) {
        return;
      }
    }
  }

  downloadIcsFile(filename, icsContent);
};

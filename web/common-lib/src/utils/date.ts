import dayjs from "dayjs";
import "dayjs/locale/es";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.locale("es");
dayjs.extend(customParseFormat);

export const shortMonths = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"
];

export const fullMonths = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const acceptedFormats = [
  "dd MM yyyy",
  "dd/MMMM/yyyy",
  "ISO",
  "dd de MMMM de yyyy",
  "dd/MM/yyyy"
] as const;

type AcceptedFormats = typeof acceptedFormats[number];

/* ------------------------------------------------------
   Helpers internos
------------------------------------------------------ */

// convierte 01/01/2025 → 01 Ene 2025
const formatToShortMonthDate = (input: string): string | null => {
  if (typeof input !== "string") return null;
  input = input.trim();

  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = input.match(regex);
  if (!match) return null;

  const [_, day, month, year] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  if (
    date.getDate() !== parseInt(day) ||
    date.getMonth() + 1 !== parseInt(month) ||
    date.getFullYear() !== parseInt(year)
  ) {
    return null;
  }

  const monthStr = shortMonths[date.getMonth()];
  return `${day} ${monthStr} ${year}`;
};

// convierte 01/01/2025 → 01/Enero/2025
const formatToSlashLongMonthDate = (input: string): string | null => {
  if (typeof input !== "string") return null;
  input = input.trim();

  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = input.match(regex);
  if (!match) return null;

  const [_, day, month, year] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  if (
    date.getDate() !== parseInt(day) ||
    date.getMonth() + 1 !== parseInt(month) ||
    date.getFullYear() !== parseInt(year)
  ) {
    return null;
  }

  const monthStr = fullMonths[date.getMonth()];
  return `${day}/${monthStr}/${year}`;
};

// convierte 01/01/2025 → 01 de enero de 2025
const formatToFullTextDate = (input: string): string | null => {
  if (typeof input !== "string") return null;
  input = input.trim();

  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = input.match(regex);
  if (!match) return null;

  const [_, day, month, year] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  if (
    date.getDate() !== parseInt(day) ||
    date.getMonth() + 1 !== parseInt(month) ||
    date.getFullYear() !== parseInt(year)
  ) {
    return null;
  }

  const monthStr = fullMonths[date.getMonth()].toLowerCase();
  return `${parseInt(day)} de ${monthStr} de ${year}`;
};

// convierte 01/01/2025 → 2025-01-01
function toIsoFormat(date: string) {
  if (!date) return "";
  const [day, month, year] = date.split("/");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

// convierte 2025-01-01 → 01/01/2025
const formatFromApiYMDToSlashDMY = (input: string): string | null => {
  if (typeof input !== "string") return null;
  const s = input.trim();

  const mYMD = s.match(/^(\d{4})[\/-](\d{2})[\/-](\d{2})$/);
  if (mYMD) {
    const [, y, m, d] = mYMD;
    const date = new Date(Number(y), Number(m) - 1, Number(d));
    if (
      date.getFullYear() === Number(y) &&
      date.getMonth() + 1 === Number(m) &&
      date.getDate() === Number(d)
    ) {
      return `${d.padStart(2, "0")}/${m.padStart(2, "0")}/${y}`;
    }
    return null;
  }

  const mDMY = s.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (mDMY) return s;
  return null;
};

/* ------------------------------------------------------
   API principal
------------------------------------------------------ */

// convierte distintos formatos a la salida seleccionada
export function formatDate(input: string, format: AcceptedFormats = "dd MM yyyy"): string | null {
  if (typeof input !== "string") return null;
  input = input.trim();

  const dateMatch = input.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  const normalizedDMY = dateMatch ? `${dateMatch[1]}/${dateMatch[2]}/${dateMatch[3]}` : input;

  switch (format) {
    case "dd MM yyyy":
      return formatToShortMonthDate(normalizedDMY);
    case "dd/MMMM/yyyy":
      return formatToSlashLongMonthDate(normalizedDMY);
    case "ISO":
      return toIsoFormat(normalizedDMY);
    case "dd de MMMM de yyyy":
      return formatToFullTextDate(normalizedDMY);
    case "dd/MM/yyyy":
      if (dateMatch) return normalizedDMY;
      return formatFromApiYMDToSlashDMY(input);
    default:
      return null;
  }
}

// convierte fecha de texto al formato que espera la API
export function dateToAPIFormat(input: string, format: AcceptedFormats = "ISO") {
  if (typeof input !== "string") return null;
  input = input.trim();

  switch (format) {
    case "ISO":
      const [year, month, day] = input.split("-");
      return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
    default:
      return null;
  }
}

// calcula edad a partir de fecha en dd/mm/yyyy
export function calcAgeFromDDMMYYYY(dmy: string): number {
  const [dd, mm, yyyy] = dmy.split("/").map(Number);
  if (!dd || !mm || !yyyy) return NaN;

  const birth = new Date(yyyy, mm - 1, dd);
  if (Number.isNaN(birth.getTime())) return NaN;

  const today = new Date();
  let age = today.getFullYear() - yyyy;
  const monthDiff = today.getMonth() - (mm - 1);
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dd)) {
    age--;
  }
  return age;
}

// calcula diferencia en días entre dos fechas
export function diffDays(start?: string, end?: string): number | null {
  if (!start) return 0;

  const startDate = start ? new Date(start) : new Date();
  const endDate = end ? new Date(end) : new Date();

  const diffMs = endDate.getTime() - startDate.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

/* ------------------------------------------------------
   Especiales para API
------------------------------------------------------ */

// parsea fechas que llegan de la API (ej. created: "2025-09-16 15:49:10.287944")
export function parseApiDate(input: string): dayjs.Dayjs | null {
  if (!input) return null;

  // Normaliza: si trae microsegundos (.ffffff), corta a 3 dígitos
  const normalized = input.replace(
    /^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\.(\d{3})(\d{3})$/,
    "$1.$2"
  );

  const formats = [
    "YYYY-MM-DD HH:mm:ss.SSS", // ahora sí soportado
    "YYYY-MM-DD HH:mm:ss",
    "YYYY-MM-DD"
  ];

  for (const fmt of formats) {
    const candidate = dayjs(normalized, fmt, true);
    if (candidate.isValid()) return candidate;
  }
  return null;
}

// convierte timestamps de API a formato humano
export function dateTimeToFullFormat(input: string, includeTime: boolean = true): string {
  if (!input) return "";
  const parsed = parseApiDate(input);
  if (!parsed) return "";

  const day = parsed.format("D");
  const month = fullMonths[+parsed.format("M") - 1].toLowerCase();

  if (!includeTime) {
    return `${day} de ${month} de ${parsed.format("YYYY")}`;
  }

  const time = parsed
    .format("h:mm a")
    .replace("am", "a.m")
    .replace("pm", "p.m");

  return `${day} de ${month}, ${time}`;
}

// ejemplo: "16/ septiembre/ 2025"
export function formatDateWithCapitalMonth(input: string, format: string = "DD/ MMMM/ YYYY"): string | null {
  const date = dayjs(input).locale("es");
  if (!date.isValid()) return null;

  let formatted = date.format(format);
  formatted = formatted.replace(
    /\/\s*([a-záéíóúñ]+)/i,
    (_match, month) => `/ ${month.charAt(0).toUpperCase()}${month.slice(1)}`
  );

  return formatted;
}

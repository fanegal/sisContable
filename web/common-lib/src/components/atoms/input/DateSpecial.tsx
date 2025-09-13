// components/inputs/DateSpecial.tsx
import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/es";
dayjs.extend(customParseFormat);

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

type Props = {
  inputData: {
    id?: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    hasTopLabel?: boolean;
    hasError?: boolean;
    error?: string;
    value?: string | null;
    disabled?: boolean;
    extraClass?: string;
    globalExtraClass?: string;
  };
  index: number;
  onChange: Function;
  onBlur: Function;
};

const DISPLAY_FORMAT = "DD/MM/YYYY";

// Colores
const SURFACE = "#f1dcff";
const ACCENT = "#5A2BB5";
const ACCENT_HOVER = "#4A23A1";
const TEXT_PRIMARY = "#2e2e2e";

function toDayjs(v: unknown): Dayjs | null {
  if (!v) return null;
  if (dayjs.isDayjs(v)) return v as Dayjs;
  const s = String(v).trim();
  if (dayjs(s, DISPLAY_FORMAT, true).isValid()) return dayjs(s, DISPLAY_FORMAT);
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return dayjs(s);
  if (!Number.isNaN(Number(s))) return dayjs(Number(s));
  return null;
}

export default function DateSpecial({ inputData, index, onChange, onBlur }: Props) {
  const {
    id = "date-special",
    label = "",
    placeholder = "DD/MM/YYYY",
    required,
    hasTopLabel = true,
    hasError,
    error,
    value,
    disabled,
    extraClass = "",
    globalExtraClass = "",
  } = inputData ?? {};

  const [internal, setInternal] = React.useState<Dayjs | null>(toDayjs(value));
  React.useEffect(() => { setInternal(toDayjs(value)); }, [value]);
  const [numberOfLetters, setNumberOfLetters] = React.useState("");
  const handleChange = (newVal: Dayjs | null) => {
    setInternal(newVal);
    const formatted = newVal ? newVal.format(DISPLAY_FORMAT) : "";
    setNumberOfLetters(formatted);
    inputData.value = formatted;
    onChange({ ...inputData, value: formatted, hasError: false }, index);
  };

  return (
    <section className={`${globalExtraClass} ${extraClass} gp-form gp-date-special`} id={`${id}-section`}>
      {hasTopLabel && <p className="top-label">{label}{required ? " *" : ""}</p>}

      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        <DatePicker
          value={internal}
          onChange={handleChange}
          onClose={() => onBlur?.(inputData, index)}
          format={DISPLAY_FORMAT}
          disabled={disabled}
          views={["year", "month", "day"]}
          openTo="day"
          slotProps={{
            textField: {
              id,
              placeholder,
              fullWidth: true,
              required,
              error: Boolean(hasError),
              helperText: hasError ? (error ?? "") : "",
              className: "date-input",
              inputProps: { inputMode: "numeric" },
              // 🔽🔽 Estilos pedidos para el input
              sx: {
                mb: "16px", // margin-bottom
                "& .MuiOutlinedInput-root": {
                  position: "relative",
                  borderRadius: "8px",
                  height: "20px",
                  "& .MuiOutlinedInput-input": {
                    height: "20px",
                    lineHeight: "20px",
                    padding: "0 12px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(103, 36, 215)",        // border-color
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(103, 36, 215)",        // foco mismo color
                  },
                },
              },
            },
            popper: { placement: "bottom-start", sx: { zIndex: 9999 } },
            desktopPaper: { sx: { "&&": { background: SURFACE, borderRadius: "24px", overflow: "hidden" } } },
            mobilePaper: { sx: { "&&": { background: SURFACE, borderRadius: "24px", overflow: "hidden" } } },
            layout: { sx: { "&&": { background: SURFACE, borderRadius: "24px" } } },
            calendarHeader: {
              sx: {
                px: 2, pt: 2,
                "& .MuiPickersCalendarHeader-label": { fontSize: "1.25rem", fontWeight: 700, color: TEXT_PRIMARY },
                "& .MuiPickersArrowSwitcher-button": { color: ACCENT },
              },
            },
            day: {
              sx: {
                "&.Mui-selected": { bgcolor: ACCENT, color: "#fff" },
                "&.Mui-selected:hover": { bgcolor: ACCENT_HOVER },
                "&:hover": { bgcolor: "rgba(90,43,181,.12)" },
                "&.MuiPickersDay-today:not(.Mui-selected)": { borderColor: ACCENT },
              },
            },
            monthButton: { sx: { "&.Mui-selected": { bgcolor: ACCENT, color: "#fff" } } },
            yearButton: { sx: { "&.Mui-selected": { bgcolor: ACCENT, color: "#fff" } } },
          }}
        />
      </LocalizationProvider>

      {required && hasError && <p className="error">{error}</p>}
    </section>
  );
}

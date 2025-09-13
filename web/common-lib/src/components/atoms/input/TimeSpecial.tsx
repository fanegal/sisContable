// components/inputs/TimeSpecial.tsx
import type { InputInterface } from "../../../types/Input.types";
import { useTheme } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useRef, useState } from "react";
import "./input.scss";

type Props = {
  inputData: InputInterface;
  index: number;
  onChange: (evOrData: any, index?: number) => void;
  onBlur: (evOrData: any, index?: number) => void;
};

const to2 = (n: number) => String(n).padStart(2, "0");
const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

export default function TimeSpecial({ inputData, index, onChange, onBlur }: Props) {
  const theme: any = useTheme();
  const { t } = useTranslation();

  const {
    id = "time-special",
    label = "",
    placeholder = "00 : 00",
    required,
    hasTopLabel = true,
    hasError,
    errorMessage,
    value,
    disabled,
    extraClass = "",
    globalExtraClass = "",
  } = inputData ?? {};

  const initial = useMemo(() => {
    const m = /^(\d{1,2}):(\d{2})$/.exec(String(value ?? ""));
    const hh24 = m ? clamp(parseInt(m[1]), 0, 23) : 0;
    const mm = m ? clamp(parseInt(m[2]), 0, 59) : 0;
    const isPM = hh24 >= 12;
    const hourDisplay = isPM ? hh24 : (hh24 === 0 ? 12 : hh24);
    return {
      mode: (isPM ? "PM" : "AM") as "AM" | "PM",
      hourStr: to2(hourDisplay),
      minuteStr: to2(mm),
    };
  }, [value]);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"AM" | "PM">(initial.mode);
  const [hourStr, setHourStr] = useState(initial.hourStr);
  const [minuteStr, setMinuteStr] = useState(initial.minuteStr);
  const [numberOfLetters, setNumberOfLetters] = useState("");
  // refs para cerrar al hacer click fuera
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const sheetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMode(initial.mode);
    setHourStr(initial.hourStr);
    setMinuteStr(initial.minuteStr);
  }, [initial.mode, initial.hourStr, initial.minuteStr]);

  // visible en input
  const formattedFromProp = useMemo(() => {
    const m = /^(\d{1,2}):(\d{2})$/.exec(String(value ?? ""));
    if (!m) return "";
    return `${to2(parseInt(m[1]))} : ${m[2]}`;
  }, [value]);
  const [displayLocal, setDisplayLocal] = useState(formattedFromProp);
  useEffect(() => setDisplayLocal(formattedFromProp), [formattedFromProp]);

  // cerrar al click/tap fuera
  useEffect(() => {
    if (!open) return;
    const handler = (ev: Event) => {
      const node = ev.target as Node;
      const inSheet = sheetRef.current?.contains(node);
      const inTrigger = triggerRef.current?.contains(node);
      if (!inSheet && !inTrigger) setOpen(false);
    };
    document.addEventListener("mousedown", handler, { capture: true });
    document.addEventListener("touchstart", handler, { capture: true });
    return () => {
      document.removeEventListener("mousedown", handler, { capture: true });
      document.removeEventListener("touchstart", handler, { capture: true });
    };
  }, [open]);

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 2);
    setHourStr(digits);
  };
  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 2);
    setMinuteStr(digits);
  };
  const toggleMode = (next: "AM" | "PM") => {
    if (next === mode) return;
    const cur = parseInt(hourStr || "0") || 0;
    let newHourStr = hourStr;
    if (next === "AM") {
      if (cur >= 12) newHourStr = to2(cur === 12 ? 12 : cur - 12);
      else if (cur === 0) newHourStr = "12";
    } else {
      if (cur === 12) newHourStr = "12";
      else if (cur >= 1 && cur <= 11) newHourStr = to2(cur + 12);
      else if (cur < 12) newHourStr = "12";
    }
    setMode(next);
    setHourStr(newHourStr);
  };

  const finalize = () => {
    let h = hourStr.replace(/\D/g, "");
    let m = minuteStr.replace(/\D/g, "");
    if (!h) h = "12";
    if (!m) m = "00";
    if (h.length === 1) h = `0${h}`;
    if (m.length === 1) m = `0${m}`;

    if (mode === "AM") {
      const n = clamp(parseInt(h), 0, 12);
      h = to2(n === 0 ? 0 : n);
    } else {
      const n = clamp(parseInt(h), 12, 23);
      h = to2(n);
    }
    const nMin = clamp(parseInt(m), 0, 59);
    m = to2(nMin);

    const hh24 = mode === "AM" ? (parseInt(h) === 12 ? 0 : clamp(parseInt(h), 0, 11)) : clamp(parseInt(h), 12, 23);
    const realValue = `${to2(hh24)}:${m}`;
    const visible = `${to2(hh24)} : ${m}`;

    setHourStr(h);
    setMinuteStr(m);
    setDisplayLocal(visible);

    const ev = { target: { value: realValue } } as any;
    inputData.value = realValue;
    console.log(inputData);
    
    setNumberOfLetters(realValue);
    onChange(ev, index);
    onBlur(ev, index);
  };

  return (
    <div className={`${globalExtraClass} ${extraClass} gp-form timerr`} id={`${id}-section`}>
      {inputData.hasTopLabel && (
        <p className="top-label" style={{ color: theme.theme?.primary }}>
          {t(label)}{required ? " *" : ""}
        </p>
      )}

      {inputData.extraLeftComponent}

      <div
        ref={triggerRef}
        className={`arsa-input film-date ron ${inputData.hasError ? "round-error" : ""}`}
        style={{ borderColor: theme.theme?.primary, position: "relative" }}
        onClick={() => !disabled && setOpen(true)}
      >
        <input
          type="text"
          id={inputData.id}
          className="ronli"
          readOnly
          value={displayLocal || ""}
          placeholder={t(placeholder)}
          onFocus={() => !disabled && setOpen(true)}
        />
      </div>

      {open && (
        <div className="ts-inline-sheet" ref={sheetRef}>
          <p className="ts-title">Ingresa la hora de vigencia</p>

          <div className="ts-row">
            <div className="ts-field">
              <input
                className="ts-input ts-hour"
                inputMode="numeric"
                pattern="\d*"
                maxLength={2}
                placeholder="00"
                value={hourStr}
                onChange={handleHourChange}
                disabled={disabled}
              />
              <span className="ts-help">Horas</span>
            </div>

            <div className="ts-colon">:</div>

            <div className="ts-field">
              <input
                className="ts-input ts-minute"
                inputMode="numeric"
                pattern="\d*"
                maxLength={2}
                placeholder="00"
                value={minuteStr}
                onChange={handleMinuteChange}
                disabled={disabled}
              />
              <span className="ts-help">Minutos</span>
            </div>

            <div className="ts-ampm" role="group" aria-label="AM/PM">
              <button
                type="button"
                className={`ts-seg ${mode === "AM" ? "active" : ""}`}
                onClick={() => toggleMode("AM")}
                disabled={disabled}
              >
                AM
              </button>
              <button
                type="button"
                className={`ts-seg ${mode === "PM" ? "active" : ""}`}
                onClick={() => toggleMode("PM")}
                disabled={disabled}
              >
                PM
              </button>
            </div>
          </div>

          <div className="ts-actions">
            <button
              type="button"
              className="ts-save"
              onClick={() => {
                finalize();
                setOpen(false);
              }}
              disabled={disabled}
            >
              Guardar
            </button>
          </div>
        </div>
      )}

      {hasError && <p className="error">{errorMessage}</p>}
    </div>
  );
}

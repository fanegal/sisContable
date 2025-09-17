import "./chip.scss";

export type ChipStatus = "warn" | "success" | "error";

interface ChipProps {
  label: string;
  status?: ChipStatus;
  onClick?: () => void;
  className?: string;
}

export function Chip({ label, status = "warn", onClick, className = "" }: ChipProps) {
  return (
    <span
      className={`chip chip--${status} ${onClick ? "chip--clickable" : ""} ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {label}
    </span>
  );
}

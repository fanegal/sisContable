import Icon from "../../../components/atoms/icon/Icon";
import "./pagination.scss";

type PaginationProps = {
  page: number;
  limit: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (p: number) => void;
  window?: number;
};

export default function Pagination({
  page,
  limit,
  total,
  onPrev,
  onNext,
  onGoTo,
  window = 3,
}: PaginationProps) {
  const lastPage = Math.max(1, Math.ceil((total || 0) / (limit || 1)));
  const size = Math.max(1, window);

  let pages: (number | "…")[] = [];

  if (lastPage <= size + 2) {
    pages = Array.from({ length: lastPage }, (_, i) => i + 1);
  } else {
    let s = Math.max(2, page);
    let e = Math.min(lastPage - 1, s + size - 1);
    if (e - s + 1 < size) s = Math.max(2, e - size + 1);

    pages.push(1);
    if (s > 2) pages.push("…");
    for (let p = s; p <= e; p++) pages.push(p);
    if (e < lastPage - 1) pages.push("…");
    if (lastPage > 1) pages.push(lastPage);
  }

  const atFirst = page <= 1;
  const atLast = page >= lastPage;

  return (
    <nav className="pagination" aria-label="Paginación">
      <div
        className={`nav prev ${atFirst ? "disabled" : ""}`}
        onClick={() => !atFirst && onPrev()}
        aria-label="Anterior"
      >
        <Icon name="keyboard_double_arrow_left" type="symbols" />
      </div>

      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`e-${i}`} className="ellipsis">…</span>
        ) : (
          <div
            key={p}
            onClick={() => onGoTo(p)}
            aria-current={p === page ? "page" : undefined}
            className={p === page ? "active" : ""}
          >
            {p}
          </div>
        )
      )}

      <div
        className={`nav next ${atLast ? "disabled" : ""}`}
        onClick={() => !atLast && onNext()}
        aria-label="Siguiente"
      >
        <Icon name="keyboard_double_arrow_right" type="symbols" />
      </div>
    </nav>
  );
};

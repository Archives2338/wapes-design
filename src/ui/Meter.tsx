import './meter.css';

interface Props {
  /** 0-100 */
  pct: number;
  /** Sin techo: relleno al 100% en border-strong. Nunca rojo (spec §5). */
  unmetered?: boolean;
  thin?: boolean;
}

export function Meter({ pct, unmetered, thin }: Props) {
  const width = unmetered ? 100 : Math.max(0, Math.min(100, pct));
  return (
    <div className={`meter${thin ? ' meter--thin' : ''}`} aria-hidden="true">
      <div className={`meter__fill${unmetered ? ' meter__fill--unmetered' : ''}`} style={{ width: `${width}%` }} />
    </div>
  );
}

/** Fila "etiqueta · n / N" + medidor, como en la pestaña Usage. */
interface RowProps {
  label: string;
  used: number;
  limit: number; // -1 = ilimitado
  format: (n: number) => string;
}

export function MeterRow({ label, used, limit, format }: RowProps) {
  const unmetered = limit < 0;
  const pct = unmetered ? 0 : limit === 0 ? 100 : Math.min(100, Math.round((used / limit) * 100));
  return (
    <div>
      <div className="bar-row bar-row--sm">
        <span className="bar-row__label">{label}</span>
        <span className="num bar-row__value">
          {format(used)} / {unmetered ? '∞' : format(limit)}
        </span>
      </div>
      <Meter pct={pct} unmetered={unmetered} />
    </div>
  );
}

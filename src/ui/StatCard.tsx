import type { ReactNode } from 'react';
import { Icon, type IconName } from './Icon';
import { Meter } from './Meter';
import './stat.css';

/**
 * Card de métrica (spec §5): chip de ícono 34px, etiqueta 12.5, número 23/600,
 * caption 11.5. Con techo, medidor de 4px entre número y caption.
 * Todos los chips son del mismo color: un chip por métrica en colores
 * distintos no codifica nada.
 */
interface Props {
  icon: IconName;
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  /** 0-100; si viene, pinta el medidor */
  meterPct?: number;
  meterUnmetered?: boolean;
  loading?: boolean;
}

export function StatCard({ icon, label, value, sub, meterPct, meterUnmetered, loading }: Props) {
  return (
    <div className="card stat" aria-busy={loading || undefined}>
      <span className="stat__icon">
        <Icon name={icon} size={16} strokeWidth={1.7} />
      </span>
      <div className="stat__body">
        <div className="stat__label">{label}</div>
        <div className={`stat__value num${loading ? ' skel' : ''}`}>{loading ? ' ' : value}</div>
        {meterPct !== undefined && !loading && <Meter pct={meterPct} unmetered={meterUnmetered} thin />}
        {sub !== undefined && <div className="stat__sub">{loading ? ' ' : sub}</div>}
      </div>
    </div>
  );
}

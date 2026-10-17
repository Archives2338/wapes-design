import './chart.css';

/**
 * Charts SVG livianos para paneles densos (admin). Sin dependencias. Colores
 * siempre por token: la serie principal en --w-accent, las demás en tintas.
 * Para la gráfica grande de "mensajes por día" está BarChart (barras DOM con
 * tooltip y foco); estos son compactos y sin interacción.
 */

/** Paleta de series por índice: principal, secundaria, terciaria. */
export const SERIES = ['var(--w-accent)', 'var(--w-ink-3)', 'var(--w-accent-bright)', 'var(--w-warn)'] as const;

export function SparkBars<T extends object>({
  data,
  k,
  h = 120,
  label,
}: {
  data: T[];
  k: keyof T & string;
  h?: number;
  /** Descripción para lectores de pantalla. */
  label: string;
}) {
  if (!data.length) return null;
  const max = Math.max(...data.map((d) => Number(d[k])), 1);
  const W = 100;
  const bw = W / data.length;
  return (
    <svg viewBox={`0 0 ${W} ${h}`} preserveAspectRatio="none" className="spark" style={{ height: h }} role="img" aria-label={label}>
      {data.map((d, i) => {
        const v = Number(d[k]);
        return (
          <rect
            key={i}
            x={i * bw + bw * 0.18}
            y={h - (v / max) * (h - 8)}
            width={bw * 0.64}
            height={(v / max) * (h - 8)}
            rx={1}
            fill={SERIES[0]}
            opacity={i === data.length - 1 ? 1 : 0.55}
          />
        );
      })}
    </svg>
  );
}

export function Lines<T extends object>({
  data,
  keys,
  h = 120,
  label,
}: {
  data: T[];
  keys: Array<keyof T & string>;
  h?: number;
  label: string;
}) {
  if (data.length < 2) return null;
  const max = Math.max(...data.flatMap((d) => keys.map((k) => Number(d[k]))), 1);
  const W = 100;
  const pts = (k: keyof T & string) =>
    data.map((d, i) => `${(i / (data.length - 1)) * W},${h - 6 - (Number(d[k]) / max) * (h - 16)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${W} ${h}`} preserveAspectRatio="none" className="spark" style={{ height: h }} role="img" aria-label={label}>
      {keys.map((k, j) => (
        <polyline
          key={k}
          points={pts(k)}
          fill="none"
          stroke={SERIES[j % SERIES.length]}
          strokeWidth={1.6}
          vectorEffect="non-scaling-stroke"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

export function Donut({
  dist,
  size = 148,
  total,
  caption,
  label,
}: {
  /** Segmentos en orden; el color sale de SERIES por índice. */
  dist: { key: string; value: number }[];
  size?: number;
  /** Número grande del centro, ya formateado. */
  total: string;
  /** Texto chico bajo el número (p. ej. "usuarios"). */
  caption: string;
  label: string;
}) {
  const sum = dist.reduce((a, d) => a + d.value, 0) || 1;
  const R = 40;
  const CIRC = 2 * Math.PI * R;
  let off = 0;
  return (
    <svg viewBox="0 0 100 100" className="donut" style={{ width: size, height: size }} role="img" aria-label={label}>
      {dist.map((d, i) => {
        const dash = (d.value / sum) * CIRC;
        const el = (
          <circle
            key={d.key}
            cx={50}
            cy={50}
            r={R}
            fill="none"
            stroke={SERIES[i % SERIES.length]}
            strokeWidth={11}
            strokeDasharray={`${dash} ${CIRC - dash}`}
            strokeDashoffset={-off}
            transform="rotate(-90 50 50)"
          />
        );
        off += dash;
        return el;
      })}
      <text x={50} y={47} textAnchor="middle" className="donut__total num">{total}</text>
      <text x={50} y={60} textAnchor="middle" className="donut__caption">{caption}</text>
    </svg>
  );
}

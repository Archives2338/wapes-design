import './chart.css';

export interface BarDatum {
  /** etiqueta corta para tooltip y aria */
  label: string;
  value: number;
}

interface Props {
  data: BarDatum[];
  /** tope del eje; por defecto el máximo del set (mínimo 1) */
  max?: number;
  /** texto para aria: (label, value) → "Oct 3: 34 messages" */
  describe: (d: BarDatum) => string;
  /** etiquetas del eje x: primera, media, última */
  axis?: [string, string, string];
}

/** Barras verticales como en la referencia: cada barra es focusable con tooltip. */
export function BarChart({ data, max, describe, axis }: Props) {
  const top = Math.max(1, max ?? Math.max(...data.map((d) => d.value), 0));
  return (
    <>
      <div className="bars">
        {data.map((d, i) => {
          const pct = Math.max(2, Math.round((d.value / top) * 100));
          return (
            <div key={i} className="bar" tabIndex={0} role="img" aria-label={describe(d)}>
              <div className="bar__fill" style={{ height: `${pct}%` }} />
              <div className="bar__tip" style={{ bottom: `${pct}%` }}>
                {d.label} · {d.value}
              </div>
            </div>
          );
        })}
      </div>
      {axis && (
        <div className="axis num">
          <span>{axis[0]}</span><span>{axis[1]}</span><span>{axis[2]}</span>
        </div>
      )}
    </>
  );
}

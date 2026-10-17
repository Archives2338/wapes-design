import { Icon, type IconName } from './Icon';
import './segmented.css';

interface Option<V extends string> {
  value: V;
  label: string;
}

interface Props<V extends string> {
  label: string;
  options: readonly Option<V>[];
  value: V;
  onChange: (v: V) => void;
}

/** Grupo de botones de texto con aria-pressed (rango de fechas, etc.). */
export function Segmented<V extends string>({ label, options, value, onChange }: Props<V>) {
  return (
    <div className="segmented" role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o.value} type="button" aria-pressed={o.value === value} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

interface IconOption<V extends string> {
  value: V;
  icon: IconName;
  label: string;
}

/** Variante de solo íconos (selector de tema). Cada botón lleva aria-label. */
export function SegmentedIcons<V extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly IconOption<V>[];
  value: V;
  onChange: (v: V) => void;
}) {
  return (
    <div className="seg-icons" role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={o.value === value}
          aria-label={o.label}
          onClick={() => onChange(o.value)}
        >
          <Icon name={o.icon} size={16} />
        </button>
      ))}
    </div>
  );
}

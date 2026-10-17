import './switch.css';

interface Props {
  checked: boolean;
  onChange: (next: boolean) => void;
  /** Obligatorio: role=switch sin nombre accesible no sirve. */
  label: string;
  disabled?: boolean;
}

/** 46×26, role="switch" + aria-checked (spec §5). */
export function Switch({ checked, onChange, label, disabled }: Props) {
  return (
    <button
      type="button"
      className="switch"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
    >
      <span />
    </button>
  );
}

import type { ReactNode } from 'react';
import './chip.css';

/**
 * Chip de selección múltiple (aria-pressed). Para elección única usar
 * Segmented. El estado activo usa accent-soft: señal, no decoración.
 */
export function ChipToggle({ on, onClick, children, disabled }: { on: boolean; onClick: () => void; children: ReactNode; disabled?: boolean }) {
  return (
    <button type="button" className="chip-toggle" aria-pressed={on} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export function ChipGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="chip-group" role="group" aria-label={label}>
      {children}
    </div>
  );
}

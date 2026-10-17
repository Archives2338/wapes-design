import type { ReactNode } from 'react';
import { Switch } from './Switch';
import './switchrow.css';

/**
 * Fila de formulario de configuración: título + descripción a la izquierda,
 * interruptor (o lo que se pase en `right`) a la derecha. Varias seguidas
 * se separan con hairline; la primera no lleva.
 */
export function SwitchRow({
  title,
  children,
  on,
  onChange,
  busy,
  right,
}: {
  title: string;
  children?: ReactNode;
  on: boolean;
  onChange: (v: boolean) => void;
  busy?: boolean;
  /** Reemplaza al interruptor (p. ej. un input + botón). */
  right?: ReactNode;
}) {
  return (
    <div className="switch-row">
      <div className="switch-row__text">
        <div className="switch-row__title">{title}</div>
        {children && <p className="field-help switch-row__desc">{children}</p>}
      </div>
      {right ?? <Switch checked={on} onChange={onChange} label={title} disabled={busy} />}
    </div>
  );
}

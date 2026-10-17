import type { ReactNode } from 'react';
import { Icon } from './Icon';
import './notice.css';

/**
 * Aviso en línea dentro de una card o formulario. El color nunca va solo:
 * siempre lleva ícono y texto (spec §7). danger → role=alert.
 */
export function Notice({ tone = 'info', children }: { tone?: 'info' | 'warn' | 'danger'; children: ReactNode }) {
  return (
    <div className={`notice notice--${tone}`} role={tone === 'danger' ? 'alert' : undefined}>
      <Icon name="alert-circle" size={15} strokeWidth={2} />
      <div className="notice__body">{children}</div>
    </div>
  );
}

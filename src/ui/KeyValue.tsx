import type { ReactNode } from 'react';
import './keyvalue.css';

/** Fila "clave … valor" de una ficha. El valor va en tabular-nums. */
export function KeyValue({ k, children, mono }: { k: ReactNode; children: ReactNode; mono?: boolean }) {
  return (
    <div className="kv">
      <span className="kv__k">{k}</span>
      <span className={`kv__v${mono ? ' num' : ''}`}>{children}</span>
    </div>
  );
}

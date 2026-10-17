import type { ReactNode } from 'react';
import './listrow.css';

/**
 * Fila de lista dentro de una card: contenido principal que crece, acciones a
 * la derecha, hairline arriba. Para listas que no son tablas (una entidad por
 * fila con varias señales y botones).
 */
export function ListRow({ children, actions }: { children: ReactNode; actions?: ReactNode }) {
  return (
    <div className="list-row">
      <div className="list-row__main">{children}</div>
      {actions && <div className="list-row__actions">{actions}</div>}
    </div>
  );
}

/** Primera línea de una ListRow: título + pills, con wrap. */
export function ListRowTitle({ children }: { children: ReactNode }) {
  return <div className="list-row__title">{children}</div>;
}

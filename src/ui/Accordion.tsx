import { useId, type ReactNode } from 'react';
import { Icon } from './Icon';
import './accordion.css';

/**
 * Acordeón: lista de secciones que se abren de a una (o varias; lo decide
 * quien lo monta). Cada cabecera es un <button aria-expanded aria-controls>;
 * el panel es una region con aria-labelledby. El contenido cerrado no se
 * renderiza: ni el tabulador ni el lector de pantalla llegan a él.
 */
export function Accordion({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`accordion ${className}`.trim()}>{children}</div>;
}

interface ItemProps {
  title: ReactNode;
  /** Lo que va a la derecha del título: un Pill con el conteo, por ejemplo. */
  meta?: ReactNode;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
  id?: string;
}

export function AccordionItem({ title, meta, open, onToggle, children, id }: ItemProps) {
  const auto = useId();
  const base = id ?? auto;
  const btnId = `${base}-btn`;
  const panelId = `${base}-panel`;
  return (
    <div className="accordion__item" data-open={open || undefined}>
      <h3 className="accordion__h">
        <button type="button" id={btnId} className="accordion__btn" aria-expanded={open} aria-controls={panelId} onClick={onToggle}>
          <Icon name="chevron-down" size={16} className="accordion__chev" />
          <span className="accordion__title">{title}</span>
          {meta && <span className="accordion__meta">{meta}</span>}
        </button>
      </h3>
      {open && (
        <div id={panelId} role="region" aria-labelledby={btnId} className="accordion__panel">
          {children}
        </div>
      )}
    </div>
  );
}

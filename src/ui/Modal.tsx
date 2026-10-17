import { useEffect, useId, useRef, type ReactNode } from 'react';
import { IconButton } from './Button';
import './modal.css';

/**
 * Modal de configuración (spec §5): max 920, alto fijo min(700, 100vh-112),
 * NUNCA dimensionado al contenido; el scroll vive en el panel derecho.
 * role=dialog + aria-modal + aria-labelledby. Cierra con botón, scrim y
 * Escape; devuelve el foco al elemento que lo abrió.
 */
export interface Tab<K extends string> {
  key: K;
  label: string;
}

interface Props<K extends string> {
  open: boolean;
  title: string;
  closeLabel: string;
  tabsLabel: string;
  tabs: readonly Tab<K>[];
  active: K;
  onTabChange: (k: K) => void;
  onClose: () => void;
  children: ReactNode;
}

export function TabbedModal<K extends string>({
  open, title, closeLabel, tabsLabel, tabs, active, onTabChange, onClose, children,
}: Props<K>) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<Element | null>(null);

  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      // El que abrió puede haberse desmontado (ítem de un popover que cerró):
      // en ese caso el foco vuelve al ancla marcada con data-modal-return.
      const o = opener.current;
      if (o instanceof HTMLElement && o !== document.body && o.isConnected) o.focus();
      else document.querySelector<HTMLElement>('[data-modal-return]')?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="scrim anim-fade" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal anim-rise" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <div className="modal__head">
          <h2 className="modal__title" id={titleId}>{title}</h2>
          <IconButton ref={closeRef} icon="x" label={closeLabel} onClick={onClose} />
        </div>
        <div className="modal__body">
          <div className="modal__rail" role="tablist" aria-orientation="vertical" aria-label={tabsLabel}>
            {tabs.map((t) => (
              <button
                key={t.key}
                className="tab"
                role="tab"
                id={`tab-${t.key}`}
                aria-controls={`panel-${t.key}`}
                aria-selected={t.key === active}
                tabIndex={t.key === active ? 0 : -1}
                onClick={() => onTabChange(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="modal__panel">
            {/* key reinicia el fade en cada cambio de pestaña */}
            <div key={active} className="panel anim-fade" id={`panel-${active}`} role="tabpanel" aria-labelledby={`tab-${active}`}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

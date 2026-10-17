import { useEffect, useId, useRef, type ReactNode } from 'react';
import { IconButton } from './Button';
import './modal.css';
import './dialog.css';

/**
 * Diálogo corto (confirmar, editar un dato, pedir un motivo). Distinto del
 * TabbedModal de configuración: se dimensiona al contenido, 440px de ancho.
 * role=dialog + aria-modal + aria-labelledby; cierra con botón, scrim y
 * Escape; devuelve el foco a quien lo abrió.
 */
interface Props {
  open: boolean;
  title: string;
  closeLabel: string;
  onClose: () => void;
  children: ReactNode;
  /** Botones de acción, alineados a la derecha. */
  footer?: ReactNode;
}

export function Dialog({ open, title, closeLabel, onClose, children, footer }: Props) {
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
      const o = opener.current;
      if (o instanceof HTMLElement && o !== document.body && o.isConnected) o.focus();
      else document.querySelector<HTMLElement>('[data-modal-return]')?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="scrim scrim--center anim-fade" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="dialog anim-rise" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <div className="dialog__head">
          <h2 className="dialog__title" id={titleId}>{title}</h2>
          <IconButton ref={closeRef} icon="x" label={closeLabel} onClick={onClose} />
        </div>
        <div className="dialog__body">{children}</div>
        {footer && <div className="dialog__foot">{footer}</div>}
      </div>
    </div>
  );
}

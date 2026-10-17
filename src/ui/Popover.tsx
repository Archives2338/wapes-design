import { useEffect, type ReactNode, type RefObject } from 'react';
import { Icon, type IconName } from './Icon';
import './popover.css';

interface Props {
  open: boolean;
  onClose: () => void;
  /** El botón que lo abre: los clics sobre él no cuentan como "fuera". */
  anchorRef: RefObject<HTMLElement>;
  id: string;
  /** 'up' (default): desde el pie de la barra lateral. 'down': desde un botón arriba. */
  direction?: 'up' | 'down';
  /** 'left' (default) alinea al borde izquierdo del ancla; 'right' al derecho. */
  align?: 'left' | 'right';
  children: ReactNode;
}

/** Menú flotante anclado a un botón. Cierra con click fuera y Escape. */
export function Popover({ open, onClose, anchorRef, id, direction = 'up', align = 'left', children }: Props) {
  useEffect(() => {
    if (!open) return;
    // Patrón menu button: el popover está ANTES del ancla en el DOM y abre
    // hacia arriba, así que Tab desde el chip lo saltaría. Al abrir, el foco
    // entra al primer ítem; Escape lo devuelve al ancla.
    document.getElementById(id)?.querySelector<HTMLElement>('button, a[href]')?.focus();
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (anchorRef.current?.contains(t)) return;
      if (document.getElementById(id)?.contains(t)) return;
      onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        anchorRef.current?.focus();
      }
    };
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose, anchorRef, id]);

  if (!open) return null;
  return (
    <div className={`popover anim-menu popover--${direction} popover--${align}`} id={id}>
      {children}
    </div>
  );
}

export function MenuItem({
  icon,
  children,
  onClick,
  checked,
}: {
  icon?: IconName;
  children: ReactNode;
  onClick: () => void;
  /** Para listas de una sola elección (idioma): role menuitemradio + check. */
  checked?: boolean;
}) {
  const radio = checked !== undefined;
  return (
    <button
      className={`menu-item${checked ? ' menu-item--checked' : ''}`}
      type="button"
      onClick={onClick}
      role={radio ? 'menuitemradio' : undefined}
      aria-checked={radio ? checked : undefined}
    >
      {icon && <Icon name={icon} size={16} />}
      <span className="menu-item__label">{children}</span>
      {checked && <Icon name="check" size={15} strokeWidth={2} />}
    </button>
  );
}

export function MenuHead({ children }: { children: ReactNode }) {
  return <div className="popover__head">{children}</div>;
}

export function MenuSep() {
  return <div className="hr popover__sep" />;
}

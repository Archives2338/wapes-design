import { forwardRef, type ReactNode } from 'react';
import { Icon } from '../ui/Icon';
import './shell.css';

/**
 * Contenedor raíz: align-items stretch + min-height 100vh es obligatorio
 * (spec §5) para que la barra llegue al fondo y el pie quede abajo.
 */
export function Shell({ sidebar, children }: { sidebar: ReactNode; children: ReactNode }) {
  return (
    <div className="shell">
      {sidebar}
      <main className="main">{children}</main>
    </div>
  );
}

/**
 * Barra lateral. `nav` son los enlaces: cada uno con className="nav-item" y
 * aria-current="page" cuando está activo (NavLink de react-router lo pone solo).
 * `foot` va al fondo (idioma, chip de cuenta).
 */
export function Sidebar({ brand, navLabel, nav, foot }: { brand: ReactNode; navLabel: string; nav: ReactNode; foot?: ReactNode }) {
  return (
    <aside className="sidebar">
      {brand}
      <nav className="nav" aria-label={navLabel}>{nav}</nav>
      {foot && <div className="sidebar__foot">{foot}</div>}
    </aside>
  );
}

export function PageHead({ title, sub, actions }: { title: string; sub?: ReactNode; actions?: ReactNode }) {
  return (
    <header className="page-head">
      <div>
        <h1>{title}</h1>
        {sub && <p className="sub page-head__sub">{sub}</p>}
      </div>
      {actions && <div className="page-head__actions">{actions}</div>}
    </header>
  );
}

interface ChipProps {
  initials: string;
  name: string;
  sub?: string;
  open: boolean;
  menuId: string;
  label: string;
  onClick: () => void;
}

/**
 * Botón del chip de cuenta (solo presentación). Quien lo usa lo envuelve en
 * <div className="account"> junto al Popover, y le pone data-modal-return
 * si quiere que los modales devuelvan el foco acá.
 */
export const AccountChipButton = forwardRef<HTMLButtonElement, ChipProps>(function AccountChipButton(
  { initials, name, sub, open, menuId, label, onClick },
  ref,
) {
  return (
    <button
      ref={ref}
      className="account__chip"
      type="button"
      aria-expanded={open}
      aria-controls={menuId}
      aria-label={label}
      data-modal-return
      onClick={onClick}
    >
      <span className="avatar">{initials}</span>
      <span className="account__text">
        <span className="account__name">{name}</span>
        {sub && <span className="account__plan">{sub}</span>}
      </span>
      <Icon name="chevrons-up-down" size={15} strokeWidth={1.7} />
    </button>
  );
});

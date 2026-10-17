import type { ReactNode } from 'react';
import { Icon, type IconName } from './Icon';
import { Button } from './Button';
import './state.css';

/** Estados vacío / error de una card (spec §9: también se diseñan). */
interface Props {
  icon: IconName;
  title: string;
  body?: ReactNode;
  action?: { label: string; onClick: () => void };
  tone?: 'empty' | 'error';
}

export function EmptyState({ icon, title, body, action, tone = 'empty' }: Props) {
  return (
    <div className={`state state--${tone}`} role={tone === 'error' ? 'alert' : undefined}>
      <span className="state__icon"><Icon name={icon} size={18} /></span>
      <div className="state__title">{title}</div>
      {body && <div className="state__body">{body}</div>}
      {action && (
        <Button variant="ghost" onClick={action.onClick} className="state__action">
          {action.label}
        </Button>
      )}
    </div>
  );
}

/** Placeholder de carga. aria-hidden: el contenedor lleva aria-busy. */
export function Skeleton({ w = '100%', h = 14 }: { w?: string | number; h?: number }) {
  return <span className="skel" style={{ width: w, height: h }} aria-hidden="true" />;
}

import type { HTMLAttributes, ReactNode } from 'react';
import './card.css';

interface Props extends HTMLAttributes<HTMLElement> {
  /** padding 16/20 (card--pad) */
  pad?: boolean;
  as?: 'div' | 'section' | 'article';
  children: ReactNode;
}

export function Card({ pad, as: Tag = 'div', className = '', children, ...rest }: Props) {
  return (
    <Tag className={`card${pad ? ' card--pad' : ''} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}

interface HeadProps {
  title: ReactNode;
  action?: ReactNode;
}

export function CardHead({ title, action }: HeadProps) {
  return (
    <div className="card__head">
      <h2>{title}</h2>
      {action}
    </div>
  );
}

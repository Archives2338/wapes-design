import type { ReactNode } from 'react';
import './pill.css';

interface PillProps {
  accent?: boolean;
  children: ReactNode;
}

export function Pill({ accent, children }: PillProps) {
  return <span className={`pill${accent ? ' pill--accent' : ''}`}>{children}</span>;
}

/** Punto de estado. Solo accent-bright significa "en vivo". */
export function Dot({ sm, tone = 'live' }: { sm?: boolean; tone?: 'live' | 'ink' | 'ink-3' | 'warn' | 'accent' | 'danger' }) {
  return <span className={`dot${sm ? ' dot--sm' : ''} dot--${tone}`} aria-hidden="true" />;
}

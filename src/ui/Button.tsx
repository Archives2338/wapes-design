import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Icon, type IconName } from './Icon';
import './button.css';

type Variant = 'solid' | 'ghost' | 'quiet' | 'danger' | 'plain';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

export function Button({ variant = 'plain', className = '', type = 'button', children, ...rest }: Props) {
  const v = variant === 'plain' ? '' : ` btn--${variant}`;
  return (
    <button type={type} className={`btn${v} ${className}`.trim()} {...rest}>
      {children}
    </button>
  );
}

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  /** Obligatorio: botón de solo ícono siempre con aria-label (spec §7). */
  label: string;
  size?: number;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { icon, label, size = 17, type = 'button', className = '', ...rest },
  ref,
) {
  return (
    <button ref={ref} type={type} className={`btn--icon ${className}`.trim()} aria-label={label} {...rest}>
      <Icon name={icon} size={size} strokeWidth={1.8} />
    </button>
  );
});

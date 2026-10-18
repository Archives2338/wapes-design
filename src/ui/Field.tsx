import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { Icon } from './Icon';
import './field.css';

/**
 * Controles de formulario (spec §5): alto mínimo 44, borde border-strong,
 * fondo bg, <label for> real. Solo lectura: fondo sunk, tinta ink-2.
 */
interface Shared {
  label: string;
  help?: ReactNode;
}

export function Input({ label, help, id, className = '', ...rest }: Shared & InputHTMLAttributes<HTMLInputElement>) {
  const auto = useId();
  const fid = id ?? auto;
  return (
    <div className="fld">
      <label className="field" htmlFor={fid}>{label}</label>
      <input id={fid} className={`fld__control ${className}`.trim()} {...rest} />
      {help && <p className="field-help">{help}</p>}
    </div>
  );
}

export function Select({ label, help, id, children, ...rest }: Shared & SelectHTMLAttributes<HTMLSelectElement>) {
  const auto = useId();
  const fid = id ?? auto;
  return (
    <div className="fld">
      <label className="field" htmlFor={fid}>{label}</label>
      <select id={fid} className="fld__control fld__control--select" {...rest}>{children}</select>
      {help && <p className="field-help">{help}</p>}
    </div>
  );
}

/**
 * `counter` pinta "n / max" alineado a la derecha, en tabulares. Es solo
 * informativo: el tope real lo pone `maxLength` (o el servidor), no este texto.
 */
export function Textarea({
  label,
  help,
  id,
  counter,
  ...rest
}: Shared & TextareaHTMLAttributes<HTMLTextAreaElement> & { counter?: { value: number; max: number } }) {
  const auto = useId();
  const fid = id ?? auto;
  return (
    <div className="fld">
      <label className="field" htmlFor={fid}>{label}</label>
      <textarea id={fid} className="fld__control fld__control--area" {...rest} />
      {(help || counter) && (
        <div className="field-foot">
          {help ? <p className="field-help">{help}</p> : <span />}
          {counter && (
            <span className="field-count num" aria-live="polite">
              {counter.value} / {counter.max}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/** Etiqueta de grupo (p. ej. dos inputs "de … a …") sin control propio. */
export function FieldGroup({ label, help, children }: Shared & { children: ReactNode }) {
  return (
    <div className="fld">
      <div className="field">{label}</div>
      {children}
      {help && <p className="field-help">{help}</p>}
    </div>
  );
}

/** Aviso ámbar con ícono con significado (role=img). */
export function NoteWarn({ children, iconLabel }: { children: ReactNode; iconLabel: string }) {
  return (
    <p className="note-warn">
      <Icon name="alert-circle" size={14} strokeWidth={2} label={iconLabel} style={{ marginTop: 1 }} />
      <span>{children}</span>
    </p>
  );
}

import { Icon } from './Icon';
import './stepper.css';

export interface Step {
  label: string;
}

interface Props {
  /** Nombre del proceso para lectores de pantalla ("Configurar asistente"). */
  label: string;
  steps: readonly Step[];
  /** Índice del paso actual (0-based). Los anteriores se marcan hechos. */
  current: number;
  /** Si se pasa, los pasos ya hechos son botones para volver atrás. */
  onSelect?: (index: number) => void;
}

/**
 * Stepper horizontal de 2 a 5 pasos. El verde solo marca lo HECHO (señal);
 * el paso actual se distingue por tinta y peso, no por color. Lleva
 * aria-current="step" en el actual; los hechos son <button> solo si se puede
 * volver, nunca un div con onClick.
 */
export function Stepper({ label, steps, current, onSelect }: Props) {
  return (
    <ol className="stepper" aria-label={label}>
      {steps.map((s, i) => {
        const state = i < current ? 'done' : i === current ? 'current' : 'todo';
        const marker = state === 'done' ? <Icon name="check" size={14} strokeWidth={3} /> : <span>{i + 1}</span>;
        const body = (
          <>
            <span className="stepper__n" data-state={state} aria-hidden="true">{marker}</span>
            <span className="stepper__label">{s.label}</span>
          </>
        );
        return (
          <li key={s.label} className="stepper__step" data-state={state} aria-current={state === 'current' ? 'step' : undefined}>
            {state === 'done' && onSelect ? (
              <button type="button" className="stepper__btn" onClick={() => onSelect(i)}>
                {body}
              </button>
            ) : (
              <span className="stepper__btn stepper__btn--static">{body}</span>
            )}
            {i < steps.length - 1 && <span className="stepper__line" aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  );
}

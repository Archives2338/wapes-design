import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { Icon } from './Icon';
import './toast.css';

/**
 * Aviso breve abajo al centro. `useToast()` devuelve notify(msg). Un solo
 * toast a la vez; el siguiente reemplaza al anterior. role=status: lo leen
 * los lectores de pantalla sin interrumpir.
 */
const ToastCtx = createContext<(msg: string) => void>(() => {});
export const useToast = () => useContext(ToastCtx);

export function ToastProvider({ children, duration = 2600 }: { children: ReactNode; duration?: number }) {
  const [msg, setMsg] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const notify = useCallback(
    (m: string) => {
      setMsg(m);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setMsg(null), duration);
    },
    [duration],
  );
  useEffect(() => () => window.clearTimeout(timer.current), []);
  return (
    <ToastCtx.Provider value={notify}>
      {children}
      <div className="toast-host" role="status" aria-live="polite">
        {msg && (
          <div className="toast anim-menu">
            <Icon name="check" size={14} strokeWidth={2} />
            {msg}
          </div>
        )}
      </div>
    </ToastCtx.Provider>
  );
}

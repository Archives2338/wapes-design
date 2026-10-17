import { forwardRef, type InputHTMLAttributes } from 'react';
import { Icon } from './Icon';
import './search.css';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Nombre accesible: el campo no tiene <label> visible. */
  label: string;
}

/** Campo de búsqueda con lupa, 44px de alto, mismo borde que los demás controles. */
export const SearchInput = forwardRef<HTMLInputElement, Props>(function SearchInput({ label, className = '', ...rest }, ref) {
  return (
    <div className={`search ${className}`.trim()}>
      <Icon name="search" size={15} />
      <input ref={ref} type="search" className="search__field" aria-label={label} {...rest} />
    </div>
  );
});

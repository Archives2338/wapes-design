/// <reference path="../assets/svg.d.ts" />
import mark from '../assets/wapes-mark.svg';

/**
 * Wordmark + isotipo. El isotipo es el SVG oficial (fondo verde de marca con
 * la W): va como asset, no como ícono del set, porque el verde de marca no es
 * un token de la interfaz — es identidad, y solo aparece acá.
 */
export function Brand({ name = 'Wapes', className = '' }: { name?: string; className?: string }) {
  return (
    <div className={`brand ${className}`.trim()}>
      <img className="brand__mark" src={mark} alt="" width={28} height={28} />
      <span className="brand__name">{name}</span>
    </div>
  );
}

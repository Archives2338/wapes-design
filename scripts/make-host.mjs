// Genera host.css a partir de tokens.css: los mismos valores declarados sobre
// :host, para el panel de la extensión dentro de un Shadow DOM (las variables
// de :root no cruzan el shadow root). No se edita a mano: `npm run host`.
import { readFileSync, writeFileSync } from 'node:fs';

const src = readFileSync(new URL('../tokens.css', import.meta.url), 'utf8');
const out = src
  .replace(/:root\[data-theme="dark"\]/g, ':host([data-theme="dark"])')
  .replace(/:root:not\(\[data-theme="light"\]\)/g, ':host(:not([data-theme="light"]))')
  .replace(/^:root \{/gm, ':host {');

const header = `/* GENERADO desde tokens.css por scripts/make-host.mjs — no editar a mano.
   Mismos tokens sobre :host para montar el panel en un Shadow DOM.
   El tema del panel sigue al de WhatsApp Web: quien monta pone data-theme
   en el host según lo que detecte ahí, no según el dashboard. */
`;
writeFileSync(new URL('../host.css', import.meta.url), header + out);
console.log('host.css generado');

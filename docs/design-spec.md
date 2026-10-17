# Wapes — Spec de UI

Referencia de diseño para implementar el dashboard de la extensión, y base de lo
que después será Wapes Cloud. Escrito para que una sesión de Claude Code lo lea
antes de tocar componentes.

**Archivos que acompañan este documento**

| Archivo | Qué es | Dónde va |
|---|---|---|
| `tokens.css` | Fuente de verdad de color, forma y movimiento. Tema claro y oscuro. | `src/styles/tokens.css` |
| `wapes-dashboard.html` | Implementación de referencia, autocontenida y funcional. | `docs/reference/` — no se importa, se consulta |
| este archivo | Reglas y razones | `docs/design-spec.md` |

`wapes-dashboard.html` es la referencia ejecutable: ábrelo en el navegador y
compara. Cuando algo del spec y el HTML no coincidan, **manda el HTML** para la
composición y **manda `tokens.css`** para los valores.

---

## 1. El principio que gobierna todo

**El verde es señal, no identidad.** Wapes es verde, pero en la interfaz el verde
solo aparece cuando significa algo: estado conectado, dato medido, acción
primaria, confirmación. Si pintas de verde la navegación, los íconos y los
encabezados, el usuario deja de leerlo como información y pasa a leerlo como
decoración — y entonces ya no sirve para avisar nada.

Consecuencias concretas, las tres que más se incumplen:

- **El ítem activo del menú NO es verde.** Fondo neutro (`--w-sunk`), tinta normal.
- **Los chips de ícono de las cards son todos del mismo color.** Un chip por
  métrica en colores distintos no codifica nada.
- **Un medidor lleno NO se pone rojo.** Rojo es error; agotar el plan no lo es.
  Lo que cambia al llegar al límite es el texto, no el color.

---

## 2. Arquitectura — importa decidirla ahora

Hoy existe una superficie; en poco tiempo serán tres:

1. **Panel dentro de WhatsApp Web** (la extensión, el MVP)
2. **Dashboard web** de la extensión (esto)
3. **Wapes Cloud** (después)

Las tres comparten lenguaje visual. Para que eso siga siendo cierto en seis meses:

- `tokens.css` se consume, **nunca se copia**. En un monorepo va en un paquete
  compartido; con repos separados, en un paquete npm privado o un submódulo. Lo
  que no puede pasar es tres copias divergiendo.
- **Los componentes de presentación no saben de dónde vienen los datos.** Un
  `<StatCard label value meter sub />` sirve igual leyendo `chrome.storage` hoy
  que una API mañana. Mantén la capa de datos detrás de hooks o servicios; es lo
  único que cambia al pasar a Cloud.
- **Nada de lógica de negocio en componentes.** Los límites de plan, el cálculo de
  uso y las reglas de envío van en módulos puros, testeables y reutilizables por
  las tres superficies.
- Si usas **Tailwind**, mapea su tema a las variables CSS
  (`colors: { ink: 'var(--w-ink)' }`). No dupliques la paleta en `tailwind.config`:
  volverías a tener dos fuentes de verdad.

### El panel dentro de WhatsApp Web es otro contexto

No es el dashboard en chiquito. Se inyecta en una página ajena que cambia sin
avisar. Reglas propias:

- **Shadow DOM obligatorio** y tokens redeclarados sobre `:host` (ver el
  comentario final de `tokens.css`). Las variables de `:root` no cruzan el shadow root.
- El tema del panel sigue al de **WhatsApp Web**, no al del dashboard.
- Ancho estrecho: todo lo que aquí es de dos columnas, allá es de una.
- Nunca asumas selectores de WhatsApp estables. Si el panel depende de un
  `div.x1n2onr6`, se rompe en la siguiente actualización.

---

## 3. Tipografía

Una sola familia: **Figtree** (Google Fonts), pesos 400 / 500 / 600.

| Uso | Token | Peso | Tracking |
|---|---|---|---|
| Título de página (`h1`) | `--w-text-xl` 19px | 600 | -0.016em |
| Título de modal | `--w-text-lg` 16.5px | 600 | -0.012em |
| Wordmark "Wapes" | 15.5px | 600 | -0.012em |
| Número grande de card | `--w-text-stat` 23px | 600 | -0.012em |
| Título de sección (`h2`) | `--w-text-md` 14px | 600 | — |
| Cuerpo / base | `--w-text-base` 13.5px | 400 | — |
| Ítem de navegación | 13.5px | 400 (500 si activo) | — |
| Etiqueta de card, caption | `--w-text-sm` 12.5px | 400 | — |
| Caption menor, `th` | `--w-text-xs` 11.5px | 500 | — |

`line-height` base 1.55; títulos 1.25–1.3.

**La jerarquía se construye con peso y color, no con tamaño.** El salto más grande
de toda la interfaz es de 13.5 a 23. Si algo debe destacar más, súbele el peso o
oscurécelo; no lo agrandes.

Todo número que el usuario compare entre filas lleva
`font-variant-numeric: tabular-nums` (clase `.num`). Sin eso las columnas bailan.

---

## 4. Íconos

Set **Lucide**, sin mezclas.

- viewBox 24×24, `fill: none`, `stroke-width: 1.6`, caps y joins `round`
- 17px en navegación y menús, 16px dentro de chips
- `stroke` hereda de `currentColor` o de un token; nunca un hex fijo
- Inactivo `--w-ink-3`; activo `--w-ink` con stroke 1.7
- Decorativo → `aria-hidden="true"`. Con significado → `role="img"` + `aria-label`
- Nunca emojis

Mapeo actual: Overview `chart-column` · Inbox `message-circle` · Campaigns `send` ·
Contacts `users` · AI actions `sparkles` · Settings `sliders-horizontal` ·
Plan & billing `credit-card` · Sync `refresh-cw` · Cerrar `x` ·
Tema: `monitor` / `sun` / `moon`

---

## 5. Componentes

Todos están implementados en `wapes-dashboard.html` con estas mismas clases.
Lo que sigue son las reglas que no se ven leyendo el CSS.

### Barra lateral
248px base. **El contenedor padre debe ser `align-items: stretch` con
`min-height: 100vh`**; si no, la barra solo crece hasta su contenido y el chip de
cuenta no llega al fondo (fue un bug real). El chip va con `margin-top: auto`.

### Ítem de navegación
Alto mínimo 40px, gap 11px. Activo: fondo `--w-sunk`, peso 500,
`aria-current="page"`. Cinco ítems de trabajo: Overview, Inbox, Campaigns,
Contacts, AI actions. **Settings y Billing no van en la navegación** — son
pestañas del modal.

### Chip de cuenta + popover
`<button>` de ancho completo al fondo de la barra, con `aria-expanded`.
El popover (236px) abre hacia arriba con el email, luego Settings · Usage ·
Plan & billing · Get help · separador · Log out. Cada ítem es un `<button>`.
Cierra con click fuera y con Escape.

### Card de métrica
Chip de ícono de 34px a la izquierda; etiqueta 12.5px, número 23px/600,
caption 11.5px. Si la métrica tiene techo, medidor de 4px entre número y caption.

### Medidor
Canal `--w-track`, relleno `--w-accent`. Sin techo: relleno al 100% en
`--w-border-strong` y el valor dice `n / ∞`. Nunca rojo.

### Modal de configuración
- `max-width: 920px`, `height: min(700px, calc(100vh - 112px))`, `min-height: 440px`
- **Nunca se dimensiona al contenido.** La caja no cambia de alto al cambiar de
  pestaña; el scroll vive en el panel derecho. El espacio vacío en una pestaña
  corta es el precio de que nada salte.
- Rail izquierdo 196px, panel derecho `flex: 999 1 420px; min-width: 0`
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- Pestañas con `role="tab"` / `role="tabpanel"` correctamente enlazadas
- Cierra con el botón, con click en el scrim y con Escape; devuelve el foco al
  elemento que lo abrió

Pestañas: Profile · Preferences · Campaigns · Pipeline · Usage · Plan & billing

### Controles de formulario
Alto mínimo 44px, borde `--w-border-strong`, fondo `--w-bg`. Todo input con
`<label for>` real. Solo lectura: fondo `--w-sunk`, tinta `--w-ink-2`.

### Switch
46×26. `role="switch"` + `aria-checked` + `aria-label`. Encendido `--w-accent`.

### Selector de tema
Tres estados: **sistema / claro / oscuro**. Sistema es el default y **no pone
atributo** — deja decidir a `prefers-color-scheme`. Claro y oscuro ponen
`data-theme` explícito en `<html>`, que gana sobre el sistema.
Persistir en `localStorage` **envuelto en try/catch**: en modo incógnito lanza.

---

## 6. Movimiento

| Elemento | Animación |
|---|---|
| Scrim del modal | fade .16s ease |
| Caja del modal | rise .22s `--w-ease` (desde 8px abajo, escala .985) |
| Popover | menuIn .15s `--w-ease` |
| Cambio de pestaña | fade .2s ease sobre el contenido |
| Hover de nav, menú, botones | transition .15s en background, border y color |

Obligatorio el bloque `@media (prefers-reduced-motion: reduce)` apagando
animaciones y transiciones. Son dos líneas y evita marear a gente con
sensibilidad vestibular.

**No animes la altura de las cajas.** Obliga a recalcular layout por frame y se ve
con tirones. La solución es no tener resize, no suavizarlo.

---

## 7. Accesibilidad — no negociable

- Elementos reales: `<button>`, `<a href>`, `<input>` + `<label>`. Nunca
  `onClick` sobre un `div`; el tabulador no lo alcanza.
- Objetivos táctiles de 44px mínimo.
- Texto 4.5:1 contra su fondo (3:1 desde 24px), **en los dos temas**.
- El color nunca es el único portador de significado: todo estado lleva texto o
  ícono además del color.
- Botones de solo ícono siempre con `aria-label`.
- `:focus-visible` visible en ambos temas (está en el HTML de referencia).

---

## 8. Lo que no se hace

- Degradados de fondo
- Cards con borde de color a la izquierda
- Emojis como íconos
- Inter, Roboto, Arial
- Barras de estado de móvil falsas
- Verde en el ítem de navegación activo
- Medidores rojos al 100%
- Rangos sin validar (hora de fin anterior a la de inicio, mínimo mayor que máximo)
- Valores nulos visibles en la interfaz (`—/día` donde debería decir "sin tope diario")
- Tokens duplicados fuera de `tokens.css`
- Hex sueltos en componentes

---

## 9. Pendiente de diseñar

- **Inbox / Kanban** — la pantalla donde realmente vive el CRM. Es la única parte
  del producto sin diseño y la que más pesa en el uso diario.
- El **panel dentro de WhatsApp Web**: ancho estrecho, Shadow DOM, conviviendo con
  la interfaz de WhatsApp.
- Estados vacíos, de carga y de error de cada card. Hoy todo está dibujado con
  datos. Un dashboard recién instalado se ve vacío y eso también se diseña.
- Vista móvil del dashboard más allá del colapso que ya trae el HTML.

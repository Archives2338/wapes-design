# @wapes/design

Tokens, base y componentes de interfaz de Wapes. **Una sola copia** para las
tres superficies: el dashboard (`wapes-app`), el admin (`wapes-admin`) y el
panel de la extensión dentro de WhatsApp Web. Si cambias un valor acá, cambia
en las tres; si lo copias a un repo, en seis meses hay tres verdes distintos.

Las reglas están en [docs/design-spec.md](docs/design-spec.md). La referencia
ejecutable es [docs/reference/wapes-dashboard.html](docs/reference/wapes-dashboard.html):
se abre en el navegador y se compara, no se importa.

## Instalar

Repo público, sin registro ni tokens. Se consume por git con un tag:

```sh
npm install github:Archives2338/wapes-design#v1.2.0
```

Para actualizar, cambiar el tag en `package.json` y `npm install`. Nunca
`#main`: un push acá no debe mover producción de nadie.

## Usar

```ts
// Una vez, en el entry de la app (orden: tokens → base → lo demás)
import '@wapes/design/tokens.css';
import '@wapes/design/base.css';

import { Button, Card, StatCard, Dialog, useToast } from '@wapes/design/ui';
import { Shell, Sidebar, Brand, PageHead, AccountChipButton } from '@wapes/design/layout';
```

Los componentes se publican como fuente TypeScript (`src/`): Vite los compila
igual que al resto de la app. Requieren React 18 como peer. La extensión solo
consume CSS.

### Panel dentro de WhatsApp Web (Shadow DOM)

`host.css` son los mismos tokens sobre `:host`, porque las variables de
`:root` no cruzan el shadow root. Se genera de `tokens.css` con
`npm run host`; no se edita a mano. El tema del panel sigue al de WhatsApp
Web: quien monta pone `data-theme` en el host según lo que detecte ahí.

## Qué hay

| Entrada | Contenido |
|---|---|
| `tokens.css` | Color, forma, tipografía y movimiento, prefijo `--w-`. Claro + oscuro (explícito y por sistema) |
| `host.css` | Lo mismo sobre `:host` |
| `base.css` | Reset mínimo, Figtree, `.num`, foco visible, animaciones y `prefers-reduced-motion` |
| `ui` | Button (size sm), IconButton, Card, StatCard, Meter, Pill, Dot, Segmented, Switch, SwitchRow, ChipToggle/ChipGroup, Input/Select/Textarea, SearchInput, Table, ListRow, Stepper, Accordion, TabbedModal, Dialog, Popover, BarChart, SparkBars/Lines/Donut, EmptyState, Skeleton, Toast, Notice, KeyValue, Icon (set Lucide); Textarea con contador |
| `layout` | Shell, Sidebar, Brand, PageHead, AccountChipButton |

Fuentes: la app carga Figtree (y Noto Sans Devanagari si sirve hindi) desde
Google Fonts en su `index.html`; el paquete no las trae.

## Versionar

Semver por tag de git. Un cambio de token que altera cómo se ve algo existente
es **minor**; quitar o renombrar un token o una prop es **major**; corregir un
valor sin cambiar intención es **patch**.

```sh
git tag v1.1.0 && git push --tags
```

## Reglas que no se discuten

- Nunca un hex en un componente: si falta un valor, es un token nuevo.
- El verde es señal, no identidad. El ítem activo de navegación no es verde.
- Los componentes no saben de dónde vienen los datos: props in, nada de fetch.
- Toda nueva pieza se revisa con la lista de la sección 5 del spec antes de
  taggear.

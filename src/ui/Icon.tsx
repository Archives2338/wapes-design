/**
 * Set Lucide, sin mezclas (spec §4). viewBox 24, fill none, stroke 1.6,
 * caps/joins round. El stroke hereda de currentColor salvo que se pase.
 * Decorativo → aria-hidden; con significado → role="img" + label.
 */
import type { SVGProps } from 'react';

const PATHS = {
  'chart-column': ['M3 3v16a2 2 0 0 0 2 2h16', 'M8 17v-4', 'M13 17V7', 'M18 17v-7'],
  'message-circle': ['M7.9 20A9 9 0 1 0 4 16.1L2 22Z'],
  send: ['M22 2 11 13', 'M22 2 15 22l-4-9-9-4Z'],
  users: [
    'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2',
    'M22 21v-2a4 4 0 0 0-3-3.87',
    'M16 3.13a4 4 0 0 1 0 7.75',
    '<circle cx="9" cy="7" r="4"/>',
  ],
  sparkles: [
    'M12 3.2l1.6 4.9a2 2 0 0 0 1.3 1.3l4.9 1.6-4.9 1.6a2 2 0 0 0-1.3 1.3L12 18.8l-1.6-4.9a2 2 0 0 0-1.3-1.3L4.2 11l4.9-1.6a2 2 0 0 0 1.3-1.3z',
    'M19 3.5V6',
    'M20.25 4.75h-2.5',
  ],
  'sliders-horizontal': [
    'M21 5h-7', 'M10 5H3', 'M21 12h-9', 'M8 12H3', 'M21 19h-5', 'M12 19H3', 'M14 3v4', 'M8 10v4', 'M16 17v4',
  ],
  gauge: ['M3.5 17a9 9 0 1 1 17 0', 'M12 12l4-2.5'],
  'credit-card': ['<rect x="2" y="5" width="20" height="14" rx="2.5"/>', 'M2 10h20'],
  'circle-help': [
    '<circle cx="12" cy="12" r="9"/>',
    'M9.8 9.3a2.3 2.3 0 0 1 4.4.8c0 1.6-2.2 2.1-2.2 2.1',
    'M12 16.5h.01',
  ],
  'log-out': ['M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4', 'M10 17l-5-5 5-5', 'M15 12H5'],
  'chevrons-up-down': ['M8 9l4-4 4 4', 'M16 15l-4 4-4-4'],
  'refresh-cw': ['M21 12a9 9 0 1 1-2.6-6.4', 'M21 3v6h-6'],
  x: ['M18 6 6 18', 'm6 6 12 12'],
  clock: ['<circle cx="12" cy="12" r="9"/>', 'M12 7.3V12l3 1.9'],
  monitor: ['<rect x="2" y="4" width="20" height="13" rx="2"/>', 'M9 21h6', 'M12 17v4'],
  sun: [
    '<circle cx="12" cy="12" r="4"/>',
    'M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  ],
  moon: ['M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z'],
  'alert-circle': ['<circle cx="12" cy="12" r="9"/>', 'M12 7.5v5.5M12 16.5h.01'],
  'grip-vertical': ['M9 6h.01M15 6h.01M9 12h.01M15 12h.01M9 18h.01M15 18h.01'],
  check: ['M20 6 9 17l-5-5'],
  plus: ['M12 5v14', 'M5 12h14'],
  laptop: ['<rect x="3" y="4" width="18" height="12" rx="2"/>', 'M2 20h20'],
  languages: ['m5 8 6 6', 'm4 14 6-6 2-3', 'M2 5h12', 'M7 2h1', 'm22 22-5-10-5 10', 'M14 18h6'],
  search: ['<circle cx="11" cy="11" r="8"/>', 'm21 21-4.3-4.3'],
  pencil: [
    'M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z',
    'm15 5 4 4',
  ],
  tag: [
    'M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z',
    '<circle cx="7.5" cy="7.5" r=".5"/>',
  ],
  coins: ['<circle cx="8" cy="8" r="6"/>', 'M18.09 10.37A6 6 0 1 1 10.34 18', 'M7 6h1v4', 'm16.71 13.88.7.71-2.82 2.82'],
  banknote: ['<rect x="2" y="6" width="20" height="12" rx="2"/>', '<circle cx="12" cy="12" r="2"/>', 'M6 12h.01M18 12h.01'],
  ban: ['<circle cx="12" cy="12" r="10"/>', 'm4.9 4.9 14.2 14.2'],
  'arrow-left': ['m12 19-7-7 7-7', 'M19 12H5'],
  'arrow-right': ['M5 12h14', 'm12 5 7 7-7 7'],
  'trash-2': ['M3 6h18', 'M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6', 'M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2', 'M10 11v6', 'M14 11v6'],
  brush: [
    'm9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08',
    'M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z',
  ],
  gift: [
    '<rect x="3" y="8" width="18" height="4" rx="1"/>',
    'M12 8v13',
    'M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7',
    'M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5',
  ],
  'heart-pulse': [
    'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z',
    'M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27',
  ],
  copy: ['<rect x="8" y="8" width="14" height="14" rx="2"/>', 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2'],
  mail: ['<rect x="2" y="4" width="20" height="16" rx="2"/>', 'm22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7'],
  'flask-conical': [
    'M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2',
    'M8.5 2h7',
    'M7 16h10',
  ],
  'layout-grid': [
    '<rect x="3" y="3" width="7" height="7" rx="1"/>',
    '<rect x="14" y="3" width="7" height="7" rx="1"/>',
    '<rect x="14" y="14" width="7" height="7" rx="1"/>',
    '<rect x="3" y="14" width="7" height="7" rx="1"/>',
  ],
  'external-link': ['M15 3h6v6', 'M10 14 21 3', 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'],
  download: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M7 10l5 5 5-5', 'M12 15V3'],
  'user-round': ['<circle cx="12" cy="8" r="5"/>', 'M20 21a8 8 0 0 0-16 0'],
  'shield-alert': ['M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z', 'M12 8v4', 'M12 16h.01'],
  inbox: ['M22 12h-6l-2 3h-4l-2-3H2', 'M5.5 5.1 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.9A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.7 1.1z'],
} as const;

export type IconName = keyof typeof PATHS;

interface Props extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  size?: number;
  /** Con significado propio: pone role="img" y aria-label. Sin label → decorativo. */
  label?: string;
}

export function Icon({ name, size = 17, label, strokeWidth = 1.6, ...rest }: Props) {
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...a11y}
      {...rest}
    >
      {PATHS[name].map((d, i) =>
        d.startsWith('<') ? (
          // Primitivas (circle/rect) vienen como markup literal del set.
          <g key={i} dangerouslySetInnerHTML={{ __html: d }} />
        ) : (
          <path key={i} d={d} />
        ),
      )}
    </svg>
  );
}

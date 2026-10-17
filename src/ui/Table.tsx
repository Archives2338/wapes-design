import type { ReactNode } from 'react';
import './table.css';

export interface Column<Row> {
  key: string;
  header: ReactNode;
  cell: (row: Row) => ReactNode;
  align?: 'left' | 'right';
  /** clase extra para la celda (p. ej. "num") */
  className?: string;
}

interface Props<Row> {
  columns: Column<Row>[];
  rows: Row[];
  rowKey: (row: Row) => string;
  /** Qué mostrar con cero filas: lo diseña quien llama (spec §9). */
  empty: ReactNode;
}

export function Table<Row>({ columns, rows, rowKey, empty }: Props<Row>) {
  if (!rows.length) return <>{empty}</>;
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} scope="col" className={c.align === 'right' ? 'th-right' : undefined}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={rowKey(r)}>
              {columns.map((c) => (
                <td key={c.key} className={`${c.align === 'right' ? 'td-right' : ''} ${c.className ?? ''}`.trim() || undefined}>
                  {c.cell(r)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

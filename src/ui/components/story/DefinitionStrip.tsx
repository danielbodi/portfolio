export interface DefinitionStripItem {
  label: string;
  text: string;
}

export interface DefinitionStripProps {
  items: DefinitionStripItem[];
  className?: string;
}

function columnsClass(count: number): string {
  if (count <= 2) return 'sm:grid-cols-2';
  if (count === 3) return 'md:grid-cols-3';
  return 'sm:grid-cols-2 lg:grid-cols-4';
}

function cellClass(count: number): string {
  if (count === 3) {
    return 'border-gray-700/60 px-4 py-4 md:border-r md:last:border-r-0 max-md:border-b max-md:last:border-b-0';
  }
  return 'border-gray-700/60 px-4 py-4 sm:odd:border-r lg:border-r lg:last:border-r-0';
}

/**
 * Labelled definition cells in one grid. Facts, decisions and home pillars
 * use the same surface; only the number of cells changes.
 */
export function DefinitionStrip({ items, className = '' }: DefinitionStripProps) {
  return (
    <dl
      className={`grid border-y border-gray-700/60 bg-gray-900/20 ${columnsClass(items.length)} ${className}`.trim()}
    >
      {items.map((item) => (
        <div key={item.label} className={cellClass(items.length)}>
          <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-purple-300">
            {item.label}
          </dt>
          <dd className="mt-1.5 text-sm leading-snug text-gray-300">{item.text}</dd>
        </div>
      ))}
    </dl>
  );
}

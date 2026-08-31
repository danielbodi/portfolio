import {
  KeyboardEvent,
  ReactNode,
  useCallback,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { useReducedMotion } from 'framer-motion';
import { Check, X } from 'lucide-react';

/**
 * The validator from the FleetBridge Storybook `getColors()` utility, copied
 * verbatim. A name only becomes documentation if it carries both semantic
 * coordinates before the `__` property segment.
 */
const TOKEN_NAME = /^--color--.+-[^-]+__.*$/;

/** Guard before setProperty, which fails silently on a malformed name. */
const CUSTOM_PROPERTY_NAME = /^--[A-Za-z0-9_-]+$/;

type PipelineTab = 'nomenclature' | 'composition';

const TABS: ReadonlyArray<{ id: PipelineTab; label: string }> = [
  { id: 'nomenclature', label: 'Nomenclature → documentation' },
  { id: 'composition', label: 'color-mix composition' }
];

/** Plain-language map of the three numbered panes, read before them. */
const PIPELINE_STAGES: ReadonlyArray<{ step: string; title: string; detail: string }> = [
  { step: '01', title: 'Source of truth', detail: 'colour tokens declared in shipped CSS' },
  { step: '02', title: 'Parser', detail: 'validates each name it reads back' },
  { step: '03', title: 'Documentation', detail: 'regenerates itself — never edited by hand' }
];

const EXPECTED_NOMENCLATURE = '--color--{category}--{subcategory}__{property}';
const DEFAULT_DRAFT_NAME = '--color--component--button__background-primary';
const DEFAULT_DRAFT_HUE = 271;
const DEFAULT_BASE_HUE = 265;
const DEFAULT_BASE_SATURATION = 16;

interface Declaration {
  name: string;
  value: string;
  /** Rendered as a trailing comment in the source pane. */
  note?: string;
}

/**
 * This site's palette, declared in the case's grammar. The values are the
 * portfolio's own gray/purple/amber/emerald/sky ramp, not FleetBridge's brand
 * colours — the pipeline is the transferable part, the palette is not.
 */
const PALETTE_DECLARATIONS: ReadonlyArray<Declaration> = [
  { name: '--color--palette--base__primary', value: '#a855f7' },
  { name: '--color--palette--base__secondary', value: '#111827' },
  { name: '--color--palette--base__success', value: '#10b981' },
  { name: '--color--palette--base__warning', value: '#f59e0b' },
  { name: '--color--palette--base__info', value: '#0ea5e9' },
  { name: '--color--generic--background__surface', value: '#030712' },
  { name: '--color--generic--typo__body', value: '#d1d5db' },
  { name: '--color--status--hover__typo', value: '#e9d5ff' },
  {
    name: '--color--mix',
    value: '#f9fafb',
    note: 'a mixing input, so the validator skips it'
  }
];

const NAME_PRESETS: ReadonlyArray<{ label: string; name: string }> = [
  { label: 'Component token', name: DEFAULT_DRAFT_NAME },
  { label: 'New status subcategory', name: '--color--status--active__background' },
  { label: 'Missing a coordinate', name: '--color--palette__primary' },
  { label: 'Relationship token', name: '--color--secondary__shade-9' }
];

const PARSER_SOURCE = [
  '// getColors(): validate, then group the live CSSOM',
  'if (!/^--color--.+-[^-]+__.*$/.test(varName)) return;',
  '',
  "const [path] = varName.split('__');",
  "const [, , category, subcategory] = path.split('--');",
  '',
  'acc[category][subcategory][`var(${varName})`] =',
  '  getComputedStyle(scope).getPropertyValue(varName);'
].join('\n');

interface ReadToken {
  name: string;
  category: string;
  subcategory: string;
  /** The token stream the CSSOM reports, after var() substitution. */
  declared: string;
  /** The same token resolved to a colour by the browser. */
  computed: string;
}

interface RejectedToken {
  name: string;
  reason: string;
}

interface PipelineRead {
  groups: Array<{ category: string; subcategories: Array<{ name: string; tokens: ReadToken[] }> }>;
  tokens: ReadToken[];
  rejected: RejectedToken[];
}

const EMPTY_READ: PipelineRead = { groups: [], tokens: [], rejected: [] };

/** Diagnostic copy only — the gate above is the regex, nothing else. */
function rejectionReason(name: string): string {
  if (!name.startsWith('--color--')) return 'Outside the --color-- namespace the utility scans.';
  if (!name.includes('__')) return 'No __ segment, so no property to isolate.';
  const [path] = name.split('__');
  if (path.split('--').length < 4) {
    return 'One coordinate before __; the grammar needs {category}--{subcategory}.';
  }
  return 'Does not satisfy the validator.';
}

function hsl(hue: number, saturation: number, lightness: number): string {
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

interface PaneProps {
  step: string;
  title: string;
  meta?: string;
  /** One-line action hint for this step, not a description of the whole pipeline. */
  guide?: string;
  className?: string;
  children: ReactNode;
}

function Pane({ step, title, meta, guide, className = '', children }: PaneProps) {
  return (
    <section className={`rounded-xl border border-gray-700/60 bg-gray-900/50 ${className}`}>
      <header className="flex flex-wrap items-baseline gap-x-2 gap-y-1 border-b border-gray-700/60 px-3 py-2">
        <span className="font-mono text-[0.65rem] text-purple-300">{step}</span>
        <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-gray-200">
          {title}
        </h4>
        {meta && <span className="ml-auto text-[0.65rem] text-gray-500">{meta}</span>}
      </header>
      <div className="px-3 py-3">
        {guide && (
          <p className="mb-2.5 text-[0.72rem] leading-relaxed text-gray-400">{guide}</p>
        )}
        {children}
      </div>
    </section>
  );
}

function DeclarationList({ declarations }: { declarations: ReadonlyArray<Declaration> }) {
  return (
    <div className="space-y-1 font-mono text-[0.68rem] leading-relaxed">
      {declarations.map((declaration) => (
        <p key={declaration.name} className="break-words text-gray-400">
          <span className="text-purple-200">{declaration.name}</span>: {declaration.value};
          {declaration.note && <span className="text-gray-600"> /* {declaration.note} */</span>}
        </p>
      ))}
    </div>
  );
}

/**
 * The Bridgestone token pipeline, re-implemented so it runs here: custom
 * properties declared in the case's grammar on this demo's own element, read
 * back out of the CSSOM, validated with the case's regex and grouped into the
 * swatch table the Storybook foundation pages rendered.
 */
export function TokenPipelineDemo() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const baseId = useId();
  const scopeRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLSpanElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const [tab, setTab] = useState<PipelineTab>('nomenclature');
  const [draftName, setDraftName] = useState(DEFAULT_DRAFT_NAME);
  const [draftHue, setDraftHue] = useState(DEFAULT_DRAFT_HUE);
  const [baseHue, setBaseHue] = useState(DEFAULT_BASE_HUE);
  const [baseSaturation, setBaseSaturation] = useState(DEFAULT_BASE_SATURATION);
  const [read, setRead] = useState<PipelineRead>(EMPTY_READ);

  const draftValue = hsl(draftHue, 91, 65);
  const swatchMotion = prefersReducedMotion ? '' : 'transition-colors duration-150';

  const compositionDeclarations = useMemo<Declaration[]>(
    () => [
      { name: '--color--mix', value: '#f9fafb', note: 'what every shade mixes toward' },
      {
        name: '--color--palette--base__secondary',
        value: hsl(baseHue, baseSaturation, 15)
      },
      { name: '--color--secondary__shade-9', value: 'var(--color--mix) 10%' },
      { name: '--color--secondary__shade-7', value: 'var(--color--mix) 42%', note: 'interpolated' },
      { name: '--color--secondary__shade-4', value: 'var(--color--mix) 90%' },
      {
        name: '--color--generic--background__surface',
        value: 'var(--color--palette--base__secondary)'
      },
      {
        name: '--color--generic--background__odd',
        value:
          'color-mix(in srgb, var(--color--palette--base__secondary), var(--color--secondary__shade-9))'
      },
      {
        name: '--color--generic--border__subtle',
        value:
          'color-mix(in srgb, var(--color--palette--base__secondary), var(--color--secondary__shade-7))'
      },
      {
        name: '--color--generic--typo__body',
        value:
          'color-mix(in srgb, var(--color--palette--base__secondary), var(--color--secondary__shade-4))'
      }
    ],
    [baseHue, baseSaturation]
  );

  const declarations = useMemo<Declaration[]>(
    () =>
      tab === 'nomenclature'
        ? [...PALETTE_DECLARATIONS, { name: draftName, value: draftValue }]
        : compositionDeclarations,
    [tab, draftName, draftValue, compositionDeclarations]
  );

  /*
   * Declare, then read. Both halves belong in an effect: the browser only has a
   * computed value once the properties are on a real element, and reading during
   * render would tear on the next commit.
   */
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    const probe = probeRef.current;
    if (!scope || !probe) return;

    const stale: string[] = [];
    for (let i = 0; i < scope.style.length; i += 1) {
      const property = scope.style.item(i);
      if (property.startsWith('--')) stale.push(property);
    }
    stale.forEach((property) => scope.style.removeProperty(property));

    declarations.forEach(({ name, value }) => {
      if (CUSTOM_PROPERTY_NAME.test(name)) scope.style.setProperty(name, value);
    });

    const scopeStyle = getComputedStyle(scope);
    const probeStyle = getComputedStyle(probe);
    const grouped = new Map<string, Map<string, ReadToken[]>>();
    const tokens: ReadToken[] = [];
    const rejected: RejectedToken[] = [];

    for (let i = 0; i < scope.style.length; i += 1) {
      const varName = scope.style.item(i);
      if (!varName.startsWith('--')) continue;

      if (!TOKEN_NAME.test(varName)) {
        rejected.push({ name: varName, reason: rejectionReason(varName) });
        continue;
      }

      const [path] = varName.split('__');
      const [, , category, subcategory] = path.split('--');

      /* Custom properties are not resolved on read, so a probe does it. */
      probe.style.setProperty('color', `var(${varName})`);

      const token: ReadToken = {
        name: varName,
        category,
        subcategory,
        declared: scopeStyle.getPropertyValue(varName).trim(),
        computed: probeStyle.color
      };

      tokens.push(token);
      const subcategories = grouped.get(category) ?? new Map<string, ReadToken[]>();
      subcategories.set(subcategory, [...(subcategories.get(subcategory) ?? []), token]);
      grouped.set(category, subcategories);
    }

    probe.style.removeProperty('color');

    setRead({
      groups: [...grouped].map(([category, subcategories]) => ({
        category,
        subcategories: [...subcategories].map(([name, groupTokens]) => ({
          name,
          tokens: groupTokens
        }))
      })),
      tokens,
      rejected
    });
  }, [declarations]);

  const tokensByName = useMemo(
    () => new Map(read.tokens.map((token) => [token.name, token])),
    [read]
  );

  const reset = useCallback(() => {
    setTab('nomenclature');
    setDraftName(DEFAULT_DRAFT_NAME);
    setDraftHue(DEFAULT_DRAFT_HUE);
    setBaseHue(DEFAULT_BASE_HUE);
    setBaseSaturation(DEFAULT_BASE_SATURATION);
  }, []);

  const onTabKeyDown = useCallback((event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    let next = -1;
    if (step !== 0) next = (index + step + TABS.length) % TABS.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = TABS.length - 1;
    if (next < 0) return;

    event.preventDefault();
    setTab(TABS[next].id);
    tabRefs.current[next]?.focus();
  }, []);

  const nameIsWellFormed = CUSTOM_PROPERTY_NAME.test(draftName);
  const draftAccepted = nameIsWellFormed && TOKEN_NAME.test(draftName);
  const draftPath = draftName.split('__')[0];
  const draftSegments = draftPath.split('--');
  const verdict = !nameIsWellFormed
    ? 'Not a custom-property name, so the CSSOM never stores it.'
    : draftAccepted
      ? `Accepted. Grouped under ${draftSegments[2]} → ${draftSegments[3]}.`
      : `Rejected. ${rejectionReason(draftName)}`;

  const nameId = `${baseId}-name`;
  const patternId = `${baseId}-pattern`;
  const verdictId = `${baseId}-verdict`;
  const hueId = `${baseId}-hue`;
  const baseHueId = `${baseId}-base-hue`;
  const baseSaturationId = `${baseId}-base-saturation`;

  const surface = tokensByName.get('--color--generic--background__surface')?.computed;
  const oddRow = tokensByName.get('--color--generic--background__odd')?.computed;
  const border = tokensByName.get('--color--generic--border__subtle')?.computed;
  const bodyTypo = tokensByName.get('--color--generic--typo__body')?.computed;

  return (
    <div ref={scopeRef}>
      <span
        ref={probeRef}
        aria-hidden="true"
        className="pointer-events-none absolute h-px w-px opacity-0"
      />

      <ol aria-label="Pipeline stages" className="mb-3 flex flex-wrap items-center gap-x-2.5 gap-y-1">
        {PIPELINE_STAGES.map((stage, index) => (
          <li key={stage.step} className="flex items-center gap-x-2.5 text-[0.68rem] leading-tight">
            {index > 0 && (
              <span aria-hidden="true" className="text-gray-600">
                →
              </span>
            )}
            <span className="flex items-baseline gap-1.5">
              <span className="font-mono text-purple-300">{stage.step}</span>
              <span className="font-semibold uppercase tracking-[0.08em] text-gray-300">
                {stage.title}
              </span>
              <span className="hidden text-gray-500 sm:inline">{stage.detail}</span>
            </span>
          </li>
        ))}
      </ol>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div
          role="tablist"
          aria-label="Token pipeline views"
          className="flex flex-wrap gap-1 rounded-lg border border-gray-700/60 bg-gray-950/50 p-1"
        >
          {TABS.map((entry, index) => (
            <button
              key={entry.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${entry.id}`}
              aria-selected={tab === entry.id}
              /* Only the selected panel is rendered, so only it can be referenced. */
              aria-controls={tab === entry.id ? `${baseId}-panel-${entry.id}` : undefined}
              tabIndex={tab === entry.id ? 0 : -1}
              onClick={() => setTab(entry.id)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                tab === entry.id
                  ? 'bg-purple-500/20 text-purple-100'
                  : 'text-gray-400 hover:bg-gray-800/80 hover:text-gray-200'
              }`}
            >
              {entry.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={reset}
          className="rounded-md border border-gray-600/80 bg-gray-800/80 px-2.5 py-1 text-xs font-medium text-gray-200 hover:bg-gray-700"
        >
          Reset demo
        </button>
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel-${tab}`}
        aria-labelledby={`${baseId}-tab-${tab}`}
        className="mt-4 grid gap-4 lg:grid-cols-2"
      >
        <div className="flex flex-col gap-4">
          {tab === 'nomenclature' ? (
            <Pane
              step="01"
              title="Source of truth"
              meta="CSS custom properties"
              guide="Edit the token name, or pick a preset."
            >
              <p className="mb-2 text-[0.7rem] leading-relaxed text-gray-500">
                Declared on this demo&apos;s own element, so nothing reaches the rest of the page.
              </p>
              <DeclarationList declarations={PALETTE_DECLARATIONS} />

              <div className="mt-3 rounded-lg border border-purple-500/40 bg-purple-500/5 p-3">
                <label
                  htmlFor={nameId}
                  className="block text-[0.68rem] font-semibold uppercase tracking-wide text-gray-300"
                >
                  Token name — edit it
                </label>
                <p id={patternId} className="mt-1 break-words font-mono text-[0.65rem] text-gray-500">
                  {EXPECTED_NOMENCLATURE}
                </p>
                <input
                  id={nameId}
                  type="text"
                  value={draftName}
                  onChange={(event) => setDraftName(event.target.value)}
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  aria-describedby={`${patternId} ${verdictId}`}
                  aria-invalid={!draftAccepted}
                  className="mt-1.5 w-full rounded-md border border-gray-600/80 bg-gray-950 px-2 py-1.5 font-mono text-[0.68rem] text-gray-100"
                />

                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <span className="text-[0.65rem] uppercase tracking-wide text-gray-500">Try</span>
                  {NAME_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setDraftName(preset.name)}
                      aria-label={`${preset.label}: ${preset.name}`}
                      className="rounded-md border border-gray-600/80 bg-gray-800/80 px-2 py-0.5 text-[0.68rem] text-gray-300 hover:bg-gray-700 hover:text-gray-100"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <label
                  htmlFor={hueId}
                  className="mt-3 block text-[0.68rem] font-semibold uppercase tracking-wide text-gray-300"
                >
                  Value — hue
                </label>
                <div className="mt-1 flex items-center gap-2">
                  <input
                    id={hueId}
                    type="range"
                    min={0}
                    max={360}
                    value={draftHue}
                    onChange={(event) => setDraftHue(Number(event.target.value))}
                    aria-valuetext={`${draftHue} degrees, ${draftValue}`}
                    className="h-1.5 w-full cursor-pointer accent-purple-500"
                  />
                  <span
                    aria-hidden="true"
                    style={{ backgroundColor: draftValue }}
                    className={`h-6 w-6 shrink-0 rounded border border-gray-600/80 ${swatchMotion}`}
                  />
                </div>
                <p className="mt-1 break-words font-mono text-[0.65rem] text-gray-500">
                  {draftValue}
                </p>
              </div>
            </Pane>
          ) : (
            <Pane
              step="01"
              title="Source of truth"
              meta="relationships, not colours"
              guide="Drag the base hue or saturation — every token composed from that base recomputes."
            >
              <p className="mb-2 text-[0.7rem] leading-relaxed text-gray-500">
                A shade token stores the second argument of a mix — a colour and a weight — so
                semantic tokens compose it instead of duplicating a value. 10% and 90% are the
                weights the case publishes.
              </p>
              <DeclarationList declarations={compositionDeclarations} />

              <div className="mt-3 rounded-lg border border-purple-500/40 bg-purple-500/5 p-3">
                <label
                  htmlFor={baseHueId}
                  className="block text-[0.68rem] font-semibold uppercase tracking-wide text-gray-300"
                >
                  Base hue
                </label>
                <input
                  id={baseHueId}
                  type="range"
                  min={0}
                  max={360}
                  value={baseHue}
                  onChange={(event) => setBaseHue(Number(event.target.value))}
                  aria-valuetext={`${baseHue} degrees`}
                  className="mt-1 h-1.5 w-full cursor-pointer accent-purple-500"
                />
                <label
                  htmlFor={baseSaturationId}
                  className="mt-3 block text-[0.68rem] font-semibold uppercase tracking-wide text-gray-300"
                >
                  Base saturation
                </label>
                <input
                  id={baseSaturationId}
                  type="range"
                  min={0}
                  max={60}
                  value={baseSaturation}
                  onChange={(event) => setBaseSaturation(Number(event.target.value))}
                  aria-valuetext={`${baseSaturation} percent`}
                  className="mt-1 h-1.5 w-full cursor-pointer accent-purple-500"
                />
                <p className="mt-2 text-[0.7rem] leading-relaxed text-gray-500">
                  The browser resolves the mix — no build step regenerates a palette.
                </p>
              </div>

              {surface && oddRow && border && bodyTypo && (
                <div
                  style={{ backgroundColor: surface, borderColor: border, color: bodyTypo }}
                  className={`rounded-lg border p-2 ${swatchMotion}`}
                >
                  <p className="px-1.5 pb-1 text-[0.65rem] uppercase tracking-wide opacity-70">
                    Composed in place
                  </p>
                  {['Row 01', 'Row 02', 'Row 03', 'Row 04'].map((label, index) => (
                    <div
                      key={label}
                      style={{ backgroundColor: index % 2 === 1 ? oddRow : 'transparent' }}
                      className={`flex items-center justify-between px-1.5 py-1 text-[0.7rem] ${swatchMotion}`}
                    >
                      <span>{label}</span>
                      <span className="font-mono opacity-70">{(index + 1) * 1.25}</span>
                    </div>
                  ))}
                </div>
              )}
            </Pane>
          )}

          <Pane
            step="02"
            title="Validator and parser"
            meta="TypeScript"
            guide={
              tab === 'nomenclature'
                ? 'The regex accepts or rejects the name, then groups it by category and subcategory.'
                : 'Same parser — names that fail the grammar never become documentation.'
            }
          >
            <pre className="overflow-x-auto rounded-lg bg-gray-950/70 p-2.5 font-mono text-[0.65rem] leading-5 text-gray-300">
              <code>{PARSER_SOURCE}</code>
            </pre>
            <p className="mt-2 text-[0.65rem] leading-relaxed text-gray-500">
              <code className="font-mono">scope</code> is this demo&apos;s element; the FleetBridge
              utility read <code className="font-mono">document.body</code>.
            </p>

            {tab === 'nomenclature' && (
              <dl className="mt-3 space-y-1.5 rounded-lg border border-gray-700/60 bg-gray-950/50 p-2.5 font-mono text-[0.65rem]">
                <div className="flex gap-2">
                  <dt className="w-24 shrink-0 text-gray-500">input</dt>
                  <dd className="min-w-0 break-words text-gray-300">{draftName || '—'}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-24 shrink-0 text-gray-500">regex</dt>
                  <dd
                    className={`flex items-center gap-1 ${
                      draftAccepted ? 'text-emerald-300' : 'text-amber-300'
                    }`}
                  >
                    {draftAccepted ? (
                      <Check className="h-3 w-3" aria-hidden="true" />
                    ) : (
                      <X className="h-3 w-3" aria-hidden="true" />
                    )}
                    {draftAccepted ? 'accepted' : 'rejected'}
                  </dd>
                </div>
                {draftAccepted && (
                  <>
                    <div className="flex gap-2">
                      <dt className="w-24 shrink-0 text-gray-500">split(&apos;__&apos;)</dt>
                      <dd className="min-w-0 break-words text-gray-400">
                        [{draftName.split('__').map((part) => `"${part}"`).join(', ')}]
                      </dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="w-24 shrink-0 text-gray-500">split(&apos;--&apos;)</dt>
                      <dd className="min-w-0 break-words text-gray-400">
                        [{draftSegments.map((part) => `"${part}"`).join(', ')}]
                      </dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="w-24 shrink-0 text-gray-500">category</dt>
                      <dd className="text-purple-200">{draftSegments[2]}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="w-24 shrink-0 text-gray-500">subcategory</dt>
                      <dd className="text-purple-200">{draftSegments[3]}</dd>
                    </div>
                  </>
                )}
              </dl>
            )}

            <p
              id={verdictId}
              role="status"
              className={`mt-2 text-[0.7rem] leading-relaxed ${
                draftAccepted ? 'text-gray-400' : 'text-amber-200'
              }`}
            >
              {tab === 'nomenclature' ? verdict : `${read.tokens.length} of ${declarations.length} declarations became documentation.`}
            </p>
          </Pane>
        </div>

        <Pane
          step="03"
          title="Generated documentation"
          meta={`${read.tokens.length} documented · ${read.rejected.length} skipped`}
          className="self-start"
          guide={
            tab === 'nomenclature'
              ? 'Accepted names land in their group. Break the grammar and the token moves below, with the reason.'
              : 'Swatches redraw from the live values — no build step, no hand-edited docs.'
          }
        >
          {read.groups.length === 0 && (
            <p className="text-[0.7rem] text-gray-500">Nothing validated yet.</p>
          )}
          {read.groups.map((group) => (
            <div key={group.category} className="mb-3 last:mb-0">
              <h5 className="font-mono text-[0.68rem] text-purple-200">{group.category}</h5>
              {group.subcategories.map((subcategory) => (
                <div
                  key={subcategory.name}
                  className="mt-1.5 border-l border-gray-700/60 pl-2.5"
                >
                  <p className="font-mono text-[0.65rem] text-gray-500">{subcategory.name}</p>
                  <ul className="mt-1 space-y-1.5">
                    {subcategory.tokens.map((token) => (
                      <li key={token.name} className="flex items-start gap-2">
                        <span
                          aria-hidden="true"
                          style={{ backgroundColor: token.computed }}
                          className={`mt-0.5 h-5 w-5 shrink-0 rounded border border-gray-600/80 ${swatchMotion}`}
                        />
                        <span className="min-w-0">
                          <span className="block break-words font-mono text-[0.65rem] text-gray-300">
                            var({token.name})
                            {tab === 'nomenclature' && token.name === draftName && (
                              <span className="ml-1.5 inline-block rounded-full border border-purple-500/40 bg-purple-500/10 px-1.5 align-middle font-sans text-[0.6rem] leading-4 text-purple-200">
                                your token
                              </span>
                            )}
                          </span>
                          <span className="block break-words font-mono text-[0.62rem] text-gray-500">
                            {token.declared} → {token.computed}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}

          {read.rejected.length > 0 && (
            <div className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/5 p-2.5">
              <h5 className="text-[0.68rem] font-semibold uppercase tracking-wide text-amber-200">
                Skipped by the validator
              </h5>
              <ul className="mt-1 space-y-1.5">
                {read.rejected.map((entry) => (
                  <li key={entry.name}>
                    <span className="block break-words font-mono text-[0.65rem] text-gray-300">
                      {entry.name}
                      {tab === 'nomenclature' && entry.name === draftName && (
                        <span className="ml-1.5 inline-block rounded-full border border-purple-500/40 bg-purple-500/10 px-1.5 align-middle font-sans text-[0.6rem] leading-4 text-purple-200">
                          your token
                        </span>
                      )}
                    </span>
                    <span className="block text-[0.65rem] leading-relaxed text-gray-500">
                      {entry.reason}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Pane>
      </div>
    </div>
  );
}

export default TokenPipelineDemo;

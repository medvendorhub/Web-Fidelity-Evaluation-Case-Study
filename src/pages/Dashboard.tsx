import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, CheckCircle2, ExternalLink, Download, Mail, ChevronRight, Info, ChevronDown, X, Linkedin, Monitor, Tablet, Smartphone } from 'lucide-react';
import { ScoreRing } from '@/components/workspace/ScoreRing';
import { cn } from '@/lib/utils';

// ── Evaluation Rubric ─────────────────────────────────────────────────────────

type ChipVariant = 'match' | 'partial' | 'deviation' | 'ambiguous' | 'devtools';

const chipConfig: Record<ChipVariant, { label: string; className: string }> = {
  match:     { label: 'Match',                         className: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/25' },
  partial:   { label: 'Partial match',                 className: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/25' },
  deviation: { label: 'Material deviation',            className: 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/25' },
  ambiguous: { label: 'Ambiguous reference behaviour', className: 'bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/25' },
  devtools:  { label: 'Requires DevTools verification',className: 'bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-500/25' },
};

function Chip({ variant }: { variant: ChipVariant }) {
  const { label, className } = chipConfig[variant];
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-semibold tracking-wide whitespace-nowrap leading-tight', className)}>
      {label}
    </span>
  );
}

interface RubricRow {
  criterion: string;
  referenceStandard: string;
  candidateA: ChipVariant;
  candidateB: ChipVariant;
  note: string;
}

const rubricRows: RubricRow[] = [
  {
    criterion: 'Layout, box model, and spacing',
    referenceStandard: 'Consistent spacing scale; responsive CSS Grid collapses at breakpoints; card widths constrained by max-width container.',
    candidateA: 'deviation',
    candidateB: 'partial',
    note: 'Candidate A has inconsistent section spacing and incorrect card widths. Candidate B has a minor gap discrepancy in the doctor-card grid.',
  },
  {
    criterion: 'Typography and hierarchy',
    referenceStandard: 'Heading hierarchy uses font-weight 700 for h1/h2, 600 for h3; body text at 16px/1.6 line-height; correct uppercase tracking on labels.',
    candidateA: 'deviation',
    candidateB: 'partial',
    note: 'Candidate A applies globally incorrect font sizes (h1 at 20px, body at 18px). Candidate B applies font-weight 400 to all headings instead of the reference 600/700.',
  },
  {
    criterion: 'Colour, borders, and visual treatment',
    referenceStandard: 'Indigo-700/900 palette; border-radius: rounded-md (6px) on inputs and buttons, rounded-xl on cards; subtle slate border colour.',
    candidateA: 'deviation',
    candidateB: 'match',
    note: 'Candidate A applies a global border-radius of 9999px to all elements, including the hero image and doctor cards. Candidate B correctly matches the reference border and colour treatment.',
  },
  {
    criterion: 'Asset treatment and component geometry',
    referenceStandard: 'Hero image uses rounded-2xl; doctor cards use rounded-xl; proportional 1:1 aspect ratio for the hero placeholder.',
    candidateA: 'deviation',
    candidateB: 'match',
    note: 'Candidate A\'s 9999px radius distorts the hero image and all cards into pill shapes, breaking the geometric language of the reference. Candidate B preserves correct geometry.',
  },
  {
    criterion: 'Content order, z-order, and overflow',
    referenceStandard: 'Single-column content flow at all breakpoints; no horizontal overflow; sticky header uses z-index correctly.',
    candidateA: 'deviation',
    candidateB: 'ambiguous',
    note: 'Candidate A produces clear horizontal overflow at tablet width due to a min-width booking form. Whether Candidate B\'s third doctor-card wrap matches the reference at exactly 768px is ambiguous without visual comparison at that precise breakpoint.',
  },
  {
    criterion: 'Responsive behaviour at 768px',
    referenceStandard: 'Booking form collapses to single column; doctor grid moves to 1–2 columns; no content hidden or clipped; all interactive elements reachable.',
    candidateA: 'deviation',
    candidateB: 'ambiguous',
    note: 'Candidate A keeps the booking form in a fixed two-column layout, causing horizontal overflow and blocking field access. Candidate B is largely responsive; the reference\'s exact intended grid behaviour at 768px is ambiguous.',
  },
  {
    criterion: 'Semantic structure and landmarks',
    referenceStandard: 'Correct use of <header>, <nav>, <main>, <section>, <form>, <button>, and <footer> with appropriate ARIA labels where needed.',
    candidateA: 'devtools',
    candidateB: 'devtools',
    note: 'Landmark presence and heading hierarchy require browser DevTools inspection to verify. Visual assessment alone cannot confirm correct semantic structure for either candidate.',
  },
  {
    criterion: 'Accessibility fundamentals',
    referenceStandard: 'All icon-only controls carry accessible names; form inputs have visible labels and matching <label for> associations; focus order is logical.',
    candidateA: 'devtools',
    candidateB: 'devtools',
    note: 'Candidate B has a confirmed missing aria-label on the search button (WCAG 2.1 SC 4.1.2). A full audit of both candidates requires DevTools inspection of all interactive controls and focus order.',
  },
  {
    criterion: 'CSS layout approach and implementation resilience',
    referenceStandard: 'CSS Grid and Flexbox used throughout; no hardcoded absolute positions for flow elements; fluid widths with max-width containers.',
    candidateA: 'devtools',
    candidateB: 'devtools',
    note: 'Underlying Grid and Flexbox usage, presence of fixed dimensions, and sources of overflow require code inspection. Candidate A\'s overflow is observable visually; the root CSS cause requires DevTools confirmation.',
  },
];

// ── Assessment Summary cards ──────────────────────────────────────────────────

interface SummaryCard {
  label: string;
  title: string;
  body: string;
  accent: string;        // border + left stripe colour
  labelClass: string;    // chip colour
  titleClass: string;
}

const summaryCards: SummaryCard[] = [
  {
    label: 'Candidate A',
    title: 'Material visual deviations',
    body: 'Layout, card geometry, spacing, and tablet form containment differ materially from the reference.',
    accent: 'border-orange-400/40 dark:border-orange-500/30',
    labelClass: 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-400/30',
    titleClass: 'text-orange-800 dark:text-orange-300',
  },
  {
    label: 'Candidate B',
    title: 'Closer visual reproduction',
    body: 'Preserves the reference structure, hierarchy, and component geometry with minor typography and spacing differences.',
    accent: 'border-emerald-400/40 dark:border-emerald-500/30',
    labelClass: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-400/30',
    titleClass: 'text-emerald-800 dark:text-emerald-300',
  },
  {
    label: 'Responsive testing',
    title: 'Reference ambiguity recorded',
    body: 'All three pages show horizontal scrolling at 768px; Candidate B most closely reproduces the observed reference behaviour.',
    accent: 'border-sky-400/40 dark:border-sky-500/30',
    labelClass: 'bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-400/30',
    titleClass: 'text-sky-800 dark:text-sky-300',
  },
  {
    label: 'Structural review',
    title: 'DevTools verification required',
    body: 'Semantic HTML, accessible names, and CSS implementation quality must be confirmed through browser inspection.',
    accent: 'border-violet-400/40 dark:border-violet-500/30',
    labelClass: 'bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-400/30',
    titleClass: 'text-violet-800 dark:text-violet-300',
  },
  {
    label: 'Final preference',
    title: 'Candidate B',
    body: 'Candidate B has fewer, lower-impact deviations and is closer to the reference across desktop and tablet evidence.',
    accent: 'border-primary/30',
    labelClass: 'bg-primary/10 text-primary border-primary/20',
    titleClass: 'text-primary',
  },
];

function EvaluationRubric() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">

      {/* ── Assessment Summary ─────────────────────────────────────────────── */}
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Assessment Summary</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {summaryCards.map((card) => (
            <div
              key={card.label}
              className={cn(
                'bg-card border rounded-lg px-5 py-4 flex flex-col gap-2',
                card.accent
              )}
            >
              <span className={cn(
                'self-start text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border leading-tight',
                card.labelClass
              )}>
                {card.label}
              </span>
              <p className={cn('text-sm font-semibold leading-snug', card.titleClass)}>
                {card.title}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Full rubric accordion ──────────────────────────────────────────── */}
      <div className="border border-border rounded-xl overflow-hidden">

        {/* Accordion trigger */}
        <button
          onClick={() => setOpen(v => !v)}
          aria-expanded={open}
          className="w-full flex items-center justify-between px-5 py-4 bg-muted/30 hover:bg-muted/50 transition-colors text-left group"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
            View full evaluation rubric
          </span>
          <ChevronDown
            size={15}
            className={cn('text-muted-foreground transition-transform duration-200', open && 'rotate-180')}
          />
        </button>

        {/* Accordion body */}
        {open && (
          <div className="border-t border-border">
            {/* Status key */}
            <div className="flex flex-wrap gap-2 items-center px-5 py-3 bg-background border-b border-border/60">
              <span className="text-[10px] font-mono text-muted-foreground mr-1 uppercase tracking-wider">Status key:</span>
              {(Object.keys(chipConfig) as ChipVariant[]).map(v => (
                <Chip key={v} variant={v} />
              ))}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse min-w-[860px]">
                <thead>
                  <tr className="bg-muted/40 border-b border-border">
                    <th className="text-left text-xs font-mono uppercase tracking-wider text-muted-foreground px-5 py-3.5 w-[18%]">Criterion</th>
                    <th className="text-left text-xs font-mono uppercase tracking-wider text-muted-foreground px-5 py-3.5 w-[22%]">Reference standard</th>
                    <th className="text-left text-xs font-mono uppercase tracking-wider text-muted-foreground px-5 py-3.5 w-[13%]">Candidate A</th>
                    <th className="text-left text-xs font-mono uppercase tracking-wider text-muted-foreground px-5 py-3.5 w-[13%]">Candidate B</th>
                    <th className="text-left text-xs font-mono uppercase tracking-wider text-muted-foreground px-5 py-3.5">Assessment note</th>
                  </tr>
                </thead>
                <tbody>
                  {rubricRows.map((row, i) => (
                    <tr
                      key={row.criterion}
                      className={cn(
                        'border-b border-border/60 last:border-0 transition-colors hover:bg-muted/20',
                        i % 2 === 0 ? 'bg-background' : 'bg-muted/10'
                      )}
                    >
                      <td className="px-5 py-4 align-top">
                        <div className="flex items-start gap-1.5">
                          <span className="text-xs font-mono text-primary/50 shrink-0 mt-px">{String(i + 1).padStart(2, '0')}</span>
                          <span className="text-xs font-semibold text-foreground leading-snug">{row.criterion}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <p className="text-xs text-muted-foreground leading-relaxed">{row.referenceStandard}</p>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <Chip variant={row.candidateA} />
                      </td>
                      <td className="px-5 py-4 align-top">
                        <Chip variant={row.candidateB} />
                      </td>
                      <td className="px-5 py-4 align-top">
                        <p className="text-xs text-muted-foreground leading-relaxed">{row.note}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footnote */}
            <div className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed px-5 py-4 border-t border-border/60 bg-muted/10">
              <Info size={13} className="shrink-0 mt-px text-muted-foreground/60" />
              <p>Visual findings are based on rendered comparison. Structural findings require browser developer-tools inspection and are reported separately.</p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

// ── Evidence preview + lightbox ───────────────────────────────────────────────

const evidenceItems = [
  {
    label: 'REFERENCE', truth: true,
    shots: {
      desktop: 'reference-desktop-1440.jpg',
      tablet:  'reference-tablet-768.jpg',
      mobile:  'reference-mobile-375.jpg',
    },
  },
  {
    label: 'CANDIDATE A', truth: false,
    shots: {
      desktop: 'candidate-a-desktop-1440.jpg',
      tablet:  'candidate-a-tablet-768.jpg',
      mobile:  'candidate-a-mobile-375.jpg',
    },
  },
  {
    label: 'CANDIDATE B', truth: false,
    shots: {
      desktop: 'candidate-b-desktop-1440.jpg',
      tablet:  'candidate-b-tablet-768.jpg',
      mobile:  'candidate-b-mobile-375.jpg',
    },
  },
];

type Vp = 'desktop' | 'tablet' | 'mobile';

const vpConfig: { vp: Vp; label: string; Icon: typeof Monitor }[] = [
  { vp: 'desktop', label: 'Desktop 1440px', Icon: Monitor },
  { vp: 'tablet',  label: 'Tablet 768px',   Icon: Tablet },
  { vp: 'mobile',  label: 'Mobile 375px',   Icon: Smartphone },
];

function EvidenceStrip() {
  const [lightbox, setLightbox] = useState<{ idx: number; vp: Vp } | null>(null);
  const base = import.meta.env.BASE_URL;

  const src = (idx: number, vp: Vp) =>
    `${base}${evidenceItems[idx].shots[vp]}`;

  return (
    <>
      {/* ── Three-column thumbnails ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border">
        {evidenceItems.map((item, i) => (
          <button
            key={item.label}
            onClick={() => setLightbox({ idx: i, vp: 'desktop' })}
            className="bg-card flex flex-col gap-2 p-3 text-left hover:bg-muted/40 transition-colors group focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            aria-label={`Open ${item.label} screenshot viewer`}
          >
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-muted-foreground tracking-wider">{item.label}</span>
              <div className="flex items-center gap-1.5">
                {item.truth && (
                  <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-[9px]">TRUTH</span>
                )}
                <span className="text-muted-foreground/50 group-hover:text-primary transition-colors text-[9px] uppercase tracking-wider">
                  click to expand
                </span>
              </div>
            </div>
            <div className="rounded overflow-hidden border border-border/60 aspect-video bg-muted/20">
              <img
                src={src(i, 'desktop')}
                alt={`${item.label} desktop preview`}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </div>
          </button>
        ))}
      </div>

      {/* ── Lightbox modal ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${evidenceItems[lightbox.idx].label} screenshot viewer`}
          onClick={() => setLightbox(null)}
        >
          <div
            className="bg-card rounded-xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-border shrink-0">
              <div className="flex items-center gap-2 mr-auto">
                <span className="text-sm font-semibold text-foreground">
                  {evidenceItems[lightbox.idx].label}
                </span>
                {evidenceItems[lightbox.idx].truth && (
                  <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded border border-primary/20 font-semibold">
                    TRUTH
                  </span>
                )}
              </div>
              {/* Viewport tabs */}
              <div className="flex items-center gap-1 bg-muted rounded-md p-0.5">
                {vpConfig.map(({ vp, label, Icon }) => (
                  <button
                    key={vp}
                    onClick={() => setLightbox(prev => prev ? { ...prev, vp } : null)}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors',
                      lightbox.vp === vp
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                    aria-label={`View at ${label}`}
                    aria-pressed={lightbox.vp === vp}
                  >
                    <Icon size={12} />
                    <span className="hidden sm:inline">{label}</span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground ml-2"
                aria-label="Close screenshot viewer"
              >
                <X size={16} />
              </button>
            </div>
            {/* Image */}
            <div className="overflow-auto flex-1 bg-slate-100">
              <img
                src={src(lightbox.idx, lightbox.vp)}
                alt={`${evidenceItems[lightbox.idx].label} at ${lightbox.vp} width`}
                className="w-full block"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const tags = [
  'Visual fidelity',
  'Responsive QA',
  'Semantic HTML',
  'Accessibility',
  'CSS layout review',
];

const steps = [
  'Inspect the reference layout, typography, spacing, colour, assets, and component order.',
  'Compare both candidate reproductions at desktop width.',
  'Test responsive behaviour at desktop, tablet, and mobile viewport sizes.',
  'Inspect markup and layout approach for semantic landmarks, accessibility basics, CSS Grid/Flexbox use, overflow, and hardcoded positioning.',
  'Record prioritised, actionable findings and select the closest reproduction.',
];

const findings = [
  {
    severity: 'Medium',
    color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    dot: 'bg-amber-500',
    title: 'Tablet behaviour — reference ambiguity and Candidate A form clipping',
    tag: { label: 'Ambiguous reference behaviour', className: 'bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-400/30' },
    description:
      'At 768px, the reference and both candidates show horizontal scrolling. Candidate A differs because its booking-form controls extend beyond the visible content area.',
    recommendation:
      'Clarify the intended tablet breakpoint and overflow behaviour. If responsive reflow is required, replace fixed form widths with a breakpoint-driven CSS Grid layout.',
  },
  {
    severity: 'High',
    color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
    dot: 'bg-orange-500',
    title: 'Candidate A — Inconsistent spacing and card widths',
    description:
      'Candidate A has inconsistent spacing and incorrect card widths relative to the reference.',
    recommendation:
      'Use a consistent spacing scale and matching max-width container.',
  },
  {
    severity: 'Medium',
    color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    dot: 'bg-amber-500',
    title: 'Candidate B — Incorrect heading font weight',
    description:
      'Candidate B uses an incorrect heading font weight, reducing typography fidelity.',
    recommendation:
      'Match font weight and line-height to the reference specification.',
  },
  {
    severity: 'Medium',
    color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    dot: 'bg-amber-500',
    title: 'Candidate B — unnamed icon-only search button',
    category: 'Accessibility fundamentals',
    verified: true,
    description:
      'Browser DevTools inspection confirmed that the search submit button contains only an SVG marked aria-hidden=\'true\'. The parent button has no visible text, aria-label, aria-labelledby, or title attribute.',
    impact:
      'Screen-reader users encounter an unnamed button and cannot identify that it submits a search.',
    recommendation:
      'Add aria-label=\'Search\' to the button and retain aria-hidden=\'true\' on the decorative SVG icon.',
  },
];

const checklistItems = [
  'Box model and spacing',
  'Typography',
  'Colour and borders',
  'Images and assets',
  'Layout and overflow',
  'Responsive behaviour',
  'Semantic HTML',
  'Accessibility basics',
  'CSS Grid/Flexbox',
];

export default function Dashboard() {
  return (
    <div className="min-h-full">

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative border-b border-border bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
        </div>
        <div className="relative max-w-5xl mx-auto px-8 py-20 md:py-28">
          <div className="flex items-center gap-2 mb-6">
            <span className="h-px flex-1 max-w-8 bg-primary/40" />
            <span className="text-xs font-mono text-primary tracking-widest uppercase">Portfolio Case Study</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-tight mb-4">
            Web Fidelity Evaluation<br className="hidden md:block" /> Case Study
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-8">
            A structured visual and technical review of two candidate reproductions against a reference healthcare appointment interface.
          </p>
          <div className="flex flex-wrap gap-2 mb-10">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium border border-primary/20 bg-primary/5 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="#evidence-of-work"
              data-testid="button-view-assessment"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              View completed assessment <ArrowRight size={15} />
            </a>
            <a
              href="#final-decision"
              data-testid="button-view-report"
              className="inline-flex items-center gap-2 border border-border bg-background text-foreground px-5 py-2.5 rounded-md text-sm font-medium hover:bg-muted/50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              View final report
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-8 py-16 space-y-20">

        {/* ── Project summary ────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-xs font-mono uppercase tracking-widest text-primary mb-8">Project Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: 'Role', value: 'Frontend Quality Evaluator' },
              { label: 'Deliverable', value: 'Candidate comparison, quality review, ranked defect report, and final preference decision' },
              { label: 'Tools used', value: 'Browser DevTools, responsive viewport testing, HTML/CSS inspection, React, TypeScript, Tailwind CSS' },
              { label: 'Timeframe', value: 'Independent portfolio case study' },
              { label: 'Status', value: 'Completed', highlight: true },
            ].map((item) => (
              <div key={item.label} className="bg-card border border-border rounded-lg p-5">
                <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">{item.label}</p>
                <p className={`text-sm font-medium leading-snug ${item.highlight ? 'text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5' : 'text-foreground'}`}>
                  {item.highlight && <CheckCircle2 size={14} />}
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Assessment method ──────────────────────────────────────────────── */}
        <section>
          <h2 className="text-xs font-mono uppercase tracking-widest text-primary mb-8">Assessment Method</h2>
          <div className="space-y-3">
            {steps.map((step, i) => (
              <div
                key={i}
                data-testid={`step-${i + 1}`}
                className="flex gap-5 p-5 bg-card border border-border rounded-lg hover:border-primary/30 transition-colors group"
              >
                <div className="shrink-0 w-8 h-8 rounded-md bg-primary/10 text-primary text-sm font-bold font-mono flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {i + 1}
                </div>
                <p className="text-sm text-foreground leading-relaxed pt-1">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Evidence of work ───────────────────────────────────────────────── */}
        <section id="evidence-of-work">
          <h2 className="text-xs font-mono uppercase tracking-widest text-primary mb-8">Evidence of Work</h2>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <EvidenceStrip />

            {/* Results bar */}
            <div className="p-6 border-t border-border bg-muted/20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="flex items-center gap-4">
                  <ScoreRing score={84} size={72} strokeWidth={5} />
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">Fidelity Score</p>
                    <p className="text-2xl font-semibold text-foreground">84%</p>
                  </div>
                </div>
                <div className="h-12 w-px bg-border hidden sm:block" />
                <div className="flex-1">
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">Verdict</p>
                  <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                    Candidate B selected as the closer reproduction.
                  </p>
                </div>
                <div className="h-12 w-px bg-border hidden sm:block" />
                <div className="text-center">
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">Checklist</p>
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">{checklistItems.length}</span> criteria
                  </p>
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">4</span> findings
                  </p>
                </div>
              </div>
              {/* Compact checklist pills */}
              <div className="flex flex-wrap gap-1.5 mt-5 pt-5 border-t border-border/60">
                {checklistItems.map((item) => (
                  <span key={item} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border border-emerald-500/20 bg-emerald-500/5 text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 size={10} />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Evaluation rubric ──────────────────────────────────────────────── */}
        <section>
          <h2 className="text-xs font-mono uppercase tracking-widest text-primary mb-8">Evaluation Rubric</h2>
          <EvaluationRubric />
        </section>

        {/* ── Key findings ───────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-xs font-mono uppercase tracking-widest text-primary mb-8">Key Findings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {findings.map((f, i) => (
              <div
                key={i}
                data-testid={`finding-card-${i}`}
                className="bg-card border border-border rounded-lg p-5 flex flex-col gap-3"
              >
                {/* Header row: severity + optional category + optional verified badge */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${f.color}`}>
                    {f.severity}
                  </span>
                  {'tag' in f && f.tag && (
                    <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded border', f.tag.className)}>
                      {f.tag.label}
                    </span>
                  )}
                  {'category' in f && (
                    <span className="text-[10px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded border border-border">
                      {f.category}
                    </span>
                  )}
                  {'verified' in f && f.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-violet-700 dark:text-violet-400 bg-violet-500/10 border border-violet-400/30 px-2 py-0.5 rounded-full ml-auto">
                      <CheckCircle2 size={10} />
                      DevTools verified
                    </span>
                  )}
                </div>

                <p className="text-sm font-semibold text-foreground leading-snug">{f.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>

                {/* Optional impact field */}
                {'impact' in f && (
                  <div className="bg-amber-500/5 border border-amber-500/20 rounded-md px-3 py-2.5">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-0.5">Impact</p>
                    <p className="text-xs text-foreground leading-relaxed">{f.impact}</p>
                  </div>
                )}

                <div className="pt-2 border-t border-border/60">
                  <p className="text-xs font-mono text-muted-foreground mb-0.5">Recommendation</p>
                  <p className="text-xs text-foreground leading-relaxed">{f.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Final decision ─────────────────────────────────────────────────── */}
        <section id="final-decision" className="bg-primary/5 border border-primary/20 rounded-xl p-8">
          <h2 className="text-xs font-mono uppercase tracking-widest text-primary mb-5">Final Decision</h2>
          <p className="text-2xl font-semibold text-foreground mb-4 leading-snug">
            Candidate B is the closer reproduction.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            Candidate B matched the reference layout, spacing, visual hierarchy, and responsive structure more closely, while its remaining issues were lower impact and clearly fixable. Candidate A's defects — horizontal overflow, extreme border-radius, and inconsistent spacing — represented structural problems that would require significant remediation.
          </p>
        </section>

        {/* ── Technical reflection ───────────────────────────────────────────── */}
        <section>
          <h2 className="text-xs font-mono uppercase tracking-widest text-primary mb-5">Technical Reflection</h2>
          <blockquote className="border-l-2 border-primary pl-6">
            <p className="text-base text-foreground leading-relaxed italic">
              "This assessment demonstrates my ability to distinguish surface-level visual similarity from robust frontend implementation. I evaluated layout mechanics, responsive behaviour, semantic structure, accessibility basics, and the clarity of remediation recommendations."
            </p>
            <footer className="mt-3 text-sm font-medium text-muted-foreground not-italic">— Alim Bidmus</footer>
          </blockquote>
        </section>

        {/* ── CTA ────────────────────────────────────────────────────────────── */}
        <section className="border-t border-border pt-12">
          <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
            <a
              href="https://github.com/medvendorhub/Web-Fidelity-Evaluation-Case-Study"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-github"
              className="inline-flex items-center gap-2 border border-border bg-background text-foreground px-5 py-2.5 rounded-md text-sm font-medium hover:bg-muted/50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              <ExternalLink size={15} />
              View source code on GitHub
            </a>
            <Link
              href="/report"
              data-testid="link-download-report"
              className="inline-flex items-center gap-2 border border-border bg-background text-foreground px-5 py-2.5 rounded-md text-sm font-medium hover:bg-muted/50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary no-underline"
            >
              <Download size={15} />
              Download assessment report
            </Link>
            <a
              href="mailto:oladejibidmus@gmail.com"
              data-testid="link-contact"
              className="inline-flex items-center gap-2 border border-border bg-background text-foreground px-5 py-2.5 rounded-md text-sm font-medium hover:bg-muted/50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              <Mail size={15} />
              Contact me
            </a>
            <a
              href="https://www.linkedin.com/in/alim-bidmus-52aa0b73/"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-linkedin"
              className="inline-flex items-center gap-2 border border-border bg-background text-foreground px-5 py-2.5 rounded-md text-sm font-medium hover:bg-muted/50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              <Linkedin size={15} />
              Connect on LinkedIn
            </a>
          </div>
          <p className="mt-6 text-xs text-muted-foreground/70 leading-relaxed">
            Self-directed portfolio case study. All interfaces and assessment materials are demonstration assets.
          </p>
        </section>

      </div>
    </div>
  );
}

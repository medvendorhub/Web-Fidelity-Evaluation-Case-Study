import { Printer, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link } from 'wouter';
import { cn } from '@/lib/utils';

// ── Static report data ────────────────────────────────────────────────────────

const FINDINGS = [
  {
    ref: 'F-01',
    severity: 'High' as const,
    category: 'Layout, box model, and spacing',
    evidence: 'Candidate A has inconsistent section spacing and incorrect card widths relative to the reference, creating a misaligned visual rhythm throughout the page.',
    impact: 'A recruiter or user comparing the page against the reference will immediately notice the misaligned grid and section rhythm.',
    recommendation: 'Apply a consistent spacing scale and match the max-width container to the reference specification.',
  },
  {
    ref: 'F-02',
    severity: 'High' as const,
    category: 'Content order, z-order, and overflow',
    evidence: 'At 768px, Candidate A keeps the booking form in a two-column layout with a fixed min-width, causing horizontal overflow and preventing access to form fields.',
    impact: 'Tablet users cannot complete the booking form. The overflow also indicates a structural layout failure rather than a cosmetic one.',
    recommendation: 'Use responsive CSS Grid and collapse the form to a single column below 768px. Remove any fixed min-width from the form container.',
  },
  {
    ref: 'F-03',
    severity: 'Medium' as const,
    category: 'Typography and hierarchy',
    evidence: 'Candidate B applies font-weight: 400 (normal) to all headings throughout the page, instead of the reference\'s font-weight: 600/700. This affects h1, h2, h3, and card headings.',
    impact: 'Reduces visual hierarchy fidelity. The page reads as flatter than the reference, making it harder to scan.',
    recommendation: 'Match font-weight and line-height to the reference specification for each heading level.',
  },
  {
    ref: 'F-04',
    severity: 'Medium' as const,
    category: 'Accessibility fundamentals',
    evidence: 'Browser DevTools inspection confirmed that the search submit button in Candidate B contains only an SVG marked aria-hidden="true". The parent button has no visible text, aria-label, aria-labelledby, or title attribute.',
    impact: 'Screen-reader users encounter an unnamed button and cannot identify that it submits a search. Fails WCAG 2.1 SC 4.1.2.',
    recommendation: 'Add aria-label="Search" to the button and retain aria-hidden="true" on the decorative SVG icon.',
  },
];

const CHECKLIST = [
  { label: 'Layout, box model, and spacing',         candA: 'Deviation', candB: 'Partial' },
  { label: 'Typography and hierarchy',                candA: 'Deviation', candB: 'Partial' },
  { label: 'Colour, borders, and visual treatment',   candA: 'Deviation', candB: 'Match' },
  { label: 'Asset treatment and component geometry',  candA: 'Deviation', candB: 'Match' },
  { label: 'Content order, z-order, and overflow',    candA: 'Deviation', candB: 'Ambiguous' },
  { label: 'Responsive behaviour at 768px',           candA: 'Deviation', candB: 'Ambiguous' },
  { label: 'Semantic structure and landmarks',        candA: 'DevTools required', candB: 'DevTools required' },
  { label: 'Accessibility fundamentals',              candA: 'DevTools required', candB: 'DevTools required' },
  { label: 'CSS layout approach',                     candA: 'DevTools required', candB: 'DevTools required' },
];

const METHOD = [
  'Inspect the reference layout, typography, spacing, colour, assets, and component order.',
  'Compare both candidate reproductions at desktop width (1440px).',
  'Test responsive behaviour at tablet (768px) and mobile (375px) viewport sizes.',
  'Inspect markup for semantic landmarks, accessibility basics, CSS Grid/Flexbox usage, overflow, and hardcoded positioning.',
  'Record prioritised, actionable findings and select the closest reproduction.',
];

const severityClass: Record<string, string> = {
  High:   'bg-orange-500/10 text-orange-700 border-orange-500/20',
  Medium: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
};

const outcomeClass: Record<string, string> = {
  Match:             'text-emerald-700 font-semibold',
  Partial:           'text-amber-700',
  Deviation:         'text-orange-700 font-semibold',
  Ambiguous:         'text-sky-700',
  'DevTools required': 'text-violet-700',
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function Report() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Toolbar — hidden when printing */}
      <div className="print:hidden sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-8 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={15} /> Back to Case Study
        </Link>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-md text-sm font-semibold hover:bg-foreground/90 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          aria-label="Print or save this report as PDF"
        >
          <Printer size={15} />
          Print / Save as PDF
        </button>
      </div>

      {/* Report body */}
      <div className="max-w-[794px] mx-auto px-8 py-12 print:px-0 print:py-8 space-y-12">

        {/* ── Cover ── */}
        <header className="border-b border-border pb-10">
          <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">Portfolio Case Study · Assessment Report</p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Web Fidelity Evaluation Case Study</h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
            A structured visual and technical review of two candidate reproductions against a reference healthcare appointment-booking interface.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span><span className="font-semibold text-foreground">Evaluator:</span> Alim Bidmus</span>
            <span><span className="font-semibold text-foreground">Status:</span> Completed</span>
            <span><span className="font-semibold text-foreground">Verdict:</span> Candidate B selected</span>
          </div>
        </header>

        {/* ── Purpose ── */}
        <section>
          <h2 className="text-xs font-mono uppercase tracking-widest text-primary mb-4">Assessment Purpose</h2>
          <p className="text-sm text-foreground leading-relaxed max-w-2xl">
            To evaluate two independently produced reproductions of a reference healthcare appointment page and identify which candidate more accurately replicates the original's visual design, responsive behaviour, semantic structure, and accessibility fundamentals. The assessment produces prioritised findings and a documented preference decision.
          </p>
        </section>

        {/* ── Method ── */}
        <section>
          <h2 className="text-xs font-mono uppercase tracking-widest text-primary mb-4">Method</h2>
          <ol className="space-y-3">
            {METHOD.map((step, i) => (
              <li key={i} className="flex items-start gap-4 text-sm">
                <span className="shrink-0 w-6 h-6 rounded bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-px">{i + 1}</span>
                <span className="text-foreground leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Evaluation rubric summary ── */}
        <section className="page-break-inside-avoid">
          <h2 className="text-xs font-mono uppercase tracking-widest text-primary mb-4">Evaluation Rubric Summary</h2>
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse min-w-[540px]">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="text-left text-xs font-mono uppercase tracking-wider text-muted-foreground px-4 py-3">Criterion</th>
                    <th className="text-left text-xs font-mono uppercase tracking-wider text-muted-foreground px-4 py-3 w-32">Candidate A</th>
                    <th className="text-left text-xs font-mono uppercase tracking-wider text-muted-foreground px-4 py-3 w-32">Candidate B</th>
                  </tr>
                </thead>
                <tbody>
                  {CHECKLIST.map((row, i) => (
                    <tr key={row.label} className={cn('border-b border-border/60 last:border-0', i % 2 === 0 ? 'bg-background' : 'bg-muted/10')}>
                      <td className="px-4 py-3 text-xs font-medium text-foreground">{row.label}</td>
                      <td className={cn('px-4 py-3 text-xs', outcomeClass[row.candA])}>{row.candA}</td>
                      <td className={cn('px-4 py-3 text-xs', outcomeClass[row.candB])}>{row.candB}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
            Visual findings based on rendered comparison. Structural findings require browser DevTools inspection.
          </p>
        </section>

        {/* ── Documented findings ── */}
        <section>
          <h2 className="text-xs font-mono uppercase tracking-widest text-primary mb-5">Documented Findings</h2>
          <div className="space-y-5">
            {FINDINGS.map((f) => (
              <div key={f.ref} className="border border-border rounded-lg overflow-hidden page-break-inside-avoid">
                <div className="bg-muted/40 px-5 py-3 border-b border-border flex items-center gap-3">
                  <span className="text-xs font-bold font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{f.ref}</span>
                  <span className={cn('text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border', severityClass[f.severity])}>
                    {f.severity}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground ml-auto">{f.category}</span>
                </div>
                <div className="p-5 grid md:grid-cols-3 gap-5 bg-card">
                  <div className="md:col-span-2 space-y-3">
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">Evidence</p>
                      <p className="text-sm text-foreground leading-relaxed">{f.evidence}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-1">Impact</p>
                      <p className="text-sm text-foreground/80 leading-relaxed">{f.impact}</p>
                    </div>
                  </div>
                  <div className="bg-primary/5 rounded-md border border-primary/15 p-4">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-primary mb-2">Recommendation</p>
                    <p className="text-xs text-foreground leading-relaxed">{f.recommendation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Final decision ── */}
        <section className="bg-primary/5 border border-primary/20 rounded-xl p-7 page-break-inside-avoid">
          <h2 className="text-xs font-mono uppercase tracking-widest text-primary mb-4">Final Decision</h2>
          <p className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
            Candidate B — closer reproduction
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
            Candidate B matched the reference layout, spacing, visual hierarchy, and responsive structure more closely. Its remaining defects — incorrect font weight, a minor grid gap, and one unlabelled icon button — are lower-impact and clearly remediable. Candidate A's defects — horizontal form overflow at tablet, global 9999px border-radius, and inconsistent spacing — represent structural problems requiring significant remediation.
          </p>
          <dl className="grid grid-cols-3 gap-4 mt-5 pt-5 border-t border-primary/15 text-sm">
            <div>
              <dt className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-0.5">Confidence</dt>
              <dd className="font-semibold text-foreground">High</dd>
            </div>
            <div>
              <dt className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-0.5">Findings</dt>
              <dd className="font-semibold text-foreground">4 documented</dd>
            </div>
            <div>
              <dt className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-0.5">Checklist criteria</dt>
              <dd className="font-semibold text-foreground">9 assessed</dd>
            </div>
          </dl>
        </section>

        {/* ── Technical reflection ── */}
        <section>
          <h2 className="text-xs font-mono uppercase tracking-widest text-primary mb-4">Technical Reflection</h2>
          <blockquote className="border-l-2 border-primary pl-6">
            <p className="text-base italic text-foreground leading-relaxed">
              "This assessment demonstrates my ability to distinguish surface-level visual similarity from robust frontend implementation. I evaluated layout mechanics, responsive behaviour, semantic structure, accessibility basics, and the clarity of remediation recommendations."
            </p>
            <footer className="mt-3 text-sm font-medium text-muted-foreground not-italic">— Alim Bidmus</footer>
          </blockquote>
        </section>

        {/* ── Disclosure ── */}
        <section className="border-t border-border pt-8 text-xs text-muted-foreground/70">
          Self-directed portfolio case study. All interfaces and assessment materials are demonstration assets.
        </section>

      </div>
    </div>
  );
}

import { cn } from '@/lib/utils';
import { Check, Minus, X, CheckCircle2, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { ScoreRing } from './ScoreRing';
import { Link } from 'wouter';

type ChecklistResult = 'Pass' | 'Partial' | 'Fail';

interface ChecklistEntry {
  label: string;
  result: ChecklistResult;
  rationale: string;
}

interface StaticFinding {
  id: string;
  ref: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  category: string;
  evidence: string;
  recommendation: string;
}

const CHECKLIST: ChecklistEntry[] = [
  {
    label: 'Box model and spacing',
    result: 'Partial',
    rationale: 'Candidate B matched container widths; minor inter-element spacing inconsistencies noted against the reference.',
  },
  {
    label: 'Typography',
    result: 'Partial',
    rationale: 'Body text and line-height matched. Heading font weight in Candidate B was 400 instead of the reference 600.',
  },
  {
    label: 'Colour and borders',
    result: 'Pass',
    rationale: 'Both candidates matched the reference colour palette and border styles within acceptable tolerance.',
  },
  {
    label: 'Images and asset treatment',
    result: 'Pass',
    rationale: 'Asset dimensions and placeholder treatment were consistent with the reference at all tested viewport sizes.',
  },
  {
    label: 'Layout order and overflow',
    result: 'Fail',
    rationale: 'Candidate A produces horizontal overflow at tablet width due to fixed-width form columns — a structural layout failure.',
  },
  {
    label: 'Responsive behaviour',
    result: 'Partial',
    rationale: 'Candidate A fails at 768px with overflow. Candidate B mostly responsive but one card wraps incorrectly at the tablet breakpoint.',
  },
  {
    label: 'Semantic HTML and landmarks',
    result: 'Pass',
    rationale: 'Both candidates use correct landmark elements, heading hierarchy, and form labelling structures.',
  },
  {
    label: 'Accessibility basics',
    result: 'Partial',
    rationale: 'Candidate B contains one icon-only button without an accessible label, failing WCAG 2.1 SC 4.1.2.',
  },
  {
    label: 'CSS approach: Grid/Flexbox',
    result: 'Pass',
    rationale: 'Both candidates use CSS Grid and Flexbox appropriately. No inappropriate absolute positioning found.',
  },
];

const FINDINGS: StaticFinding[] = [
  {
    id: 'f-01',
    ref: 'F-01',
    severity: 'High',
    category: 'Responsive behaviour',
    evidence: 'At tablet width (768px), Candidate A keeps the booking form in two columns, creating horizontal overflow and preventing users from accessing all fields.',
    recommendation: 'Use responsive CSS Grid and collapse to one column below 768px.',
  },
  {
    id: 'f-02',
    ref: 'F-02',
    severity: 'High',
    category: 'Box model and spacing',
    evidence: 'Candidate A has inconsistent spacing between sections and incorrect card widths relative to the reference, creating a misaligned visual rhythm.',
    recommendation: 'Apply a consistent spacing scale and match max-width container to the reference.',
  },
  {
    id: 'f-03',
    ref: 'F-03',
    severity: 'Medium',
    category: 'Typography',
    evidence: 'Candidate B uses an incorrect heading font weight (400 instead of 600), reducing visual hierarchy fidelity compared to the reference.',
    recommendation: 'Match font-weight and line-height to the reference specification.',
  },
  {
    id: 'f-04',
    ref: 'F-04',
    severity: 'Medium',
    category: 'Accessibility basics',
    evidence: 'Candidate B contains an icon-only control in the booking form without an accessible name, failing WCAG 2.1 SC 4.1.2.',
    recommendation: 'Add an aria-label that describes the button\'s purpose to assistive technology users.',
  },
];

const resultConfig: Record<ChecklistResult, { label: string; icon: typeof Check; className: string; bg: string }> = {
  Pass: {
    label: 'Pass',
    icon: Check,
    className: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
  },
  Partial: {
    label: 'Partial',
    icon: Minus,
    className: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
  },
  Fail: {
    label: 'Fail',
    icon: X,
    className: 'text-destructive',
    bg: 'bg-destructive/10 border-destructive/20',
  },
};

const severityConfig: Record<StaticFinding['severity'], string> = {
  Critical: 'bg-destructive/10 text-destructive border-destructive/20',
  High: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
  Medium: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  Low: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
};

function ChecklistRow({ entry }: { entry: ChecklistEntry }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = resultConfig[entry.result];
  const Icon = cfg.icon;
  return (
    <div className="rounded-md border border-border bg-card overflow-hidden">
      <button
        className="w-full flex items-center justify-between p-2.5 text-left hover:bg-muted/30 transition-colors group"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        data-testid={`checklist-row-${entry.label}`}
      >
        <span className="text-sm font-medium text-foreground">{entry.label}</span>
        <div className="flex items-center gap-2">
          <span className={cn('text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded border flex items-center gap-1', cfg.bg, cfg.className)}>
            <Icon size={10} /> {cfg.label}
          </span>
          <ChevronDown size={13} className={cn('text-muted-foreground transition-transform', expanded && 'rotate-180')} />
        </div>
      </button>
      {expanded && (
        <div className="px-3 pb-3 pt-1 border-t border-border/60 bg-muted/20">
          <p className="text-xs text-muted-foreground leading-relaxed">{entry.rationale}</p>
        </div>
      )}
    </div>
  );
}

export function EvaluationPanel() {
  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">

      {/* Final Preference Header */}
      <div className="p-5 border-b border-border bg-card shrink-0">
        <div className="flex gap-5 items-center">
          <ScoreRing score={84} size={80} strokeWidth={5} />
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">Final Preference</p>
            <p className="text-sm font-semibold text-foreground leading-tight flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
              Candidate B — closer reproduction
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Confidence: High</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed mt-4 border-t border-border/60 pt-3">
          Candidate B more closely matched the reference layout, spacing, visual hierarchy, and responsive structure. Its remaining issues were lower impact and remediable.
        </p>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-7">

        {/* Static Checklist */}
        <section>
          <h3 className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">
            Fidelity Checklist
          </h3>
          <div className="space-y-1.5">
            {CHECKLIST.map((entry) => (
              <ChecklistRow key={entry.label} entry={entry} />
            ))}
          </div>
        </section>

        {/* Static Findings */}
        <section>
          <h3 className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">
            Documented Findings
          </h3>
          <div className="space-y-3">
            {FINDINGS.map((f) => (
              <div
                key={f.id}
                data-testid={`finding-card-${f.id}`}
                className="p-3 border border-border bg-card rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                    {f.ref}
                  </span>
                  <span className={cn(
                    'text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded border',
                    severityConfig[f.severity]
                  )}>
                    {f.severity}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">{f.category}</span>
                </div>
                <p className="text-sm font-medium text-foreground mb-2 leading-snug">{f.evidence}</p>
                <div className="border-t border-border/60 pt-2">
                  <p className="text-[11px] font-mono text-muted-foreground mb-0.5">Recommendation</p>
                  <p className="text-xs text-foreground leading-snug">{f.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Static footer */}
      <div className="shrink-0 border-t border-border bg-muted/20">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
            <span className="text-sm font-semibold text-foreground">Assessment completed</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            4 findings documented · Candidate B selected ·{' '}
            <Link href="/report" className="text-primary hover:underline">Report available below</Link>
          </p>
        </div>
        <div className="px-4 pb-4">
          <p className="text-[10px] text-muted-foreground/60 leading-relaxed border-t border-border/40 pt-3">
            Self-directed portfolio assessment. Reference and candidate interfaces are demonstration materials.
          </p>
        </div>
      </div>

    </div>
  );
}

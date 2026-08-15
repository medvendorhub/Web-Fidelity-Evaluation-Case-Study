import React, { createContext, useContext, useState } from 'react';

export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';
export type Category = 
  | 'Box model and spacing'
  | 'Typography'
  | 'Colour and borders'
  | 'Images and asset treatment'
  | 'Layout order and overflow'
  | 'Responsive behaviour'
  | 'Semantic HTML and landmarks'
  | 'Accessibility basics'
  | 'CSS approach';

export type ChecklistState = 'Pass' | 'Fail' | 'Needs Review';

export interface Finding {
  id: string;
  severity: Severity;
  category: Category;
  evidence: string;
  impact: string;
  recommendation: string;
}

export type Candidate = 'A' | 'B' | null;

interface ReviewContextType {
  checklist: Record<Category, ChecklistState>;
  findings: Finding[];
  closerCandidate: Candidate;
  verdictSubmitted: boolean;
  setChecklistItem: (category: Category, state: ChecklistState) => void;
  addFinding: (finding: Omit<Finding, 'id'>) => void;
  updateFinding: (id: string, finding: Omit<Finding, 'id'>) => void;
  deleteFinding: (id: string) => void;
  setCloserCandidate: (candidate: Candidate) => void;
  setVerdictSubmitted: (submitted: boolean) => void;
  reset: () => void;
}

const defaultChecklist: Record<Category, ChecklistState> = {
  'Box model and spacing': 'Needs Review',
  'Typography': 'Needs Review',
  'Colour and borders': 'Needs Review',
  'Images and asset treatment': 'Needs Review',
  'Layout order and overflow': 'Needs Review',
  'Responsive behaviour': 'Needs Review',
  'Semantic HTML and landmarks': 'Needs Review',
  'Accessibility basics': 'Needs Review',
  'CSS approach': 'Needs Review',
};

const initialFindings: Finding[] = [
  {
    id: 'f1',
    severity: 'High',
    category: 'Responsive behaviour',
    evidence: 'At tablet width (768px), the booking form stays in a two-column layout and forces horizontal scrolling.',
    impact: 'Users on tablets cannot access the full form without horizontal scrolling, making booking difficult.',
    recommendation: 'Use CSS Grid with a one-column breakpoint at max-width: 768px.'
  },
  {
    id: 'f2',
    severity: 'Medium',
    category: 'Colour and borders',
    evidence: 'Candidate A uses border-radius: 9999px on doctor profile cards, creating an oval shape that distorts layout.',
    impact: 'Inconsistent visual language with the reference.',
    recommendation: 'Change to the subtle 8px border radius used in the reference.'
  },
  {
    id: 'f3',
    severity: 'Critical',
    category: 'Accessibility basics',
    evidence: 'The appointment form submit button in Candidate B is icon-only with no accessible label.',
    impact: 'Screen reader users do not know what the button does, failing WCAG 2.1 SC 4.1.2.',
    recommendation: 'Add an aria-label to the button or visible sr-only text.'
  },
  {
    id: 'f4',
    severity: 'Low',
    category: 'Typography',
    evidence: 'Heading font weight in Candidate B is 400 (regular) instead of 600 (semibold).',
    impact: 'Creates lower visual hierarchy than the reference.',
    recommendation: 'Update heading classes to include font-semibold.'
  }
];

const ReviewContext = createContext<ReviewContextType | null>(null);

export function ReviewProvider({ children }: { children: React.ReactNode }) {
  const [checklist, setChecklist] = useState<Record<Category, ChecklistState>>(defaultChecklist);
  const [findings, setFindings] = useState<Finding[]>(initialFindings);
  const [closerCandidate, setCloserCandidate] = useState<Candidate>(null);
  const [verdictSubmitted, setVerdictSubmitted] = useState(false);

  const setChecklistItem = (category: Category, state: ChecklistState) => {
    setChecklist(prev => ({ ...prev, [category]: state }));
  };

  const addFinding = (finding: Omit<Finding, 'id'>) => {
    setFindings(prev => [...prev, { ...finding, id: Math.random().toString(36).substring(2, 9) }]);
  };

  const updateFinding = (id: string, updated: Omit<Finding, 'id'>) => {
    setFindings(prev => prev.map(f => f.id === id ? { ...updated, id } : f));
  };

  const deleteFinding = (id: string) => {
    setFindings(prev => prev.filter(f => f.id !== id));
  };

  const reset = () => {
    setChecklist(defaultChecklist);
    setFindings(initialFindings);
    setCloserCandidate(null);
    setVerdictSubmitted(false);
  };

  return (
    <ReviewContext.Provider value={{
      checklist,
      findings,
      closerCandidate,
      verdictSubmitted,
      setChecklistItem,
      addFinding,
      updateFinding,
      deleteFinding,
      setCloserCandidate,
      setVerdictSubmitted,
      reset
    }}>
      {children}
    </ReviewContext.Provider>
  );
}

export function useReview() {
  const ctx = useContext(ReviewContext);
  if (!ctx) throw new Error('useReview must be used within ReviewProvider');
  return ctx;
}

import { useState, useEffect } from 'react';
import { DeviceSwitcher } from '@/components/workspace/DeviceSwitcher';
import { PreviewFrame } from '@/components/workspace/PreviewFrame';
import { EvaluationPanel } from '@/components/workspace/EvaluationPanel';
import { cn } from '@/lib/utils';

export default function ReviewWorkspace() {
  const [deviceA, setDeviceA] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [deviceB, setDeviceB] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [deviceRef, setDeviceRef] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const [activeTab, setActiveTab] = useState<'ref' | 'A' | 'B'>('ref');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="h-full flex flex-col xl:flex-row overflow-hidden">

      {/* Previews Area */}
      <div className="flex-1 flex flex-col bg-muted/10 h-full overflow-hidden">

        {/* Page heading */}
        <div className="px-5 py-4 border-b border-border bg-background shrink-0">
          <h1 className="text-lg font-semibold tracking-tight text-foreground">Completed Comparison Assessment</h1>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed max-w-2xl">
            Reference and candidate reproductions were reviewed at desktop, tablet, and mobile widths. Findings reflect visual comparison, responsive testing, and browser developer-tools inspection.
          </p>
        </div>

        {/* Comparison bar */}
        <div className="h-11 border-b border-border bg-background flex items-center justify-between px-4 shrink-0">
          <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
            Desktop Comparison Evidence
          </h2>

          {isMobile && (
            <div className="flex bg-muted p-1 rounded-md">
              <button onClick={() => setActiveTab('ref')} className={cn("px-3 py-1 text-xs font-medium rounded-sm transition-colors", activeTab === 'ref' ? "bg-background shadow-sm" : "text-muted-foreground")}>Ref</button>
              <button onClick={() => setActiveTab('A')} className={cn("px-3 py-1 text-xs font-medium rounded-sm transition-colors", activeTab === 'A' ? "bg-background shadow-sm" : "text-muted-foreground")}>Cand A</button>
              <button onClick={() => setActiveTab('B')} className={cn("px-3 py-1 text-xs font-medium rounded-sm transition-colors", activeTab === 'B' ? "bg-background shadow-sm" : "text-muted-foreground")}>Cand B</button>
            </div>
          )}
        </div>

        {/* 3 Columns */}
        <div className="flex-1 flex flex-col lg:grid lg:grid-cols-3 lg:divide-x divide-border overflow-hidden">

          {/* Reference Column */}
          <div className={cn("flex flex-col h-full overflow-hidden bg-dot-pattern", isMobile && activeTab !== 'ref' ? 'hidden' : 'block')}>
            <div className="h-10 border-b border-border bg-card/80 backdrop-blur flex justify-between items-center px-3 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider font-semibold text-primary">Reference</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-primary/10 text-primary border border-primary/20 hidden sm:inline-block">TRUTH</span>
              </div>
              <DeviceSwitcher device={deviceRef} onChange={setDeviceRef} />
            </div>
            <div className="flex-1 p-4 overflow-auto flex justify-center items-start">
              <PreviewFrame device={deviceRef} variant="reference" />
            </div>
          </div>

          {/* Candidate A */}
          <div className={cn("flex flex-col h-full overflow-hidden bg-dot-pattern", isMobile && activeTab !== 'A' ? 'hidden' : 'block')}>
            <div className="h-10 border-b border-border bg-card/80 backdrop-blur flex justify-between items-center px-3 shrink-0">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold text-foreground">Candidate A</span>
              <DeviceSwitcher device={deviceA} onChange={setDeviceA} />
            </div>
            <div className="flex-1 p-4 overflow-auto flex justify-center items-start">
              <PreviewFrame device={deviceA} variant="candidateA" />
            </div>
          </div>

          {/* Candidate B */}
          <div className={cn("flex flex-col h-full overflow-hidden bg-dot-pattern", isMobile && activeTab !== 'B' ? 'hidden' : 'block')}>
            <div className="h-10 border-b border-border bg-card/80 backdrop-blur flex justify-between items-center px-3 shrink-0">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold text-foreground">Candidate B</span>
              <DeviceSwitcher device={deviceB} onChange={setDeviceB} />
            </div>
            <div className="flex-1 p-4 overflow-auto flex justify-center items-start">
              <PreviewFrame device={deviceB} variant="candidateB" />
            </div>
          </div>

        </div>
      </div>

      {/* Assessment Record Panel — right side on large screens, bottom on smaller */}
      <div className="w-full xl:w-[400px] border-t xl:border-t-0 xl:border-l border-border bg-background shrink-0 flex flex-col h-[50vh] xl:h-full xl:max-h-screen overflow-hidden shadow-2xl z-10">
        <EvaluationPanel />
      </div>
    </div>
  );
}

import { Moon, Sun, MonitorSmartphone } from 'lucide-react';
import { useTheme } from '../theme-provider';
import { useLocation } from 'wouter';

export function Topbar() {
  const { theme, setTheme } = useTheme();
  const [location] = useLocation();

  const getBreadcrumb = () => {
    if (location === '/') return 'Case Study';
    if (location.startsWith('/review')) return 'Case Study / Assessment Evidence / Healthcare Appointment Form';
    if (location.startsWith('/report')) return 'Completed Evaluation Report';
    return location.substring(1);
  };

  return (
    <header className="h-14 border-b border-border bg-background flex items-center justify-between px-4 sticky top-0 z-20 no-print">
      <div className="flex items-center gap-2 min-w-0">
        <MonitorSmartphone size={16} className="text-primary/70 shrink-0" />
        <span className="text-foreground/80 font-mono tracking-tight text-xs uppercase truncate">{getBreadcrumb()}</span>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <div className="flex items-center rounded-md border border-border p-0.5 bg-muted/20">
          <button
            data-testid="button-theme-light"
            onClick={() => setTheme('light')}
            className={`p-1.5 rounded-sm transition-colors ${theme === 'light' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            aria-label="Light mode"
          >
            <Sun size={14} />
          </button>
          <button
            data-testid="button-theme-dark"
            onClick={() => setTheme('dark')}
            className={`p-1.5 rounded-sm transition-colors ${theme === 'dark' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            aria-label="Dark mode"
          >
            <Moon size={14} />
          </button>
        </div>

        <div
          className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs"
          aria-label="Alim Bidmus"
        >
          AB
        </div>
      </div>
    </header>
  );
}

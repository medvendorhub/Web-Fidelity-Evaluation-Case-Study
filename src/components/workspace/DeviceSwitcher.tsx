import { Monitor, Tablet, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

type Device = 'desktop' | 'tablet' | 'mobile';

interface DeviceSwitcherProps {
  device: Device;
  onChange: (device: Device) => void;
}

export function DeviceSwitcher({ device, onChange }: DeviceSwitcherProps) {
  return (
    <div className="flex bg-muted/50 p-0.5 rounded-md border border-border/50">
      <button
        data-testid="device-desktop"
        onClick={() => onChange('desktop')}
        className={cn(
          "p-1 rounded-sm flex items-center justify-center transition-colors",
          device === 'desktop' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
        )}
        title="Desktop (1024px)"
      >
        <Monitor size={14} />
      </button>
      <button
        data-testid="device-tablet"
        onClick={() => onChange('tablet')}
        className={cn(
          "p-1 rounded-sm flex items-center justify-center transition-colors",
          device === 'tablet' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
        )}
        title="Tablet (768px)"
      >
        <Tablet size={14} />
      </button>
      <button
        data-testid="device-mobile"
        onClick={() => onChange('mobile')}
        className={cn(
          "p-1 rounded-sm flex items-center justify-center transition-colors",
          device === 'mobile' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
        )}
        title="Mobile (375px)"
      >
        <Smartphone size={14} />
      </button>
    </div>
  );
}

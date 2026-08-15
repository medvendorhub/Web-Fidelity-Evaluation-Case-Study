import { useState } from 'react';
import { Monitor, Tablet, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

export type DeviceWidth = 1440 | 768 | 375;

interface DeviceBarProps {
  active: DeviceWidth;
  onChange: (w: DeviceWidth) => void;
  label: string;
}

const devices: { width: DeviceWidth; label: string; sublabel: string; Icon: typeof Monitor }[] = [
  { width: 1440, label: 'Desktop', sublabel: '1440px', Icon: Monitor },
  { width: 768,  label: 'Tablet',  sublabel: '768px',  Icon: Tablet },
  { width: 375,  label: 'Mobile',  sublabel: '375px',  Icon: Smartphone },
];

export function DeviceBar({ active, onChange, label }: DeviceBarProps) {
  return (
    <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-700 px-4 py-2 flex items-center justify-between gap-4">
      <span className="text-slate-400 text-xs font-mono truncate max-w-xs">{label}</span>
      <div className="flex items-center gap-1 shrink-0">
        {devices.map(({ width, label: dl, sublabel, Icon }) => (
          <button
            key={width}
            data-testid={`device-btn-${width}`}
            onClick={() => onChange(width)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors',
              active === width
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            )}
            aria-label={`${dl} view — ${sublabel}`}
          >
            <Icon size={13} />
            <span className="hidden sm:inline">{dl}</span>
            <span className="text-[10px] opacity-70">{sublabel}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/** Wraps page content and constrains it to the active device width. */
export function DeviceViewport({
  width,
  children,
}: {
  width: DeviceWidth;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-200 min-h-screen">
      <div
        style={{ width: `${width}px`, maxWidth: '100%' }}
        className="mx-auto bg-white min-h-screen shadow-2xl overflow-x-auto"
      >
        {children}
      </div>
    </div>
  );
}

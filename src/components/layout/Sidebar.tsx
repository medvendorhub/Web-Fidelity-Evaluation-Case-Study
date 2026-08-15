import { Home, FileSearch, FileText, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { path: '/', label: 'Case Study', icon: Home },
    { path: '/review', label: 'Assessment Evidence', icon: FileSearch },
    { path: '/report', label: 'Evaluation Report', icon: FileText },
  ];

  return (
    <div className={cn(
      "h-screen border-r border-border bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300 no-print",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 border-b border-border flex items-center justify-between gap-2">
        {!collapsed && (
          <div className="min-w-0">
            <p className="font-semibold text-sm tracking-tight text-sidebar-foreground truncate">Alim Bidmus</p>
            <p className="text-[11px] text-sidebar-foreground/50 font-mono truncate">Frontend Assessment</p>
          </div>
        )}
        <button
          data-testid="button-toggle-sidebar"
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground/60 transition-colors shrink-0"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = location === item.path || (item.path !== '/' && location.startsWith(item.path));
          return (
            <Link key={item.path} href={item.path} className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            )}>
              <item.icon size={18} className={cn("shrink-0", active ? "text-sidebar-primary" : "")} />
              {!collapsed && <span className="text-sm truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="p-4 border-t border-border">
          <p className="text-[10px] font-mono text-sidebar-foreground/40 uppercase tracking-widest">Portfolio 2025</p>
        </div>
      )}
    </div>
  );
}

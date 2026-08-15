import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { ReactNode } from 'react';

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden text-foreground">
      <Sidebar />
      <div className="flex flex-col flex-1 h-screen min-w-0">
        <Topbar />
        <main className="flex-1 overflow-auto bg-background/50 relative">
          {children}
        </main>
      </div>
    </div>
  );
}

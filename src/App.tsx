import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';
import { ThemeProvider } from '@/components/theme-provider';
import { ReviewProvider } from '@/context/ReviewContext';
import { AppLayout } from '@/components/layout/AppLayout';

// Portfolio pages (with sidebar + topbar)
import Dashboard from '@/pages/Dashboard';
import ReviewWorkspace from '@/pages/ReviewWorkspace';
import Report from '@/pages/Report';

// Standalone evidence pages (no sidebar/topbar)
import ReferencePage from '@/pages/ReferencePage';
import CandidateAPage from '@/pages/CandidateAPage';
import CandidateBPage from '@/pages/CandidateBPage';

const queryClient = new QueryClient();

const STANDALONE_PATHS = ['/reference', '/candidate-a', '/candidate-b', '/report'];

function Router() {
  const [location] = useLocation();
  const isStandalone = STANDALONE_PATHS.some(p => location === p || location.startsWith(p + '/'));

  if (isStandalone) {
    return (
      <RoutedErrorBoundary>
        <Switch>
          <Route path="/reference"   component={ReferencePage} />
          <Route path="/candidate-a" component={CandidateAPage} />
          <Route path="/candidate-b" component={CandidateBPage} />
          <Route path="/report"      component={Report} />
          <Route component={NotFound} />
        </Switch>
      </RoutedErrorBoundary>
    );
  }

  return (
    <AppLayout>
      <RoutedErrorBoundary>
        <Switch>
          <Route path="/"       component={Dashboard} />
          <Route path="/review" component={ReviewWorkspace} />
          <Route path="/report" component={Report} />
          <Route component={NotFound} />
        </Switch>
      </RoutedErrorBoundary>
    </AppLayout>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <ReviewProvider>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
              <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </ReviewProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;

import { createRouter } from '@tanstack/react-router';
import { Loader } from '@/components/ui/loaders/loader';
import { routeTree } from '@/routeTree.gen';

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultPendingComponent: Loader,
  // TODO : defaultErrorComponent, defaultNotFoundComponent
});

// register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

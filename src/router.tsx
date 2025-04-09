import { Loader } from '@/components/loader';
import { queryClient } from '@/query-client';
import { routeTree } from '@/routeTree.gen';
import { createRouter } from '@tanstack/react-router';

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
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

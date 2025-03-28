import { routeTree } from '@/routeTree.gen';
import { createRouter } from '@tanstack/react-router';

export const router = createRouter({ routeTree });

// register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Navbar } from '@/components/ui/navigations/navbar';

export const Route = createRootRouteWithContext()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  );
}

import { router } from '@/router';
import { RouterProvider } from '@tanstack/react-router';

export const App = () => {
  return <RouterProvider router={router} />;
};

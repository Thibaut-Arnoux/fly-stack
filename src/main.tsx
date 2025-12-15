import { RouterProvider } from '@tanstack/react-router';
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router';
import { StrictMode } from 'react';
import './style.css';
import { createRoot } from 'react-dom/client';
import { router } from '@/router';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <NuqsAdapter>
      <RouterProvider router={router} />
    </NuqsAdapter>
  </StrictMode>,
);

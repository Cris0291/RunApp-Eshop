import AppLayout from '@/ui/AppLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './Homepage';
import Store from './Store';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/store',
        element: <Store />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}

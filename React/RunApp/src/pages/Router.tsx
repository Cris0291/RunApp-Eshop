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
        children: [
          {
            path: 'hot-sales',
          },
        ],
      },
      {
        path: '/login',
      },
      {
        path: '/register',
      },
      {
        path: '/runWorld',
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}

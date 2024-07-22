import AppLayout from '@/ui/AppLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './Homepage';


const router = createBrowserRouter([
  {
    element: <AppLayout/>,
    children: [
      {
        path: "/",
        element: <HomePage/>
      }
    ]
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}

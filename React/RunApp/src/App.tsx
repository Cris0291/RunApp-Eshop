import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import HomePage from "./pages/HomePage";
import StoreProvider from "./utils/StoreProvider";
import ReactQueryProvider from "./utils/ReactQueryProvider";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductsPage from "./pages/ProductsPage";
import { AuthProvider } from "./utils/AuhtProvider";
import PrivateRoute from "./utils/PrivateRoute";
import { GlobalProvider } from "./utils/GlobalProvider";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import UserProfilePage from "./pages/UserProfilePage";
import CreationCenterPage from "./pages/CreationCenterPage";

let router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/products",
    element: <Outlet />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <ProductsPage />
          </PrivateRoute>
        ),
      },
      {
        path: ":productId",
        element: (
          <PrivateRoute>
            <ProductPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/orders/cart",
    element: (
      <PrivateRoute>
        <CartPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/orders/checkout",
    element: (
      <PrivateRoute>
        <OrderPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/userprofile",
    element: <UserProfilePage />,
  },
  {
    path: "/userprofile/creationcenter",
    element: <CreationCenterPage />,
  },
]);

function App() {
  return (
    <StoreProvider>
      <AuthProvider>
        <GlobalProvider>
          <ReactQueryProvider>
            <RouterProvider router={router} />
            <Toaster
              position="top-center"
              gutter={12}
              containerStyle={{ margin: "8px" }}
              toastOptions={{
                success: {
                  duration: 3000,
                },
                error: {
                  duration: 5000,
                },
                style: {
                  fontSize: "16px",
                  maxWidth: "500px",
                  padding: "16px 24px",
                  backgroundColor: "#f9fafb",
                  color: "#374151",
                },
              }}
            />
          </ReactQueryProvider>
        </GlobalProvider>
      </AuthProvider>
    </StoreProvider>
  );
}

export default App;

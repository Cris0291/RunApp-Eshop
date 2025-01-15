import { createBrowserRouter, RouterProvider } from "react-router";
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
    element: (
      <PrivateRoute>
        <ProductsPage />
      </PrivateRoute>
    ),
  },
]);

function App() {
  return (
    <AuthProvider>
      <GlobalProvider>
        <StoreProvider>
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
        </StoreProvider>
      </GlobalProvider>
    </AuthProvider>
  );
}

export default App;

import "./globals.css";
import ReactQueryProvider from "./utils/ReactQueryProvider";
import StoreProvider from "./utils/StoreProvider";
import { Toaster } from 'react-hot-toast';
import {ErrorBoundary} from "react-error-boundary"
import ErrorFallback from "./ui/ErrorFallback";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
        <StoreProvider>
        <ReactQueryProvider>
        {children}
        <Toaster position="top-center" gutter={12}
         containerStyle={{margin: "8px"}}
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
            color: "#374151"
          }
         }}/>
        </ReactQueryProvider>
        </StoreProvider>
        </ErrorBoundary>
        </body>
    </html>
  );
}

import "./globals.css";
import ReactQueryProvider from "./utils/ReactQueryProvider";
import StoreProvider from "./utils/StoreProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
        <ReactQueryProvider>
        {children}
        </ReactQueryProvider>
        </StoreProvider>
        </body>
    </html>
  );
}

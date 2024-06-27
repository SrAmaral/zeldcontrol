import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { LayoutProvider } from "../layout/context/layoutcontext";

import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";
// import "../styles/Demo.css";
import "../styles/Layout.css";
import "../styles/primereact.css";
import "../styles/theme.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider>
          <PrimeReactProvider>
            <LayoutProvider>{children}</LayoutProvider>
          </PrimeReactProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

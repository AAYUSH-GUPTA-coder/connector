import AppKitProvider from "@/lib/appkit-provider";
import "./globals.css";
import { cookieToInitialState } from "wagmi";
import { headers } from "next/headers";
import { NavBar } from "@/components/layout/Navbar";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { config } from "@/config/wallet-connect";
import { fontGeist, fontHeading, fontSans, fontUrban } from "@/assets/fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontUrban.variable,
          fontHeading.variable,
          fontGeist.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppKitProvider initialState={initialState}>
            <NavBar />
            {children}
            <Toaster richColors closeButton />
          </AppKitProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

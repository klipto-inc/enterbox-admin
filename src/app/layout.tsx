import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });
import { AuthenticatedContextProvider } from "@/context";
import { NextThemeProvider } from "@/components/Provider/themeProviders";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
export const metadata: Metadata = {
  title: "Enterbox",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <Head>
      
      </Head> */}
      <body className={`${inter.className} `}>
        <AuthenticatedContextProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </AuthenticatedContextProvider>
      </body>
    </html>
  );
}

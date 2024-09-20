import type { Metadata } from "next";

import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import NavBar from "@/components/nav-bar";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./context/AuthContext";
export const metadata: Metadata = {
  title: "Disaster Management",
  description: "Disaster Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased `}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <nav className="">
              <NavBar></NavBar>
              <Toaster />
              <div className="w-full p-2 sm:container mx-auto">{children}</div>
            </nav>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

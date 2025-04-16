import type React from "react";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "./components/theme-provider";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import NextAuthSessionProvider from "../Providers/NextAuthSessionProvider";
import { ToastContainer } from "react-toastify";
import QueryProvider from "./providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quizmania - AI-Powered Quiz App",
  description: "Test your knowledge with AI-generated quizzes",
  icons: {
    icon: "/brain.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} cz-shortcut-listen="true">
        <NextAuthSessionProvider>
          <QueryProvider>
            <ThemeProvider>
              <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar={false}
                closeOnClick={true}
                pauseOnHover={true}
                draggable={true}
              />
              <Navbar />
              <div className="min-h-[calc(100vh-300px)]">{children}</div>
              <Footer />
            </ThemeProvider>
          </QueryProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}

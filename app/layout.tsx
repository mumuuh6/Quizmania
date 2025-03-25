import type React from "react";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "./components/theme-provider";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quizmania - AI-Powered Quiz App",
  description: "Test your knowledge with AI-generated quizzes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider>
            <Navbar></Navbar>
            {children}
            <Footer></Footer>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}

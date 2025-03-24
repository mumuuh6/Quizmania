import type React from "react";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "./components/theme-provider";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";

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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Navbar></Navbar>
          <div className="min-h-[calc(100vh-300px)]">
            {children}
          </div>
          <Footer></Footer>
        </ThemeProvider>
      </body>
    </html>
  );
}

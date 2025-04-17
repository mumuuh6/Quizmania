"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Moon, Search, Sun } from "lucide-react"
import { ThemeProvider, useTheme } from "./components/theme-provider"

function NotFoundContent() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900 dark:to-indigo-950 text-purple-950 dark:text-purple-50 px-10">
      {/* Theme Toggle Button */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/20 dark:bg-purple-900/30 backdrop-blur-sm"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun className="h-5 w-5 text-yellow-300" /> : <Moon className="h-5 w-5 text-purple-700" />}
      </button>

      <div className="max-w-md w-full text-center space-y-8">
        {/* Large 404 number */}
        <h1 className="text-9xl font-extrabold tracking-tight">
          <span className="sr-only">Error</span>
          <span className="block text-purple-800 dark:text-white opacity-20">404</span>
        </h1>

        {/* Animated question mark */}
        <div className="relative mx-auto w-24 h-24 mb-8 animate-bounce">
          <div className="absolute inset-0 flex items-center justify-center text-7xl font-bold text-purple-700 dark:text-purple-300">
            ?
          </div>
          <div className="absolute inset-0 border-8 border-purple-500 dark:border-purple-400 rounded-full opacity-20 animate-ping"></div>
        </div>

        <div className="space-y-4">
          <p className="text-lg text-purple-700 dark:text-purple-300">
            Oops! Looks like this question stumped everyone. The page you're looking for doesn't exist.
          </p>

          {/* Quiz-themed message */}
          <div className="bg-white/50 dark:bg-purple-800/30 p-4 rounded-lg backdrop-blur-sm border border-purple-200 dark:border-purple-700">
            <p className="font-medium">Pop Quiz: What should you do when you're lost?</p>
            <p className="text-sm mt-2">A) Panic</p>
            <p className="text-sm">B) Keep searching random URLs</p>
            <p className="text-sm">C) Head back to the homepage</p>
            <p className="text-sm font-bold mt-2">Correct Answer: C!</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button
            asChild
            className="bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-700 dark:hover:bg-purple-600"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Homepage
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-purple-500 text-purple-700 hover:bg-purple-100 dark:border-purple-400 dark:text-purple-200 dark:hover:bg-purple-800/30"
          >
            <Link href="/Quizzes">
              <Search className="mr-2 h-4 w-4" />
              Browse Quizzes
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function NotFound() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="quizmania-theme">
      <NotFoundContent />
    </ThemeProvider>
  )
}

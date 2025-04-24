"use client"

import { Button } from "@/components/ui/button"
import { ThemeProvider } from "./components/theme-provider"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <ThemeProvider defaultTheme="system" storageKey="quizmania-theme">
          <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900 dark:to-indigo-950 text-purple-950 dark:text-purple-50 px-4">
            <div className="max-w-md w-full text-center space-y-8">
              <h1 className="text-4xl font-bold text-purple-800 dark:text-purple-200">Something went wrong!</h1>
              <p className="text-lg text-purple-700 dark:text-purple-300">We encountered an unexpected error.</p>
              <Button
                onClick={() => reset()}
                className="bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-700 dark:hover:bg-purple-600"
              >
                Try again
              </Button>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

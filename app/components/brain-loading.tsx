"use client"

import { useState, useEffect } from "react"
import { Brain } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function BrainLoading() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer)
          return 100
        }
        return prevProgress + 5
      })
    }, 150)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="min-h-[100vh] bg-gray-400 dark:bg-gray-900">
    {/* Main content */}
    <main className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Hero section */}
      <div className="mb-8">
        <Skeleton className="h-[200px] w-full rounded-xl mb-4" />
        <Skeleton className="h-8 w-[300px] mb-2" />
        <Skeleton className="h-4 w-full max-w-2xl mb-6" />
        <Skeleton className="h-4 w-full max-w-xl" />
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-full rounded-lg" />
            <Skeleton className="h-5 w-[80%]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
          </div>
        ))}
      </div>

      {/* Additional content section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[95%]" />
          <Skeleton className="h-8 w-[120px] rounded-md" />
        </div>
        <Skeleton className="h-[250px] rounded-xl" />
      </div>
    </main>

    {/* Footer */}
    <footer className="w-full p-6 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-5 w-[100px]" />
            <Skeleton className="h-4 w-[80px]" />
            <Skeleton className="h-4 w-[120px]" />
            <Skeleton className="h-4 w-[90px]" />
          </div>
        ))}
      </div>
    </footer>
  </div>
  )
}

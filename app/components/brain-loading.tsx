"use client"

import { useState, useEffect } from "react"
import { Brain } from "lucide-react"

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
    <div className="flex flex-col items-center justify-center min-h-[100vh] p-6 bg-[#f8f5ff] dark:bg-gray-900">
      <div className="relative flex flex-col items-center gap-6 max-w-md mx-auto text-center">
        <div className="relative">
          <div className="absolute inset-0 bg-purple-100 dark:bg-purple-900/30 rounded-full opacity-20 dark:opacity-40 animate-pulse"></div>
          <div className="relative animate-bounce" style={{ animationDuration: "2s" }}>
            <Brain className="w-16 h-16 text-[#8A3FFC]" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Loading Your Quiz...</h2>
        <p className="text-gray-600 dark:text-gray-400">Preparing your personalized AI-powered questions</p>

        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
          <div
            className="bg-[#8A3FFC] h-2.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <div className="animate-spin h-4 w-4 border-2 border-[#8A3FFC] border-t-transparent rounded-full"></div>
          <span>Loading knowledge base...</span>
        </div>
      </div>
    </div>
  )
}

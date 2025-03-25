import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Quiz Generator",
  description: "Generate quizzes based on difficulty level and subject",
}

export default function QuizHome() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-primary sm:text-4xl md:text-5xl lg:text-6xl">
                  Generate Custom Quizzes
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Create personalized quizzes based on difficulty level and subject. Test your knowledge and learn
                  something new.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/Quizzes/create">
                  <Button className="h-11 px-8 bg-primary hover:bg-primary/90">
                    Create Quiz <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}


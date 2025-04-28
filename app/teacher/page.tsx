import Link from "next/link"
import type { Metadata } from "next"
import { Edit, Sparkles, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Teacher Dashboard | Quiz Generator",
  description: "Create and manage quizzes for your students",
}

export default function TeacherDashboard() {
  return (
    <div className="container mx-auto py-10">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Teacher Quiz Creation</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose how you want to create your next quiz. Build one from scratch or let AI generate one for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Manual Quiz Creation Card */}
          <Card className="flex flex-col h-full transition-all hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Edit className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Manual Creation</CardTitle>
              <CardDescription>
                Create a quiz from scratch with complete control over questions and answers
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>Multiple question types (MCQ, True/False, etc.)</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>Full control over answer options</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>Add detailed explanations</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>Customize points per question</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/teacher/create-quiz" className="w-full">
                <Button className="w-full group">
                  Create Manually
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* AI Quiz Generation Card */}
          <Card className="flex flex-col h-full transition-all hover:shadow-md border-primary/20">
            <CardHeader className="pb-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">AI Generation</CardTitle>
              <CardDescription>Let AI generate a complete quiz based on your specifications</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>Quick quiz generation in seconds</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>Specify topic, difficulty, and question count</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>Review and edit generated questions</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>AI-crafted distractors and explanations</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/teacher/ai-generated-quiz" className="w-full">
                <Button className="w-full group" variant="default">
                  Generate with AI
                  <Sparkles className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

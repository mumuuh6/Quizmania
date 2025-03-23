import type { Metadata } from "next"
import QuizForm from "../Componants/quiz-form"


export const metadata: Metadata = {
  title: "Create Quiz | Quiz Generator",
  description: "Create a custom quiz based on difficulty level and subject",
}

export default function CreateQuizPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mx-auto max-w-2xl">
        <div className="space-y-6 px-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-primary ">Create a Quiz</h1>
            <p className="text-muted-foreground ">
              Select the difficulty level and subject to generate your custom quiz.
            </p>
          </div>
          <QuizForm></QuizForm>
        </div>
      </div>
    </div>
  )
}


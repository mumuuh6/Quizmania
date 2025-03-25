"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Timer, AlertCircle } from "lucide-react"

// Mock quiz data - in a real app, this would come from an API
const generateMockQuiz = (subject: string, difficulty: string, count: number) => {
  const questions = [{
    idd:1,
  }
  ]

  // Return the requested number of questions
  return questions.slice(0, count)
}

export default function QuizPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const difficulty = searchParams.get("difficulty") || "medium"
  const subject = searchParams.get("subject") || "general-knowledge"
  const numberOfQuestions = Number.parseInt(searchParams.get("questions") || "10")
  const timeLimit = Number.parseInt(searchParams.get("time") || "15") * 60 // Convert to seconds

  const [questions, setQuestions] = useState<any[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
  const [timeRemaining, setTimeRemaining] = useState(timeLimit)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    // Generate mock quiz data
    const quizData = generateMockQuiz(subject, difficulty, numberOfQuestions)
    setQuestions(quizData)

    // Set up timer
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          calculateScore()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [subject, difficulty, numberOfQuestions, timeLimit])

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      calculateScore()
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const calculateScore = () => {
    let correctAnswers = 0

    questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctAnswers++
      }
    })

    setScore(correctAnswers)
    setQuizCompleted(true)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  if (questions.length === 0) {
    return (
      <div className="container mx-auto py-10">
        <Card className="mx-auto max-w-2xl">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center h-40">
              <p>Loading quiz questions...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (quizCompleted) {
    return (
      <div className="container mx-auto py-10">
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle>Quiz Results</CardTitle>
            <CardDescription>
              {subject.charAt(0).toUpperCase() + subject.slice(1)} -{" "}
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Difficulty
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold">
                  Your Score: {score} / {questions.length}
                </h2>
                <p className="text-muted-foreground mt-2">{(score / questions.length) * 100}% Correct</p>
              </div>

              <Progress value={(score / questions.length) * 100} className="h-3" />

              {score === questions.length ? (
                <Alert className="bg-primary/10 border-primary/30">
                  <AlertCircle className="h-4 w-4 text-primary" />
                  <AlertDescription className="text-primary">Perfect score! Congratulations!</AlertDescription>
                </Alert>
              ) : score >= questions.length * 0.7 ? (
                <Alert className="bg-primary/10 border-primary/30">
                  <AlertCircle className="h-4 w-4 text-primary" />
                  <AlertDescription className="text-primary">Great job! You did well on this quiz.</AlertDescription>
                </Alert>
              ) : (
                <Alert className="bg-blue-50 border-blue-200">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-600">
                    Keep practicing! You'll improve with more quizzes.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push("/create")} className="w-full">
              Create Another Quiz
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="container mx-auto py-10">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>
                Question {currentQuestionIndex + 1} of {questions.length}
              </CardTitle>
              <CardDescription>
                {subject.charAt(0).toUpperCase() + subject.slice(1)} -{" "}
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Difficulty
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-md">
              <Timer className="h-4 w-4" />
              <span className="font-mono">{formatTime(timeRemaining)}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="h-2" />

            <div>
              <h3 className="text-xl font-medium mb-4">{currentQuestion.question}</h3>

              <RadioGroup
                value={selectedAnswers[currentQuestion.id] || ""}
                onValueChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
                className="space-y-3"
              >
                {currentQuestion.options.map((option: string) => (
                  <div
                    key={option}
                    className={`flex items-center space-x-2 rounded-lg border p-4 transition-colors ${
                      selectedAnswers[currentQuestion.id] === option
                        ? "bg-primary/5 border-primary"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
            Previous
          </Button>
          <Button onClick={handleNext} disabled={!selectedAnswers[currentQuestion.id]}>
            {currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}


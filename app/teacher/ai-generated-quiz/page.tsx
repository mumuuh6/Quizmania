"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Loader2, Sparkles, Save, Edit, RefreshCw, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
// import { toast } from "@/components/ui/use-toast"

import UseAxiosNormal from "@/app/hook/(axoisSecureNormal)/axiosNormal"
import { toast } from "react-toastify"

// Types for AI quiz generation
type QuestionType = "Multiple Choice" | "true or false" | "fill in the blank" | "Short Answer"

type GenerationParams = {
  topic: string
  description: string
  difficulty: string
  questionCount: number
  timeLimit: number
  questionTypes: QuestionType[]
  includeExplanations: boolean
}

type AIGeneratedQuestion = {
  id: string
  question: string
  type: QuestionType
  options?: string[]
  answer: string
  explanation?: string
  points: number
}

type AIGeneratedQuiz = {
  topic: string
  description: string
  difficulty: string
  timeLimit: number
  questions: AIGeneratedQuestion[]
}

export default function AIQuizGeneratorPage() {
  const router = useRouter()
  const { data: session } = useSession()

  // States
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedQuiz, setGeneratedQuiz] = useState<AIGeneratedQuiz | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("parameters")
  const [editingQuestion, setEditingQuestion] = useState<number | null>(null)

  // Create axios instance
  const axiosInstance = UseAxiosNormal();

  // Form state
  const [params, setParams] = useState<GenerationParams>({
    topic: "",
    description: "",
    difficulty: "easy",
    questionCount: 5,
    timeLimit: 7,
    questionTypes: ["Multiple Choice", "true or false","fill in the blank", "Short Answer"],
    includeExplanations: true,
  })

  // Handle form input changes
  const handleParamChange = (field: keyof GenerationParams, value: any) => {
    setParams((prev) => ({ ...prev, [field]: value }))
  }

  // Toggle question types
  const toggleQuestionType = (type: QuestionType) => {
    setParams((prev) => {
      if (prev.questionTypes.includes(type)) {
        // Don't remove if it's the last type
        if (prev.questionTypes.length === 1) return prev
        return {
          ...prev,
          questionTypes: prev.questionTypes.filter((t) => t !== type),
        }
      } else {
        return {
          ...prev,
          questionTypes: [...prev.questionTypes, type],
        }
      }
    })
  }

  // Generate quiz with AI
  const generateQuiz = async () => {
    if (!params.topic) {
    //   toast({
    //     title: "Topic Required",
    //     description: "Please enter a topic for your quiz.",
    //     variant: "destructive",
    //   })
    toast.error("Please enter a topic for your quiz.")
      return
    }

    setIsGenerating(true)
    setGeneratedQuiz(null)

    try {
      // This would be your actual API call to generate a quiz with AI
      const response = await axiosInstance.post("/teacher/generate-quiz", {//add ai- before generate-quiz
        user: session?.user?.email,
        params: {
          topic: params.topic,
          description: params.description,
          difficulty: params.difficulty,
          quantity: params.questionCount,
          timeLimit: params.timeLimit,
          quizType: params.questionTypes,
          includeExplanations: params.includeExplanations,
        },
      })

      // Simulate a response if your API isn't ready yet
      // In a real implementation, you'd use the actual response data
      const mockQuiz: AIGeneratedQuiz = {
        topic: params.topic,
        description: params.description || `AI-generated quiz about ${params.topic}`,
        difficulty: params.difficulty,
        timeLimit: params.timeLimit,
        questions: Array.from({ length: params.questionCount }, (_, i) => ({
          id: `q-${i}`,
          question: `Sample question ${i + 1} about ${params.topic}?`,
          type: params.questionTypes[i % params.questionTypes.length],
          options:
            params.questionTypes[i % params.questionTypes.length] === "Multiple Choice"
              ? ["Option A", "Option B", "Option C", "Option D"]
              : params.questionTypes[i % params.questionTypes.length] === "true or false"
                ? ["True", "False"]
                : params.questionTypes[i % params.questionTypes.length] === "fill in the blank"
                  ? ["___"]:params.questionTypes[i % params.questionTypes.length] === "Short Answer"
                    ? ["___"]:undefined,
          answer:
            params.questionTypes[i % params.questionTypes.length] === "Multiple Choice"
              ? "Option A"
              : params.questionTypes[i % params.questionTypes.length] === "true or false"
                ? "True"
                : "Sample answer",
          explanation: params.includeExplanations ? "This is a sample explanation for the correct answer." : undefined,
          points: 1,
        })),
      }

      // Use the actual response data when your API is ready
      // const generatedQuiz = response.data.quiz;
      setGeneratedQuiz(mockQuiz)
      setActiveTab("review")

    toast.info("Quiz generation is in review!")
    } catch (error) {
      console.error("Error generating quiz:", error)
    toast.error("Error generating quiz. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  // Save the generated quiz
  const saveQuiz = async () => {
    if (!generatedQuiz) return

    setIsSaving(true)

    try {
      // Format the quiz data for your API
      const quizData = {
        user: session?.user?.email,
        quizCriteria: {
          topic: generatedQuiz.topic,
          difficulty: generatedQuiz.difficulty,
          quizType: "AI-Generated",
          quantity: generatedQuiz.questions.length,
          timeLimit: generatedQuiz.timeLimit,
          created: new Date().toISOString(),
          passingscore: 70, // Default passing score
        },
        parsedQuizData: generatedQuiz.questions.map((q) => ({
          question: q.question,
          answer: q.answer,
          type: q.type,
          options: q.options || [],
          points: q.points,
          explanation: q.explanation || "",
        })),
      }

      // Save the quiz to your backend
      const response = await axiosInstance.post("/teacher/generate-quiz", quizData)

    //   toast({
    //     title: "Quiz Saved",
    //     description: "Your AI-generated quiz has been saved successfully.",
    //   })

      // Redirect to the quizzes list or the quiz detail page
      router.push("/teacher/quizzes")
    } catch (error) {
      console.error("Error saving quiz:", error)
    //   toast({
    //     title: "Save Failed",
    //     description: "There was an error saving your quiz. Please try again.",
    //     variant: "destructive",
    //   })
    } finally {
      setIsSaving(false)
    }
  }

  // Update a question in the generated quiz
  const updateQuestion = (index: number, updatedQuestion: AIGeneratedQuestion) => {
    if (!generatedQuiz) return

    const updatedQuestions = [...generatedQuiz.questions]
    updatedQuestions[index] = updatedQuestion

    setGeneratedQuiz({
      ...generatedQuiz,
      questions: updatedQuestions,
    })

    setEditingQuestion(null)
  }

  // Regenerate a specific question
  const regenerateQuestion = async (index: number) => {
    if (!generatedQuiz) return

    const question = generatedQuiz.questions[index]

    try {
      // This would be your actual API call to regenerate a question
      const response = await axiosInstance.post("/teacher/generate-quiz", {
        topic: generatedQuiz.topic,
        questionType: question.type,
        difficulty: generatedQuiz.difficulty,
        includeExplanation: !!question.explanation,
      })

      // For now, simulate a regenerated question
      const regeneratedQuestion: AIGeneratedQuestion = {
        ...question,
        question: `Regenerated question about ${generatedQuiz.topic}?`,
        explanation: question.explanation ? "This is a regenerated explanation for the correct answer." : undefined,
      }

      updateQuestion(index, regeneratedQuestion)

    //   toast({
    //     title: "Question Regenerated",
    //     description: "The question has been regenerated.",
    //   })
    } catch (error) {
      console.error("Error regenerating question:", error)
    //   toast({
    //     title: "Regeneration Failed",
    //     description: "There was an error regenerating the question. Please try again.",
    //     variant: "destructive",
    //   })
    }
  }

  return (
    <div className="container  mx-auto py-8 md:w-[95%]">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">AI Quiz Generator</h1>
          <div className="flex items-center space-x-2">
            {generatedQuiz && (
              <Button onClick={saveQuiz} disabled={isSaving} className="flex items-center">
                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save Quiz
              </Button>
            )}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="parameters">Generation Parameters</TabsTrigger>
            <TabsTrigger value="review" disabled={!generatedQuiz}>
              Review Generated Quiz
            </TabsTrigger>
          </TabsList>

          <TabsContent value="parameters" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Quiz Parameters</CardTitle>
                <CardDescription>Configure the AI to generate your perfect quiz</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="topic">
                    Quiz Topic <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="topic"
                    value={params.topic}
                    onChange={(e) => handleParamChange("topic", e.target.value)}
                    placeholder="E.g., World War II, Photosynthesis, JavaScript Basics"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={params.description}
                    onChange={(e) => handleParamChange("description", e.target.value)}
                    placeholder="Provide additional context or specific areas to focus on"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <Select value={params.difficulty} onValueChange={(value) => handleParamChange("difficulty", value)}>
                      <SelectTrigger id="difficulty">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
                    <Input
                      id="timeLimit"
                      type="number"
                      min="1"
                      max="120"
                      value={params.timeLimit}
                      onChange={(e) => handleParamChange("timeLimit", Number.parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="questionCount">Number of Questions: {params.questionCount}</Label>
                  <Slider
                    id="questionCount"
                    min={1}
                    max={20}
                    step={1}
                    value={[params.questionCount]}
                    onValueChange={(value) => handleParamChange("questionCount", value[0])}
                    className="py-4"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Question Types</Label>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {(["Multiple Choice", "true or false", "fill in the blank", "Short Answer"] as const).map(
                      (type) => (
                        <Badge
                          key={type}
                          variant={params.questionTypes.includes(type) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleQuestionType(type)}
                        >
                          {type}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Switch
                    id="includeExplanations"
                    checked={params.includeExplanations}
                    onCheckedChange={(checked) => handleParamChange("includeExplanations", checked)}
                  />
                  <Label htmlFor="includeExplanations">Include explanations for correct answers</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={generateQuiz} disabled={isGenerating || !params.topic} className="w-full">
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating Quiz...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Quiz with AI
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="review" className="space-y-4 pt-4">
            {generatedQuiz ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{generatedQuiz.topic}</CardTitle>
                    <CardDescription>{generatedQuiz.description}</CardDescription>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Badge variant="outline">{generatedQuiz.difficulty} difficulty</Badge>
                      <Badge variant="outline">{generatedQuiz.timeLimit} minutes</Badge>
                      <Badge variant="outline">{generatedQuiz.questions.length} questions</Badge>
                    </div>
                  </CardHeader>
                </Card>

                <div className="space-y-4">
                  {generatedQuiz.questions.map((question, index) => (
                    <Card key={question.id} className="relative">
                      {editingQuestion === index ? (
                        <QuestionEditor
                          question={question}
                          onSave={(updatedQuestion) => updateQuestion(index, updatedQuestion)}
                          onCancel={() => setEditingQuestion(null)}
                        />
                      ) : (
                        <>
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm" onClick={() => regenerateQuestion(index)}>
                                  <RefreshCw className="h-4 w-4 mr-1" />
                                  Regenerate
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => setEditingQuestion(index)}>
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                              </div>
                            </div>
                            <Badge>{question.type}</Badge>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <p className="font-medium">{question.question}</p>

                            {question.type === "Multiple Choice" && question.options && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {question.options.map((option, optIndex) => (
                                  <div
                                    key={optIndex}
                                    className={`p-3 rounded-md border ${
                                      option === question.answer ? "border-green-500 bg-green-50" : "border-gray-200"
                                    }`}
                                  >
                                    {option === question.answer && (
                                      <CheckCircle className="h-4 w-4 text-green-500 float-right" />
                                    )}
                                    {option}
                                  </div>
                                ))}
                              </div>
                            )}

                            {question.type === "true or false" && (
                              <div className="flex space-x-4">
                                <div
                                  className={`p-3 rounded-md border ${
                                    question.answer === "True" ? "border-green-500 bg-green-50" : "border-gray-200"
                                  }`}
                                >
                                  {question.answer === "True" && (
                                    <CheckCircle className="h-4 w-4 text-green-500 float-right" />
                                  )}
                                  True
                                </div>
                                <div
                                  className={`p-3 rounded-md border ${
                                    question.answer === "False" ? "border-green-500 bg-green-50" : "border-gray-200"
                                  }`}
                                >
                                  {question.answer === "False" && (
                                    <CheckCircle className="h-4 w-4 text-green-500 float-right" />
                                  )}
                                  False
                                </div>
                              </div>
                            )}

                            {(question.type === "fill in the blank" || question.type === "Short Answer") && (
                              <Alert>
                                <AlertDescription>
                                  <strong>Answer:</strong> {question.answer}
                                </AlertDescription>
                              </Alert>
                            )}

                            {question.explanation && (
                              <div className="mt-4 p-3 bg-muted/30 rounded-md">
                                <p className="text-sm font-medium">Explanation:</p>
                                <p className="text-sm">{question.explanation}</p>
                              </div>
                            )}
                          </CardContent>
                        </>
                      )}
                    </Card>
                  ))}
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("parameters")}>
                    Back to Parameters
                  </Button>
                  <Button onClick={saveQuiz} disabled={isSaving}>
                    {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Save Quiz
                  </Button>
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <p className="text-muted-foreground mb-4">No quiz has been generated yet.</p>
                  <Button onClick={() => setActiveTab("parameters")}>Go to Generation Parameters</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Question Editor Component
interface QuestionEditorProps {
  question: AIGeneratedQuestion
  onSave: (question: AIGeneratedQuestion) => void
  onCancel: () => void
}

function QuestionEditor({ question, onSave, onCancel }: QuestionEditorProps) {
  const [editedQuestion, setEditedQuestion] = useState<AIGeneratedQuestion>({ ...question })

  const updateField = (field: keyof AIGeneratedQuestion, value: any) => {
    setEditedQuestion((prev) => ({ ...prev, [field]: value }))
  }

  const updateOption = (index: number, value: string) => {
    if (!editedQuestion.options) return

    const newOptions = [...editedQuestion.options]
    newOptions[index] = value

    setEditedQuestion((prev) => ({
      ...prev,
      options: newOptions,
    }))
  }

  return (
    <div className="p-6 space-y-4">
      <h3 className="text-lg font-medium">Edit Question</h3>

      <div className="space-y-2">
        <Label htmlFor="question-text">Question Text</Label>
        <Textarea
          id="question-text"
          value={editedQuestion.question}
          onChange={(e) => updateField("question", e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      {editedQuestion.type === "Multiple Choice" && editedQuestion.options && (
        <div className="space-y-2">
          <Label>Options</Label>
          {editedQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <Input
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => updateField("answer", option)}
                className={option === editedQuestion.answer ? "bg-primary/20" : ""}
              >
                {option === editedQuestion.answer ? "Correct" : "Set as Correct"}
              </Button>
            </div>
          ))}
        </div>
      )}

      {editedQuestion.type === "true or false" && (
        <div className="space-y-2">
          <Label>Correct Answer</Label>
          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={() => updateField("answer", "True")}
              className={editedQuestion.answer === "True" ? "bg-primary/20" : ""}
            >
              True
            </Button>
            <Button
              variant="outline"
              onClick={() => updateField("answer", "False")}
              className={editedQuestion.answer === "False" ? "bg-primary/20" : ""}
            >
              False
            </Button>
          </div>
        </div>
      )}

      {(editedQuestion.type === "fill in the blank" || editedQuestion.type === "Short Answer") && (
        <div className="space-y-2">
          <Label htmlFor="answer">Correct Answer</Label>
          <Input id="answer" value={editedQuestion.answer} onChange={(e) => updateField("answer", e.target.value)} />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="explanation">Explanation (Optional)</Label>
        <Textarea
          id="explanation"
          value={editedQuestion.explanation || ""}
          onChange={(e) => updateField("explanation", e.target.value)}
          placeholder="Explain why this answer is correct"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="points">Points</Label>
        <Input
          id="points"
          type="number"
          min="1"
          value={editedQuestion.points}
          onChange={(e) => updateField("points", Number.parseInt(e.target.value))}
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => onSave(editedQuestion)}>Save Changes</Button>
      </div>
    </div>
  )
}

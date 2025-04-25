"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from "uuid"
import { Plus, Save, Trash2, ChevronDown, ChevronUp, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import axios from "axios"
import { useSession } from "next-auth/react"
import { timeLog } from "console"
import UseAxiosNormal from "@/app/hook/(axoisSecureNormal)/axiosNormal"

// Question types
type OptionType = {
  id: string
  text: string
  isCorrect: boolean
}

type BaseQuestionType = {
  id: string
  text: string
  type: string
  points: number
  explanation: string
}

type MCQQuestionType = BaseQuestionType & {
  type: "Multiple Choice"
  options: OptionType[]
  multipleCorrect: boolean
}

type TrueFalseQuestionType = BaseQuestionType & {
  type: "true or false"
  correct: boolean
}

type FillInTheBlankQuestionType = BaseQuestionType & {
  type: "fill in the blank"
  blanks: { id: string; answer: string }[]
}



type ShortAnswerQuestionType = BaseQuestionType & {
  type: "Short Answer"
  acceptableAnswers: string[]
  caseSensitive: boolean
}

type QuestionType =
  | MCQQuestionType
  | TrueFalseQuestionType
  | FillInTheBlankQuestionType
  | ShortAnswerQuestionType

type QuizType = {
  topic: string
  description: string
  timeLimit: number
  category: string
  difficulty: string
  passingScore: number
  randomizeQuestions: boolean
  showResults: boolean
  questions: QuestionType[]
}

// Default empty question templates
const createEmptyMCQ = (): MCQQuestionType => ({
  id: uuidv4(),
  text: "",
  type: "Multiple Choice",
  points: 1,
  explanation: "",
  options: [
    { id: uuidv4(), text: "", isCorrect: false },
    { id: uuidv4(), text: "", isCorrect: false },
    { id: uuidv4(), text: "", isCorrect: false },
    { id: uuidv4(), text: "", isCorrect: false },
  ],
  multipleCorrect: false,
})

const createEmptyTrueFalse = (): TrueFalseQuestionType => ({
  id: uuidv4(),
  text: "",
  type: "true or false",
  points: 1,
  explanation: "",
  correct: true,
})

const createEmptyFillBlank = (): FillInTheBlankQuestionType => ({
  id: uuidv4(),
  text: "",
  type: "fill in the blank",
  points: 1,
  explanation: "",
  blanks: [{ id: uuidv4(), answer: "" }],
})



const createEmptyShortAnswer = (): ShortAnswerQuestionType => ({
  id: uuidv4(),
  text: "",
  type: "Short Answer",
  points: 1,
  explanation: "",
  acceptableAnswers: [""],
  caseSensitive: false,
})

// Initial quiz state
const initialQuiz: QuizType = {
  topic: "",
  description: "",
  timeLimit: 30,
  category: "",
  difficulty: "medium",
  passingScore: 70,
  randomizeQuestions: true,
  showResults: true,
  questions: [createEmptyMCQ()],
  
}

export default function CreateQuizPage() {
  const router = useRouter()
  const [quiz, setQuiz] = useState<QuizType>(initialQuiz);
  const [activeQuestion, setActiveQuestion] = useState<string>(quiz.questions[0].id)
  const [previewMode, setPreviewMode] = useState(false);
  const {data:session}=useSession();
  const [quizSetId, setQuizSetId] = useState<string | null>(null);
  const axiosInstanceNormal=UseAxiosNormal()
  // Handle quiz metadata changes
  const handleQuizChange = (field: keyof QuizType, value: any) => {
    setQuiz((prev) => ({ ...prev, [field]: value }))
  }

  // Add a new question
  const addQuestion = (type: string) => {
    let newQuestion: QuestionType

    switch (type) {
      case "Multiple Choice":
        newQuestion = createEmptyMCQ()
        break
      case "true or false":
        newQuestion = createEmptyTrueFalse()
        break
      case "fill in the blank":
        newQuestion = createEmptyFillBlank()
        break
      case "Short Answer":
        newQuestion = createEmptyShortAnswer()
        break
      default:
        newQuestion = createEmptyMCQ()
    }

    setQuiz((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }))
    setActiveQuestion(newQuestion.id)
  }

  // Delete a question
  const deleteQuestion = (id: string) => {
    if (quiz.questions.length <= 1) {
      return // Don't delete the last question
    }

    const newQuestions = quiz.questions.filter((q) => q.id !== id)
    setQuiz((prev) => ({
      ...prev,
      questions: newQuestions,
    }))

    // Set a new active question if the active one was deleted
    if (activeQuestion === id) {
      setActiveQuestion(newQuestions[0].id)
    }
  }

  // Update a question
  const updateQuestion = (updatedQuestion: QuestionType) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q)),
    }))
  }

  // Move question up or down
  const moveQuestion = (id: string, direction: "up" | "down") => {
    const index = quiz.questions.findIndex((q) => q.id === id)
    if ((direction === "up" && index === 0) || (direction === "down" && index === quiz.questions.length - 1)) {
      return // Can't move further
    }

    const newQuestions = [...quiz.questions]
    const newIndex = direction === "up" ? index - 1 : index + 1

    // Swap questions
    ;[newQuestions[index], newQuestions[newIndex]] = [newQuestions[newIndex], newQuestions[index]]

    setQuiz((prev) => ({
      ...prev,
      questions: newQuestions,
    }))
  }

  // Handle form submission
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()

    // Here you would typically save the quiz to your backend
    console.log("Quiz to save:", quiz)

    const TeacherQuiz={
      user:session?.user?.email,

      quizCriteria:{
        topic:quiz.topic,
        difficulty:quiz.difficulty,
        quizType:quiz.category,
        quantity:quiz.questions.length,
        timeLimit:quiz.timeLimit,
        created: new Date().toISOString(),
        passingscore:quiz.passingScore,
      },
      parsedQuizData:quiz?.questions?.map((question) =>  {
        const { id, text, type, points, explanation } = question;
        const options = type === "Multiple Choice" ? (question as MCQQuestionType).options : [];
        const options2 =type === "true or false" ? (question as TrueFalseQuestionType).correct : [];
        const multipleCorrect = type === "Multiple Choice" ? (question as MCQQuestionType).multipleCorrect : undefined;

        return{
          question:text,
          answer:explanation,
          type: type,
          options: type === "Multiple Choice" ? options?.map((option) => option.text) :["true","false"],
          points:points,
          multipleCorrect:multipleCorrect,
        }
      })
    }
    console.log("TeacherQuiz:", TeacherQuiz);
    try{
        const response= await axiosInstanceNormal.post('/teacher/generate-quiz',TeacherQuiz)
        console.log(response.data.result.insertedId);
        router.push(`/Quizzes/quiz?quizSetId=${response.data.insertedQuiz._id}`)
    }
    catch(error){
        console.error("Error saving quiz:", error)
        alert("Failed to save quiz. Please try again.")
        return
    }
    
    
    // Redirect to the quizzes list page
    //  router.push('/teacher/quizzes')
  }

  // Get the active question
  const getActiveQuestion = () => {
    return quiz.questions.find((q) => q.id === activeQuestion) || quiz.questions[0]
  }

  // Render the question editor based on question type
  const renderQuestionEditor = () => {
    const question = getActiveQuestion()

    switch (question.type) {
      case "Multiple Choice":
        return <MCQEditor question={question as MCQQuestionType} updateQuestion={updateQuestion} />
      case "true or false":
        return <TrueFalseEditor question={question as TrueFalseQuestionType} updateQuestion={updateQuestion} />
      case "fill in the blank":
        return <FillBlankEditor question={question as FillInTheBlankQuestionType} updateQuestion={updateQuestion} />
      
      case "Short Answer":
        return <ShortAnswerEditor question={question as ShortAnswerQuestionType} updateQuestion={updateQuestion} />
      default:
        return <div>Unknown question type</div>
    }
  }

  return (
    <div className="md:w-[95%] mx-auto py-8">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Create New Quiz</h1>
            <div className="flex items-center space-x-2">
              <Button type="button" variant="outline" onClick={() => setPreviewMode(!previewMode)}>
                <Eye className="mr-2 h-4 w-4" />
                {previewMode ? "Edit Mode" : "Preview"}
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Save Quiz
              </Button>
            </div>
          </div>

          {!previewMode ? (
            <Tabs defaultValue="details">
              <TabsList>
                <TabsTrigger value="details">Quiz Details</TabsTrigger>
                <TabsTrigger value="questions">Questions</TabsTrigger>
                
              </TabsList>

              <TabsContent value="details" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Quiz Information</CardTitle>
                    <CardDescription>Basic information about your quiz</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="topic">Quiz Title</Label>
                      <Input
                        id="topic"
                        value={quiz.topic}
                        onChange={(e) => handleQuizChange("topic", e.target.value)}
                        placeholder="Enter quiz title"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={quiz.description}
                        onChange={(e) => handleQuizChange("description", e.target.value)}
                        placeholder="Enter quiz description"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input
                          id="category"
                          value={quiz.category}
                          onChange={(e) => handleQuizChange("category", e.target.value)}
                          placeholder="E.g., Math, Science, History"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="difficulty">Difficulty</Label>
                        <Select
                          
                          value={quiz.difficulty}
                          onValueChange={(value) => handleQuizChange("difficulty", value)}
                        >
                          <SelectTrigger id="difficulty" className="w-full">
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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
                        <Input
                          id="timeLimit"
                          type="number"
                          min="1"
                          value={quiz.timeLimit}
                          onChange={(e) => handleQuizChange("timeLimit", Number.parseInt(e.target.value))}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="passingScore">Passing Score (%)</Label>
                        <Input
                          id="passingScore"
                          type="number"
                          min="0"
                          max="100"
                          value={quiz.passingScore}
                          onChange={(e) => handleQuizChange("passingScore", Number.parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="questions" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1">
                    <Card>
                      <CardHeader>
                        <CardTitle>Questions</CardTitle>
                        <CardDescription>Manage your quiz questions</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-col space-y-2">
                          {quiz.questions.map((question, index) => (
                            <div
                              key={question.id}
                              className={`flex items-center justify-between p-2 rounded-md ${
                                activeQuestion === question.id ? "bg-primary/10" : "hover:bg-muted"
                              }`}
                            >
                              <button
                                type="button"
                                className="flex-1 text-left flex items-center"
                                onClick={() => setActiveQuestion(question.id)}
                              >
                                <span className="mr-2 font-medium">Q{index + 1}.</span>
                                <span className="truncate">
                                  {question.text || `[${question.type.toUpperCase()}] Untitled Question`}
                                </span>
                              </button>
                              <div className="flex items-center space-x-1">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => moveQuestion(question.id, "up")}
                                  disabled={index === 0}
                                >
                                  <ChevronUp className="h-4 w-4" />
                                </Button>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => moveQuestion(question.id, "down")}
                                  disabled={index === quiz.questions.length - 1}
                                >
                                  <ChevronDown className="h-4 w-4" />
                                </Button>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => deleteQuestion(question.id)}
                                  disabled={quiz.questions.length <= 1}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <Separator />

                        <div>
                          <Label>Add Question</Label>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <Button type="button" variant="outline" onClick={() => addQuestion("Multiple Choice")}>
                              Multiple Choice
                            </Button>
                            <Button type="button" variant="outline" onClick={() => addQuestion("true or false")}>
                              True/False
                            </Button>
                            <Button type="button" variant="outline" onClick={() => addQuestion("fill in the blank")}>
                              Fill in Blanks
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => addQuestion("Short Answer")}
                              className="col-span-2"
                            >
                              Short Answer
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="md:col-span-2">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>
                            Question Editor
                            <Badge variant="outline" className="ml-2">
                              {getActiveQuestion().type.toUpperCase()}
                            </Badge>
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>{renderQuestionEditor()}</CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* <TabsContent value="settings" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Quiz Settings</CardTitle>
                    <CardDescription>Configure how your quiz behaves</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="randomizeQuestions">Randomize Questions</Label>
                        <p className="text-sm text-muted-foreground">
                          Present questions in a random order for each student
                        </p>
                      </div>
                      <Switch
                        id="randomizeQuestions"
                        checked={quiz.randomizeQuestions}
                        onCheckedChange={(checked) => handleQuizChange("randomizeQuestions", checked)}
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="showResults">Show Results Immediately</Label>
                        <p className="text-sm text-muted-foreground">
                          Show students their results as soon as they complete the quiz
                        </p>
                      </div>
                      <Switch
                        id="showResults"
                        checked={quiz.showResults}
                        onCheckedChange={(checked) => handleQuizChange("showResults", checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent> */}
            </Tabs>
          ) : (
            <QuizPreview quiz={quiz} />
          )}
        </div>
      </form>
    </div>
  )
}

// Question Editor Components
interface MCQEditorProps {
  question: MCQQuestionType
  updateQuestion: (question: QuestionType) => void
}

function MCQEditor({ question, updateQuestion }: MCQEditorProps) {
  const updateQuestionText = (text: string) => {
    updateQuestion({ ...question, text })
  }

  const updateQuestionPoints = (points: number) => {
    updateQuestion({ ...question, points })
  }

  const updateExplanation = (explanation: string) => {
    updateQuestion({ ...question, explanation })
  }

  const toggleMultipleCorrect = () => {
    updateQuestion({ ...question, multipleCorrect: !question.multipleCorrect })
  }

  const updateOption = (id: string, text: string) => {
    const updatedOptions = question.options.map((option) => (option.id === id ? { ...option, text } : option))
    updateQuestion({ ...question, options: updatedOptions })
  }

  const toggleOptionCorrect = (id: string) => {
    let updatedOptions = [...question.options]

    if (!question.multipleCorrect) {
      // For single correct answer, uncheck all other options
      updatedOptions = updatedOptions.map((option) => ({
        ...option,
        isCorrect: option.id === id,
      }))
    } else {
      // For multiple correct answers, toggle just this option
      updatedOptions = updatedOptions.map((option) =>
        option.id === id ? { ...option, isCorrect: !option.isCorrect } : option,
      )
    }

    updateQuestion({ ...question, options: updatedOptions })
  }

  const addOption = () => {
    const newOption: OptionType = {
      id: uuidv4(),
      text: "",
      isCorrect: false,
    }
    updateQuestion({ ...question, options: [...question.options, newOption] })
  }

  const removeOption = (id: string) => {
    if (question.options.length <= 2) {
      return // Maintain at least 2 options
    }

    const updatedOptions = question.options.filter((option) => option.id !== id)
    updateQuestion({ ...question, options: updatedOptions })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="questionText">Question Text</Label>
        <Textarea
          id="questionText"
          value={question.text}
          onChange={(e) => updateQuestionText(e.target.value)}
          placeholder="Enter your question here"
          className="min-h-[100px]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="points">Points</Label>
          <Input
            id="points"
            type="number"
            min="1"
            value={question.points}
            onChange={(e) => updateQuestionPoints(Number.parseInt(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="multipleCorrect">Answer Type</Label>
          <div className="flex items-center space-x-2 h-10">
            <Switch id="multipleCorrect" checked={question.multipleCorrect} onCheckedChange={toggleMultipleCorrect} />
            <span>{question.multipleCorrect ? "Multiple correct answers allowed" : "Single correct answer only"}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Answer Options</Label>
          <Button type="button" variant="outline" size="sm" onClick={addOption} disabled={question.options.length >= 5}>
            <Plus className="mr-1 h-3 w-3" />
            Add Option
          </Button>
        </div>

        <div className="space-y-2">
          {question.options.map((option, index) => (
            <div key={option.id} className="flex items-center space-x-2">
              <div className="flex-shrink-0">
                {question.multipleCorrect ? (
                  <Checkbox
                    checked={option.isCorrect}
                    onCheckedChange={() => toggleOptionCorrect(option.id)}
                    id={`option-${option.id}`}
                  />
                ) : (
                  <RadioGroup value={question.options.find((o) => o.isCorrect)?.id || ""}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={option.id}
                        id={`option-${option.id}`}
                        checked={option.isCorrect}
                        onClick={() => toggleOptionCorrect(option.id)}
                      />
                    </div>
                  </RadioGroup>
                )}
              </div>

              <Input
                value={option.text}
                onChange={(e) => updateOption(option.id, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className="flex-1"
              />

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeOption(option.id)}
                disabled={question.options.length <= 2}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="explanation">Correct Answers</Label>
        <Textarea
          id="explanation"
          value={question.explanation}
          onChange={(e) => updateExplanation(e.target.value)}
          placeholder="Explain the correct answer (shown after quiz completion)"
        />
      </div>
    </div>
  )
}

interface TrueFalseEditorProps {
  question: TrueFalseQuestionType
  updateQuestion: (question: QuestionType) => void
}

function TrueFalseEditor({ question, updateQuestion }: TrueFalseEditorProps) {
  const updateQuestionText = (text: string) => {
    updateQuestion({ ...question, text })
  }

  const updateQuestionPoints = (points: number) => {
    updateQuestion({ ...question, points })
  }

  const updateExplanation = (explanation: string) => {
    updateQuestion({ ...question, explanation })
  }

  const setCorrectAnswer = (correct: boolean) => {
    updateQuestion({ ...question, correct })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="questionText">Question Text</Label>
        <Textarea
          id="questionText"
          value={question.text}
          onChange={(e) => updateQuestionText(e.target.value)}
          placeholder="Enter your true/false statement here"
          className="min-h-[100px]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="points">Points</Label>
          <Input
            id="points"
            type="number"
            min="1"
            value={question.points}
            onChange={(e) => updateQuestionPoints(Number.parseInt(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label>Correct Answer</Label>
          <RadioGroup
            value={question.correct ? "true" : "false"}
            onValueChange={(value) => setCorrectAnswer(value === "true")}
            className="flex h-10 items-center space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id="true" />
              <Label htmlFor="true">True</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id="false" />
              <Label htmlFor="false">False</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="explanation">Explanation (Optional)</Label>
        <Textarea
          id="explanation"
          value={question.explanation}
          onChange={(e) => updateExplanation(e.target.value)}
          placeholder="Explain the correct answer (shown after quiz completion)"
        />
      </div>
    </div>
  )
}

interface FillBlankEditorProps {
  question: FillInTheBlankQuestionType
  updateQuestion: (question: QuestionType) => void
}

function FillBlankEditor({ question, updateQuestion }: FillBlankEditorProps) {
  const updateQuestionText = (text: string) => {
    updateQuestion({ ...question, text })
  }

  const updateQuestionPoints = (points: number) => {
    updateQuestion({ ...question, points })
  }

  const updateExplanation = (explanation: string) => {
    updateQuestion({ ...question, explanation })
  }

  const updateBlankAnswer = (id: string, answer: string) => {
    const updatedBlanks = question.blanks.map((blank) => (blank.id === id ? { ...blank, answer } : blank))
    updateQuestion({ ...question, blanks: updatedBlanks })
  }

  const addBlank = () => {
    const newBlank = { id: uuidv4(), answer: "" }
    updateQuestion({ ...question, blanks: [...question.blanks, newBlank] })
  }

  const removeBlank = (id: string) => {
    if (question.blanks.length <= 1) {
      return // Maintain at least 1 blank
    }

    const updatedBlanks = question.blanks.filter((blank) => blank.id !== id)
    updateQuestion({ ...question, blanks: updatedBlanks })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="questionText">Question Text</Label>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            Use [blank] to indicate where blanks should appear in your text.
          </p>
          <Textarea
            id="questionText"
            value={question.text}
            onChange={(e) => updateQuestionText(e.target.value)}
            placeholder="The capital of France is [blank]."
            className="min-h-[100px]"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="points">Points</Label>
        <Input
          id="points"
          type="number"
          min="1"
          value={question.points}
          onChange={(e) => updateQuestionPoints(Number.parseInt(e.target.value))}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Correct Answers for Blanks</Label>
          <Button type="button" variant="outline" size="sm" onClick={addBlank}>
            <Plus className="mr-1 h-3 w-3" />
            Add Blank
          </Button>
        </div>

        <div className="space-y-2">
          {question.blanks.map((blank, index) => (
            <div key={blank.id} className="flex items-center space-x-2">
              <div className="flex-shrink-0 w-24 text-sm font-medium">Blank {index + 1}:</div>

              <Input
                value={blank.answer}
                onChange={(e) => updateBlankAnswer(blank.id, e.target.value)}
                placeholder="Correct answer"
                className="flex-1"
              />

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeBlank(blank.id)}
                disabled={question.blanks.length <= 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="explanation">Explanation (Optional)</Label>
        <Textarea
          id="explanation"
          value={question.explanation}
          onChange={(e) => updateExplanation(e.target.value)}
          placeholder="Explain the correct answers (shown after quiz completion)"
        />
      </div>
    </div>
  )
}


interface ShortAnswerEditorProps {
  question: ShortAnswerQuestionType
  updateQuestion: (question: QuestionType) => void
}

function ShortAnswerEditor({ question, updateQuestion }: ShortAnswerEditorProps) {
  const updateQuestionText = (text: string) => {
    updateQuestion({ ...question, text })
  }

  const updateQuestionPoints = (points: number) => {
    updateQuestion({ ...question, points })
  }

  const updateExplanation = (explanation: string) => {
    updateQuestion({ ...question, explanation })
  }

  const toggleCaseSensitive = () => {
    updateQuestion({ ...question, caseSensitive: !question.caseSensitive })
  }

  const updateAcceptableAnswer = (index: number, value: string) => {
    const updatedAnswers = [...question.acceptableAnswers]
    updatedAnswers[index] = value
    updateQuestion({ ...question, acceptableAnswers: updatedAnswers })
  }

  const addAcceptableAnswer = () => {
    updateQuestion({
      ...question,
      acceptableAnswers: [...question.acceptableAnswers, ""],
    })
  }

  const removeAcceptableAnswer = (index: number) => {
    if (question.acceptableAnswers.length <= 1) {
      return // Maintain at least 1 acceptable answer
    }

    const updatedAnswers = question.acceptableAnswers.filter((_, i) => i !== index)
    updateQuestion({ ...question, acceptableAnswers: updatedAnswers })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="questionText">Question Text</Label>
        <Textarea
          id="questionText"
          value={question.text}
          onChange={(e) => updateQuestionText(e.target.value)}
          placeholder="Enter your short answer question here"
          className="min-h-[100px]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="points">Points</Label>
          <Input
            id="points"
            type="number"
            min="1"
            value={question.points}
            onChange={(e) => updateQuestionPoints(Number.parseInt(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="caseSensitive">Case Sensitivity</Label>
          <div className="flex items-center space-x-2 h-10">
            <Switch id="caseSensitive" checked={question.caseSensitive} onCheckedChange={toggleCaseSensitive} />
            <span>{question.caseSensitive ? "Case sensitive answers" : "Case insensitive answers"}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Acceptable Answers</Label>
          <Button type="button" variant="outline" size="sm" onClick={addAcceptableAnswer}>
            <Plus className="mr-1 h-3 w-3" />
            Add Answer
          </Button>
        </div>

        <div className="space-y-2">
          {question.acceptableAnswers.map((answer, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                value={answer}
                onChange={(e) => updateAcceptableAnswer(index, e.target.value)}
                placeholder={`Acceptable answer ${index + 1}`}
                className="flex-1"
              />

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeAcceptableAnswer(index)}
                disabled={question.acceptableAnswers.length <= 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="explanation">Explanation (Optional)</Label>
        <Textarea
          id="explanation"
          value={question.explanation}
          onChange={(e) => updateExplanation(e.target.value)}
          placeholder="Explain the correct answer (shown after quiz completion)"
        />
      </div>
    </div>
  )
}

// Quiz Preview Component
interface QuizPreviewProps {
  quiz: QuizType
}

function QuizPreview({ quiz }: QuizPreviewProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{quiz.topic || "Untitled Quiz"}</CardTitle>
          <CardDescription>{quiz.description || "No description provided."}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Category</p>
              <p>{quiz.category || "Uncategorized"}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Difficulty</p>
              <p className="capitalize">{quiz.difficulty}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Time Limit</p>
              <p>{quiz.timeLimit} minutes</p>
            </div>
            <div>
              <p className="text-sm font-medium">Passing Score</p>
              <p>{quiz.passingScore}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {quiz.questions.map((question, index) => (
          <Card key={question.id}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="mr-2">Question {index + 1}</span>
                <Badge variant="outline" className="ml-auto">
                  {question.points} {question.points === 1 ? "point" : "points"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="font-medium">{question.text || "Untitled Question"}</p>

                {question.type === "Multiple Choice" && (
                  <div className="space-y-2">
                    {question.options.map((option, optIndex) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        {question.multipleCorrect ? (
                          <Checkbox disabled checked={option.isCorrect} />
                        ) : (
                          <RadioGroup value={question.options.find((o) => o.isCorrect)?.id || ""}>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value={option.id} disabled checked={option.isCorrect} />
                            </div>
                          </RadioGroup>
                        )}
                        <span>{option.text || `Option ${optIndex + 1}`}</span>
                      </div>
                    ))}
                  </div>
                )}

                {question.type === "true or false" && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroup value={question.correct ? "true" : "false"}>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" disabled />
                            <Label>True</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="false" disabled />
                            <Label>False</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                )}

                {question.type === "fill in the blank" && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Fill in the blanks with the correct answers.</p>
                    <div className="space-y-2">
                      {question.blanks.map((blank, blankIndex) => (
                        <div key={blank.id} className="flex items-center space-x-2">
                          <div className="flex-shrink-0 w-24 text-sm font-medium">Blank {blankIndex + 1}:</div>
                          <div className="border rounded-md px-3 py-2 bg-muted/50">
                            {blank.answer || "No answer provided"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {question.type === "Short Answer" && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Provide a short answer to this question.</p>
                    <div className="border rounded-md px-3 py-2 bg-muted/50">
                      <p className="font-medium">Acceptable answers:</p>
                      <ul className="list-disc list-inside">
                        {question.acceptableAnswers.map((answer, ansIndex) => (
                          <li key={ansIndex}>{answer || "No answer provided"}</li>
                        ))}
                      </ul>
                      <p className="text-sm mt-1">
                        {question.caseSensitive ? "Answers are case sensitive" : "Answers are not case sensitive"}
                      </p>
                    </div>
                  </div>
                )}

                {question.explanation && (
                  <div className="mt-4 p-3 bg-muted/30 rounded-md">
                    <p className="text-sm font-medium">Correct Answer:</p>
                    <p className="text-sm">{question.explanation}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

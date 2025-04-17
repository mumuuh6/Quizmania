"use client";

import { useState } from "react";
import { format, isValid } from "date-fns";
import {
  CheckCircle,
  XCircle,
  Clock,
  Award,
  BookOpen,
  BarChart3,
  Loader2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useQuizData } from "@/app/hook/use-quiz-data";

export default function QuizDetailsPage() {
  const params = useParams();
  const quizId = params.id as string;
  const { data: quizData, isLoading, isError, error } = useQuizData(quizId);
  const [activeTab, setActiveTab] = useState("summary");

  // Handle loading state
  if (isLoading) {
    return (
      <div className="container mx-auto py-16 px-4 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 text-brand animate-spin mb-4" />
        <h2 className="text-xl font-medium text-center">
          Loading quiz details...
        </h2>
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error instanceof Error
              ? error.message
              : "Failed to load quiz details. Please try again."}
          </AlertDescription>
        </Alert>
        <Button onClick={() => window.history.back()} variant="outline">
          Go Back
        </Button>
      </div>
    );
  }

  // If we have data, render the quiz details
  if (!quizData) return null;

  const score =
    (quizData.correctQuizAnswer / quizData.parsedQuizData.length) * 100;
  const formattedDate = isValid(new Date(quizData.quizCriteria.created))
    ? format(new Date(quizData.quizCriteria.created), "dd MMM yyyy")
    : "Invalid Date";

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Quiz Details Results
      </h1>

      {/* Quiz Metadata Card */}
      <Card className="mb-8">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">
            {quizData.quizCriteria.topic.charAt(0).toUpperCase() +
              quizData.quizCriteria.topic.slice(1)}{" "}
            Quiz
          </CardTitle>
          <CardDescription>Completed on {formattedDate}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-brand" />
              <span className="font-medium">Topic:</span>
              <Badge variant="outline" className="capitalize">
                {quizData.quizCriteria.topic}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-brand" />
              <span className="font-medium">Difficulty:</span>
              <Badge variant="outline" className="capitalize">
                {quizData.quizCriteria.difficulty}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-brand" />
              <span className="font-medium">Time Limit:</span>{" "}
              {quizData.quizCriteria.timeLimit} minutes
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Score Summary */}
      <Card className="mb-8 overflow-hidden pb-6 pt-0">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Your Score</h2>
              <p>
                {quizData.correctQuizAnswer} correct out of{" "}
                {quizData.parsedQuizData.length} questions
              </p>
            </div>
            <div className="text-5xl font-bold mt-4 md:mt-0">
              {Math.round(score)}%
            </div>
          </div>
          <Progress value={score} className="h-2 mt-4 bg-white/20" />
        </div>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Correct</p>
                <p className="text-xl font-bold">
                  {quizData.correctQuizAnswer}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
                <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Incorrect</p>
                <p className="text-xl font-bold">{quizData.wrongQuizAnswer}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-[#F0EBFF] dark:bg-[#884CEE]/20 p-3 rounded-full">
                <Award className="h-6 w-6 text-brand" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="text-xl font-bold capitalize">
                  {quizData.status}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Questions Tabs */}
      <Tabs
        defaultValue="summary"
        value={activeTab}
        onValueChange={setActiveTab}
        className="mb-8"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="summary"
            className={`${
              activeTab === "summary"
                ? "!bg-[#884CEE] !text-white !border !border-[#884CEE]"
                : "border border-transparent"
            }`}
          >
            Summary
          </TabsTrigger>
          <TabsTrigger
            value="questions"
            className={`${
              activeTab === "questions"
                ? "!bg-[#884CEE] !text-white !border !border-[#884CEE]"
                : "border border-transparent"
            }`}
          >
            Questions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Summary</CardTitle>
              <CardDescription>
                Overview of your performance on this quiz
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2">Quiz Details</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">
                          Quiz Type:
                        </span>
                        <span className="font-medium uppercase">
                          {quizData.quizCriteria.quizType}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">
                          Questions:
                        </span>
                        <span className="font-medium">
                          {quizData.quizCriteria.quantity}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">
                          Time Limit:
                        </span>
                        <span className="font-medium">
                          {quizData.quizCriteria.timeLimit} minutes
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Performance</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">
                          Correct Answers:
                        </span>
                        <span className="font-medium">
                          {quizData.correctQuizAnswer}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">
                          Wrong Answers:
                        </span>
                        <span className="font-medium">
                          {quizData.wrongQuizAnswer}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Score:</span>
                        <span className="font-medium">
                          {Math.round(score)}%
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questions" className="mt-6 space-y-6">
          {quizData.parsedQuizData.map((question, index) => (
            <Card
              key={index}
              className={
                question.status === "correct"
                  ? "border-green-200 dark:border-green-800"
                  : "border-red-200 dark:border-red-800"
              }
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-medium">
                    Question {index + 1}
                  </CardTitle>
                  {question.status === "correct" ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-900">
                      Correct
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-900">
                      Incorrect
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-medium">{question.question}</p>

                <div className="space-y-2">
                  {question.options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      className={`p-3 rounded-md border ${
                        option === question.answer &&
                        option === question.userAnswer
                          ? "bg-green-100 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                          : option === question.answer
                          ? "bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-800"
                          : option === question.userAnswer &&
                            question.status === "wrong"
                          ? "bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800"
                          : "bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700"
                      }`}
                    >
                      <div className="flex justify-between">
                        <span>{option}</span>
                        <div className="flex items-center gap-2">
                          {option === question.answer && (
                            <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                              Correct Answer
                            </span>
                          )}
                          {option === question.userAnswer && (
                            <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                              Your Answer
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <div className="flex justify-center mt-8">
        <Button
          className="bg-brand hover:bg-brand-dark"
          onClick={() => (window.location.href = "/")}
        >
          Take Another Quiz
        </Button>
      </div>
    </div>
  );
}

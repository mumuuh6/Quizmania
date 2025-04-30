"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Timer, AlertCircle, AlertTriangle, Divide } from "lucide-react";
import UseAxiosNormal from "@/app/hook/(axoisSecureNormal)/axiosNormal"
import LottieLoader from '../../../public/loader.json';

import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
const Lottieplayer=dynamic(() => import("lottie-react"), { ssr: false });
// const Lottieplayerv2=()=>{
//   return <Lottieplayer animationData={LottieLoader} loop={true}></Lottieplayer>
// }
export default function QuizPage() {
  const searchParams = useSearchParams();
  const axiosInstanceNormal=UseAxiosNormal()
  const router = useRouter();
  const difficulty = searchParams.get("difficulty") || "easy";
  const subject = searchParams.get("topic") || "general-knowledge";
  // const quantity = Number.parseInt(searchParams.get("questions") || "5");
  const timeLimit = Number.parseInt(searchParams.get("time") || "5") * 60;
  const quizSetId = searchParams.get("quizSetId") || "1";
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const { data: session } = useSession();
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [viewResult, setViewResult] = useState(false);
  const [viewQues, setViewQues] = useState([])
  const [teacherCreated, setTeacherCreated] = useState(false);
  
  
    useEffect(() => {
    
    const fetchQuizData =async()=>{
      try {
        const response = await axiosInstanceNormal.get(`/get-quiz-set/${quizSetId}`);
        const quizData = response.data?.parsedQuizData || [];
        if(!quizData.length){
          const fallbackres=await axiosInstanceNormal.get(`/teacher/generate-quiz/${quizSetId}`);
          const fallbackData = fallbackres.data?.parsedQuizData || [];
          console.log("Fallback quiz data fetched successfully:", fallbackData);
          setQuestions(fallbackData);
          setTeacherCreated(true);
          setLoading(false);
        }
        else{
          console.log("Quiz data fetched successfully:", quizData);
          setQuestions(quizData);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
        setLoading(false);
      }
    }
    fetchQuizData();


    // Set up timer
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          calculateScore();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizSetId]);
  
  const handleAnswerSelect = (index: number, answer: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [index]: answer, // Store answer based on question index
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      calculateScore();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };
  const handleviewquestion = () => {
    setViewResult(!viewResult)
  }
  const calculateScore = () => {
    const answers = questions.map((question, index) => ({
      question: question.question,
      type: question.type,
      userAnswer: selectedAnswers[index] || null, // Use index instead of question.id
    }));

    console.log("Answers:", answers);
    setQuizCompleted(true);

    const payload = {
      user: session?.user?.email,
      id: quizSetId,
      answers: answers,
    };

    console.log("Payload:", JSON.stringify(payload));
    setLoading(true);
    const endpoint=teacherCreated?`/answer/checking?teacherCreated=${teacherCreated}`:"/answer/checking";

    axiosInstanceNormal
      .post(endpoint, payload)
      .then((res) => {
        console.log("Score and answers submitted successfully:", res.data);
                if(!res.data.status){
                   toast.error(res.data.message);
                   router.push("/dashboard")
                   return 
                }
        setScore(res.data.quizSet.correctQuizAnswer);
        const combinedQuizData = res.data?.quizSet?.createdQuiz?.parsedQuizData?.map((question) => {
          // Find the answer object for this question from parsedQuizData.answers
          const answerData = res.data.quizSet.parsedQuizData.answers.find(
            (answer) => answer.question === question.question
          );
        
          return {
            type: question.type,
            question: question.question,
            options: question.options,
            answer: question.answer, // correct answer from created quiz
            status: answerData ? answerData.status : "", // status from user's answer
            userAnswer: answerData ? answerData.userAnswer : "", // user's selected answer
          };
        });
        
        
        setViewQues(teacherCreated ? combinedQuizData : res.data.quizSet.parsedQuizData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error submitting score and answers:", error);

        setLoading(false);
      });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };
  
  if (loading) {
    return <div className="w-sm md:w-xl mx-auto">
      <Lottieplayer animationData={LottieLoader} loop={true} />
    </div>;
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
    );
  }
  
  if (quizCompleted) {
    return (
      <div className="container mx-auto py-10">
        <Card className="md:w-4/5 mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Quiz Results</CardTitle>
            <CardDescription className="text-md">
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

                  <AlertDescription className="text-primary flex justify-center"> <AlertCircle className="h-4 w-4 text-primary flex justify-center items-center py-1" /><span>Perfect score! Congratulations!</span></AlertDescription>
                </Alert>
              ) : score >= questions.length * 0.7 ? (
                <Alert className="bg-primary/10 border-primary/30">
                  <AlertCircle className="h-4 w-4 text-primary" />
                  <AlertDescription className="text-primary flex justify-center py-1">Great job! You did well on this quiz.</AlertDescription>
                </Alert>
              ) : (
                <Alert className=" ">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className=" flex justify-center py-1">
                    Keep practicing! You will improve with more quizzes.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col justify-between gap-6">
            <Button onClick={() => router.push("/Quizzes/create")} className="w-full py-6 cursor-pointer">
              Create Another Quiz
            </Button>
            <button className="w-full" onClick={handleviewquestion}>
              <Alert className="bg-primary/10 border-primary/30 ">
                <AlertDescription className="text-primary flex justify-center cursor-pointer">View Results</AlertDescription>
              </Alert>
            </button>
          </CardFooter>
          {
            viewResult && <div className="px-6">
              {viewQues.map((ques, index) => (
                <div key={index} className="container mx-auto py-4 px-8 border-2 rounded-xl my-6  ">
                  <div>
                    <p className="my-2"><span className=" text-md ">Question:{index+1}</span></p>
                    <p className="font-bold text-2xl">{ques.question}</p>
                    
                    {ques.type === 'Multiple Choice' || ques.type ==="True or False" ? (
                      <div className="mt-4">
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {ques.options?.map((option, optionIndex) => {
                          const isSelected = ques.userAnswer === option;
                          const isCorrect = ques.answer === option;

                return (
                  <li
                    key={optionIndex}
                    className={`border-2 rounded-lg px-6 py-4 font-medium transition-colors
                      ${isSelected && isCorrect ? 'border-green-500 shadow-[0px_0px_10px_0px_#008000]' : ''} 
                      ${isSelected && !isCorrect ? 'border-red-500 shadow-[0px_0px_10px_0px_#ff0000]' : ''} 
                      ${!isSelected ? 'border-gray-700' : ''}
                    `}
                  >
                    {String.fromCharCode(65 + optionIndex)}. {option}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
        {ques.type === 'Short Answer'||ques.type === 'fill in the blank'||ques.type ==="fill in the blanks" ? (
          <div className="mt-4">
            <p className="text-xl font-medium">Your Answer: </p>
            <p className="border-2 p-4 rounded-lg mt-2">{ques.userAnswer || "No answer provided."}</p>
          </div>
        ) : null}
                  </div>
                  {
                    ques.type === "Multiple Choice" || ques.type === "True or False" ? 
                    (<div className="mt-4">
                      {ques.userAnswer === ques.answer ? (
                        <span className="text-green-600 ">Your answer is Correct </span>
                      ) : (
                        
                        <p className="flex flex-col "><span className="font-bold text-xl mb-2">Correct Answer is: {String.fromCharCode(65 + ques.options.indexOf(ques.answer))}</span> 
                        <span className="text-red-600">Your Answer is Wrong</span></p>
                      )}
                    </div>):
                    ques.type === "Short Answer"||ques.type === "fill in the blank"  ||ques.type ==="fill in the blanks"?(
                      <div className="mt-4">
                        {ques.status==="correct" ? (
                          <span className="text-green-600 ">Your answer is Correct </span>
                        ) : (
                          <p className="flex flex-col "><span className="font-bold text-xl mb-2">Correct Answer is: {ques.answer}</span> 
                          <span className="text-red-600">Your Answer is Wrong</span></p>
                        )}
                      </div>
                    ):(<div>p</div>)
                  }

                </div>
              ))}

            </div>
          }
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
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
                Level:{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} 
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-md">
              <Timer className="h-4 w-4" />
              <span className="font-mono">{formatTime(timeRemaining)}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-medium mb-4">{currentQuestion.question}</h3>
          {
            currentQuestion?.type=='Multiple Choice'||currentQuestion?.type=="True or False"||currentQuestion?.type=="True or False"?(
              <RadioGroup value={selectedAnswers[currentQuestionIndex] || ""} onValueChange={(value) => handleAnswerSelect(currentQuestionIndex, value)}>
            {
            currentQuestion?.options?.map((option: string,index:number) => (
              <div key={index} className={`flex items-center space-x-2 rounded-lg border p-4 transition-colors ${selectedAnswers[currentQuestion.id] === option
                ? "bg-primary/5 border-primary"
                : "hover:bg-muted/50"
                }` 
                }
                onClick={() => handleAnswerSelect(currentQuestionIndex, option)}>
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option}>{String.fromCharCode(65 + index)}.   {option}</Label>
              </div>
              
            ))}
          </RadioGroup>
            ):currentQuestion?.type === "Short Answer" ? (
              <div>
                <input
                  type="text"
                  value={selectedAnswers[currentQuestionIndex] || ""}
                  onChange={(e) => handleAnswerSelect(currentQuestionIndex, e.target.value)}
                  placeholder="Type your answer here"
                  className="border p-4 rounded-lg w-full"
                />
              </div>
            ) : currentQuestion?.type === "fill in the blank"||currentQuestion?.type ==="fill in the blanks" ? (
              <div>
                <input
                  type="text"
                  value={selectedAnswers[currentQuestionIndex] || ""}
                  onChange={(e) => handleAnswerSelect(currentQuestionIndex, e.target.value)}
                  placeholder="fill in the blank"
                  className="border p-4 rounded-lg w-full"
                />
              </div>
            ) : (
              <div>mumu</div>
            )
          }
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>Previous</Button>
          <Button onClick={handleNext} disabled={!selectedAnswers[currentQuestionIndex]}>Next</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

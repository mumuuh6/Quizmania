"use client";
import { Brain, Clock, Tag } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import path from "path";
import axios from "axios";
import { time } from "console";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface QuizCardProps {
  
  topic: string;
  description: string;
  category: string;
  timeLimit: string;
  difficulty: string;
  quizType: string;
  quantity: number;
  className?: string;
}

export function QuizCard({
  
  topic,
  description,
  category,
  timeLimit,
  difficulty,
  quizType,
  quantity,
  className,
}: QuizCardProps) {
  const [loading, setLoading] = useState(false);
  const [quizSetId, setQuizSetId] = useState(null);
  const {data: session} = useSession();
  const Router=useRouter();
  const handlestartQuiz = async() => {
   setLoading(true);
    const quizCriteria = {
      topic: topic,
      difficulty: difficulty,
      quizType: quizType,
      quantity: quantity,
      timeLimit: timeLimit,
    };
    try{
      const response =await axios.post("https://quiz-mania-iota.vercel.app/generate-quiz",{
        user:session?.user?.email||"",
        quizCriteria: quizCriteria,
      });
      console.log("Response:", response.data);
      const quizSetId = response.data.result.insertedId; // Get the insertedId from the response

      setQuizSetId(quizSetId); // Store the insertedId

      // Wait for quizSetId to be set before redirecting
      Router.push(
        `/Quizzes/quiz?difficulty=${quizCriteria.difficulty}&topic=${quizCriteria.topic}&questions=${quizCriteria.quantity}&time=${quizCriteria.timeLimit}&quizSetId=${quizSetId}`
      );
    }
    catch(error){
      console.error("Error:", error);
    }
    finally{
      setLoading(false);
    }
  }
  return (
    <Card className={cn("h-full overflow-hidden", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="flex items-center gap-1">
            <Tag className="h-3 w-3" />
            {category}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {timeLimit}
          </Badge>
        </div>
        <CardTitle className="line-clamp-1">{topic}</CardTitle>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm text-muted-foreground">
          <Brain className="mr-1 h-4 w-4" /> {quantity} quantity | Level:{difficulty} | Type: {quizType.toUpperCase()}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handlestartQuiz} disabled={loading}>{loading ? "Starting Quiz..." : "Start Quiz"}</Button>
      </CardFooter>
    </Card>
  );
}

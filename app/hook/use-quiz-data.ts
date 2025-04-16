import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface QuizOption {
  type: string;
  question: string;
  options: string[];
  answer: string;
  status: "correct" | "wrong";
  userAnswer: string;
}

export interface QuizData {
  _id: string;
  user: string;
  quizCriteria: {
    difficulty: string;
    topic: string;
    quizType: string;
    quantity: number;
    timeLimit: number;
    created: string;
  };
  parsedQuizData: QuizOption[];
  correctQuizAnswer: number;
  status: string;
  wrongQuizAnswer: number;
}

async function fetchQuizData(id: string): Promise<QuizData> {
  const response = await axios.get(
    `https://quiz-mania-iota.vercel.app/get-quiz-set/${id}`
  );

  return response.data;
}

export function useQuizData(id: string) {
  return useQuery({
    queryKey: ["quiz", id],
    queryFn: () => fetchQuizData(id),
    enabled: !!id,
  });
}

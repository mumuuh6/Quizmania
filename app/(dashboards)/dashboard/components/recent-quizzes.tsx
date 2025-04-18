"use client";

import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosNormal from "@/app/hook/(axoisSecureNormal)/axiosNormal";

interface QuizItem {
  _id: string;
  quizCriteria: {
    topic: string;
    quizType: string;
    difficulty: "easy" | "medium" | "hard";
  };
  correctQuizAnswer: number;
  wrongQuizAnswer: number;
}

export function RecentQuizzes() {
  const { data: session } = useSession();
  const axiosInstanceNormal = UseAxiosNormal();

  const { data: userStats, isLoading, error } = useQuery({
    queryKey: ["userStats", session?.user?.email],
    enabled: !!session?.user?.email, // Only fetch if email exists
    queryFn: async () => {
      const response = await axiosInstanceNormal.get(
        `/user/stats/${session?.user?.email}`
      );
      return response.data;
    },
    // Optional: Define retry behavior or stale time if needed.
  });

  if (isLoading) {
    return <p className="text-muted-foreground">Loading quizzes...</p>;
  }

  if (error) {
    return <p className="text-red-500">Failed to load quizzes.</p>;
  }

  return (
    <div className="space-y-4">
      {Array.isArray(userStats?.solvedQuiz) &&
        userStats?.solvedQuiz.map((quiz) => {
          const total = quiz.correctQuizAnswer + quiz.wrongQuizAnswer;
          const score =
            total > 0 ? Math.round((quiz.correctQuizAnswer / total) * 100) : 0;

          return (
            <div key={quiz._id} className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {quiz.quizCriteria.topic}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-muted-foreground">
                    {quiz.quizCriteria.quizType.toUpperCase()}
                  </p>
                  <Badge
                    variant={
                      quiz.quizCriteria.difficulty === "easy"
                        ? "outline"
                        : quiz.quizCriteria.difficulty === "medium"
                        ? "secondary"
                        : "default"
                    }
                    className="text-[10px] px-1 py-0"
                  >
                    {quiz.quizCriteria.difficulty}
                  </Badge>
                </div>
              </div>
              <div
                className={`font-medium text-sm ${
                  score >= 90
                    ? "text-green-600"
                    : score >= 70
                    ? "text-blue-600"
                    : "text-orange-600"
                }`}
              >
                {score}%
              </div>
            </div>
          );
        })}
    </div>
  );
}

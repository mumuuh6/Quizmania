"use client";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

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
  const [userStats, setUserStats] = useState<{ solvedQuiz: QuizItem[] } | null>(
    null
  );

  useEffect(() => {
    const fetchStats = async () => {
      if (!session?.user?.email) return;
      try {
        const response = await axios.get(
          `https://quiz-mania-iota.vercel.app/user/stats/${session.user.email}`
        );
        setUserStats(response.data);
      } catch (err) {
        console.error("Failed to fetch user stats:", err);
      }
    };

    fetchStats();
  }, [session?.user?.email]);

  return (
    <div className="space-y-4">
      {Array.isArray(userStats?.solvedQuiz) &&
        userStats?.solvedQuiz?.map((quiz) => {
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

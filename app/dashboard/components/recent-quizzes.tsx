import { Badge } from "@/components/ui/badge"

interface QuizItem {
  id: string
  title: string
  category: string
  score: number
  date: string
  difficulty: "easy" | "medium" | "hard"
}

const recentQuizzes: QuizItem[] = [
  {
    id: "q1",
    title: "Basic Mathematics",
    category: "Math",
    score: 85,
    date: "2 days ago",
    difficulty: "easy",
  },
  {
    id: "q2",
    title: "World Geography",
    category: "Geography",
    score: 76,
    date: "3 days ago",
    difficulty: "medium",
  },
  {
    id: "q3",
    title: "Computer Science Fundamentals",
    category: "Computer",
    score: 95,
    date: "5 days ago",
    difficulty: "hard",
  },
  {
    id: "q4",
    title: "English Literature",
    category: "English",
    score: 88,
    date: "1 week ago",
    difficulty: "medium",
  },
  {
    id: "q5",
    title: "World History",
    category: "History",
    score: 92,
    date: "1 week ago",
    difficulty: "medium",
  },
]

export function RecentQuizzes() {
  return (
    <div className="space-y-4">
      {recentQuizzes.map((quiz) => (
        <div key={quiz.id} className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{quiz.title}</p>
            <div className="flex items-center gap-2">
              <p className="text-xs text-muted-foreground">{quiz.category}</p>
              <Badge
                variant={
                  quiz.difficulty === "easy" ? "outline" : quiz.difficulty === "medium" ? "secondary" : "default"
                }
                className="text-[10px] px-1 py-0"
              >
                {quiz.difficulty}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{quiz.date}</p>
          </div>
          <div
            className={`font-medium text-sm ${
              quiz.score >= 90 ? "text-green-600" : quiz.score >= 70 ? "text-blue-600" : "text-orange-600"
            }`}
          >
            {quiz.score}%
          </div>
        </div>
      ))}
    </div>
  )
}

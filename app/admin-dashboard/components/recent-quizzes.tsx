import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Edit, Trash2 } from "lucide-react"

interface QuizItem {
  id: string
  title: string
  category: string
  author: string
  status: "published" | "draft" | "archived"
  createdAt: string
  questions: number
  difficulty: "easy" | "medium" | "hard"
}

const recentQuizzes: QuizItem[] = [
  {
    id: "q1",
    title: "Basic Mathematics",
    category: "Math",
    author: "John Doe",
    status: "published",
    createdAt: "2023-06-15",
    questions: 20,
    difficulty: "easy",
  },
  {
    id: "q2",
    title: "World Geography",
    category: "Geography",
    author: "Sarah Johnson",
    status: "published",
    createdAt: "2023-06-12",
    questions: 25,
    difficulty: "medium",
  },
  {
    id: "q3",
    title: "Computer Science Fundamentals",
    category: "Computer",
    author: "Michael Brown",
    status: "draft",
    createdAt: "2023-06-08",
    questions: 30,
    difficulty: "hard",
  },
  {
    id: "q4",
    title: "English Literature",
    category: "English",
    author: "Emily Wilson",
    status: "published",
    createdAt: "2023-06-05",
    questions: 20,
    difficulty: "medium",
  },
  {
    id: "q5",
    title: "World History",
    category: "History",
    author: "Robert Garcia",
    status: "archived",
    createdAt: "2023-06-01",
    questions: 25,
    difficulty: "medium",
  },
]

export function RecentQuizzes() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Questions</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentQuizzes.map((quiz) => (
            <TableRow key={quiz.id}>
              <TableCell className="font-medium">{quiz.title}</TableCell>
              <TableCell>{quiz.category}</TableCell>
              <TableCell>{quiz.author}</TableCell>
              <TableCell>
                <Badge
                  variant={quiz.status === "published" ? "default" : quiz.status === "draft" ? "secondary" : "outline"}
                  className="capitalize"
                >
                  {quiz.status}
                </Badge>
              </TableCell>
              <TableCell>{quiz.questions}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    quiz.difficulty === "easy" ? "outline" : quiz.difficulty === "medium" ? "secondary" : "default"
                  }
                  className="capitalize"
                >
                  {quiz.difficulty}
                </Badge>
              </TableCell>
              <TableCell>{quiz.createdAt}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

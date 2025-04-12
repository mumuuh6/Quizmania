"use client"

import { useState } from "react"
import { Search, Filter, PlusCircle, Edit, Trash2, MoreHorizontal, Eye, Copy, FileQuestion } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Quiz {
  id: string
  title: string
  category: string
  author: string
  status: "published" | "draft" | "archived"
  createdAt: string
  updatedAt: string
  questions: number
  difficulty: "easy" | "medium" | "hard"
  completions: number
  avgScore: number
}

const quizzes: Quiz[] = [
  {
    id: "q1",
    title: "Basic Mathematics",
    category: "Math",
    author: "John Doe",
    status: "published",
    createdAt: "2023-06-15",
    updatedAt: "2023-06-15",
    questions: 20,
    difficulty: "easy",
    completions: 245,
    avgScore: 78,
  },
  {
    id: "q2",
    title: "World Geography",
    category: "Geography",
    author: "Sarah Johnson",
    status: "published",
    createdAt: "2023-06-12",
    updatedAt: "2023-06-14",
    questions: 25,
    difficulty: "medium",
    completions: 187,
    avgScore: 72,
  },
  {
    id: "q3",
    title: "Computer Science Fundamentals",
    category: "Computer",
    author: "Michael Brown",
    status: "draft",
    createdAt: "2023-06-08",
    updatedAt: "2023-06-10",
    questions: 30,
    difficulty: "hard",
    completions: 0,
    avgScore: 0,
  },
  {
    id: "q4",
    title: "English Literature",
    category: "English",
    author: "Emily Wilson",
    status: "published",
    createdAt: "2023-06-05",
    updatedAt: "2023-06-07",
    questions: 20,
    difficulty: "medium",
    completions: 156,
    avgScore: 81,
  },
  {
    id: "q5",
    title: "World History",
    category: "History",
    author: "Robert Garcia",
    status: "archived",
    createdAt: "2023-06-01",
    updatedAt: "2023-06-03",
    questions: 25,
    difficulty: "medium",
    completions: 98,
    avgScore: 75,
  },
  {
    id: "q6",
    title: "Advanced Mathematics",
    category: "Math",
    author: "Jennifer Lee",
    status: "published",
    createdAt: "2023-05-28",
    updatedAt: "2023-06-02",
    questions: 30,
    difficulty: "hard",
    completions: 112,
    avgScore: 68,
  },
  {
    id: "q7",
    title: "Biology Basics",
    category: "Science",
    author: "David Miller",
    status: "published",
    createdAt: "2023-05-25",
    updatedAt: "2023-05-27",
    questions: 20,
    difficulty: "easy",
    completions: 203,
    avgScore: 82,
  },
  {
    id: "q8",
    title: "Physics Mechanics",
    category: "Science",
    author: "Lisa Taylor",
    status: "draft",
    createdAt: "2023-05-20",
    updatedAt: "2023-05-22",
    questions: 25,
    difficulty: "hard",
    completions: 0,
    avgScore: 0,
  },
]

export function QuizManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [selectedQuizzes, setSelectedQuizzes] = useState<string[]>([])
  const [isAddQuizOpen, setIsAddQuizOpen] = useState(false)

  // Filter quizzes based on search query and filters
  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || quiz.category === categoryFilter
    const matchesDifficulty = difficultyFilter === "all" || quiz.difficulty === difficultyFilter
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  // Toggle quiz selection
  const toggleQuizSelection = (quizId: string) => {
    setSelectedQuizzes((prev) => (prev.includes(quizId) ? prev.filter((id) => id !== quizId) : [...prev, quizId]))
  }

  // Toggle all quizzes selection
  const toggleAllQuizzes = () => {
    if (selectedQuizzes.length === filteredQuizzes.length) {
      setSelectedQuizzes([])
    } else {
      setSelectedQuizzes(filteredQuizzes.map((quiz) => quiz.id))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Quiz Management</h2>
        <Dialog open={isAddQuizOpen} onOpenChange={setIsAddQuizOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Quiz
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Quiz</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new quiz. You can add questions after creating the quiz.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input id="title" className="col-span-3" placeholder="Enter quiz title" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select>
                  <SelectTrigger id="category" className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="math">Math</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="geography">Geography</SelectItem>
                    <SelectItem value="computer">Computer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="difficulty" className="text-right">
                  Difficulty
                </Label>
                <Select>
                  <SelectTrigger id="difficulty" className="col-span-3">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea id="description" className="col-span-3" placeholder="Enter quiz description" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select>
                  <SelectTrigger id="status" className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Quiz</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search quizzes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 md:w-[300px]"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="h-9 w-[130px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Math">Math</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="History">History</SelectItem>
                  <SelectItem value="Geography">Geography</SelectItem>
                  <SelectItem value="Computer">Computer</SelectItem>
                </SelectContent>
              </Select>
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="h-9 w-[130px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Quizzes ({quizzes.length})</TabsTrigger>
              <TabsTrigger value="published">
                Published ({quizzes.filter((q) => q.status === "published").length})
              </TabsTrigger>
              <TabsTrigger value="draft">Drafts ({quizzes.filter((q) => q.status === "draft").length})</TabsTrigger>
              <TabsTrigger value="archived">
                Archived ({quizzes.filter((q) => q.status === "archived").length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]">
                        <Checkbox
                          checked={selectedQuizzes.length === filteredQuizzes.length && filteredQuizzes.length > 0}
                          onCheckedChange={toggleAllQuizzes}
                        />
                      </TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Questions</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead>Completions</TableHead>
                      <TableHead>Avg. Score</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredQuizzes.map((quiz) => (
                      <TableRow key={quiz.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedQuizzes.includes(quiz.id)}
                            onCheckedChange={() => toggleQuizSelection(quiz.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{quiz.title}</TableCell>
                        <TableCell>{quiz.category}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              quiz.status === "published"
                                ? "default"
                                : quiz.status === "draft"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="capitalize"
                          >
                            {quiz.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{quiz.questions}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              quiz.difficulty === "easy"
                                ? "outline"
                                : quiz.difficulty === "medium"
                                  ? "secondary"
                                  : "default"
                            }
                            className="capitalize"
                          >
                            {quiz.difficulty}
                          </Badge>
                        </TableCell>
                        <TableCell>{quiz.completions}</TableCell>
                        <TableCell>
                          {quiz.avgScore > 0 ? (
                            <span
                              className={
                                quiz.avgScore >= 80
                                  ? "text-green-600 font-medium"
                                  : quiz.avgScore >= 60
                                    ? "text-blue-600 font-medium"
                                    : "text-orange-600 font-medium"
                              }
                            >
                              {quiz.avgScore}%
                            </span>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Quiz
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Quiz
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileQuestion className="mr-2 h-4 w-4" />
                                Manage Questions
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="mr-2 h-4 w-4" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Quiz
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="published">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]">
                        <Checkbox />
                      </TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Questions</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead>Completions</TableHead>
                      <TableHead>Avg. Score</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quizzes
                      .filter((quiz) => quiz.status === "published")
                      .map((quiz) => (
                        <TableRow key={quiz.id}>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell className="font-medium">{quiz.title}</TableCell>
                          <TableCell>{quiz.category}</TableCell>
                          <TableCell>
                            <Badge variant="default" className="capitalize">
                              {quiz.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{quiz.questions}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                quiz.difficulty === "easy"
                                  ? "outline"
                                  : quiz.difficulty === "medium"
                                    ? "secondary"
                                    : "default"
                              }
                              className="capitalize"
                            >
                              {quiz.difficulty}
                            </Badge>
                          </TableCell>
                          <TableCell>{quiz.completions}</TableCell>
                          <TableCell>
                            <span
                              className={
                                quiz.avgScore >= 80
                                  ? "text-green-600 font-medium"
                                  : quiz.avgScore >= 60
                                    ? "text-blue-600 font-medium"
                                    : "text-orange-600 font-medium"
                              }
                            >
                              {quiz.avgScore}%
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="draft">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]">
                        <Checkbox />
                      </TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Questions</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quizzes
                      .filter((quiz) => quiz.status === "draft")
                      .map((quiz) => (
                        <TableRow key={quiz.id}>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell className="font-medium">{quiz.title}</TableCell>
                          <TableCell>{quiz.category}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="capitalize">
                              {quiz.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{quiz.questions}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                quiz.difficulty === "easy"
                                  ? "outline"
                                  : quiz.difficulty === "medium"
                                    ? "secondary"
                                    : "default"
                              }
                              className="capitalize"
                            >
                              {quiz.difficulty}
                            </Badge>
                          </TableCell>
                          <TableCell>{quiz.updatedAt}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="archived">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]">
                        <Checkbox />
                      </TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Questions</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead>Archived Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quizzes
                      .filter((quiz) => quiz.status === "archived")
                      .map((quiz) => (
                        <TableRow key={quiz.id}>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell className="font-medium">{quiz.title}</TableCell>
                          <TableCell>{quiz.category}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {quiz.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{quiz.questions}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                quiz.difficulty === "easy"
                                  ? "outline"
                                  : quiz.difficulty === "medium"
                                    ? "secondary"
                                    : "default"
                              }
                              className="capitalize"
                            >
                              {quiz.difficulty}
                            </Badge>
                          </TableCell>
                          <TableCell>{quiz.updatedAt}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

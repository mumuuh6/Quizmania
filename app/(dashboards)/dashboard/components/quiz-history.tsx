"use client"

import { useState } from "react"
import { Calendar, Eye, Search, SlidersHorizontal, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { DatePickerWithRange } from "./date-range-picker"

// Sample quiz history data
const quizHistoryData = [
  {
    id: "q1",
    title: "Basic Mathematics",
    category: "Math",
    difficulty: "easy",
    score: 85,
    totalQuestions: 20,
    correctAnswers: 17,
    date: "2023-06-15T14:30:00",
    timeSpent: "12:45",
  },
  {
    id: "q2",
    title: "World Geography",
    category: "Geography",
    difficulty: "medium",
    score: 76,
    totalQuestions: 25,
    correctAnswers: 19,
    date: "2023-06-12T10:15:00",
    timeSpent: "18:22",
  },
  {
    id: "q3",
    title: "Computer Science Fundamentals",
    category: "Computer",
    difficulty: "hard",
    score: 95,
    totalQuestions: 30,
    correctAnswers: 28,
    date: "2023-06-08T16:45:00",
    timeSpent: "24:10",
  },
  {
    id: "q4",
    title: "English Literature",
    category: "English",
    difficulty: "medium",
    score: 88,
    totalQuestions: 20,
    correctAnswers: 17,
    date: "2023-06-05T09:30:00",
    timeSpent: "15:35",
  },
  {
    id: "q5",
    title: "World History",
    category: "History",
    difficulty: "medium",
    score: 92,
    totalQuestions: 25,
    correctAnswers: 23,
    date: "2023-06-01T13:20:00",
    timeSpent: "19:45",
  },
  {
    id: "q6",
    title: "Advanced Mathematics",
    category: "Math",
    difficulty: "hard",
    score: 78,
    totalQuestions: 30,
    correctAnswers: 23,
    date: "2023-05-28T11:10:00",
    timeSpent: "28:15",
  },
  {
    id: "q7",
    title: "Biology Basics",
    category: "Science",
    difficulty: "easy",
    score: 82,
    totalQuestions: 20,
    correctAnswers: 16,
    date: "2023-05-25T15:40:00",
    timeSpent: "14:20",
  },
  {
    id: "q8",
    title: "Physics Mechanics",
    category: "Science",
    difficulty: "hard",
    score: 75,
    totalQuestions: 25,
    correctAnswers: 19,
    date: "2023-05-20T10:30:00",
    timeSpent: "22:50",
  },
]

export function QuizHistory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")

  // Filter and sort the quiz history data
  const filteredQuizzes = quizHistoryData
    .filter((quiz) => {
      const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "all" || quiz.category === selectedCategory
      const matchesDifficulty = selectedDifficulty === "all" || quiz.difficulty === selectedDifficulty
      return matchesSearch && matchesCategory && matchesDifficulty
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "desc"
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime()
      } else if (sortBy === "score") {
        return sortOrder === "desc" ? b.score - a.score : a.score - b.score
      } else if (sortBy === "title") {
        return sortOrder === "desc" ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title)
      }
      return 0
    })

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Quiz History</h2>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <Calendar className="mr-2 h-4 w-4" />
                Filter by date
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <DatePickerWithRange />
            </PopoverContent>
          </Popover>
          <Button variant="outline" size="sm" className="h-9">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
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
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSortBy("date")}>
                    <Checkbox checked={sortBy === "date"} className="mr-2" />
                    Date
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("score")}>
                    <Checkbox checked={sortBy === "score"} className="mr-2" />
                    Score
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("title")}>
                    <Checkbox checked={sortBy === "title"} className="mr-2" />
                    Title
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Order</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSortOrder("desc")}>
                    <Checkbox checked={sortOrder === "desc"} className="mr-2" />
                    Descending
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOrder("asc")}>
                    <Checkbox checked={sortOrder === "asc"} className="mr-2" />
                    Ascending
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Quiz</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead className="hidden md:table-cell">Difficulty</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead className="hidden lg:table-cell">Date</TableHead>
                  <TableHead className="hidden lg:table-cell">Time</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuizzes.map((quiz) => (
                  <TableRow key={quiz.id}>
                    <TableCell className="font-medium">{quiz.title}</TableCell>
                    <TableCell className="hidden md:table-cell">{quiz.category}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge
                        variant={
                          quiz.difficulty === "easy"
                            ? "outline"
                            : quiz.difficulty === "medium"
                              ? "secondary"
                              : "default"
                        }
                      >
                        {quiz.difficulty}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span
                        className={
                          quiz.score >= 90
                            ? "text-green-600 font-medium"
                            : quiz.score >= 70
                              ? "text-blue-600 font-medium"
                              : "text-orange-600 font-medium"
                        }
                      >
                        {quiz.score}%
                      </span>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">{formatDate(quiz.date)}</TableCell>
                    <TableCell className="hidden lg:table-cell">{quiz.timeSpent}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View details</span>
                        </Button>
                        <Button variant="ghost" size="sm">
                          Retake
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

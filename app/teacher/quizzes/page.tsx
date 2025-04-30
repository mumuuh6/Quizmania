"use client"
import Link from "next/link"
import { PlusCircle, Search,  Eye, Edit, Trash2, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import UseAxiosNormal from "@/app/hook/(axoisSecureNormal)/axiosNormal"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { useState } from "react"
import BrainLoading from "@/app/components/brain-loading"


export default function TeacherQuizzesPage() {
  const { data: session, status } = useSession();
  const [quizzes, setQuizzes] = useState([])
  const axiosInstanceNormal=UseAxiosNormal();
  const { data, isLoading, error } = useQuery({
    queryKey: ["quizzes"],
    queryFn: async () => {
      const res = await axiosInstanceNormal.get(`/teacher/stats?teacherEmail=${session?.user?.email}`);
      console.log("Quizzes Data:", res.data);
      setQuizzes(res.data.withAttempts)
      return res.data;
    },
    enabled: !!session?.user?.email,
  });
  
  if (isLoading) return <BrainLoading></BrainLoading>;
  console.log("Quiz List:", quizzes);
  return (
    <div className="container py-8 md:w-[95%] mx-auto">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">My Quizzes</h1>
          <Link href="/teacher/create-quiz">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Quiz
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search quizzes..." className="h-9 md:w-[300px]" />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {/* <Select defaultValue="all">
                  <SelectTrigger className="h-9 w-[130px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="math">Math</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="geography">Geography</SelectItem>
                    <SelectItem value="computer">Computer</SelectItem>
                  </SelectContent>
                </Select> */}
                <Select defaultValue="all">
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
                
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All Quizzes ({quizzes.length})</TabsTrigger>
                {/* <TabsTrigger value="published">
                  Published ({quizzes.filter((q) => q.status === "published").length})
                </TabsTrigger>
                <TabsTrigger value="draft">Drafts ({quizzes.filter((q) => q.status === "draft").length})</TabsTrigger>
                <TabsTrigger value="archived">
                  Archived ({quizzes.filter((q) => q.status === "archived").length})
                </TabsTrigger> */}
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        
                        <TableHead>Questions</TableHead>
                        <TableHead>Difficulty</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Attempts</TableHead>
                        {/* <TableHead className="text-right">Actions</TableHead> */}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {quizzes.map((quiz) => (
                        <TableRow key={quiz._id}>
                          <TableCell className="font-medium">{quiz.quizCriteria.topic}</TableCell>
                          <TableCell>{Array.isArray(quiz.quizCriteria.quizType)
  ? quiz.quizCriteria.quizType.join(", ")
  : quiz.quizCriteria.quizType}
</TableCell>
                          
                          <TableCell>{quiz.quizCriteria.quantity}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                quiz.quizCriteria.difficulty === "easy"
                                  ? "outline"
                                  : quiz.quizCriteria.difficulty === "medium"
                                    ? "secondary"
                                    : "default"
                              }
                              className="capitalize"
                            >
                              {quiz.quizCriteria.difficulty}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(quiz.quizCriteria.created).toLocaleDateString()}</TableCell>
                          <TableCell>{quiz.totalAttempt
                          }</TableCell>
                          {/* <TableCell className="text-right">
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
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete Quiz
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell> */}
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
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Questions</TableHead>
                        <TableHead>Difficulty</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Attempts</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {quizzes
                        .filter((quiz) => quiz.status === "published")
                        .map((quiz) => (
                          <TableRow key={quiz.id}>
                            <TableCell className="font-medium">{quiz.title}</TableCell>
                            <TableCell>{quiz.category}</TableCell>
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
                            <TableCell>{quiz.created}</TableCell>
                            <TableCell>{quiz.attempts}</TableCell>
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
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Questions</TableHead>
                        <TableHead>Difficulty</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {quizzes
                        .filter((quiz) => quiz.status === "draft")
                        .map((quiz) => (
                          <TableRow key={quiz.id}>
                            <TableCell className="font-medium">{quiz.title}</TableCell>
                            <TableCell>{quiz.category}</TableCell>
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
                            <TableCell>{quiz.created}</TableCell>
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
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Questions</TableHead>
                        <TableHead>Difficulty</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Archived Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {quizzes
                        .filter((quiz) => quiz.status === "archived")
                        .map((quiz) => (
                          <TableRow key={quiz.id}>
                            <TableCell className="font-medium">{quiz.title}</TableCell>
                            <TableCell>{quiz.category}</TableCell>
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
                            <TableCell>{quiz.created}</TableCell>
                            <TableCell>{quiz.created}</TableCell>
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
    </div>
  )
}

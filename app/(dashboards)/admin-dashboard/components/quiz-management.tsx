"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  PlusCircle,
  Edit,
  Trash2,
  MoreHorizontal,
  Eye,
  Copy,
  FileQuestion,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UseAxiosNormal from "@/app/hook/(axoisSecureNormal)/axiosNormal"
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import BrainLoading from "@/app/components/brain-loading";

export function QuizManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [selectedQuizzes, setSelectedQuizzes] = useState<string[]>([]);
  const [isAddQuizOpen, setIsAddQuizOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);
  const queryClient = useQueryClient();
  const axiosInstanceNormal = UseAxiosNormal();
  // Fetch quizzes using TanStack Query
  const { data: quizzes = [], isLoading } = useQuery({
    queryKey: ["quizzes"],
    queryFn: async () => {
      const res = await axiosInstanceNormal.get("/admin/stats");
      const { quizzes: rawQuizzes } = res.data;

      return rawQuizzes.map((quiz) => ({
        id: quiz._id,
        title: quiz.quizCriteria.topic,
        author: quiz.author || "Unknown",
        status: quiz.status === "solved" ? "published" : quiz.status || "draft",
        questions: quiz.parsedQuizData.length,
        difficulty: normalizeDifficulty(quiz.quizCriteria.difficulty),
        completions: quiz.status === "solved" ? quiz.status : "Not Solved",
        avgScore: quiz.correctQuizAnswer
          ? Math.round(
              (quiz.correctQuizAnswer / quiz.parsedQuizData.length) * 100
            )
          : 0,
        updatedAt: quiz.quizCriteria.created
          ? new Date(quiz.quizCriteria.created).toLocaleDateString()
          : new Date().toLocaleDateString(),
      }));
    },
  });

  // Mutation for deleting a quiz
  const deleteQuizMutation = useMutation({
    mutationFn: (quizId: string) =>
      axiosInstanceNormal.delete(`/delete-quiz/${quizId}`),
    onSuccess: (_, quizId) => {
      // Update the quizzes cache
      queryClient.setQueryData(["quizzes"], (oldQuizzes) =>
        oldQuizzes.filter((quiz) => quiz.id !== quizId)
      );
      toast.success("Quiz deleted successfully!", {
        position: "top-center",
        style: { backgroundColor: "#7C3AED", color: "#fff" },
      });
      setIsDeleteDialogOpen(false);
      setQuizToDelete(null);
    },
    onError: () => {
      toast.error("Failed to delete quiz.", {
        position: "top-center",
        style: { backgroundColor: "#ff4d4f", color: "#fff" },
      });
    },
  });

  // Normalize difficulty
  const normalizeDifficulty = (difficulty) => {
    const difficultyMap = {
      Easy: "easy",
      expert: "hard",
    };
    return difficultyMap[difficulty] || difficulty.toLowerCase();
  };

  // Filter quizzes
  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch =
      quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      difficultyFilter === "all" || quiz.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  // Toggle quiz selection
  const toggleQuizSelection = (quizId) => {
    setSelectedQuizzes((prev) =>
      prev.includes(quizId)
        ? prev.filter((id) => id !== quizId)
        : [...prev, quizId]
    );
  };

  // Toggle all quizzes selection
  const toggleAllQuizzes = () => {
    if (selectedQuizzes.length === filteredQuizzes.length) {
      setSelectedQuizzes([]);
    } else {
      setSelectedQuizzes(filteredQuizzes.map((quiz) => quiz.id));
    }
  };

  // Handle delete quiz
  const handleDeleteQuiz = (quizId) => {
    setQuizToDelete(quizId);
    setIsDeleteDialogOpen(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (quizToDelete) {
      deleteQuizMutation.mutate(quizToDelete);
    }
  };

  if (isLoading) {
    return <div>
              <BrainLoading></BrainLoading>
          </div>;
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
                Fill in the details to create a new quiz. You can add questions
                after creating the quiz.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="topic" className="text-right">
                  Topic
                </Label>
                <Input
                  id="topic"
                  className="col-span-3"
                  placeholder="Enter quiz topic"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="author" className="text-right">
                  Author
                </Label>
                <Input
                  id="author"
                  className="col-span-3"
                  placeholder="Enter author name"
                />
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
                <Textarea
                  id="description"
                  className="col-span-3"
                  placeholder="Enter quiz description"
                />
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
                placeholder="Search topics or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 md:w-[300px]"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Select
                value={difficultyFilter}
                onValueChange={setDifficultyFilter}
              >
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
              <TabsTrigger value="all">
                All Quizzes ({quizzes.length})
              </TabsTrigger>
              <TabsTrigger value="published">
                Published (
                {quizzes.filter((q) => q.status === "published").length})
              </TabsTrigger>
              <TabsTrigger value="draft">
                Drafts ({quizzes.filter((q) => q.status === "draft").length})
              </TabsTrigger>
              <TabsTrigger value="archived">
                Archived (
                {quizzes.filter((q) => q.status === "archived").length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]">
                        <Checkbox
                          checked={
                            selectedQuizzes.length === filteredQuizzes.length &&
                            filteredQuizzes.length > 0
                          }
                          onCheckedChange={toggleAllQuizzes}
                        />
                      </TableHead>
                      <TableHead>Topic</TableHead>
                      <TableHead>Author</TableHead>
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
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {quiz.title}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {quiz.author}
                          </Badge>
                        </TableCell>
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
                        <TableCell className="capitalize">
                          {quiz.completions}
                        </TableCell>
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
                            <span className="text-muted-foreground">0%</span>
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
                                <Link
                                  href={`/admin-dashboard/quizzes/details/${quiz.id}`}
                                  className="flex items-center gap-2"
                                >
                                  <Eye className="mr-2 h-4 w-4" />{" "}
                                  <p>View Quiz</p>
                                </Link>
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
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => handleDeleteQuiz(quiz.id)}
                              >
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
                      <TableHead>Topic</TableHead>
                      <TableHead>Author</TableHead>
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
                            <Checkbox
                              checked={selectedQuizzes.includes(quiz.id)}
                              onCheckedChange={() =>
                                toggleQuizSelection(quiz.id)
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {quiz.title}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {quiz.author}
                            </Badge>
                          </TableCell>
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
                          <TableCell className="capitalize">
                            {quiz.completions}
                          </TableCell>
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
                      <TableHead>Topic</TableHead>
                      <TableHead>Author</TableHead>
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
                            <Checkbox
                              checked={selectedQuizzes.includes(quiz.id)}
                              onCheckedChange={() =>
                                toggleQuizSelection(quiz.id)
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {quiz.title}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {quiz.author}
                            </Badge>
                          </TableCell>
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
                      <TableHead>Topic</TableHead>
                      <TableHead>Author</TableHead>
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
                            <Checkbox
                              checked={selectedQuizzes.includes(quiz.id)}
                              onCheckedChange={() =>
                                toggleQuizSelection(quiz.id)
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {quiz.title}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {quiz.author}
                            </Badge>
                          </TableCell>
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this quiz? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setQuizToDelete(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleteQuizMutation.isLoading}
            >
              {deleteQuizMutation.isLoading ? "Deleting..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

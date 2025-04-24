"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "../components/dashboard-header"
import { DashboardShell } from "../components/dashboard-shell"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Filter, PlusCircle, Search, Star } from "lucide-react"
import { QuizCard } from "@/app/components/quiz-card"
import { DashboardProvider, useDashboard } from "../DashboardContext"
import Link from "next/link"

export default function QuizzesPage() {
    const { userStats } = useDashboard();
    console.log(userStats?.totalQuiz, "dashboard userStats")
    return (
        <DashboardProvider>
            <DashboardShell>
                <DashboardHeader heading="Quizzes" text="Take quizzes, view your history, and track your progress.">
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create Quiz
                    </Button>
                </DashboardHeader>

                <Tabs defaultValue="available" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="available">Available Quizzes</TabsTrigger>
                        <TabsTrigger value="my-quizzes">My Quizzes</TabsTrigger>
                        <TabsTrigger value="history">Quiz History</TabsTrigger>
                        <TabsTrigger value="favorites">Favorites</TabsTrigger>
                    </TabsList>

                    <TabsContent value="available" className="space-y-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex items-center gap-2 w-full md:w-auto">
                                <Search className="h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search quizzes..." className="h-9 md:w-[300px]" />
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <Select defaultValue="all">
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
                                </Select>
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
                                <Button variant="outline" size="sm" className="h-9">
                                    <Filter className="mr-2 h-4 w-4" />
                                    More Filters
                                </Button>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {availableQuizzes.map((quiz, index) => (
                                <QuizCard
                                    key={index}
                                    topic={quiz.topic}
                                    description={quiz.description}
                                    category={quiz.category}
                                    difficulty={quiz.difficulty}
                                    quizType={quiz.quizType}
                                    timeLimit={quiz.timeLimit}
                                    quantity={quiz.quantity}></QuizCard>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="my-quizzes" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>My Created Quizzes</CardTitle>
                                <CardDescription>Quizzes you have created and shared with others.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Title</TableHead>
                                                <TableHead>Category</TableHead>
                                                <TableHead>Difficulty</TableHead>
                                                <TableHead>Questions</TableHead>
                                                <TableHead>Created</TableHead>
                                                <TableHead>Completions</TableHead>
                                                <TableHead>Result</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {userStats?.totalQuiz?.map((quiz) => (
                                                <TableRow key={quiz._id}>
                                                    <TableCell className="font-medium">{quiz?.quizCriteria?.topic}</TableCell>
                                                    <TableCell className="uppercase">{quiz.quizCriteria?.quizType}</TableCell>
                                                    <TableCell>
                                                        <Badge variant={getBadgeVariant(quiz.difficulty)}>{quiz.quizCriteria?.difficulty}</Badge>
                                                    </TableCell>
                                                    <TableCell>{quiz.quizCriteria?.quantity}</TableCell>
                                                    <TableCell>{quiz.quizCriteria?.timeLimit}min</TableCell>
                                                    <TableCell className="capitalize">{quiz?.status || "Unsolved"} </TableCell>
                                                    <TableCell className="capitalize">{Number.isNaN((quiz?.correctQuizAnswer / quiz?.quizCriteria?.quantity) * 100)
                                                        ? "0%"
                                                        : `${((quiz?.correctQuizAnswer / quiz?.quizCriteria?.quantity) * 100).toFixed()}%`
                                                    }
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <Link href={`/Quizzes/quiz?difficulty=${quiz?.quizCriteria?.difficulty}&topic=${quiz?.quizCriteria?.topic}&questions=${quiz?.quizCriteria?.quantity}&time=${quiz?.quizCriteria?.timeLimit}&quizSetId=${quiz._id}`}>
                                                                <Button variant="outline" size="sm">
                                                                    Retake
                                                                </Button>
                                                            </Link>
                                                            <Button variant="outline" size="sm">
                                                                Edit
                                                            </Button>
                                                            <Button variant="outline" size="sm">
                                                                Delete
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
                    </TabsContent>

                    <TabsContent value="history" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Quiz History</CardTitle>
                                <CardDescription>Your past quiz attempts and results.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Quiz</TableHead>
                                                <TableHead>Category</TableHead>
                                                <TableHead>Score</TableHead>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Time Spent</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {quizHistory.map((history) => (
                                                <TableRow key={history.id}>
                                                    <TableCell className="font-medium">{history.topic}</TableCell>
                                                    <TableCell>{history.category}</TableCell>
                                                    <TableCell>
                                                        <span
                                                            className={
                                                                history.score >= 90
                                                                    ? "text-green-600 font-medium"
                                                                    : history.score >= 70
                                                                        ? "text-blue-600 font-medium"
                                                                        : "text-orange-600 font-medium"
                                                            }
                                                        >
                                                            {history.score}%
                                                        </span>
                                                    </TableCell>
                                                    <TableCell>{history.date}</TableCell>
                                                    <TableCell>{history.timeSpent}</TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <Button variant="outline" size="sm">
                                                                View Details
                                                            </Button>
                                                            <Button variant="outline" size="sm">
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
                    </TabsContent>

                    <TabsContent value="favorites" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Favorite Quizzes</CardTitle>
                                <CardDescription>Quizzes you have marked as favorites for quick access.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {favoriteQuizzes.map((quiz) => (
                                        <Card key={quiz.id} className="flex flex-col">
                                            <CardHeader className="pb-2">
                                                <div className="flex justify-between items-start">
                                                    <Badge variant={getBadgeVariant(quiz.difficulty)}>{quiz.difficulty}</Badge>
                                                    <div className="flex items-center text-muted-foreground">
                                                        <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                                                        <span className="text-sm">{quiz.rating}</span>
                                                    </div>
                                                </div>
                                                <CardTitle className="mt-2">{quiz.topic}</CardTitle>
                                                <CardDescription>{quiz.description}</CardDescription>
                                            </CardHeader>
                                            <CardContent className="flex-1">
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-muted-foreground">Category:</span>
                                                        <span className="font-medium">{quiz.category}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-muted-foreground">Questions:</span>
                                                        <span className="font-medium">{quiz.quantity}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-muted-foreground">Best Score:</span>
                                                        <span className="font-medium">{quiz.bestScore}%</span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                            <CardFooter>
                                                <Button className="w-full">Take Quiz</Button>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </DashboardShell>
        </DashboardProvider>
    )
}

// Helper function for badge variants
function getBadgeVariant(difficulty: string) {
    if (!difficulty) return "outline";
    switch (difficulty.toLowerCase()) {
        case "easy":
            return "outline"
        case "medium":
            return "secondary"
        case "hard":
            return "default"
        default:
            return "outline"
    }
}

// Sample data
const availableQuizzes = [
    {
        id: 1,
        topic: "Basic Mathematics",
        description: "Test your knowledge of basic math concepts and operations.",
        category: "Math",
        difficulty: "Easy",
        quantity: 20,
        quizType: "mcq",
        timeLimit: "30 min",
        attempts: "Unlimited",
        rating: 4.8,
    },
    {
        id: 2,
        topic: "World Geography",
        description: "Challenge yourself with questions about countries, capitals, and landmarks.",
        category: "Geography",
        difficulty: "Medium",
        quantity: 25,
        quizType: "mcq",
        timeLimit: "40 min",
        attempts: "Unlimited",
        rating: 4.6,
    },
    {
        id: 3,
        topic: "Computer Science Fundamentals",
        description: "Test your understanding of core computer science concepts.",
        category: "Computer",
        difficulty: "Hard",
        quantity: 30,
        quizType: "mcq",
        timeLimit: "45 min",
        attempts: "Unlimited",
        rating: 4.9,
    },
    {
        id: 4,
        topic: "English Literature",
        description: "Questions about famous works of literature and their authors.",
        category: "English",
        difficulty: "Medium",
        quantity: 20,
        quizType: "t/f",
        timeLimit: "35 min",
        attempts: "Unlimited",
        rating: 4.5,
    },
    {
        id: 5,
        topic: "World History",
        description: "Test your knowledge of major historical events and figures.",
        category: "History",
        difficulty: "Medium",
        quantity: 25,
        quizType: "t/f",
        timeLimit: "40 min",
        attempts: "Unlimited",
        rating: 4.7,
    },
    {
        id: 6,
        topic: "Advanced Physics",
        description: "Challenge yourself with complex physics problems and concepts.",
        category: "Science",
        difficulty: "Hard",
        quantity: 20,
        quizType: "mcq",
        timeLimit: "45 min",
        attempts: "Unlimited",
        rating: 4.8,
    },
];


const myQuizzes = [
    {
        id: 1,
        topic: "Science Quiz for Beginners",
        category: "Science",
        difficulty: "Easy",
        quantity: 15,
        created: "2023-05-10",
        completions: 42,
    },
    {
        id: 2,
        topic: "History of Ancient Civilizations",
        category: "History",
        difficulty: "Medium",
        quantity: 20,
        created: "2023-06-15",
        completions: 28,
    },
    {
        id: 3,
        topic: "Programming Concepts",
        category: "Computer",
        difficulty: "Hard",
        quantity: 25,
        created: "2023-07-20",
        completions: 15,
    },
]

const quizHistory = [
    {
        id: 1,
        topic: "Basic Mathematics",
        category: "Math",
        score: 85,
        date: "2023-06-15",
        timeSpent: "25:42",
    },
    {
        id: 2,
        topic: "World Geography",
        category: "Geography",
        score: 76,
        date: "2023-06-12",
        timeSpent: "32:18",
    },
    {
        id: 3,
        topic: "Computer Science Fundamentals",
        category: "Computer",
        score: 95,
        date: "2023-06-08",
        timeSpent: "38:45",
    },
    {
        id: 4,
        topic: "English Literature",
        category: "English",
        score: 88,
        date: "2023-06-05",
        timeSpent: "29:15",
    },
    {
        id: 5,
        topic: "World History",
        category: "History",
        score: 92,
        date: "2023-06-01",
        timeSpent: "35:30",
    },
]

const favoriteQuizzes = [
    {
        id: 1,
        topic: "Basic Mathematics",
        description: "Test your knowledge of basic math concepts and operations.",
        category: "Math",
        difficulty: "Easy",
        quantity: 20,
        bestScore: 85,
        rating: 4.8,
    },
    {
        id: 2,
        topic: "Computer Science Fundamentals",
        description: "Test your understanding of core computer science concepts.",
        category: "Computer",
        difficulty: "Hard",
        quantity: 30,
        bestScore: 95,
        rating: 4.9,
    },
    {
        id: 3,
        topic: "World History",
        description: "Test your knowledge of major historical events and figures.",
        category: "History",
        difficulty: "Medium",
        quantity: 25,
        bestScore: 92,
        rating: 4.7,
    },
]

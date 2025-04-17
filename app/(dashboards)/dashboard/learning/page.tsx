import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "../components/dashboard-header"
import { DashboardShell } from "../components/dashboard-shell"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Play, Star } from "lucide-react"

export default function LearningPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Learning Center" text="Explore learning materials and track your progress." />

      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="materials">Study Materials</TabsTrigger>
          <TabsTrigger value="progress">Learning Progress</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card key={course.id} className="flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge variant={getBadgeVariant(course.level)}>{course.level}</Badge>
                    <div className="flex items-center text-muted-foreground">
                      <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{course.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="mt-2">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{course.lessons} lessons</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Play className="h-4 w-4 mr-2" />
                    {course.progress > 0 ? "Continue Learning" : "Start Course"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="materials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Study Materials</CardTitle>
              <CardDescription>Access guides, notes, and reference materials for your studies.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studyMaterials.map((material) => (
                  <div
                    key={material.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <h4 className="font-medium">{material.title}</h4>
                      <p className="text-sm text-muted-foreground">{material.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="outline">{material.type}</Badge>
                        <span>{material.size}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
              <CardDescription>Track your progress across all learning materials.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {progressCategories.map((category) => (
                  <div key={category.id} className="space-y-2">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{category.name}</h4>
                      <span className="text-sm font-medium">{category.progress}%</span>
                    </div>
                    <Progress value={category.progress} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      {category.completed} of {category.total} lessons completed
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recommended for You</CardTitle>
              <CardDescription>
                Personalized learning recommendations based on your interests and progress.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((recommendation) => (
                  <div key={recommendation.id} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
                    <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
                      <recommendation.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="font-medium">{recommendation.title}</h4>
                      <p className="text-sm text-muted-foreground">{recommendation.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant={getBadgeVariant(recommendation.level)}>{recommendation.level}</Badge>
                        <span>{recommendation.duration}</span>
                      </div>
                    </div>
                    <Button size="sm">View</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

// Helper function for badge variants
function getBadgeVariant(level: string) {
  switch (level.toLowerCase()) {
    case "beginner":
      return "outline"
    case "intermediate":
      return "secondary"
    case "advanced":
      return "default"
    default:
      return "outline"
  }
}

// Sample data
const courses = [
  {
    id: 1,
    title: "Mathematics Fundamentals",
    description: "Master the basics of mathematics with this comprehensive course.",
    level: "Beginner",
    lessons: 12,
    duration: "6 hours",
    progress: 75,
    rating: 4.8,
  },
  {
    id: 2,
    title: "Advanced Physics",
    description: "Explore complex physics concepts and theories.",
    level: "Advanced",
    lessons: 18,
    duration: "10 hours",
    progress: 30,
    rating: 4.9,
  },
  {
    id: 3,
    title: "English Literature",
    description: "Analyze classic works of literature and improve your writing skills.",
    level: "Intermediate",
    lessons: 15,
    duration: "8 hours",
    progress: 0,
    rating: 4.6,
  },
  {
    id: 4,
    title: "World History",
    description: "Journey through the major events that shaped our world.",
    level: "Beginner",
    lessons: 20,
    duration: "12 hours",
    progress: 45,
    rating: 4.7,
  },
  {
    id: 5,
    title: "Computer Science Basics",
    description: "Learn the fundamentals of programming and computer science.",
    level: "Beginner",
    lessons: 16,
    duration: "9 hours",
    progress: 10,
    rating: 4.9,
  },
  {
    id: 6,
    title: "Biology and Life Sciences",
    description: "Explore the fascinating world of living organisms.",
    level: "Intermediate",
    lessons: 14,
    duration: "7 hours",
    progress: 0,
    rating: 4.5,
  },
]

const studyMaterials = [
  {
    id: 1,
    title: "Mathematics Formula Sheet",
    description: "A comprehensive reference of all important math formulas.",
    type: "PDF",
    size: "2.4 MB",
  },
  {
    id: 2,
    title: "Physics Concepts Guide",
    description: "Visual explanations of key physics concepts and principles.",
    type: "PDF",
    size: "3.8 MB",
  },
  {
    id: 3,
    title: "English Grammar Rules",
    description: "Complete guide to English grammar rules and exceptions.",
    type: "PDF",
    size: "1.5 MB",
  },
  {
    id: 4,
    title: "World History Timeline",
    description: "Interactive timeline of major historical events.",
    type: "Interactive",
    size: "Online Resource",
  },
  {
    id: 5,
    title: "Programming Cheat Sheet",
    description: "Quick reference for common programming concepts and syntax.",
    type: "PDF",
    size: "1.2 MB",
  },
]

const progressCategories = [
  {
    id: 1,
    name: "Mathematics",
    progress: 65,
    completed: 26,
    total: 40,
  },
  {
    id: 2,
    name: "Science",
    progress: 42,
    completed: 15,
    total: 36,
  },
  {
    id: 3,
    name: "Language Arts",
    progress: 78,
    completed: 28,
    total: 36,
  },
  {
    id: 4,
    name: "History",
    progress: 30,
    completed: 12,
    total: 40,
  },
  {
    id: 5,
    name: "Computer Science",
    progress: 55,
    completed: 22,
    total: 40,
  },
]

const recommendations = [
  {
    id: 1,
    title: "Algebra Mastery",
    description: "Improve your algebra skills with this focused course.",
    level: "Intermediate",
    duration: "4 hours",
    icon: BookOpen,
  },
  {
    id: 2,
    title: "Chemistry Fundamentals",
    description: "Build a strong foundation in chemistry concepts.",
    level: "Beginner",
    duration: "6 hours",
    icon: BookOpen,
  },
  {
    id: 3,
    title: "Essay Writing Workshop",
    description: "Learn techniques to write compelling essays.",
    level: "Intermediate",
    duration: "3 hours",
    icon: BookOpen,
  },
  {
    id: 4,
    title: "Modern World History",
    description: "Focus on historical events of the 20th and 21st centuries.",
    level: "Advanced",
    duration: "8 hours",
    icon: BookOpen,
  },
]

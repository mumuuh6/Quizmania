"use client"

import { useState } from "react"
import {
  Award,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  FlameIcon as Fire,
  Medal,
  Star,
  Trophy,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample achievement data
const achievementsData = [
  {
    id: "a1",
    name: "Quiz Master",
    description: "Complete 50 quizzes",
    icon: Trophy,
    progress: 84, // percentage
    current: 42,
    target: 50,
    unlocked: false,
    category: "activity",
  },
  {
    id: "a2",
    name: "Perfect Score",
    description: "Get 100% on any quiz",
    icon: Star,
    progress: 100,
    current: 1,
    target: 1,
    unlocked: true,
    unlockedDate: "2023-05-15T14:30:00",
    category: "achievement",
  },
  {
    id: "a3",
    name: "Streak Master",
    description: "Maintain a 7-day streak",
    icon: Fire,
    progress: 100,
    current: 7,
    target: 7,
    unlocked: true,
    unlockedDate: "2023-06-10T09:15:00",
    category: "streak",
  },
  {
    id: "a4",
    name: "Science Whiz",
    description: "Complete 20 science quizzes",
    icon: CheckCircle,
    progress: 65,
    current: 13,
    target: 20,
    unlocked: false,
    category: "subject",
  },
  {
    id: "a5",
    name: "Speed Demon",
    description: "Complete a quiz in under 5 minutes with at least 90% score",
    icon: Clock,
    progress: 100,
    current: 1,
    target: 1,
    unlocked: true,
    unlockedDate: "2023-04-22T16:45:00",
    category: "achievement",
  },
  {
    id: "a6",
    name: "Math Genius",
    description: "Score above 90% on 10 math quizzes",
    icon: Award,
    progress: 70,
    current: 7,
    target: 10,
    unlocked: false,
    category: "subject",
  },
  {
    id: "a7",
    name: "History Buff",
    description: "Complete all history quizzes",
    icon: Medal,
    progress: 60,
    current: 6,
    target: 10,
    unlocked: false,
    category: "subject",
  },
  {
    id: "a8",
    name: "Dedicated Learner",
    description: "Spend 24 hours taking quizzes",
    icon: Calendar,
    progress: 88,
    current: 21,
    target: 24,
    unlocked: false,
    category: "activity",
  },
]

// Sample leaderboard data
const leaderboardData = [
  { rank: 1, name: "Alex Johnson", score: 9850, badges: 28, avatar: "/placeholder.svg?height=32&width=32" },
  { rank: 2, name: "Maria Garcia", score: 9720, badges: 26, avatar: "/placeholder.svg?height=32&width=32" },
  { rank: 3, name: "James Smith", score: 9540, badges: 25, avatar: "/placeholder.svg?height=32&width=32" },
  { rank: 4, name: "Sarah Williams", score: 9350, badges: 24, avatar: "/placeholder.svg?height=32&width=32" },
  { rank: 5, name: "Robert Brown", score: 9120, badges: 23, avatar: "/placeholder.svg?height=32&width=32" },
  { rank: 6, name: "You", score: 8950, badges: 21, avatar: "/placeholder.svg?height=32&width=32", isCurrentUser: true },
  { rank: 7, name: "David Miller", score: 8820, badges: 20, avatar: "/placeholder.svg?height=32&width=32" },
  { rank: 8, name: "Jennifer Davis", score: 8740, badges: 19, avatar: "/placeholder.svg?height=32&width=32" },
  { rank: 9, name: "Michael Wilson", score: 8650, badges: 18, avatar: "/placeholder.svg?height=32&width=32" },
  { rank: 10, name: "Lisa Moore", score: 8520, badges: 17, avatar: "/placeholder.svg?height=32&width=32" },
]

export function Achievements() {
  const [filter, setFilter] = useState("all")

  // Filter achievements based on selected filter
  const filteredAchievements =
    filter === "all"
      ? achievementsData
      : filter === "unlocked"
        ? achievementsData.filter((a) => a.unlocked)
        : achievementsData.filter((a) => !a.unlocked)

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Achievements & Badges</h2>
        <div className="flex items-center gap-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter achievements" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Achievements</SelectItem>
              <SelectItem value="unlocked">Unlocked</SelectItem>
              <SelectItem value="locked">In Progress</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="badges" className="space-y-4">
        <TabsList>
          <TabsTrigger value="badges">Badges & Achievements</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="stats">Achievement Stats</TabsTrigger>
        </TabsList>

        <TabsContent value="badges" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAchievements.map((achievement) => (
              <Card key={achievement.id} className={achievement.unlocked ? "border-primary/50" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        <achievement.icon
                          className={`h-5 w-5 ${achievement.unlocked ? "text-primary" : "text-muted-foreground"}`}
                        />
                        {achievement.name}
                      </CardTitle>
                      <CardDescription>{achievement.description}</CardDescription>
                    </div>
                    {achievement.unlocked && (
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        Unlocked
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Progress: {achievement.current} / {achievement.target}
                      </span>
                      <span className="font-medium">{achievement.progress}%</span>
                    </div>
                    <Progress value={achievement.progress} className="h-2" />
                  </div>
                </CardContent>
                {achievement.unlocked && achievement.unlockedDate && (
                  <CardFooter className="pt-1">
                    <p className="text-xs text-muted-foreground">Unlocked on {formatDate(achievement.unlockedDate)}</p>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Global Leaderboard</CardTitle>
              <CardDescription>See how you rank against other quiz takers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Rank</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead className="text-right">Score</TableHead>
                      <TableHead className="text-right">Badges</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaderboardData.map((user) => (
                      <TableRow key={user.rank} className={user.isCurrentUser ? "bg-muted/50" : ""}>
                        <TableCell className="font-medium">
                          {user.rank <= 3 ? (
                            <div className="flex items-center">
                              <Trophy
                                className={`h-4 w-4 mr-1 ${
                                  user.rank === 1
                                    ? "text-yellow-500"
                                    : user.rank === 2
                                      ? "text-gray-400"
                                      : "text-amber-600"
                                }`}
                              />
                              {user.rank}
                            </div>
                          ) : (
                            user.rank
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className={user.isCurrentUser ? "font-medium" : ""}>
                              {user.name}
                              {user.isCurrentUser && " (You)"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium">{user.score.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Award className="h-4 w-4 text-primary" />
                            {user.badges}
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

        <TabsContent value="stats" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Badges</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">21</div>
                <p className="text-xs text-muted-foreground">Out of 50 available</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                <Fire className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8 days</div>
                <p className="text-xs text-muted-foreground">Best: 14 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Global Rank</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">#6</div>
                <p className="text-xs text-muted-foreground">Top 1% of all users</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Achievement Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42%</div>
                <p className="text-xs text-muted-foreground">Badges earned vs. available</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Achievement Categories</CardTitle>
              <CardDescription>Your progress across different achievement types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Activity Achievements</span>
                    </div>
                    <span className="text-sm text-muted-foreground">7/15</span>
                  </div>
                  <Progress value={47} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Medal className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Subject Mastery</span>
                    </div>
                    <span className="text-sm text-muted-foreground">8/20</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Special Achievements</span>
                    </div>
                    <span className="text-sm text-muted-foreground">4/10</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Fire className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Streak Achievements</span>
                    </div>
                    <span className="text-sm text-muted-foreground">2/5</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

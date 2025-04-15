"use client";
import {
  Award,
  BookOpen,
  CheckCircle,
  Clock,
  Download,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "./components/dashboard-header"
import { DashboardShell } from "./components/dashboard-shell"
import { RecentQuizzes } from "./components/recent-quizzes"
import { QuizPerformance } from "./components/quiz-performance"
import { PerformanceAnalytics } from "./components/performance-analytics"
import { QuizHistory } from "./components/quiz-history"
import { Achievements } from "./components/achievements"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useQuery } from "@tanstack/react-query"
import UseAxiosNormal from "../hook/(axoisSecureNormal)/axiosNormal"
import BrainLoading from "../components/brain-loading"
// import { useEffect, useState } from "react"

export default function DashboardPage() {
    const { data: session } = useSession()
    const axiosInstanceNormal = UseAxiosNormal()
   
    const { data: userStats, isLoading, error } = useQuery({
        queryKey: ['userStats', session?.user?.email],
        queryFn: async () => {
            const response = await axiosInstanceNormal.get(`/user/stats/${session?.user?.email}`)
            return response.data
        },
        enabled: !!session?.user?.email,
      });
    
      if (isLoading) return <BrainLoading />;
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="Overview of your quiz performance and activity."
      >
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Link href={"/Quizzes/create"}>
            <Button size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Take New Quiz
            </Button>
          </Link>
        </div>
      </DashboardHeader>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Quizzes
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {userStats?.totalQuiz ? userStats?.totalQuiz?.length : 0}
                </div>
                {/* <p className="text-xs text-muted-foreground">+8 from last month</p> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Score
                </CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {userStats?.averageMark}
                </div>
                {/* <p className="text-xs text-muted-foreground">+5% from last month</p> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Completion Rate
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {userStats?.solvedQuiz && userStats?.totalQuiz
                    ? (
                        (userStats.solvedQuiz.length /
                          userStats.totalQuiz.length) *
                        100
                      ).toFixed(2) + "%"
                    : "0.00%"}
                </div>
            </DashboardHeader>
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Quizzes</CardTitle>
                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{userStats?.totalQuiz?.length}</div>
                                {/* <p className="text-xs text-muted-foreground">+8 from last month</p> */}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                                <Award className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{userStats?.averageMark}</div>
                                {/* <p className="text-xs text-muted-foreground">+5% from last month</p> */}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                                <CheckCircle className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {userStats?.totalQuiz?.length > 0
                                        ? ((userStats?.solvedQuiz?.length || 0) / userStats?.totalQuiz?.length * 100).toFixed(2) + "%"
                                        : "Not started yet"}
                                </div>



                                {/* <p className="text-xs text-muted-foreground">+2% from last month</p> */}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Avg. Time</CardTitle>
                                <Clock className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">14:32</div>
                                {/* <p className="text-xs text-muted-foreground">-1:20 from last month</p> */}
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Quiz Performance</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <QuizPerformance />
                            </CardContent>
                        </Card>
                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Recent Quizzes</CardTitle>
                                <CardDescription>You've completed <span className="text-green-600">{userStats?.solvedQuiz?.length}</span> quizzes this month.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <RecentQuizzes />
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="performance" className="space-y-6">
                    <PerformanceAnalytics />
                </TabsContent>
                <TabsContent value="history" className="space-y-6">
                    <QuizHistory />
                </TabsContent>
                <TabsContent value="achievements" className="space-y-6">
                    <Achievements />
                </TabsContent>
            </Tabs>
        </DashboardShell>
    )
}

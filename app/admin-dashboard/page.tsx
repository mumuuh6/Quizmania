"use client"
import { Activity, CheckCircle, FileText, Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminHeader } from "./components/admin-header"
import { AdminShell } from "./components/admin-shell"
import { RecentUsers } from "./components/recent-users"
import { RecentQuizzes } from "./components/recent-quizzes"
import { OverviewStats } from "./components/overview-stats"
import { UserManagement } from "./components/user-management"
import { QuizManagement } from "./components/quiz-management"
import { ReportsAnalytics } from "./components/reports-analytics"
import { AdminSettings } from "./components/admin-setting"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import axios from "axios"

export default function AdminDashboardPage() {
  const { data: session } = useSession()
  const [adminStats, setAdminStats] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("https://quiz-mania-iota.vercel.app/admin/stats")
        console.log("response from dashboard", response.data)
        setAdminStats(response.data)
      } catch (err) {
        console.error("Failed to fetch Admin stats:", err)
      }
    }

    fetchStats()
  }, [])

  return (
    <AdminShell>
      <AdminHeader heading="Admin Dashboard" text="Manage your quiz platform and Admins."></AdminHeader>
      <Tabs defaultValue="overview" className="space-y-4">
        {/* <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList> */}
        <TabsContent value="overview" className="space-y-4 pt-5">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminStats?.users?.length}</div>
                {/* <p className="text-xs text-muted-foreground">+180 from last month</p> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Quizzes</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminStats?.quizzes?.length}</div>
                {/* <p className="text-xs text-muted-foreground">+42 from last month</p> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {adminStats?.quizzes?.length > 0
                    ? ((adminStats?.solvedQuizzes?.length || 0) / adminStats?.quizzes?.length * 100).toFixed(2) + "%"
                    : "Not started yet"}
                </div>

                {/* <p className="text-xs text-muted-foreground">+2.1% from last month</p> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                {/* <p className="text-xs text-muted-foreground">+8.2% from last month</p> */}
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Platform Overview</CardTitle>
                <CardDescription>User activity and quiz completions over time</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <OverviewStats />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>Latest user registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentUsers />
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Quizzes</CardTitle>
              <CardDescription>Latest quizzes created on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentQuizzes />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          <UserManagement />
        </TabsContent>
        <TabsContent value="quizzes" className="space-y-4">
          <QuizManagement />
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <ReportsAnalytics />
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          <AdminSettings />
        </TabsContent>
      </Tabs>
    </AdminShell>
  )
}

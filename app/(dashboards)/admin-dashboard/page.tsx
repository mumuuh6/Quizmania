"use client";
import { Activity, CheckCircle, FileText, Users } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AdminHeader } from "./components/admin-header";
import AdminShell from "../admin-dashboard/components/admin-shell";
import { RecentUsers } from "./components/recent-users";
import { RecentQuizzes } from "./components/recent-quizzes";
import { OverviewStats } from "./components/overview-stats";
import { UserManagement } from "./components/user-management";
import { QuizManagement } from "./components/quiz-management";
import { ReportsAnalytics } from "./components/reports-analytics";
import { AdminSettings } from "./components/admin-setting";
import { useEffect, useState } from "react";
import UseAxiosNormal from "@/app/hook/(axoisSecureNormal)/axiosNormal";
import { useQuery } from "@tanstack/react-query";
import BrainLoading from "@/app/components/brain-loading";
import { AdminDashboardProvider } from "./AdminDashboardContext";
import AdminDashboardContent from "./AdminDashboardContent";
import UseUser from "@/app/hook/UseUser/UseUser";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const [adminStats, setAdminStats] = useState(null);
  const axiosInstanceNormal = UseAxiosNormal();
  const { userInfo, userInfoLoading } = UseUser();
  const router = useRouter();

  useEffect(() => {
    if (!userInfoLoading) {
      if (!userInfo || userInfo.role !== "admin") {
        if(userInfo.role =="user"){
          router.push("/dashboard")
        }
        if(userInfo.role=="teacher"){
          router.push("/teacher/quizzes")
        }
      }
    }
  }, [userInfo, userInfoLoading, router]);

  const {
    data: AdminStats = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosInstanceNormal.get(`/admin/stats`);
      setAdminStats(res.data);
      return res.data;
    },
  });
  if (isLoading || userInfoLoading)
    return (
      <div>
        <BrainLoading></BrainLoading>
      </div>
    );
  return (
    <AdminDashboardProvider>
      <AdminDashboardContent></AdminDashboardContent>
    </AdminDashboardProvider>
  );
}

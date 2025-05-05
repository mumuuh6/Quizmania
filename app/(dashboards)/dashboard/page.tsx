"use client";
import { DashboardProvider } from "./DashboardContext";
import DashboardContent from "./DashboardContent";
import UseUser from "@/app/hook/UseUser/UseUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import BrainLoading from "@/app/components/brain-loading";
// import { useEffect, useState } from "react"

export default function DashboardPage() {
  // const { data: session } = useSession()
  // const axiosInstanceNormal = UseAxiosNormal()
  const { userInfo, userInfoLoading } = UseUser();
  const router = useRouter();

  useEffect(() => {
    if (!userInfoLoading) {
      if (!userInfo || userInfo.role !== "user") {
        if (userInfo.role == "admin") {
          router.push("/admin-dashboard");
        }
        if (userInfo.role == "teacher") {
          router.push("/teacher/quizzes");
        }
      }
    }
  }, [userInfo, userInfoLoading, router]);

  // const { data: userStats, isLoading, error } = useQuery({
  //   queryKey: ['userStats', session?.user?.email],
  //   queryFn: async () => {
  //     const response = await axiosInstanceNormal.get(`/user/stats/${session?.user?.email}`)
  //     return response.data
  //   },
  //   enabled: !!session?.user?.email,
  // });

  if (userInfoLoading) return <BrainLoading />;

  return (
    <DashboardProvider>
      <DashboardContent></DashboardContent>
    </DashboardProvider>
  );
}

"use client";
import { DashboardProvider } from "./DashboardContext";
import DashboardContent from "./DashboardContent";
// import { useEffect, useState } from "react"

export default function DashboardPage() {
  // const { data: session } = useSession()
  // const axiosInstanceNormal = UseAxiosNormal()

  // const { data: userStats, isLoading, error } = useQuery({
  //   queryKey: ['userStats', session?.user?.email],
  //   queryFn: async () => {
  //     const response = await axiosInstanceNormal.get(`/user/stats/${session?.user?.email}`)
  //     return response.data
  //   },
  //   enabled: !!session?.user?.email,
  // });

  // if (isLoading) return <BrainLoading />;

  return (
    <DashboardProvider>
      <DashboardContent>
      </DashboardContent>
    </DashboardProvider>
  )
}

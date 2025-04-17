"use client";
import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import UseAxiosNormal from "../../hook/(axoisSecureNormal)/axiosNormal";
import BrainLoading from "../../components/brain-loading";

interface DashboardContextType {
  userStats: any;
  userProfile:any;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const axiosInstanceNormal = UseAxiosNormal();

  const { data: userStats, isLoading, error } = useQuery({
    queryKey: ["userStats", session?.user?.email],
    queryFn: async () => {
      const res = await axiosInstanceNormal.get(`/user/stats/${session?.user?.email}`);
      return res.data;
    },
    enabled: !!session?.user?.email,
  });
  const { data: userProfile, isLoading:profileloading ,error:profileError } = useQuery({
    queryKey: ["userStats", session?.user?.email],
    queryFn: async () => {
      const res = await axiosInstanceNormal.get(`/signin/${session?.user?.email}`);
      return res.data.userInfo;
    },
    enabled: !!session?.user?.email,
  });

  if (isLoading||profileloading) return <BrainLoading />;
  if (error||profileError) return <div>Error loading user stats</div>;

  return (
    <DashboardContext.Provider value={{ userStats,userProfile}}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};

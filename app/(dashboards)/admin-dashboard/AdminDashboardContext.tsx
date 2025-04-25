"use client";
import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import UseAxiosNormal from "../../hook/(axoisSecureNormal)/axiosNormal";
import BrainLoading from "../../components/brain-loading";

interface AdminDashboardContextType {
  adminStats: any;
  userProfile:any;
}

const AdminDashboardContext = createContext<AdminDashboardContextType | undefined>(undefined);

export const AdminDashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const axiosInstanceNormal = UseAxiosNormal();

  const { data:adminStats, isLoading, error } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const res = await axiosInstanceNormal.get("/admin/stats")
      return res.data
    }
  })
  const { data: userProfile, isLoading:profileloading ,error:profileError } = useQuery({
    queryKey: ["userProfile", session?.user?.email],
    queryFn: async () => {
      const res = await axiosInstanceNormal.get(`/signin/${session?.user?.email}`);
      return res.data.userInfo;
    },
    enabled: !!session?.user?.email,
  });

  if (isLoading||profileloading) return <BrainLoading />;
  if (error||profileError) return <div>Error loading user stats</div>;
  
  return (
    <AdminDashboardContext.Provider value={{ adminStats,userProfile}}>
      {children}
    </AdminDashboardContext.Provider>
  );
};

export const useAdminDashboard = () => {
  const context = useContext(AdminDashboardContext);
  if (!context) {
    throw new Error("useAdminDashboard must be used within a DashboardProvider");
  }
  return context;
};

"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode,useEffect } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}
export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
        router.push("/auth/signin"); // Redirect to Home page if not authenticated
    } // Do nothing while loading
   
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>; // You can show a loading spinner here
  }

  return session?<>{children}</>: null; // Render children if authenticated
}
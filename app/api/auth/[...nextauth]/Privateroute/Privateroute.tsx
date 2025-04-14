"use client";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";

// Define protected routes
const protectedRoutes = ["/dashboard", "/Quizzes"];

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    if (status === "loading") return; // Wait until session status is resolved

    if (status === "unauthenticated" && protectedRoutes.includes(pathname)) {
      // Redirect to sign-in only if the current route is protected
      toast.info("Please Login first, then access this route")
      router.push(`/auth/signin?callbackUrl=${encodeURIComponent(pathname)}`);
    } else if (status === "authenticated") {
      setHasChecked(true);
    } else {
      // For unauthenticated users on public routes, allow access
      setHasChecked(true);
    }
  }, [status, pathname, router]);

  if (status === "loading" || !hasChecked) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
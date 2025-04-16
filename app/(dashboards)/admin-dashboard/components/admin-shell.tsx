"use client";
import type React from "react";
import { AdminNav } from "./admin-nav";
import { useEffect, useState } from "react";
// import { AdminUserNav } from "./admin-user-nav"

interface AdminShellProps {
  children: React.ReactNode;
}

 function AdminShell({ children }: AdminShellProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false); // Hides navbar when scrolling down
      } else {
        setIsVisible(true); // Shows navbar when scrolling up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside
          className={`md:w-[200px] flex-col md:flex md:border-r sticky  z-40 transition-all duration-500 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${
            isVisible ? "top-14 translate-y-0" : "-translate-y-full"
          }`}
        >
          <AdminNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
export default AdminShell;

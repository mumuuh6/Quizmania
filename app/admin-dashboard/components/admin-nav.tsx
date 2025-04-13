"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart, FileText, Home, Settings, Shield, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  {
    title: "Overview",
    href: "/admin-dashboard",
    icon: Home,
  },
  {
    title: "Users",
    href: "admin-dashboard/users",
    icon: Users,
  },
  {
    title: "Quizzes",
    href: "/admin-dashboard/quizzes",
    icon: FileText,
  },
  {
    title: "Reports",
    href: "/admin-dashboard/reports",
    icon: BarChart,
  },
  {
    title: "Permissions",
    href: "/admin-dashboard/permissions",
    icon: Shield,
  },
  {
    title: "Settings",
    href: "/admin-dashboard/settings",
    icon: Settings,
  },
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-wrap md:fixed md:pt-6 pb-2">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <span
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === item.href ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline",
              "justify-start",
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </span>
        </Link>
      ))}
    </nav>
  )
}

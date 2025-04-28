import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Teacher Dashboard",
  description: "Create and manage quizzes for your students",
}

interface TeacherLayoutProps {
  children: React.ReactNode
}

export default function TeacherLayout({ children }: TeacherLayoutProps) {
  return <div className="min-h-screen bg-background">{children}</div>
}

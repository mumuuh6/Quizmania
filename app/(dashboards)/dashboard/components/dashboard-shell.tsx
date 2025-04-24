import type React from "react"
import { DashboardNav } from "./dashboard-nav"
import { UserNav } from "./user-nav"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background ">
        <div className="container flex h-16 items-center justify-center py-4">
          <div className="hidden md:block">
            <h1 className="text-xl font-bold">MyDashboard</h1>
          </div>
          
        </div>
      </header>
      <div className="w-[95%] mx-auto grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden py-6">{children}</main>
      </div>
    </div>
  )
}

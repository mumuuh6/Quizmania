import { Button } from "@/components/ui/button";

import { Download, FileText } from "lucide-react";
import Link from "next/link";
import { DashboardShell } from "../components/dashboard-shell";
import { DashboardHeader } from "../components/dashboard-header";
import { PerformanceAnalytics } from "../components/performance-analytics";



export default function PerformancePage() {
  return (
    <DashboardShell>
        <DashboardHeader
        heading="Dashboard"
        text="Overview of your quiz performance and activity."
      >
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Link href={"/Quizzes/create"}>
            <Button size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Take New Quiz
            </Button>
          </Link>
        </div>
      </DashboardHeader>
      <PerformanceAnalytics></PerformanceAnalytics>
    </DashboardShell>
     
  )
}

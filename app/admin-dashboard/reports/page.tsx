import { ReportsAnalytics } from "../components/reports-analytics"
import { AdminHeader } from "../components/admin-header"
import { AdminShell } from "../components/admin-shell"

export default function ReportsPage() {
  return (
    <AdminShell>
      <AdminHeader heading="Reports & Analytics" text="View platform statistics and performance metrics."></AdminHeader>
      <ReportsAnalytics />
    </AdminShell>
  )
}

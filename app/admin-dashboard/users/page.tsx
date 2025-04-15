import { UserManagement } from "../components/user-management"
import { AdminHeader } from "../components/admin-header"
import { AdminShell } from "../components/admin-shell"

export default function UsersPage() {
  return (
    <AdminShell>
      <AdminHeader heading="User Management" text="Manage and monitor user accounts."></AdminHeader>
      <UserManagement />
    </AdminShell>
  )
}

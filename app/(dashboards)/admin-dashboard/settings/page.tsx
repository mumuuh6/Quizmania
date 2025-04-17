import { AdminSettings } from "../components/admin-setting"
import { AdminHeader } from "../components/admin-header"
import  AdminShell  from "../components/admin-shell"

export default function SettingsPage() {
  return (
    <AdminShell>
      <AdminHeader heading="Settings" text="Configure platform settings and preferences."></AdminHeader>
      <AdminSettings />
    </AdminShell>
  )
}

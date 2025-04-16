import { QuizManagement } from "../components/quiz-management"
import { AdminHeader } from "../components/admin-header"
import { AdminShell } from "../components/admin-shell"

export default function QuizzesPage() {
  return (
    <AdminShell>
      <AdminHeader heading="Quiz Management" text="Create, edit, and manage quizzes."></AdminHeader>
      <QuizManagement />
    </AdminShell>
  )
}

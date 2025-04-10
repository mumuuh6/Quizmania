// app/auth/reset-password/page.tsx
import { Suspense } from "react"
import ResetPasswordPage from "../reset-password/ResetPassword"

export default function ResetPasswordWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordPage />
    </Suspense>
  )
}
